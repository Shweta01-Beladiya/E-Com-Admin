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
    // Filter states
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMainCategory, setSelectedMainCategory] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedStockStatus, setSelectedStockStatus] = useState('');
    const [priceRange, setPriceRange] = useState([0, 300]);
    const [deleteToProduct, setDeleteToProduct] = useState('');

    // Apply filters
    const applyFilters = () => {
        let filtered = data;

        // Search filter
        if (searchQuery) {
            filtered = filtered.filter(item =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.price.includes(searchQuery)
            );
        }

        // Main Category filter
        if (selectedMainCategory) {
            filtered = filtered.filter(item =>
                item.category.toLowerCase() === selectedMainCategory.toLowerCase()
            );
        }

        // Category filter
        if (selectedCategory) {
            filtered = filtered.filter(item =>
                item.subcategory.toLowerCase() === selectedCategory.toLowerCase()
            );
        }

        // Stock Status filter
        if (selectedStockStatus) {
            filtered = filtered.filter(item =>
                item.stock === selectedStockStatus
            );
        }

        // Price Range filter
        filtered = filtered.filter(item => {
            const price = parseFloat(item.price.replace('$', ''));
            return price >= priceRange[0] && price <= priceRange[1];
        });

        setFilteredData(filtered);
        setCurrentPage(1);
    };

    // Handle search input
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    // Handle filter changes
    const handleMainCategoryChange = (e) => {
        setSelectedMainCategory(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleStockStatusChange = (e) => {
        setSelectedStockStatus(e.target.value);
    };

    const handleSliderChange = (newRange) => {
        setPriceRange(newRange);
    };

    useEffect(() => {
        applyFilters();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery]);

    const handleApplyFilters = () => {
        applyFilters();
        handleClose();
    };

    // Handle filter reset
    const handleResetFilters = () => {
        setSelectedMainCategory('');
        setSelectedCategory('');
        setSelectedStockStatus('');
        setPriceRange([0, 300]);
        setSearchQuery('');
        setFilteredData(data);
        setCurrentPage(1);
    };

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    // console.log("totalpage", totalPages)

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const getPaginationButtons = () => {
        const buttons = [];
        const maxButtonsToShow = 5;

        let startPage = Math.max(1, currentPage - Math.floor(maxButtonsToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);

        // Adjust startPage if we're near the end
        if (endPage - startPage + 1 < maxButtonsToShow) {
            startPage = Math.max(1, endPage - maxButtonsToShow + 1);
        }

        // Add first page if not included
        if (startPage > 1) {
            buttons.push(1);
            if (startPage > 2) buttons.push('...');
        }

        // Add main page numbers
        for (let i = startPage; i <= endPage; i++) {
            buttons.push(i);
        }

        // Add last page if not included
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) buttons.push('...');
            buttons.push(totalPages);
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
    const [id,setId] = useState(null);
    // offcanvas
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // offcanvas price
    // const [priceRange, setPriceRange] = useState([0, 300]);
    // const handleSliderChange = (newRange) => {
    //     setPriceRange(newRange);
    // };

    const fetchData = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/api/allProduct`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // console.log("response", response.data.product);
            setData(response.data.product)

        } catch (error) {
            console.error('Data Fetching Error:', error);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
        setFilteredData(data); // Ensure filteredData updates when data changes
    }, [data]);

    const handleDelete = (id, product) => {
        setModalShow(true);
        setDeleteToProduct(product);
        setId(id);
    }

    const handleDeleteProduct = async() => {
        try {
            const response = await axios.delete(`${BaseUrl}/api/deleteProduct/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log("response",response);
            if(response.data.status === 200) {
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
                                            onChange={handleSearch}
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
                                                            <Form.Select className="mb-4"
                                                                value={selectedMainCategory}
                                                                onChange={handleMainCategoryChange}>
                                                                <option>Select</option>
                                                                <option value="Women">Women</option>
                                                                <option value="Men">Men</option>
                                                                <option value="Baby & Kids">Baby & Kids</option>
                                                                <option value="Beauty & Health">Beauty & Health</option>
                                                            </Form.Select>
                                                        </div>
                                                        <div className="mv_input_content mt-3">
                                                            <label className='mv_offcanvas_filter_category'>Category</label>
                                                            <Form.Select className="mb-4"
                                                                value={selectedCategory}
                                                                onChange={handleCategoryChange}>
                                                                <option>Select</option>
                                                                <option value="Indian Wear">Indian Wear</option>
                                                                <option value="Western Wear">Western Wear</option>
                                                                <option value="Baby Care">Baby Care</option>
                                                                <option value="Treditional Wear">Treditional Wear</option>
                                                                <option value="Footwere">Footwere</option>
                                                                <option value="Skin Care">Skin Care</option>
                                                            </Form.Select>
                                                        </div>
                                                        <div className="mv_input_content">
                                                            <label className='mv_offcanvas_filter_category'>Stock Status</label>
                                                            <Form.Select className="mb-4"
                                                                value={selectedStockStatus}
                                                                onChange={handleStockStatusChange}>
                                                                <option>Select</option>
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
                                                                max={300}
                                                                value={priceRange}
                                                                onChange={handleSliderChange}
                                                                minDistance={50}
                                                                withTracks={true}
                                                                pearling
                                                                renderTrack={(props, state) => (
                                                                    <div {...props} className={`mv_track ${state.index === 1 ? 'mv_track_active' : ''}`}></div>
                                                                )}
                                                            />
                                                            <div className="mv_price_label mv_price_min" style={{ left: `${(priceRange[0] / 300) * 100}%` }}>
                                                                ${priceRange[0]}
                                                            </div>
                                                            <div className="mv_price_label mv_price_max" style={{ left: `${(priceRange[1] / 300) * 100}%` }}>
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
                                                    <th className=''>Stock Status</th>
                                                    <th className='d-flex align-items-center justify-content-end'>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {paginatedData.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.mainCategoriesData[0].mainCategoryName}</td>
                                                        <td>{item.categoriesData[0].categoryName}</td>
                                                        <td>
                                                            <img className='mv_product_img mv_product_radius_img' src={`${BaseUrl}/${item.productVariantData[0].images[0]}`} alt="" />
                                                            {item.productName}
                                                        </td>
                                                        <td>{item.productVariantData[0].originalPrice}</td>
                                                        <td>
                                                            <div className='mv_rating_img'>
                                                                <FaStar className='mv_star_yellow' />
                                                                {item.rating}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {
                                                                item.stockStatus === 'In Stock' ? (
                                                                    <p className='m-0 mv_delivered_padd'>{item.stockStatus}</p>
                                                                ) : item.stock === 'Low Stock' ? (
                                                                    <p className='m-0 mv_pending_padd'>{item.stockStatus}</p>
                                                                ) : item.stock === 'Out of Stock' ? (
                                                                    <p className='m-0 mv_cancelled_padd'>{item.stockStatus}</p>
                                                                ) : null
                                                            }
                                                        </td>
                                                        <td className='d-flex align-items-center justify-content-end'>
                                                            <div className="mv_pencil_icon">                                                           
                                                                <Link  to={`/viewProduct?id=${item._id}&productVariantId=${item.productVariantData[0]._id}`}>
                                                                    <img src={require('../mv_img/eyes_icon.png')} alt="" />
                                                                </Link>
                                                            </div>
                                                            <div className="mv_pencil_icon">
                                                                <Link to={`/editProduct/${item._id}?productVariantId=${item.productVariantData[0]._id}`}>
                                                                    <img src={require('../mv_img/pencil_icon.png')} alt="" />
                                                                </Link>
                                                            </div>
                                                            <div className="mv_pencil_icon" onClick={()=>handleDelete(item._id, item.productName)}>
                                                                <img src={require('../mv_img/trust_icon.png')} alt="" />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    {totalPages > 1 && (
                                        <div className='mv_other_category d-flex align-items-center justify-content-end pb-4 mt-4'>
                                            <p className='mb-0' onClick={() => handlePageChange(currentPage - 1)}>
                                                <MdOutlineKeyboardArrowLeft />
                                            </p>
                                            {getPaginationButtons().map((page, index) => (
                                                <p key={index} className={`mb-0 ${currentPage === page ? 'mv_active' : ''}`}
                                                    onClick={() => handlePageChange(page)}>
                                                    {page}
                                                </p>
                                            ))}
                                            <p className='mb-0' onClick={() => handlePageChange(currentPage + 1)}>
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