import React, { useEffect, useState } from 'react';
import '../CSS/product.css';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import axios from 'axios';
import NoResultsFound from '../Component/Noresult';

const Cancelorder = () => {
    const BaseUrl = process.env.REACT_APP_BASEURL;
    const token = localStorage.getItem('token');

    const [toggle, setToggle] = useState(false);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Pagination
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

    // Fetch and Process Data
    useEffect(() => {
        const fetchCancelOrders = async () => {
            try {
                const response = await axios.get(`${BaseUrl}/api/allCancellOrders`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                const extractedData = response?.data?.order.map(order => {
                    const userName = order.userData?.length > 0 ? order.userData[0].name : 'N/A';
                    const productNames = order.productData?.map(product => product.productName).join(', ') || 'N/A';
                    const cancellationReason = order.reasonForCancellationData?.length > 0 ? order.reasonForCancellationData[0].reasonName : 'N/A';

                    return {
                        customerName: userName,
                        productName: productNames,
                        date: order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A',
                        comments: order.comments || 'N/A',
                        cancellationReason: cancellationReason
                    };
                });

                setData(extractedData);
                setFilteredData(extractedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchCancelOrders();
    }, [toggle]);

    // Search Functionality
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        
        if (term === "") {
            setFilteredData(data);
        } else {
            const filtered = data.filter(item =>
                item.customerName.toLowerCase().includes(term) ||
                item.productName.toLowerCase().includes(term)
            );
            setFilteredData(filtered);
            setCurrentPage(1); // Reset to first page on search
        }
    };

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
                                        placeholder="Search Customer or Product..."
                                        value={searchTerm}
                                        onChange={handleSearch}
                                    />
                                </InputGroup>
                            </div>
                        </div>
                        {paginatedData.length > 0 ? (
                            <>
                                <div className="mv_product_table_padd">
                                    <table className='mv_product_table mv_help_table justify-content-between'>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Customer Name</th>
                                                <th>Product</th>
                                                <th>Date</th>
                                                <th>Comment</th>
                                                <th>Reason</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {paginatedData.map((item, index) => (
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
                                    <div className="mv_other_category d-flex align-items-center justify-content-end pb-4 mt-4">
                                        <p className={`mb-0 ${currentPage === 1 ? 'disabled' : ''}`}
                                            onClick={() => handlePageChange(currentPage - 1)}>
                                            <MdOutlineKeyboardArrowLeft />
                                        </p>
                                        {getPaginationButtons().map((page, index) => (
                                            <p key={index}
                                                className={`mb-0 ${currentPage === page ? "mv_active" : ""}`}
                                                onClick={() => typeof page === "number" && handlePageChange(page)}
                                                style={{ cursor: page === "..." ? "default" : "pointer" }}>
                                                {page}
                                            </p>
                                        ))}
                                        <p className={`mb-0 ${currentPage === totalPages ? 'disabled' : ''}`}
                                            onClick={() => handlePageChange(currentPage + 1)} >
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
    );
};

export default Cancelorder;
