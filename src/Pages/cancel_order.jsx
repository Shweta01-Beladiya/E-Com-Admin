import React, { useEffect, useState } from 'react';
import '../CSS/product.css';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import axios from 'axios';

const Cancelorder = () => {
    const BaseUrl = process.env.REACT_APP_BASEURL;
    const token = localStorage.getItem('token');

    const [toggle, setToggle] = useState(false)
    const [data, setData] = useState([]);
    const [processedData, setProcessedData] = useState([]);

    // Pagination
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredData, setFilteredData] = useState([]);
 
    const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
 
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
         
        if (endPage - startPage + 1 < maxButtonsToShow) {
            startPage = Math.max(1, endPage - maxButtonsToShow + 1);
        }
 
        if (startPage > 1) {
            buttons.push(1);
            if (startPage > 2) buttons.push('...');
        }
 
        for (let i = startPage; i <= endPage; i++) {
            buttons.push(i);
        }
 
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) buttons.push('...');
            buttons.push(totalPages);
        }
        return buttons;
    };
 
    const paginatedData = filteredData?.slice(
         (currentPage - 1) * itemsPerPage,
         currentPage * itemsPerPage
    );

    // Fetch and Process Data
    useEffect(() => {
        const fetchCancelOrders = async () => {
            try {
                const response = await axios.get(`${BaseUrl}/api/allCancellOrders`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                // Directly process the data from the response
                const extractedData = response?.data?.order.map(order => {
                    // Extract user name
                    const userName = order.userData && order.userData.length > 0 
                        ? order.userData[0].name 
                        : 'N/A';
            
                    // Extract product names
                    const productNames = order.productData 
                        ? order.productData.map(product => product.productName).join(', ')
                        : 'N/A';
            
                    // Extract cancellation reason
                    const cancellationReason = order.reasonForCancellationData && order.reasonForCancellationData.length > 0
                        ? order.reasonForCancellationData[0].reasonName
                        : 'N/A';
            
                    return {
                        customerName: userName,
                        productName: productNames,
                        date: order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A',
                        comments: order.comments || 'N/A',
                        cancellationReason: cancellationReason
                    };
                });

                // Set both original and processed data
                setData(response?.data?.order);
                setFilteredData(extractedData);
            } catch(error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchCancelOrders();
    }, [toggle]);

    return (
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
                        </div>
                        <div className="mv_product_table_padd">
                            <table className='mv_product_table mv_help_table justify-content-between'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Customer name</th>
                                        <th>Product</th>
                                        <th>Date</th>
                                        <th>Comment</th>
                                        <th>Reason</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedData?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                            <td>{item.customerName}</td>
                                            <td>{item.productName}</td>
                                            <td>{item.date}</td>
                                            <td>{item.comments}</td>
                                            <td>{item.cancellationReason}</td>
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
    );
};

export default Cancelorder;