import React, { useEffect, useState } from 'react';
import '../CSS/product.css';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import axios from 'axios';

const Viewstatus = () => {

    const BaseUrl = process.env.REACT_APP_BASEURL;
    const token = localStorage.getItem('token');

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    // Filter state variables
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [filterProductName, setFilterProductName] = useState('');
    // ************************************** Pagination **************************************
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    // console.log("totalpage",totalPages)

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

    // Offcanvas
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Filtering function
    const applyFilters = () => {
        let result = data;

        // Search across multiple fields
        if (searchTerm) {
            const searchTermLower = searchTerm.toLowerCase();
            result = result.filter(item =>
                item.userData[0].name.toLowerCase().includes(searchTermLower) ||
                item.productData[0].productName.toLowerCase().includes(searchTermLower) ||
                item.returnOrderStatus.toLowerCase().includes(searchTermLower)
            );
        }

        // Status filter
        if (filterStatus) {
            result = result.filter(item => item.returnOrderStatus === filterStatus);
        }

        // Date filter
        if (filterDate) {
            result = result.filter(item =>
                new Date(item.createdAt).toLocaleDateString() === new Date(filterDate).toLocaleDateString()
            );
        }

        // Product Name filter
        if (filterProductName) {
            result = result.filter(item =>
                item.productData[0].productName.toLowerCase().includes(filterProductName.toLowerCase())
            );
        }

        setFilteredData(result);
        setCurrentPage(1); // Reset to first page after filtering
    };

    // Reset all filters
    const resetFilters = () => {
        setSearchTerm('');
        setFilterStatus('');
        setFilterDate('');
        setFilterProductName('');
        setFilteredData(data);
        setCurrentPage(1);
        setShow(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BaseUrl}/api/allReturnOrders`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const pendingOrders = response.data.returnOrder.filter(order => order.returnOrderStatus !== "Pending");
                // console.log("pendingOrders", pendingOrders);

                setData(pendingOrders);
                setFilteredData(pendingOrders);
            } catch (error) {
                console.error('Data Fetching Error:', error);
            }
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        applyFilters();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm, filterStatus, filterDate, filterProductName]);

    return (
        <>
            <div id='mv_container_fluid'>
                <div className="mv_main_heading mb-4 d-flex align-items-center justify-content-between">
                    <div>
                        <p className='mb-1'>Return Order</p>
                        <div className='d-flex align-items-center'>
                            <p className='mv_dashboard_heading mb-0'>Dashboard /</p>
                            <p className='mv_category_heading mv_subcategory_heading mb-0'>Return Order</p>
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
                                                        <label className='mv_offcanvas_filter_category'>Product Name</label>
                                                        <InputGroup className="mb-3">
                                                            <Form.Control
                                                                placeholder="Enter Product Name"
                                                                name='productName'
                                                                value={filterProductName}
                                                                onChange={(e) => setFilterProductName(e.target.value)}
                                                            />
                                                        </InputGroup>
                                                    </div>
                                                    <div>
                                                        <label className='mv_offcanvas_filter_category'>Date</label>
                                                        <div className="mv_input_content mv_add_product_date_scheduled">
                                                            <Form.Control className='mb-3' type="date" value={filterDate}
                                                                onChange={(e) => setFilterDate(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="mv_input_content">
                                                        <label className='mv_offcanvas_filter_category'>Status</label>
                                                        <Form.Select className="mb-3" value={filterStatus}
                                                            onChange={(e) => setFilterStatus(e.target.value)}>
                                                            <option>Select Status</option>
                                                            <option value="Accepted">Accepted</option>
                                                            <option value="Cancelled">Cancelled</option>
                                                        </Form.Select>
                                                    </div>
                                                </div>
                                                <div className='mv_offcanvas_bottom_button'>
                                                    <div className='mv_logout_Model_button mv_cancel_apply_btn d-flex align-items-center justify-content-center'>
                                                        <div className="mv_logout_cancel">
                                                            <button type="button" onClick={resetFilters}>Cancel</button>
                                                        </div>
                                                        <div className="mv_logout_button">
                                                            <button type="submit" onClick={handleClose} >Apply</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Offcanvas.Body>
                                        </Offcanvas>
                                    </div>
                                </div>
                            </div>
                            <div className="mv_product_table_padd">
                                <table className='mv_product_table justify-content-between'>
                                    <thead>
                                        <tr>
                                            <th className=''>ID</th>
                                            <th className=''>Customer name</th>
                                            <th className=''>Product</th>
                                            <th className=''>Date</th>
                                            <th className=''>Status</th>
                                            <th className=''>Reason</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedData.map((item, index) => (
                                            <tr key={index}>
                                                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                                <td>{item.userData[0].name}</td>
                                                <td>{item.productData[0]?.productName}</td>
                                                <td>
                                                    {(() => {
                                                        const date = new Date(item.createdAt);
                                                        const day = String(date.getDate()).padStart(2, '0');
                                                        const month = String(date.getMonth() + 1).padStart(2, '0');
                                                        const year = date.getFullYear();
                                                        return `${day}-${month}-${year}`;
                                                    })()}
                                                </td>
                                                <td>
                                                    <div className="d-flex">
                                                        <button
                                                            className="me-3 mv_ro_status_button"
                                                        >
                                                            <p className={`m-0 mv_accept_status  ${item.returnOrderStatus === 'Accepted' ? 'mv_accept_status' : 'mv_reject_status'
                                                                }`}>{item.returnOrderStatus}</p>
                                                        </button>
                                                    </div>
                                                </td>
                                                <td>{item.cancellationData[0]?.reasonName}</td>
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
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Viewstatus;