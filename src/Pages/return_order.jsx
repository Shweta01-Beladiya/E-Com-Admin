import React, { useEffect, useState } from 'react';
import '../CSS/product.css';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import NoResultsFound from '../Component/Noresult';

const Returnorder = () => {

    const BaseUrl = process.env.REACT_APP_BASEURL;
    const token = localStorage.getItem('token');

    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // ************************************** Pagination **************************************
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredData, setFilteredData] = useState([]);

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

    const changeReturnOrderStatus = async (id, status) => {

        try {
            await axios.put(`${BaseUrl}/api/changeReturnOrderStatus/${id}`,
                {
                    returnOrderStatus: status
                }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            );
            const updatedOrders = filteredData.filter(order => order._id !== id);
            setFilteredData(updatedOrders);
            setData(updatedOrders);
        } catch (error) {
            console.error('Error updating return order status:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BaseUrl}/api/allReturnOrders`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // console.log("response", response.data.returnOrder);
                const pendingOrders = response.data.returnOrder.filter(order => order.returnOrderStatus === "Pending");

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
        const filtered = data.filter(order =>
            order.userData[0].name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.productData[0].productName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filtered);
        setCurrentPage(1);
    }, [searchQuery, data]);

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
                            <div className='mv_table_search mv_table_no_flex'>
                                <div className="mv_product_search">
                                    <InputGroup>
                                        <Form.Control
                                            placeholder="Search..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </InputGroup>
                                </div>
                                <div className='d-flex'>
                                    <div className="mv_column_button mv_view_status_padd">
                                        <Link to="/viewstatus"><Button className='me-0'>View Status</Button></Link>
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
                                                        <td>{item.productData[0].productName}</td>
                                                        <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                                                        <td>
                                                            <div className="d-flex">
                                                                <button
                                                                    className="me-3 mv_ro_status_button"
                                                                    onClick={() => changeReturnOrderStatus(item._id, 'Accepted')}
                                                                >
                                                                    <p className="m-0 mv_accept_status">Accepted</p>
                                                                </button>

                                                                <button
                                                                    className="mv_ro_status_button"
                                                                    onClick={() => changeReturnOrderStatus(item._id, 'Cancelled')}
                                                                >
                                                                    <p className="m-0 mv_reject_status">Cancelled</p>
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
                                </>
                            ) : (
                                <NoResultsFound />
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Returnorder