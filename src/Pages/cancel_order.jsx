import React, { useEffect, useState } from 'react';
import '../CSS/product.css';
import Form from 'react-bootstrap/Form';
import { Dropdown, DropdownButton, InputGroup } from 'react-bootstrap';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Cancelorder = (props) => {

    var data = [
        {   
            id: 1,
            name: "Johan Desai",
            product: "Smart Watch",
            date: "02/09/1994",
            comment: "Lorem ipsum dolor sit amet",
            reason: "I was hopping for a shorter delivery time",
        },
        {   
            id: 2,
            name: "Nizam Patel",
            product: "Smart Watch",
            date: "02/09/1994",
            comment: "Lorem ipsum dolor sit amet",
            reason: "Price of the product has now decreased",
        },
        {   
            id: 3,
            name: "Johan Desai",
            product: "Smart Watch",
            date: "02/09/1994",
            comment: "Lorem ipsum dolor sit amet",
            reason: "I want to change the delivery address",
        },
        {   
            id: 4,
            name: "Nizam Patel",
            product: "Smart Watch",
            date: "02/09/1994",
            comment: "Lorem ipsum dolor sit amet",
            reason: "I’m worried about the ratings/reviews",
        },
        {   
            id: 5,
            name: "Nizam Patel",
            product: "Smart Watch",
            date: "02/09/1994",
            comment: "Lorem ipsum dolor sit amet",
            reason: "My reason are not listed here",
        },
        {   
            id: 6,
            name: "Nizam Patel",
            product: "Smart Watch",
            date: "02/09/1994",
            comment: "Lorem ipsum dolor sit amet",
            reason: "I’m worried about the ratings/reviews",
        },
        {   
            id: 7,
            name: "Johan Desai",
            product: "Smart Watch",
            date: "02/09/1994",
            comment: "Lorem ipsum dolor sit amet",
            reason: "I’m worried about the ratings/reviews",
        },
        {   
            id: 8,
            name: "Johan Desai",
            product: "Smart Watch",
            date: "02/09/1994",
            comment: "Lorem ipsum dolor sit amet",
            reason: "I’m worried about the ratings/reviews",
        },
        {   
            id: 9,
            name: "Johan Desai",
            product: "Smart Watch",
            date: "02/09/1994",
            comment: "Lorem ipsum dolor sit amet",
            reason: "I’m worried about the ratings/reviews",
        },
        {   
            id: 10,
            name: "Johan Desai",
            product: "Smart Watch",
            date: "02/09/1994",
            comment: "Lorem ipsum dolor sit amet",
            reason: "I’m worried about the ratings/reviews",
        },
        {   
            id: 11,
            name: "Johan Desai",
            product: "Smart Watch",
            date: "02/09/1994",
            comment: "Lorem ipsum dolor sit amet",
            reason: "I was hopping for a shorter delivery time",
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
                        <p className='mb-1'>Cancel Order</p>
                        <div className='d-flex align-items-center'>
                            <p className='mv_dashboard_heading mb-0'>Dashboard /</p>
                            <p className='mv_category_heading mv_subcategory_heading mb-0'>Cancel Order</p>
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
                                        <Link to="/viewstatus"><Button>View Status</Button></Link>
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
                                            <th className=''>Comment</th>
                                            <th className=''>Reason</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedData.map((item, index) => (
                                            <tr key={index}>
                                                <td><p className='mb-2'>{item.id}</p></td>
                                                <td>{item.name}</td>
                                                <td>{item.product}</td>
                                                <td>{item.date}</td> 
                                                <td>{item.comment}</td> 
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

export default Cancelorder