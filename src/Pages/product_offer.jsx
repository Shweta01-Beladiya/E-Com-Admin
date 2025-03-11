import React, { useEffect, useState } from 'react';
import '../CSS/product.css';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ReactSlider from 'react-slider';
import axios from 'axios';
import NoResultsFound from '../Component/Noresult';

const Productoffer = () => {

    const BaseUrl = process.env.REACT_APP_BASEURL;
    const token = localStorage.getItem('token');

    // Edit Product Offer
    const [data, setData] = useState([]);

    // ************************************** Pagination **************************************
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredData, setFilteredData] = useState(data);
    const [id, setId] = useState(null);
    const [subCategory, setSubCategory] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCriteria, setFilterCriteria] = useState({
        subCategory: '',
        startDate: '',
        endDate: '',
        status: '',
        minPrice: 0,
        maxPrice: 1200
    });
    const [getofffer,setOffer] = useState(null);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    // console.log("totalpage",totalPages)

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
    const [modalShow1, setModalShow1] = React.useState(false);

    const handlepersonaloffer = (id) => {
        try {
            axios.get(`${BaseUrl}/api/getProductOffer/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            }).then((res)=>{
                console.log('res',res.data.productOffer);
                setOffer(res.data.productOffer);
            });
        } catch (error) {
            console.error("Error:", error);
            alert("Error submitting form. Please try again.");
        }
    }

    // Offcanvas
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // Combined filter function
    const applyFilters = (products) => {
        let result = products;

        // Search filter
        if (searchTerm) {
            result = result.filter(item =>
                item.productData[0].productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.subCategoriesData[0].subCategoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.code.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Subcategory filter
        if (filterCriteria.subCategory) {
            result = result.filter(item =>
                item.subCategoriesData.some(subCat => subCat._id === filterCriteria.subCategory)
            );
        }

        if (filterCriteria.startDate) {
            result = result.filter(item =>
                new Date(item.startDate.split("-").reverse().join("-")).getTime() >= new Date(filterCriteria.startDate).getTime()
            );
        }

        if (filterCriteria.endDate) {
            result = result.filter(item =>
                new Date(item.endDate.split("-").reverse().join("-")).getTime() <= new Date(filterCriteria.endDate).getTime()
            );
        }


        // Status filter
        if (filterCriteria.status !== '') {
            result = result.filter(item =>
                item.status === JSON.parse(filterCriteria.status)
            );
        }

        // Price range filter
        result = result.filter(item =>
            item.price >= filterCriteria.minPrice &&
            item.price <= filterCriteria.maxPrice
        );
        // console.log("result>>>>>>>>>", result);

        setFilteredData(result);
        setCurrentPage(1);
    };

    // Handle search input
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        applyFilters(data);
    };

    // Handle filter changes
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilterCriteria(prev => {
            const updatedCriteria = { ...prev, [name]: value };
            applyFilters(data); // Apply filters immediately
            return updatedCriteria;
        });
    };

    // Handle price slider change
    const handleSliderChange = (newRange) => {
        setFilterCriteria(prev => ({
            ...prev,
            minPrice: newRange[0],
            maxPrice: newRange[1]
        }));
        applyFilters(data);
    };

    // Apply filters button handler
    const handleApplyFilters = () => {
        applyFilters(data);
        setShow(false);
    };

    // Reset filters
    const handleResetFilters = () => {
        setFilterCriteria({
            subCategory: '',
            startDate: '',
            endDate: '',
            status: '',
            minPrice: 0,
            maxPrice: 1200
        });
        setSearchTerm('');
        applyFilters(data);
        setShow(false);
    };
    useEffect(() => {
        applyFilters(data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterCriteria, searchTerm]);


    const fetchData = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/api/allProductOffer`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // console.log("reposne",response.data);
            setData(response.data.productOffer);
            setFilteredData(response.data.productOffer);
        } catch (error) {
            console.error('Data Fetching Error:', error);
        }
    }

    const fetchAllSubCategory = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/api/allSubCategory`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // console.log("response", response.data.subCategory);
            setSubCategory(response.data.subCategory)
        } catch (error) {
            console.error('Data Fetching Error:', error);
        }
    }
    useEffect(() => {
        fetchData();
        fetchAllSubCategory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = async (id) => {
        setModalShow(true);
        setId(id);
    }

    const handleConfirmDelete = async () => {
        try {
            const response = await axios.delete(`${BaseUrl}/api/deleteProductOffer/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // console.log("repsonse",response.data);
            if (response.data.status === 200) {
                setModalShow(false);
                setFilteredData((prevData) => prevData.filter(item => item._id !== id));
            }
        } catch (error) {
            console.error('Data Fetching Error:', error);
        }
    }

    const handleStatusChange = async (id, currentStatus) => {
        try {
            const response = await axios.put(`${BaseUrl}/api/updateProductOffer/${id}`, {
                status: !currentStatus
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // console.log("response", response.data);
            if (response.data.status === 200) {
                setFilteredData(prevData =>
                    prevData.map(item =>
                        item._id === id ? { ...item, status: !item.status } : item
                    )
                );
                
                setData(prevData =>
                    prevData.map(item =>
                        item._id === id ? { ...item, status: !item.status } : item
                    )
                );
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
                        <p className='mb-1'>Product Offer</p>
                        <div className='d-flex align-items-center'>
                            <p className='mv_dashboard_heading mb-0'>Dashboard /</p>
                            <p className='mv_category_heading mv_subcategory_heading mb-0'>Product Offer</p>
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
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                        />
                                    </InputGroup>
                                </div>
                                <div className='d-flex'>
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
                                                    <div className="mv_input_content">
                                                        <label className='mv_offcanvas_filter_category'>Sub Category</label>
                                                        <Form.Select
                                                            name="subCategory"
                                                            value={filterCriteria.subCategory}
                                                            onChange={handleFilterChange}
                                                            className="mb-3"
                                                            aria-label="Sub Category select"
                                                        >
                                                            <option value="">Select Sub Category</option>
                                                            {subCategory.map((item) => (
                                                                <option value={item._id} key={item._id}>{item.subCategoryName}</option>
                                                            ))}
                                                        </Form.Select>
                                                    </div>
                                                    <div>
                                                        <label className='mv_offcanvas_filter_category'>Start Date</label>
                                                        <div className="mv_input_content mv_add_product_date_scheduled">
                                                            <Form.Control
                                                                name="startDate"
                                                                value={filterCriteria.startDate}
                                                                onChange={handleFilterChange}
                                                                className='mb-3'
                                                                type="date"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className='mv_offcanvas_filter_category'>End Date</label>
                                                        <div className="mv_input_content mv_add_product_date_scheduled">
                                                            <Form.Control
                                                                name="endDate"
                                                                value={filterCriteria.endDate}
                                                                onChange={handleFilterChange}
                                                                className='mb-3'
                                                                type="date"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="mv_input_content">
                                                        <label className='mv_offcanvas_filter_category'>Status</label>
                                                        <Form.Select
                                                            name="status"
                                                            value={filterCriteria.status}
                                                            onChange={handleFilterChange}
                                                            className="mb-3"
                                                            aria-label="Status select"
                                                        >
                                                            <option value="">Select Status</option>
                                                            <option value="true">Active</option>
                                                            <option value="false">Inactive</option>
                                                        </Form.Select>
                                                    </div>
                                                    <label className='mv_offcanvas_filter_category'>Price</label>
                                                    <div className="mv_price_range">
                                                        <ReactSlider
                                                            className="mv_horisilder"
                                                            thumbClassName="mv_thumb"
                                                            trackClassName="mv_track"
                                                            min={0}
                                                            max={1200}
                                                            value={[filterCriteria.minPrice, filterCriteria.maxPrice]}
                                                            onChange={handleSliderChange}
                                                            minDistance={150}
                                                            withTracks={true}
                                                            pearling
                                                            renderTrack={(props, state) => (
                                                                <div {...props} className={`mv_track ${state.index === 1 ? 'mv_track_active' : ''}`}></div>
                                                            )}
                                                        />
                                                        <div className="mv_price_label mv_price_min" style={{ left: `${(filterCriteria.minPrice / 1200) * 100}%` }}>
                                                            ${filterCriteria.minPrice}
                                                        </div>
                                                        <div className="mv_price_label mv_price_max" style={{ left: `${(filterCriteria.maxPrice / 1200) * 100}%` }}>
                                                            ${filterCriteria.maxPrice}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='mv_offcanvas_bottom_button'>
                                                    <div className='mv_logout_Model_button mv_cancel_apply_btn d-flex align-items-center justify-content-center'>
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
                                    <div className='mv_category_side mv_product_page_category d-flex align-items-center'>
                                        <div className="mv_add_category mv_add_subcategory mv_add_product">
                                            <Link to='/addproductoffer'><button>+ Add</button></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {paginatedData.length > 0 ? (
                                <>
                                    <div className="mv_product_table_padd">
                                        <table className='mv_product_table justify-content-between'>
                                            <thead>
                                                <tr>
                                                    <th className=''>ID</th>
                                                    <th className=''>Sub Category</th>
                                                    <th className=''>Product Name</th>
                                                    <th className=''>Code</th>
                                                    <th className=''>Discount</th>
                                                    <th className=''>Price</th>
                                                    <th className=''>Start Date</th>
                                                    <th className=''>End Date</th>
                                                    <th className=''>Status</th>
                                                    <th className='d-flex align-items-center justify-content-end'>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {paginatedData.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                                        <td>{item.subCategoriesData[0].subCategoryName}</td>
                                                        <td>{item.productData[0].productName}</td>
                                                        <td>{item.code}</td>
                                                        <td>{item.discountPrice}%</td>
                                                        <td>${item.price}</td>
                                                        <td>{item.startDate}</td>
                                                        <td>{item.endDate}</td>
                                                        <td>
                                                            <Form.Check
                                                                type="switch"
                                                                checked={item.status}
                                                                className=''
                                                                onChange={() => handleStatusChange(item._id, item.status)}
                                                            />
                                                        </td>
                                                        <td className='d-flex align-items-center justify-content-end'>
                                                            <div className="mv_pencil_icon" onClick={() => {setModalShow1(true); handlepersonaloffer(item._id)}}>
                                                                    <img src={require('../mv_img/eyes_icon.png')} alt="" />
                                                            </div>
                                                            <div className="mv_pencil_icon" >
                                                                <Link to='/addproductoffer' state={{ id: item._id }}>
                                                                    <img src={require('../mv_img/pencil_icon.png')} alt="" />
                                                                </Link>
                                                            </div>
                                                            <div className="mv_pencil_icon" onClick={() => handleDelete(item._id)}>
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
                                            {/* Previous Button */}
                                            <p className={`mb-0 ${currentPage === 1 ? 'disabled' : ''}`} 
                                                onClick={() => handlePageChange(currentPage - 1)}>
                                                <MdOutlineKeyboardArrowLeft />
                                            </p>
                                            {/* Pagination Buttons */}
                                            {getPaginationButtons().map((page, index) => (
                                                <p key={index}
                                                className={`mb-0 ${currentPage === page ? "mv_active" : ""}`}
                                                onClick={() => typeof page === "number" && handlePageChange(page)}
                                                style={{ cursor: page === "..." ? "default" : "pointer" }}>
                                                {page}
                                                </p>
                                            ))}
                                            {/* Next Button */}
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
            <Modal className='mv_logout_dialog' show={modalShow} onHide={() => setModalShow(false)} size="lg" centered >
                <Modal.Body className='text-center mv_logout'>
                    <h5 className='mb-2'>Delete</h5>
                    <p>Are you sure you want to delete <br /> coupon?</p>
                    <div className='mv_logout_Model_button d-flex align-items-center justify-content-center'>
                        <div className="mv_logout_cancel">
                            <button onClick={() => setModalShow(false)}>Cancel</button>
                        </div>
                        <div className="mv_logout_button">
                            <button onClick={handleConfirmDelete}>Delete</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            {/* View Offer Model */}
            <Modal className='mv_logout_dialog' show={modalShow1} onHide={() => setModalShow1(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Header className='mv_contect_details_header' closeButton>
                    <h6 className='fw-bold mb-0'>View Product Offer</h6>
                </Modal.Header>
                <Modal.Body>
                    {getofffer?.map((offer) => {
                        return(
                            <div className="row mv_main_view_product_con">
                        <div className="col-12 mv_main_product">
                            <div className="mv_product_info">
                                <div className="row">
                                    <div className="col-sm-4 col-5">
                                        <img className='mv_view_product_img' alt='' src={`/${offer.productVariantData?.[0]?.images?.[0]}`} />
                                    </div>
                                    <div className="col-12 align-content-center">
                                        <div className="row">
                                            <div className="col-5"><p className='mv_view_product_heading'>Main Category</p></div>
                                            <div className="col-1"><p className='mv_view_product_heading'>:</p></div>
                                            <div className="col-4"><p className='mv_view_product_sub_heading'>{offer.mainCategoriesData?.[0]?.mainCategoryName}</p></div>

                                            <div className="col-5"><p className='mv_view_product_heading'>Category:</p></div>
                                            <div className="col-1"><p className='mv_view_product_heading'>:</p></div>
                                            <div className="col-4"><p className='mv_view_product_sub_heading'>{offer.categoriesData?.[0]?.categoryName}</p></div>

                                            <div className="col-5"><p className='mv_view_product_heading'>Sub Category:</p></div>
                                            <div className="col-1"><p className='mv_view_product_heading'>:</p></div>
                                            <div className="col-4"><p className='mv_view_product_sub_heading'>{offer.subCategoriesData?.[0]?.subCategoryName}</p></div>

                                            <div className="col-5"><p className='mv_view_product_heading mb-0'>Product ID:</p></div>
                                            <div className="col-1"><p className='mv_view_product_heading mb-0'>:</p></div>
                                            <div className="col-4"><p className='mv_view_product_sub_heading mb-0'>#654782014</p></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                        )
                    })}
                    {/* Offer Details */}
                    <div className='mv_main_offerdetails_con'>
                        <div className="">
                            <p className='mv_offer_details_heading mb-0'>Offer Details</p>
                        </div>
                        {getofffer?.map((offer) => {
                            return(
                                <div className="row mv_main_view_product_con mv_main_offerdetails">
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-6"><p className='mv_view_product_heading'>Offer Name :</p></div>
                                            <div className="col-6"><p className='mv_offer_details_sub_heading'>{offer.offerName}</p></div>

                                            <div className="col-6"><p className='mv_view_product_heading'>Offer Code :</p></div>
                                            <div className="col-6"><p className='mv_offer_details_sub_heading'>{offer.code}</p></div>

                                            <div className="col-6"><p className='mv_view_product_heading'>Offer Discount :</p></div>
                                            <div className="col-6"><p className='mv_offer_details_sub_heading'>{offer.discountPrice}</p></div>

                                            <div className="col-6"><p className='mv_view_product_heading'>Offer Price :</p></div>
                                            <div className="col-6"><p className='mv_offer_details_sub_heading'>{offer.price}</p></div>

                                            <div className="col-6"><p className='mv_view_product_heading'>Start Date :</p></div>
                                            <div className="col-6"><p className='mv_offer_details_sub_heading'>{offer.startDate}</p></div>

                                            <div className="col-6"><p className='mv_view_product_heading'>End Date :</p></div>
                                            <div className="col-6"><p className='mv_offer_details_sub_heading'>{offer.endDate}</p></div>

                                            <div className="col-6"><p className='mv_view_product_heading'>Minimum Purchase :</p></div>
                                            <div className="col-6"><p className='mv_offer_details_sub_heading'>{offer.minimumPurchase}</p></div>

                                            <div className="col-6"><p className='mv_view_product_heading'>Maximum Purchase :</p></div>
                                            <div className="col-6"><p className='mv_offer_details_sub_heading'>{offer.maximumPurchase}</p></div>

                                            <div className="col-6"><p className='mv_view_product_heading'>Description :</p></div>
                                            <div className="col-6"><p className='mv_offer_details_sub_heading'>{offer.description}</p></div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Productoffer