import React, { useEffect, useState } from 'react';
import '../CSS/product.css';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import axios from 'axios';


const ContactUs = () => {
   
    const BaseUrl = process.env.REACT_APP_BASEURL;
    const token = localStorage.getItem('token');

    // ************************************** Pagination **************************************
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [id, setId] = useState(null);
    const [viewData, setViewData] = useState({});
    const [selectedSubject, setSelectedSubject] = useState("");
    const [data,setData] = useState([]);
    // const [filteredData, setFilteredData] = useState(data);
    // const [viewModal, setViewModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    // console.log("totalpage",totalPages)

    const local_data = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/api/allContactUs`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // console.log("reponse",response.data.contactUs);
            const dataFromStorage = response.data.contactUs
            if (dataFromStorage) {
                const total = Math.ceil(dataFromStorage.length / itemsPerPage);
                setTotalPages(total);

                const startIndex = (currentPage - 1) * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;

                setData(dataFromStorage.slice(startIndex, endIndex));
            }
        } catch (error) {
            console.error('Data Fetching Error:', error);
        }
    };

    useEffect(() => {
        local_data();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    useEffect(() => {
        if(id) {
            const fetchdata = async () => {
                try {
                    const response = await axios.get(`${BaseUrl}/api/getContactUs/${id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    // console.log("response", response.data.contactUs);
                    setViewData(response.data.contactUs);
    
                } catch (error) {
                    console.error('Data Fetching Error:', error);
                }
            }
            fetchdata();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    };
    const handleSubjectChange = (event) => {
        setSelectedSubject(event.target.value);
        setCurrentPage(1);
    };
    // Filter data based on search query
    const filteredData = data.filter((item) => {
        const matchesSearch =
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.message.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesSubject = selectedSubject === "" || item.subject === selectedSubject;

        return matchesSearch && matchesSubject;
    });
    
    
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

    // Modal
    const [modalShow, setModalShow] = React.useState(false);
    const [viewModal, setViewModal] = useState(false);
    const [show, setShow] = useState(false); // offcanvas


    const handleClose = () => {
        setShow(false);
        setId(null);
    };
    const handleShow = (id) => {
        setShow(true)
        setId(id);
    };

    const handleViewClose = () => {
        setViewModal(false);
        setId(null);
    }
    const handleViewShow = (id) => {
        setViewModal(true);
        setId(id);
    }
    const resetFilters = () => {
        setSelectedSubject("");
        setSearchQuery("");
        setShow(false);
        setCurrentPage(1)
    };
    const applyFilters = () => {
        setShow(false);
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`${BaseUrl}/api/deleteContactUs/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("response",response.data);
            if(response.data.status === 200) {
                setData(prevData => prevData.filter(item => item._id !== id)); 
                setTotalPages(Math.ceil((data.length - 1) / itemsPerPage));
                setModalShow(false);
                setId(null);
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
                        <p className='mb-1'>Contact Us</p>
                        <div className='d-flex align-items-center'>
                            <p className='mv_dashboard_heading mb-0'>Dashboard /</p>
                            <p className='mv_category_heading mv_subcategory_heading mb-0'>Contact Us</p>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-12">
                        <div className="mv_product_table_content">
                            <div className='mv_table_search mv_table_no_flex'>
                                <div className="mv_product_search">
                                    <InputGroup>
                                        <Form.Control
                                        placeholder="Search..."
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                        value={searchQuery}
                                        onChange={handleSearch}
                                        />
                                    </InputGroup>
                                </div>
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
                                                    <label className='mv_offcanvas_filter_category'>Subject</label>
                                                    <Form.Select className="mb-4" aria-label="Default select example" value={selectedSubject} onChange={handleSubjectChange}>
                                                                <option>Select Subject</option>
                                                                <option value="General Inquiry">General Inquiry</option>
                                                                <option value="Payment related">Payment Related</option>
                                                                <option value="Product related">Product Related</option>
                                                            </Form.Select>
                                                </div>
                                            </div>
                                            <div className='mv_offcanvas_bottom_button'>
                                                <div className='mv_logout_Model_button mv_cancel_apply_btn d-flex align-items-center justify-content-center'>
                                                    <div className="mv_logout_cancel">
                                                        <button type="button" onClick={resetFilters}>Cancel</button>
                                                    </div>
                                                    <div className="mv_logout_button">
                                                        <button type="submit" onClick={applyFilters}>Apply</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Offcanvas.Body>
                                    </Offcanvas>
                                </div>
                            </div>
                            <div className="mv_product_table_padd">
                                <table className='mv_product_table justify-content-between'>
                                    <thead>
                                        <tr>
                                            <th className=''>ID</th>
                                            <th className=''>Name</th>
                                            <th className=''>Email</th>
                                            <th className=''>Contact No.</th>
                                            <th className=''>Subject</th>
                                            <th className=''>Message</th>
                                            <th className='d-flex align-items-center justify-content-end'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.contactNo}</td>
                                            <td>{item.subject}</td>
                                            <td>{item.message}</td>
                                            <td className='d-flex align-items-center justify-content-end'>
                                            <div className="mv_pencil_icon" onClick={() => handleViewShow(item._id)}>
                                                        <img src={require('../mv_img/eyes_icon.png')} alt="" />
                                                    </div>
                                                    <div className="mv_pencil_icon" onClick={() => { setModalShow(true); setId(item._id) }}>
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
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Contact Us Model */}
            <Modal className='mv_logout_dialog' show={modalShow} onHide={() => { setModalShow(false); setId(null) }} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Body className='text-center mv_logout'>
                    <h5 className='mb-2'>Delete</h5>
                    <p>Are you sure you want to delete Contact Us?</p>
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

            {/* View Contact Us Model */}
            <Modal className='mv_logout_dialog' show={viewModal} onHide={() => handleViewClose(false)}  centered >
                <Modal.Header className='mv_contect_details_header' closeButton>
                    <h6 className='fw-bold mb-0'>Contact Details</h6>
                </Modal.Header>
                <Modal.Body>
                    <table className='sb_table'>
                    <tr>
                            <td>Name:</td>
                            <td>{viewData.name}</td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td>{viewData.email}</td>
                        </tr>
                        <tr>
                            <td>Contact No:</td>
                            <td>{viewData.contactNo}</td>
                        </tr>
                        <tr>
                            <td>Subject:</td>
                            <td>{viewData.subject}</td>
                        </tr>
                        <tr>
                            <td>Message:</td>
                            <td>{viewData.message}</td>
                        </tr>
                    </table>
                </Modal.Body>
            </Modal>

        </>
    );
};

export default ContactUs