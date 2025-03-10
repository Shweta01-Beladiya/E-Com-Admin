import React, { useEffect, useState } from 'react';
import '../CSS/product.css';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import axios from 'axios';
import NoResultsFound from '../Component/Noresult';

const Coupon = () => {

    const BaseUrl = process.env.REACT_APP_BASEURL;
    const token = localStorage.getItem('token');

    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        startDate: '',
        endDate: '',
        status: '',
    });
    const [id, setId] = useState(null);

    // ************************************** Pagination **************************************
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredData, setFilteredData] = useState(data);

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

    // Offcanvas
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const response = await axios.get(`${BaseUrl}/api/allSpecialOffer`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // console.log("REsposne",response.data.specialOffers);
                setData(response.data.specialOffers);
                setFilteredData(response.data.specialOffers);
            } catch (error) {
                console.error('Data Fetching Error:', error);
            }
        }
        fetchAllData();
          // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;

        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value
        }));
    };

    useEffect(() => {
        let filtered = data;

        if (searchTerm) {
            filtered = filtered.filter((item) =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.coupenType.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filters.startDate) {
            filtered = filtered.filter((item) => {
                const itemDate = new Date(item.startDate);
                return itemDate >= new Date(filters.startDate);
            });
        }
        
        if (filters.endDate) {
            filtered = filtered.filter((item) => {
                const itemDate = new Date(item.endDate);
                return itemDate <= new Date(filters.endDate);
            });
        }        

        if (filters.status) {
            const statusBool = filters.status === "true";
            filtered = filtered.filter((item) => item.status === statusBool);
        }

        setFilteredData(filtered);
        setCurrentPage(1);
    }, [searchTerm, filters, data]);

    const handleReset = () => {
        setSearchTerm("");
        setFilters({ startDate: '', endDate: '', status: '' });
        setFilteredData(data);
        setShow(false);
    };

    const handleDelete = (id) => {
        setModalShow(true);
        setId(id);
    }

    const handleCoupen = async () => {
        try {
            const response = await axios.delete(`${BaseUrl}/api/deleteSpecialOffer/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // console.log("response",response.data);
            if (response.data.status === 200) {
                setModalShow(false);
                setData(prevData => prevData.filter(item => item._id !== id));
            }
        } catch (error) {
            console.error('Data Fetching Error:', error);
        }
    }

    const handleStatusChange = async (id, currentStatus) => {
        try {
            const response = await axios.put(`${BaseUrl}/api/updateSpecialOffer/${id}`,{
                status: !currentStatus
            } , {
                headers: {Authorization : `Bearer ${token}`}
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

    return (
        <>
            <div id='mv_container_fluid'>
                <div className="mv_main_heading mb-4 d-flex align-items-center justify-content-between">
                    <div>
                        <p className='mb-1'>Coupon</p>
                        <div className='d-flex align-items-center'>
                            <p className='mv_dashboard_heading mb-0'>Dashboard /</p>
                            <p className='mv_category_heading mv_subcategory_heading mb-0'>Coupon</p>
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
                                        <Offcanvas show={show} onHide={handleReset} placement='end' className="mv_offcanvas_filter">
                                            <Offcanvas.Header closeButton className='mv_offcanvas_filter_heading'>
                                                <Offcanvas.Title className='mv_offcanvas_filter_title'>Filters</Offcanvas.Title>
                                            </Offcanvas.Header>
                                            <Offcanvas.Body className=''>
                                                <div>
                                                    <div>
                                                        <label className='mv_offcanvas_filter_category'>Start Date</label>
                                                        <div className="mv_input_content mv_add_product_date_scheduled">
                                                            {/* <label className='mv_label_input mv_add_product_date mv_filter_start_date'>{date}</label> */}
                                                            <Form.Control className='mb-3' type="date" name="startDate" onChange={handleFilterChange} />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className='mv_offcanvas_filter_category'>End Date</label>
                                                        <div className="mv_input_content mv_add_product_date_scheduled">
                                                            {/* <label className='mv_label_input mv_add_product_date mv_filter_start_date'>{date1}</label> */}
                                                            <Form.Control className='mb-3' type="date" name="endDate" onChange={handleFilterChange} />
                                                        </div>
                                                    </div>
                                                    <div className="mv_input_content">
                                                        <label className='mv_offcanvas_filter_category'>Status</label>
                                                        <Form.Select className="mb-3" name="status" onChange={handleFilterChange}>
                                                            <option>Select Status</option>
                                                            <option value="true">Active</option>
                                                            <option value="false">InActive</option>
                                                        </Form.Select>
                                                    </div>
                                                </div>
                                                <div className='mv_offcanvas_bottom_button'>
                                                    <div className='mv_logout_Model_button mv_cancel_apply_btn d-flex align-items-center justify-content-center'>
                                                        <div className="mv_logout_cancel">
                                                            <button type="button" onClick={handleReset}>Cancel</button>
                                                        </div>
                                                        <div className="mv_logout_button">
                                                            <button type="submit" onClick={handleReset}>Apply</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Offcanvas.Body>
                                        </Offcanvas>
                                    </div>
                                    <div className='mv_category_side mv_product_page_category d-flex align-items-center'>
                                        <div className="mv_add_category mv_add_subcategory mv_add_product">
                                            <Link to='/addcoupon'><button>+ Add</button></Link>
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
                                            <th className=''>Code</th>
                                            <th className=''>Coupon Name</th>
                                            <th className=''>Description</th>
                                            <th className=''>Coupon Type</th>
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
                                                <td>{item.code}</td>
                                                <td>{item.title}</td>
                                                <td>{item.description}</td>
                                                <td>{item.coupenType}</td>
                                                <td>&#x20b9;{item.offerDiscount}</td>
                                                <td>{new Date(item.startDate).toLocaleDateString('en-GB')}</td>
                                                <td>{new Date(item.endDate).toLocaleDateString('en-GB')}</td>
                                                <td>
                                                    <Form.Check
                                                        type="switch"
                                                        label=""
                                                        checked={item.status}
                                                        className=''
                                                        onChange={()=>handleStatusChange(item._id, item.status)}
                                                    />
                                                </td>
                                                <td className='d-flex align-items-center justify-content-end'>
                                                    <div className="mv_pencil_icon" >
                                                        <Link to='/addcoupon' state={{ id: item._id }}>
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
                                <NoResultsFound/>
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
                            <button onClick={handleCoupen}>Delete</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Coupon;