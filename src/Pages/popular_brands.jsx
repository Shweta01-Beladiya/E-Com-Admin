import React, { useEffect, useState } from 'react';
import '../CSS/product.css';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import axios from 'axios';
import Addpopularbrands from './add_popularbrands';
import NoResultsFound from "../Component/Noresult";
import { Link, useLocation } from 'react-router-dom';

const Popularbrands = () => {

    const BaseUrl = process.env.REACT_APP_BASEURL;
    const token = localStorage.getItem('token');
    const [deleteToggle, setDeleteToggle] = useState(null)
    const [toggle, seToggle] = useState(false)
    const [data, setData] = useState([]);

    const location = useLocation();
    // Edit Offer
    // const [showAddForm, setShowAddForm] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [refreshData, setRefreshData] = useState(false);
    const [filteredData, setFilteredData] = useState()

    // Search and filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCriteria, setFilterCriteria] = useState({
        brandName: ''
    });
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

    // Search Data
    useEffect(() => {
        const fetchBrandData = async () => {
            try {
                const response = await axios.get(`${BaseUrl}/api/getAllBrands`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                setData(response?.data?.popularBrand)
            } catch (error) {
                console.error("Error fetching brand data:", error);
            }
        }

        fetchBrandData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toggle, refreshData])

    // Apply search and filters whenever data, searchTerm, or filterCriteria changes
    useEffect(() => {
        let result = [...data];

        // Apply search term
        if (searchTerm.trim() !== '') {
            const searchLower = searchTerm.toLowerCase();
            result = result.filter(item =>
                item.brandName.toLowerCase().includes(searchLower) ||
                item.title.toLowerCase().includes(searchLower) ||
                item.offer.toString().includes(searchLower)
            );
        }

        // Apply filter
        if (filterCriteria.brandName) {
            result = result.filter(item => item.brandName === filterCriteria.brandName);
        }

        setFilteredData(result);
        setCurrentPage(1); // Reset to first page when search/filter changes
    }, [data, searchTerm, filterCriteria]);

    // ***************************************************************************************

    // ************************************** Delete Item **************************************
    const handleManage = (id) => {
        setModalShow(true)
        setDeleteToggle(id)
    }

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`${BaseUrl}/api/deleteBrand/${deleteToggle}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            if (response.data.status === 200) {
                const updatedData = filteredData.filter(item => item._id !== deleteToggle);
                setFilteredData(updatedData);
                setData(updatedData);
                if (updatedData.length === 0) {
                    setCurrentPage(1);
                }

                setModalShow(false)
                seToggle(prev => !prev);
            }

        } catch (error) {
            alert(error)
        }
    }
    // ***************************************************************************************

    // ************************************** Pagination **************************************
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

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

    // Offcanvas
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Search handlers
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filter handlers
    const handleFilterChange = (e) => {
        setFilterCriteria({
            ...filterCriteria,
            [e.target.name]: e.target.value
        });
    };

    const applyFilters = () => {
        handleClose();
    };

    const resetFilters = () => {
        setFilterCriteria({
            brandName: ''
        });
        handleClose();
    };

    // Edit data
    const handleEditClick = (brand) => {
        setSelectedBrand(brand);
    };

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


    return (
        <>
            <div id='mv_container_fluid'>
                <div className="mv_main_heading mb-4 d-flex align-items-center justify-content-between">
                    <div>
                        <p className='mb-1'>Popular Brands</p>
                        <div className='d-flex align-items-center'>
                            <p className='mv_dashboard_heading mb-0'>Dashboard /</p>
                            <p className='mv_category_heading mv_subcategory_heading mb-0'>Popular Brands</p>
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
                                            <Offcanvas.Body>
                                                <div>
                                                    <div className="mv_input_content">
                                                        <label className='mv_offcanvas_filter_category'>Brand Name</label>
                                                        <Form.Select
                                                            className="mb-3"
                                                            aria-label="Default select example"
                                                            name="brandName"
                                                            value={filterCriteria.brandName}
                                                            onChange={handleFilterChange}
                                                        >
                                                            <option value="">Select</option>
                                                            {data.map((item) => (
                                                                <option value={item.brandName} key={item._id}>{item.brandName}</option>
                                                            ))}
                                                        </Form.Select>
                                                    </div>
                                                </div>
                                                <div className='mv_offcanvas_bottom_button'>
                                                    <div className='mv_logout_Model_button mv_cancel_apply_btn d-flex align-items-center justify-content-center'>
                                                        <div className="mv_logout_cancel">
                                                            <button type="button" onClick={resetFilters}>Cancel</button>
                                                        </div>
                                                        <div className="mv_logout_button">
                                                            <button type="button" onClick={applyFilters}>Apply</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Offcanvas.Body>
                                        </Offcanvas>
                                    </div>
                                    <div className='mv_category_side mv_product_page_category d-flex align-items-center'>
                                        <div className="mv_add_category mv_add_subcategory mv_add_product">
                                            <Link to='/addpopularbrands'><button>+ Add</button></Link>
                                            {/* <button onClick={() => setShowAddForm(true)}>+ Add</button> */}
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
                                                    <th className=''>Brand</th>
                                                    <th className=''>Image</th>
                                                    <th className=''>Offer</th>
                                                    <th className=''>Title</th>
                                                    <th className='d-flex align-items-center justify-content-end'>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {paginatedData.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                                            <td>
                                                                <img className='mv_product_img mv_product_radius_img' src={`${BaseUrl}/${item?.brandLogo}`} alt="" />
                                                                {item?.brandName}
                                                            </td>
                                                            <td>
                                                                <img className='mv_product_img mv_product_radius_img' src={`${BaseUrl}/${item?.brandImage}`} alt="" />
                                                            </td>
                                                            <td>{item?.offer}</td>
                                                            <td>{item?.title}</td>
                                                            <td className='d-flex align-items-center justify-content-end'>
                                                                <div className="mv_pencil_icon" onClick={() => handleEditClick(item)}>
                                                                    <img src={require('../mv_img/pencil_icon.png')} alt="" />
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
                            ) : (<NoResultsFound />)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Product Model */}
            <Modal className='mv_logout_dialog' show={modalShow} onHide={() => setModalShow(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Body className='text-center mv_logout'>
                    <h5 className='mb-2'>Delete</h5>
                    <p>Are you sure you want to delete Brand?</p>
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
        </>
    );
};

export default Popularbrands;