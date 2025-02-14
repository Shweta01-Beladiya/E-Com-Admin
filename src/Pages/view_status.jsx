import React, { useEffect, useState } from 'react';
import '../CSS/product.css';
import Form from 'react-bootstrap/Form';
import { Dropdown, DropdownButton, InputGroup } from 'react-bootstrap';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

const Viewstatus = (props) => {

    var data = [
        {   
            id: 1,
            name: "Johan Desai",
            product: "Smart Watch",
            date: "02/09/1994",
            statusone: "Accept",
            reason: "Lorem ipsum dolor sit amet",
        },
        {   
            id: 2,
            name: "Nizam Patel",
            product: "Smart Watch",
            date: "02/09/1994",
            statustwo: "Reject",
            reason: "Lorem ipsum dolor sit amet",
        },
        {   
            id: 3,
            name: "Johan Desai",
            product: "Smart Watch",
            date: "02/09/1994",
            statustwo: "Reject",
            reason: "Lorem ipsum dolor sit amet",
        },
        {   
            id: 4,
            name: "Nizam Patel",
            product: "Smart Watch",
            date: "02/09/1994",
            statustwo: "Reject",
            reason: "Lorem ipsum dolor sit amet",
        },
        {   
            id: 5,
            name: "Nizam Patel",
            product: "Smart Watch",
            date: "02/09/1994",
            statustwo: "Reject",
            reason: "Lorem ipsum dolor sit amet",
        },
        {   
            id: 6,
            name: "Nizam Patel",
            product: "Smart Watch",
            date: "02/09/1994",
            statusone: "Accept",
            reason: "Lorem ipsum dolor sit amet",
        },
        {   
            id: 7,
            name: "Johan Desai",
            product: "Smart Watch",
            date: "02/09/1994",
            statusone: "Accept",
            reason: "Lorem ipsum dolor sit amet",
        },
        {   
            id: 8,
            name: "Johan Desai",
            product: "Smart Watch",
            date: "02/09/1994",
            statusone: "Accept",
            reason: "Lorem ipsum dolor sit amet",
        },
        {   
            id: 9,
            name: "Johan Desai",
            product: "Smart Watch",
            date: "02/09/1994",
            statusone: "Accept",
            reason: "Lorem ipsum dolor sit amet",
        },
        {   
            id: 10,
            name: "Johan Desai",
            product: "Smart Watch",
            date: "02/09/1994",
            statustwo: "Reject",
            reason: "Lorem ipsum dolor sit amet",
        },
        {   
            id: 11,
            name: "Johan Desai",
            product: "Smart Watch",
            date: "02/09/1994",
            statusone: "Accept",
            reason: "Lorem ipsum dolor sit amet",
        },
    ];

    // ************************************** Pagination **************************************
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredData, setFilteredData] = useState(data);
 
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    console.log("totalpage",totalPages)
 
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

    // offcanvas price
    const [priceRange, setPriceRange] = useState([0, 300]);
    const handleSliderChange = (newRange) => {
        setPriceRange(newRange);
    };

    // Date function
    let [date, setDate] = useState('Select Date');
    let [date1, setDate1] = useState('Select Date');

    const handleDateChange = (e, dateType) => {
        const [year, month, day] = e.target.value.split("-");
        const formattedDate = `${day}-${month}-${year}`;
        
        if (dateType === 'start') {
            setDate(formattedDate);
        } else if (dateType === 'end') {
            setDate1(formattedDate);
        }
    };

    // Return Order Status
    const [selectedStatus, setSelectedStatus] = useState({});

    const handleStatusChange = (id, status) => {
        setSelectedStatus((prev) => ({ ...prev, [id]: status }));
        console.log(`Status changed for ID: ${id}, Status: ${status}`);
    };

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
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
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
                                                                name='name'
                                                            />
                                                        </InputGroup>
                                                    </div>
                                                    <div>
                                                        <label className='mv_offcanvas_filter_category'>Date</label>
                                                        <div className="mv_input_content mv_add_product_date_scheduled">
                                                            <label className='mv_label_input mv_add_product_date mv_filter_start_date'>{date1}</label>
                                                            <Form.Control className='mb-3' type="date" onChange={(e) => handleDateChange(e, 'end')} />
                                                        </div>
                                                    </div>
                                                    <div className="mv_input_content">
                                                        <label className='mv_offcanvas_filter_category'>Status</label>
                                                        <Form.Select className="mb-3" aria-label="Default select example">
                                                            <option>Select Status</option>
                                                            <option value="Accepted">Accepted</option>
                                                            <option value="Rejected">Rejected</option>
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
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.product}</td>
                                            <td>{item.date}</td>
                                            <td>
                                                <div className="d-flex">
                                                {selectedStatus[item.id] !== item.statusone && (
                                                    <button
                                                    className="me-3 mv_ro_status_button"
                                                    onClick={() => handleStatusChange(item.id, item.statusone)}
                                                    >
                                                    <p className="m-0 mv_accept_status">{item.statusone}</p>
                                                    </button>
                                                )}
                                                {selectedStatus[item.id] !== item.statustwo && (
                                                    <button
                                                    className="mv_ro_status_button"
                                                    onClick={() => handleStatusChange(item.id, item.statustwo)}
                                                    >
                                                    <p className="m-0 mv_reject_status">{item.statustwo}</p>
                                                    </button>
                                                )}
                                                </div>
                                            </td>
                                            <td>{item.reason}</td>
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

export default Viewstatus