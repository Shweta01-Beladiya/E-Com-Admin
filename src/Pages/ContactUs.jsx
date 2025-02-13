import React, { useEffect, useState } from 'react';
import '../CSS/product.css';
import Form from 'react-bootstrap/Form';
import { Button, InputGroup, Offcanvas } from 'react-bootstrap';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';


const ContactUs = () => {
    var data1 = [
        {
            id: 1,
            name: "Mitesh Shah",
            contactNo: "+91 85555 85555",
            email: "mitesh@gmail.com",
            subject: "General Inquiry",
            message: "lorem ispum"
        },
        {
            id: 2,
            name: "Riya Patel",
            contactNo: "+91 85555 85555",
            email: "riya@gmail.com",
            subject: "Product Releted",
            message: "lorem ispum"
        },
        {
            id: 3,
            name: "Mitesh Shah",
            contactNo: "+91 85555 85555",
            email: "mitesh@gmail.com",
            subject: "Payment Releted",
            message: "lorem ispum"
        },
        {
            id: 4,
            name: "Riya Patel",
            contactNo: "+91 85555 85555",
            email: "riya@gmail.com",
            subject: "General Inquiry",
            message: "lorem ispum"
        },
        {
            id: 5,
            name: "Abc Shah",
            contactNo: "+91 85555 85555",
            email: "abc@gmail.com",
            subject: "Product Releted",
            message: "lorem ispum"
        },
        {
            id: 6,
            name: "Admin Shah",
            contactNo: "+91 85555 80000",
            email: "admin@gmail.com",
            subject: "Payment Releted",
            message: "lorem ispum"
        },
        {
            id: 7,
            name: "Om Patel",
            contactNo: "+91 85555 85555",
            email: "om@gmail.com",
            subject: "General Inquiry",
            message: "lorem ispum"
        },
        {
            id: 8,
            name: "Mitesh Shah",
            contactNo: "+91 85555 85555",
            email: "mitesh@gmail.com",
            subject: "Product Releted",
            message: "lorem ispum"
        },
        {
            id: 9,
            name: "Om Patel",
            contactNo: "+91 85555 85555",
            email: "om@gmail.com",
            subject: "Payment Releted",
            message: "lorem ispum"
        },
        {
            id: 10,
            name: "Riya Patel",
            contactNo: "+91 85555 85555",
            email: "riya@gmail.com",
            subject: "General Inquiry",
            message: "lorem ispum"
        },
        {
            id: 11,
            name: "Om Patel",
            contactNo: "+91 85555 85555",
            email: "om@gmail.com",
            subject: "General Inquiry",
            message: "lorem ispum"
        },
    ];

    localStorage.setItem('data3', JSON.stringify(data1))

    const itemsPerPage = 10;
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");

    const local_data = async () => {
        const dataFromStorage = await JSON.parse(localStorage.getItem('data3'));
        if (dataFromStorage) {
            const total = Math.ceil(dataFromStorage.length / itemsPerPage);
            setTotalPages(total);

            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;

            setData(dataFromStorage.slice(startIndex, endIndex));
        }
    };

    useEffect(() => {
        local_data();
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        setCurrentPage(newPage);
    };

    const getPaginationButtons = () => {
        const buttons = [];
        const maxButtonsToShow = 3;
        let startPage = Math.max(currentPage - 1, 1);
        let endPage = Math.min(startPage + maxButtonsToShow - 1, totalPages);

        if (endPage - startPage + 1 < maxButtonsToShow) {
            startPage = Math.max(endPage - maxButtonsToShow + 1, 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(i);
        }

        return buttons;
    };


    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filter data based on search query
    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.message.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagenation
    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Modal
    const [modalShow, setModalShow] = React.useState(false);
    const [viewModal,setViewModal] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleViewClose = () => setViewModal(false);
    const handleViewShow = () => setViewModal(true);

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
                            <div className='mv_table_search'>
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
                                                            <label className='mv_offcanvas_filter_category'>Subject</label>
                                                            <Form.Select className="mb-4" aria-label="Default select example">
                                                                <option>Select Subject</option>
                                                                <option value="1">General Inquiry</option>
                                                                <option value="2">Payment Related</option>
                                                                <option value="3">Product Related</option>
                                                            </Form.Select>
                                                        </div>
                                                    </div>
                                                    <div className='mv_offcanvas_bottom_button'>
                                                        <div className='mv_logout_Model_button d-flex align-items-center justify-content-center'>
                                                            <div className="mv_logout_cancel">
                                                                <button type="button">Cancel</button>
                                                            </div>
                                                            <div className="mv_logout_button">
                                                                <button type="submit">Apply</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Offcanvas.Body>
                                            </Offcanvas>
                                        </div>
                                    </div>
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
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.contactNo}</td>
                                                <td>{item.subject}</td>
                                                <td>{item.message}</td>
                                                <td className='d-flex align-items-center justify-content-end'>
                                                    <div className="mv_pencil_icon" onClick={handleViewShow}>
                                                            <img src={require('../mv_img/eyes_icon.png')} alt="" />
                                                    </div>
                                                    <div className="mv_pencil_icon" onClick={() => setModalShow(true)}>
                                                        <img src={require('../mv_img/trust_icon.png')} alt="" />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        {/* View Contect us model */}
            <Modal className='mv_logout_dialog' show={viewModal} onHide={handleViewClose} centered >
                <Modal.Header closeButton>
                    <h6 className='fw-bold mb-0'>Contact Details</h6>
                </Modal.Header>
                <Modal.Body>
                    <table className='sb_table'>
                        <tr>
                            <td>Name:</td>
                            <td>Mitesh Shah</td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td>mitesh@gmail.com</td>
                        </tr>
                        <tr>
                            <td>Contact No:</td>
                            <td>+91 9685968520</td>
                        </tr>
                        <tr>
                            <td>Subject:</td>
                            <td>General inquiry</td>
                        </tr>
                        <tr>
                            <td>Message:</td>
                            <td>Lorem Ipsum ifgdb hck</td>
                        </tr>
                    </table>
                </Modal.Body>
            </Modal>

            {/* Delete Contect Us Model */}
            <Modal className='mv_logout_dialog' show={modalShow} onHide={() => setModalShow(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Body className='text-center mv_logout'>
                    <h5 className='mb-2'>Delete</h5>
                    <p>Are you sure you want to delete Contact Us?</p>
                    <div className='mv_logout_Model_button d-flex align-items-center justify-content-center'>
                        <div className="mv_logout_cancel">
                            <button onClick={() => setModalShow(false)}>Cancel</button>
                        </div>
                        <div className="mv_logout_button">
                            <button>Delete</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

        </>
    );
};

export default ContactUs;