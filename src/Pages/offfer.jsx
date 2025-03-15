import React, { useEffect, useState } from 'react';
import '../CSS/product.css';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import axios from 'axios';
// import Addpopularbrands from './add_offer';
import NoResultsFound from '../Component/Noresult';
import { Link, useLocation  } from 'react-router-dom';

const Offer = () => {

    const BaseUrl = process.env.REACT_APP_BASEURL;
    const token = localStorage.getItem('token');
    const [deleteToggle, setDeleteToggle] = useState(null)
    const [toggle, seToggle] = useState(false)
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        offerType: '',
        offerName: '',
        startDate: '',
        endDate: '',
        status: ''
    });
    const [tempFilters, setTempFilters] = useState(filters);
    const [getofffer, setOffer] = useState(null);
    const location = useLocation();

    // Edit Offer
    // const [showAddForm, setShowAddForm] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [refreshData, setRefreshData] = useState(false);

    useEffect(() => {
        if (location.state?.formSubmitted) {
            const savedPage = location.state?.currentPage;
            if (savedPage) {
                setCurrentPage(savedPage);
            }
            // Reset the location state to avoid refreshing on further navigation
            window.history.replaceState({}, document.title);
            // Refresh the data
            setRefreshData(prev => !prev);
        }
    }, [location.state]);

    // Updated useEffect for filtering
    useEffect(() => {
        let result = data;

        if (filters.offerType) {
            result = result.filter(user => user.offerType === filters.offerType);
        }
        if (filters.offerName) {
            result = result.filter(user => user.offerName === filters.offerName);
        }
        if (filters.startDate) {
            result = result.filter(user => {
                const userStartDate = new Date(user.startDate);
                const filterStartDate = new Date(filters.startDate);
                return userStartDate >= filterStartDate;
            });
        }
        if (filters.endDate) {
            result = result.filter(user => {
                const userEndDate = new Date(user.endDate);
                const filterEndDate = new Date(filters.endDate);
                return userEndDate <= filterEndDate;
            });
        }
        if (filters.status) {
            result = result.filter(user => user.status.toString() === filters.status);
        }

        if (searchTerm) {
            result = result.filter(user =>
                user.offerType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.offerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.startDate?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.endDate?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.status?.toString().includes(searchTerm)
            );
        }

        setFilteredData(result);
        if (!location.state?.formSubmitted) {
            setCurrentPage(1);
        }
    }, [data, filters, searchTerm, location.state]);

    // Offcanvas Filter
    const handleFilterChange = (field, value) => {
        setTempFilters(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleApplyFilters = () => {
        setFilters(tempFilters);
        handleClose();
    };

    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
    };
    // ************************************** Show Data **************************************
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const fetchBrandData = async () => {
            try {
                const response = await axios.get(`${BaseUrl}/api/getAllOffers`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                //   console.log("data" , response?.data);
                setFilteredData(response?.data?.offers)
                setData(response?.data?.offers)
            } catch (error) {

            }
        }

        fetchBrandData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toggle, refreshData])
    // ***************************************************************************************

    // ************************************** Delete Item **************************************
    const handleManage = (id) => {
        setModalShow(true)
        setDeleteToggle(id)
    }

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`${BaseUrl}/api/deleteOffer/${deleteToggle}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            // console.log("delete response ", response);
            if (response.data.status === 200) {
                setModalShow(false)
                setData((prevData) => prevData.filter((item) => item._id !== deleteToggle));
            }
        } catch (error) {
            alert(error)
        }
    }

    // Status
    const handleStatusChange = async (id, currentStatus) => {
        try {
            const response = await axios.put(`${BaseUrl}/api/updateOffer/${id}`, {
                status: !currentStatus
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.status === 200) {
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
    // ***************************************************************************************

    // Handle View Offer
    // const handleViewOffer = (offer) => {
    //     localStorage.setItem('viewOfferData', JSON.stringify(offer));
    //     navigate(`/viewoffer/${offer._id}`);
    // }

    // ************************************** Pagination **************************************
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
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

    const paginatedData = filteredData?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    // *******************************************************************************

    // Modal
    const [modalShow, setModalShow] = React.useState(false);
    const [modalShow1, setModalShow1] = React.useState(false);

    const handlepersonaloffer = (id) => {
        try {
            axios.get(`${BaseUrl}/api/getOffer/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            }).then((res) => {
                // console.log('res',res.data.offer);
                setOffer(res.data.offer);
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

    // Edit data
    // const handleEditClick = (brand) => {
    //     setSelectedBrand(brand);
    //     setShowAddForm(true);
    // };

    // console.log("bran",selectedBrand)

    // Handle form submission callback
    // const handleFormSubmit = () => {
    //     setShowAddForm(false);
    //     setSelectedBrand(null);
    //     setRefreshData(prev => !prev);
    // };

    // if (showAddForm) {
    //     return (
    //         <Addpopularbrands
    //             editData={selectedBrand}
    //             onCancel={() => {
    //                 setShowAddForm(false);
    //                 setSelectedBrand(null);
    //             }}
    //             onSubmitSuccess={handleFormSubmit}
    //         />
    //     );
    // }

    // Format date function
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB");
    };

    return (
        <>
            <div id='mv_container_fluid'>
                <div className="mv_main_heading mb-4 d-flex align-items-center justify-content-between">
                    <div>
                        <p className='mb-1'>Offer</p>
                        <div className='d-flex align-items-center'>
                            <p className='mv_dashboard_heading mb-0'>Dashboard /</p>
                            <p className='mv_category_heading mv_subcategory_heading mb-0'>Offer</p>
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
                                            onChange={(e) => setSearchTerm(e.target.value)}
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
                                                        <label className='mv_offcanvas_filter_category'>Offer Type</label>
                                                        <InputGroup className="mb-3">
                                                            <Form.Control
                                                                placeholder="Enter Offer Type"
                                                                name='name'
                                                                value={tempFilters.offerType}
                                                                onChange={(e) => handleFilterChange('offerType', e.target.value)}
                                                            />
                                                        </InputGroup>
                                                    </div>
                                                    <div className="mv_input_content mb-3">
                                                        <label className='mv_offcanvas_filter_category'>Offer Name</label>
                                                        <InputGroup className="mb-3">
                                                            <Form.Control
                                                                placeholder="Enter Offer Name"
                                                                name='name1'
                                                                value={tempFilters.offerName}
                                                                onChange={(e) => handleFilterChange('offerName', e.target.value)}
                                                            />
                                                        </InputGroup>
                                                    </div>
                                                    <div>
                                                        <label className='mv_offcanvas_filter_category'>Start Date</label>
                                                        <div className="mv_input_content mv_add_product_date_scheduled">
                                                            <Form.Control
                                                                type="date"
                                                                value={formatDateForInput(tempFilters.startDate)}
                                                                onChange={(e) => handleFilterChange('startDate', e.target.value)}
                                                                className='mb-3'
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className='mv_offcanvas_filter_category'>End Date</label>
                                                        <div className="mv_input_content mv_add_product_date_scheduled">
                                                            <Form.Control
                                                                type="date"
                                                                value={formatDateForInput(tempFilters.endDate)}
                                                                onChange={(e) => handleFilterChange('endDate', e.target.value)}
                                                                className='mb-3'
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="mv_input_content">
                                                        <label className='mv_offcanvas_filter_category'>Status</label>
                                                        <Form.Select className="mb-3" aria-label="Default select example" value={tempFilters.status}
                                                            onChange={(e) => handleFilterChange('status', e.target.value)}>
                                                            <option>Select Status</option>
                                                            <option value="True">True</option>
                                                            <option value="False">False</option>
                                                        </Form.Select>
                                                    </div>
                                                </div>
                                                <div className='mv_offcanvas_bottom_button'>
                                                    <div className='mv_logout_Model_button mv_cancel_apply_btn d-flex align-items-center justify-content-center'>
                                                        <div className="mv_logout_cancel">
                                                            <button type="button" onClick={handleClose}>Cancel</button>
                                                        </div>
                                                        <div className="mv_logout_button">
                                                            <button type="button" onClick={handleApplyFilters}>Apply</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Offcanvas.Body>
                                        </Offcanvas>
                                    </div>
                                    <div className='mv_category_side mv_product_page_category d-flex align-items-center'>
                                        <div className="mv_add_category mv_add_subcategory mv_add_product">
                                            <Link to='/addoffer'><button>+ Add</button></Link>
                                            {/* <button onClick={() => setShowAddForm(true)}>+ Add</button> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {paginatedData.length > 0 ? (
                                <>
                                <div className="mv_product_table_padd">
                                    <table className='mv_product_table mv_help_table  justify-content-between'>
                                        <thead>
                                            <tr>
                                                <th className=''>ID</th>
                                                <th className=''>Image</th>
                                                <th className=''>Offer Type</th>
                                                <th className=''>Offer Name</th>
                                                <th className=''>Description</th>
                                                <th className=''>Button Text</th>
                                                <th className=''>Start Date</th>
                                                <th className=''>End Date</th>
                                                <th className=''>Status</th>
                                                <th className='d-flex align-items-center justify-content-end'>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {paginatedData?.map((item, index) => {
                                                const formatDate = (dateString) => {
                                                    if (!dateString) return "";
                                                    const date = new Date(dateString);
                                                    return date.toLocaleDateString("en-GB");
                                                };
                                                return (
                                                    <tr key={index}>
                                                        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                                        <td>
                                                            <img className='mv_product_img mv_product_radius_img' src={`${BaseUrl}/${item?.offerImage}`} alt="" />
                                                        </td>
                                                        <td>{item.offerType}</td>
                                                        <td>{item.offerName}</td>
                                                        <td className='text-trancute'>{item.description}</td>
                                                        <td>{item.buttonText}</td>
                                                        <td>{formatDate(item.startDate)}</td>
                                                        <td>{formatDate(item.endDate)}</td>
                                                        <td>
                                                            <Form.Check
                                                                type="switch"
                                                                checked={item.status}
                                                                onChange={() => handleStatusChange(item._id, item.status)}
                                                            />
                                                        </td>
                                                        <td className='d-flex align-items-center justify-content-end'>
                                                            <div className="mv_pencil_icon" onClick={() => { setModalShow1(true); handlepersonaloffer(item._id) }}>
                                                                <img src={require('../mv_img/eyes_icon.png')} alt="" />
                                                            </div>
                                                            <div className="mv_pencil_icon">
                                                                <Link to='/addoffer' state={{ offerData: item, currentPage: currentPage }}>
                                                                    <img src={require('../mv_img/pencil_icon.png')} alt="" />
                                                                </Link>  
                                                            </div>
                                                            <div className="mv_pencil_icon" onClick={() => handleManage(item?._id)}>
                                                                <img src={require('../mv_img/trust_icon.png')} alt="" />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
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
                                <NoResultsFound/>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Product Model */}
            <Modal className='mv_logout_dialog' show={modalShow} onHide={() => setModalShow(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Body className='text-center mv_logout'>
                    <h5 className='mb-2'>Delete</h5>
                    <p>Are you sure you want to delete <br /> this offer?</p>
                    <div className='mv_logout_Model_button d-flex align-items-center justify-content-center'>
                        <div className="mv_logout_cancel">
                            <button onClick={() => setModalShow(false)}>Cancel</button>
                        </div>
                        <div className="mv_logout_button">
                            <button onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            {/* View Offer Model */}
            <Modal className='mv_logout_dialog' show={modalShow1} onHide={() => setModalShow1(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Header className='mv_contect_details_header' closeButton>
                    <h6 className='fw-bold mb-0'>View Offer</h6>
                </Modal.Header>
                <Modal.Body>
                    {getofffer?.map((offer) => {
                        return (
                            <div className="row mv_main_view_product_con">
                                <div className="col-12 mv_main_product">
                                    <div className="mv_product_info">
                                        <div className="row">
                                            <div className="col-sm-4 col-5">
                                                {/* Use the actual offer image */}
                                                <img
                                                    className='mv_view_product_img mb-3'
                                                    src={`${process.env.REACT_APP_BASEURL}/${offer.offerImage}`}
                                                    alt={offer.offerName}
                                                />
                                            </div>
                                            <div className="col-12 align-content-center">
                                                <div className="row">
                                                    <div className="col-5">
                                                        <p className='mv_view_product_heading'>Main Category</p>
                                                    </div>
                                                    <div className="col-1">
                                                        <p className='mv_view_product_heading'>:</p>
                                                    </div>
                                                    <div className="col-4">
                                                        <p className='mv_view_product_sub_heading'>{offer.mainCategoriesData?.[0]?.mainCategoryName}</p>
                                                    </div>

                                                    <div className="col-5">
                                                        <p className='mv_view_product_heading'>Category</p>
                                                    </div>
                                                    <div className="col-1">
                                                        <p className='mv_view_product_heading'>:</p>
                                                    </div>
                                                    <div className="col-4">
                                                        <p className='mv_view_product_sub_heading'>{offer.categoriesData?.[0]?.categoryName}</p>
                                                    </div>

                                                    <div className="col-5">
                                                        <p className='mv_view_product_heading'>Sub Category</p>
                                                    </div>
                                                    <div className="col-1">
                                                        <p className='mv_view_product_heading'>:</p>
                                                    </div>
                                                    <div className="col-4">
                                                        <p className='mv_view_product_sub_heading'>{offer.subCategoriesData?.[0]?.subCategoryName}</p>
                                                    </div>

                                                    <div className="col-5">
                                                        <p className='mv_view_product_heading'>Offer ID</p>
                                                    </div>
                                                    <div className="col-1">
                                                        <p className='mv_view_product_heading'>:</p>
                                                    </div>
                                                    <div className="col-4">
                                                        <p className='mv_view_product_sub_heading'>#{offer._id?.substring(0, 8)}</p>
                                                    </div>
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
                            return (
                                <div className="row mv_main_view_product_con mv_main_offerdetails mb-0">
                                    <div className="col-12 mb-2">
                                        <div className="row">
                                            <div className="col-xxl-6 col-xl-3 col-lg-5 col-md-6 col-sm-6 col-6">
                                                <p className='mv_view_product_heading'>Offer Type :</p>
                                            </div>
                                            <div className="col-xxl-6 col-xl-9 col-lg-5 col-md-6 col-sm-6 col-6">
                                                <p className='mv_offer_details_sub_heading'>{offer?.offerType}</p>
                                            </div>
                                            <div className="col-xxl-6 col-xl-3 col-lg-5 col-md-6 col-sm-6 col-6">
                                                <p className='mv_view_product_heading'>Offer Name :</p>
                                            </div>
                                            <div className="col-xxl-6 col-xl-9 col-lg-5 col-md-6 col-sm-6 col-6">
                                                <p className='mv_offer_details_sub_heading'>{offer.offerName}</p>
                                            </div>
                                            <div className="col-xxl-6 col-xl-3 col-lg-5 col-md-6 col-sm-6 col-6">
                                                <p className='mv_view_product_heading'>Button Text :</p>
                                            </div>
                                            <div className="col-xxl-6 col-xl-9 col-lg-5 col-md-6 col-sm-6 col-6">
                                                <p className='mv_offer_details_sub_heading'>{offer.buttonText}</p>
                                            </div>
                                            <div className="col-xxl-6 col-xl-3 col-lg-5 col-md-6 col-sm-6 col-6">
                                                <p className='mv_view_product_heading'>Start Date :</p>
                                            </div>
                                            <div className="col-xxl-6 col-xl-9 col-lg-5 col-md-6 col-sm-6 col-6">
                                                <p className='mv_offer_details_sub_heading'>{formatDate(offer.startDate)}</p>
                                            </div>
                                            <div className="col-xxl-6 col-xl-3 col-lg-5 col-md-6 col-sm-6 col-6">
                                                <p className='mv_view_product_heading'>End Date :</p>
                                            </div>
                                            <div className="col-xxl-6 col-xl-9 col-lg-5 col-md-6 col-sm-6 col-6">
                                                <p className='mv_offer_details_sub_heading'>{formatDate(offer.endDate)}</p>
                                            </div>
                                            <div className="col-xxl-6 col-xl-3 col-lg-5 col-md-6 col-sm-6 col-6">
                                                <p className='mv_view_product_heading'>Description :</p>
                                            </div>
                                            <div className="col-xxl-6 col-xl-9 col-lg-5 col-md-6 col-sm-6 col-6">
                                                <p className='mv_offer_details_sub_heading'>{offer.description}</p>
                                            </div>
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

export default Offer