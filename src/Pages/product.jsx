import React, { useEffect, useState } from 'react';
import '../CSS/product.css';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ReactSlider from 'react-slider';
import { Link } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import NoResultsFound from '../Component/Noresult';
import axios from 'axios';

const Product = () => {

    const BaseUrl = process.env.REACT_APP_BASEURL;
    const token = localStorage.getItem('token');

    // ************************************** Pagination **************************************
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Filter states
    const [selectedMainCategory, setSelectedMainCategory] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [priceRange, setPriceRange] = useState([0, 2000]);
    const [deleteToProduct, setDeleteToProduct] = useState('');
    const [selectedStockStatus, setSelectedStockStatus] = useState('');

    // Apply filters
    const applyFilters = () => {
        let result = [...data];

        // Apply search filter if searchQuery exists
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(item =>
                item.productName.toLowerCase().includes(query) ||
                (item.mainCategoriesData?.[0]?.mainCategoryName.toLowerCase().includes(query)) ||
                (item.categoriesData?.[0]?.categoryName.toLowerCase().includes(query))
            );
        }

        // Filter by main category
        if (selectedMainCategory) {
            result = result.filter(item =>
                item.mainCategoriesData &&
                item.mainCategoriesData[0] &&
                item.mainCategoriesData[0]._id === selectedMainCategory
            );
        }

        // Filter by category
        if (selectedCategory) {
            result = result.filter(item =>
                item.categoriesData &&
                item.categoriesData[0] &&
                item.categoriesData[0]._id === selectedCategory
            );
        }

        // Filter by stock status
        if (selectedStockStatus) {
            result = result.filter(item => item.stockStatus === selectedStockStatus);
        }


        // Filter by price range
        result = result.filter(item => {
            let priceStr = item.productVariantData?.[0]?.originalPrice;

            if (!priceStr) return true;
            let price = parseFloat(priceStr.toString().replace(/[^0-9.-]+/g, ''));

            return !isNaN(price) && price >= priceRange[0] && price <= priceRange[1];
        });

        setFilteredData(result);
        setCurrentPage(1);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleMainCategoryChange = (e) => {
        setSelectedMainCategory(e.target.value);
        setSelectedCategory('');
        setTimeout(() => applyFilters(), 0);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setTimeout(() => applyFilters(), 0);
    };

    const handleStockStatusChange = (e) => {
        setSelectedStockStatus(e.target.value);
        setTimeout(() => applyFilters(), 0);
    };

    const handleSliderChange = (newRange) => {
        setPriceRange(newRange);
        setTimeout(() => applyFilters(), 300);
    };

    useEffect(() => {
        if (data.length > 0) {
            applyFilters();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery]);

    useEffect(() => {
        if (data.length > 0) {
            applyFilters();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const handleApplyFilters = () => {
        applyFilters();
        handleClose();
    };

    // Handle filter reset
    const handleResetFilters = () => {
        setSelectedMainCategory('');
        setSelectedCategory('');
        setSelectedStockStatus('');
        setPriceRange([0, 2000]);
        setSearchQuery('');

        // Reset filteredData to original data
        setFilteredData(data);
        handleClose();
    };

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const getPaginationButtons = () => {
        if (totalPages <= 4) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const buttons = [];

        if (currentPage <= 2) {
            buttons.push(1, 2, 3, "...");
        } else if (currentPage >= totalPages - 1) {
            buttons.push("...", totalPages - 2, totalPages - 1, totalPages);
        } else {
            buttons.push(currentPage - 1, currentPage, currentPage + 1, "...");
        }

        return buttons;
    };

    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    // *******************************************************************************

    // Modal
    const [modalShow, setModalShow] = React.useState(false);
    const [id, setId] = useState(null);
    const [category, setCategory] = useState([]);
    const [mainCategory, setMainCategory] = useState([]);
    // offcanvas
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/api/allProduct`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // console.log("response", response.data.product);
            setData(response.data.product);
        } catch (error) {
            console.error('Data Fetching Error:', error);
        }
    }

    const fetchCategory = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/api/allCategory`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // console.log("Response>>>>>>>",response.data.category);
            setCategory(response.data.category);
        } catch (error) {
            console.error('Data Fetching Error:', error);
        }
    }

    const fetchMainCategory = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/api/allMainCategory`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // console.log("Response>>>>>>>",response.data.users);
            setMainCategory(response.data.users);
        } catch (error) {
            console.error('Data Fetching Error:', error);
        }
    }

    useEffect(() => {
        fetchData();
        fetchMainCategory();
        fetchCategory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = (id, product) => {
        setModalShow(true);
        setDeleteToProduct(product);
        setId(id);
    }

    const handleDeleteProduct = async () => {
        try {
            const response = await axios.delete(`${BaseUrl}/api/deleteProduct/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log("response", response);
            if (response.data.status === 200) {
                setData(preData => preData.filter(product => product._id !== id));
                setModalShow(false);
            }
        } catch (error) {
            console.error('Data Fetching Error:', error);
        }
    }

    return (
        <>
            <div id='mv_container_fluid'>
                <div className="mv_main_heading mb-4 d-flex align-items-center justify-content-between">
                    <div>
                        <p className='mb-1'>Product</p>
                        <div className='d-flex align-items-center'>
                            <p className='mv_dashboard_heading mb-0'>Dashboard /</p>
                            <p className='mv_category_heading mv_subcategory_heading mb-0'>Product</p>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-12">
                        <div className="mv_product_table_content">
                            <div className='mv_table_search'>
                                <div className="mv_product_search">
                                    <InputGroup>
                                        <Form.Control
                                            placeholder="Search..."
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                        />
                                    </InputGroup>
                                </div>
                                <div>
                                    <div className='mv_category_side mv_product_page_category d-flex align-items-center'>
                                        <div className="mv_column_button mv_column_padd">
                                            <Button variant="primary" onClick={handleShow}>
                                                <img src={require('../mv_img/filter.png')} alt="" />
                                                Filters
                                            </Button>
                                            <Offcanvas show={show} onHide={handleClose} placement='end' className="mv_offcanvas_filter">
                                                <Offcanvas.Header closeButton className='mv_offcanvas_filter_heading'>
                                                    <Offcanvas.Title className='mv_offcanvas_filter_title'>Filters</Offcanvas.Title>
                                                </Offcanvas.Header>
                                                <Offcanvas.Body className=''>
                                                    <div>
                                                        <div className="mv_input_content mt-3">
                                                            <label className='mv_offcanvas_filter_category'>Main Category</label>
                                                            <Form.Select className="mb-4" value={selectedMainCategory} onChange={handleMainCategoryChange}
                                                            >
                                                                <option value=''>Select</option>
                                                                {mainCategory.map((mainCat) => (
                                                                    <option key={mainCat._id} value={mainCat._id}>{mainCat.mainCategoryName}</option>
                                                                ))}
                                                            </Form.Select>
                                                        </div>
                                                        <div className="mv_input_content mt-3">
                                                            <label className='mv_offcanvas_filter_category'>Category</label>
                                                            <Form.Select className="mb-4" value={selectedCategory} onChange={handleCategoryChange}
                                                            >
                                                                <option value="">Select</option>
                                                                {category
                                                                    .filter(cat => !selectedMainCategory || cat.mainCategoryId === selectedMainCategory)
                                                                    .map((cat) => (
                                                                        <option key={cat._id} value={cat._id}>{cat.categoryName}</option>
                                                                    ))
                                                                }
                                                            </Form.Select>
                                                        </div>
                                                        <div className="mv_input_content">
                                                            <label className='mv_offcanvas_filter_category'>Stock Status</label>
                                                            <Form.Select className="mb-4"
                                                                value={selectedStockStatus}
                                                                onChange={handleStockStatusChange}>
                                                                <option value="">Select</option>
                                                                <option value="In Stock">In Stock</option>
                                                                <option value="Low Stock">Low Stock</option>
                                                                <option value="Out of Stock">Out of Stock</option>
                                                            </Form.Select>
                                                        </div>
                                                        <label className='mv_offcanvas_filter_category'>Price</label>
                                                        <div className="mv_price_range">
                                                            <ReactSlider
                                                                className="mv_horisilder"
                                                                thumbClassName="mv_thumb"
                                                                trackClassName="mv_track"
                                                                min={0}
                                                                max={2000}
                                                                value={priceRange}
                                                                onChange={handleSliderChange}
                                                                minDistance={250}
                                                                withTracks={true}
                                                                pearling
                                                                renderTrack={(props, state) => (
                                                                    <div {...props} className={`mv_track ${state.index === 1 ? 'mv_track_active' : ''}`}></div>
                                                                )}
                                                            />
                                                            <div className="mv_price_label mv_price_min" style={{ left: `${(priceRange[0] / 300) * 100}%` }}>
                                                                ${priceRange[0]}
                                                            </div>
                                                            <div className="mv_price_label mv_price_max" style={{ left: `${(priceRange[1] / 2000) * 100}%` }}>
                                                                ${priceRange[1]}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='mv_offcanvas_bottom_button'>
                                                        <div className='mv_logout_Model_button d-flex align-items-center justify-content-center'>
                                                            <div className="mv_logout_cancel">
                                                                <button type="button" onClick={handleResetFilters}>Cancel</button>
                                                            </div>
                                                            <div className="mv_logout_button">
                                                                <button type="submit" onClick={handleApplyFilters}>Apply</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Offcanvas.Body>
                                            </Offcanvas>
                                        </div>
                                        <div className="mv_add_category mv_add_subcategory mv_add_product">
                                            <Link to='/addProduct'><button>+ Add</button></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {paginatedData.length > 0 ? (
                                <>
                                    <div className="mv_product_table_padd" >
                                        <table className='mv_product_table justify-content-between'>
                                            <thead>
                                                <tr>
                                                    <th className=''>ID</th>
                                                    <th className=''>Main Category</th>
                                                    <th className=''>Category</th>
                                                    <th className=''>Product Name</th>
                                                    <th className=''>Price</th>
                                                    <th className=''>Rating</th>
                                                    {/* <th className=''>Stock Status</th> */}
                                                    <th className='d-flex align-items-center justify-content-end'>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {paginatedData.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                                        <td>{item.mainCategoriesData?.[0]?.mainCategoryName || 'N/A'}</td>
                                                        <td>{item.categoriesData?.[0]?.categoryName || 'N/A'}</td>
                                                        <td>
                                                            {item.productVariantData?.[0]?.images?.[0] && (
                                                                <img
                                                                    className='mv_product_img mv_product_radius_img'
                                                                    src={`${BaseUrl}/${item.productVariantData[0].images[0]}`}
                                                                    alt=""
                                                                />
                                                            )}
                                                            {item.productName}
                                                        </td>
                                                        <td>{item.productVariantData?.[0]?.originalPrice || 'N/A'}</td>
                                                        <td>
                                                            <div className='mv_rating_img'>
                                                                <FaStar className='mv_star_yellow' />
                                                                {item.rating || '0'}
                                                            </div>
                                                        </td>
                                                        {/* <td>
                                                            {
                                                                item.stockStatus === 'In Stock' ? (
                                                                    <p className='m-0 mv_delivered_padd'>{item.stockStatus}</p>
                                                                ) : item.stockStatus === 'Low Stock' ? (
                                                                    <p className='m-0 mv_pending_padd'>{item.stockStatus}</p>
                                                                ) : item.stockStatus === 'Out of Stock' ? (
                                                                    <p className='m-0 mv_cancelled_padd'>{item.stockStatus}</p>
                                                                ) : (
                                                                    <p className='m-0'>Unknown</p>
                                                                )
                                                            }
                                                        </td> */}
                                                        <td className='d-flex align-items-center justify-content-end'>
                                                            <div className="mv_pencil_icon">
                                                                <Link to={`/viewProduct?id=${item._id}&productVariantId=${item.productVariantData?.[0]?._id || ''}`}>
                                                                    <img src={require('../mv_img/eyes_icon.png')} alt="" />
                                                                </Link>
                                                            </div>
                                                            <div className="mv_pencil_icon">
                                                                <Link to={`/editProduct/${item._id}?productVariantId=${item.productVariantData?.[0]?._id || ''}`}>
                                                                    <img src={require('../mv_img/pencil_icon.png')} alt="" />
                                                                </Link>
                                                            </div>
                                                            <div className="mv_pencil_icon" onClick={() => handleDelete(item._id, item.productName)}>
                                                                <img src={require('../mv_img/trust_icon.png')} alt="" />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    {totalPages > 1 && (
                                        <div className="mv_other_category d-flex align-items-center justify-content-end pb-4 mt-4">

                                            <p className={`mb-0 ${currentPage === 1 ? 'disabled' : ''}`}
                                                onClick={() => handlePageChange(currentPage - 1)}>
                                                <MdOutlineKeyboardArrowLeft />
                                            </p>
                                            {getPaginationButtons().map((page, index) => (
                                                <p key={index}
                                                    className={`mb-0 ${currentPage === page ? "mv_active" : ""}`}
                                                    onClick={() => typeof page === "number" && handlePageChange(page)}
                                                    style={{ cursor: page === "..." ? "default" : "pointer" }}>
                                                    {page}
                                                </p>
                                            ))}

                                            <p className={`mb-0 ${currentPage === totalPages ? 'disabled' : ''}`}
                                                onClick={() => handlePageChange(currentPage + 1)} >
                                                <MdOutlineKeyboardArrowRight />
                                            </p>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <NoResultsFound />
                            )}

                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Product Model */}
            <Modal className='mv_logout_dialog' show={modalShow} onHide={() => setModalShow(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Body className='text-center mv_logout'>
                    <h5 className='mb-2'>Delete?</h5>
                    <p>Are you sure you want to delete {deleteToProduct} ?</p>
                    <div className='mv_logout_Model_button d-flex align-items-center justify-content-center'>
                        <div className="mv_logout_cancel">
                            <button onClick={() => setModalShow(false)}>Cancel</button>
                        </div>
                        <div className="mv_logout_button">
                            <button onClick={handleDeleteProduct}>Delete</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Product;