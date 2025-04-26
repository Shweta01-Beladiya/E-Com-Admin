import React, { useEffect, useState } from 'react';
import '../CSS/product.css';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import axios from 'axios';

const DeactivatedAccount = () => {
    const BaseUrl = process.env.REACT_APP_BASEURL;
    const token = localStorage.getItem('token');

    const itemsPerPage = 10;
    const [masterData, setMasterData] = useState([]);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/api/allDeactiveUserAccount`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const fetchedData = response.data.deactiveUser || [];
            setMasterData(fetchedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        let updatedData = [...masterData];

        if (searchQuery.trim() !== "") {
            const query = searchQuery.toLowerCase();
            updatedData = updatedData.filter(item =>
                item.name?.toLowerCase().includes(query) ||
                item.email?.toLowerCase().includes(query) ||
                item.mobileNo?.toLowerCase().includes(query)
            );
        }

        setTotalPages(Math.ceil(updatedData.length / itemsPerPage));

        const startIndex = (currentPage - 1) * itemsPerPage;
        const paginatedData = updatedData.slice(startIndex, startIndex + itemsPerPage);

        setData(paginatedData);
    }, [masterData, currentPage, searchQuery]);

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        setCurrentPage(newPage);
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

    return (
        <div id='mv_container_fluid'>
            <div className="mv_main_heading mb-4 d-flex align-items-center justify-content-between">
                <div>
                    <p className='mb-1'>Deactivated Account</p>
                    <div className='d-flex align-items-center'>
                        <p className='mv_dashboard_heading mb-0'>Dashboard /</p>
                        <p className='mv_category_heading mv_subcategory_heading mb-0'>Deactivated Account</p>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-12">
                    <div className="mv_product_table_content">
                        <div className='mv_table_search py-4'>
                            <div className="mv_product_search">
                                <InputGroup>
                                    <Form.Control
                                        placeholder="Search..."
                                        aria-label="Search"
                                        value={searchQuery}
                                        onChange={handleSearch}
                                    />
                                </InputGroup>
                            </div>
                        </div>
                        <div className="mv_product_table_padd">
                            <table className='mv_product_table justify-content-between'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Customer Name</th>
                                        <th>Contact No</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, index) => (
                                        <tr key={index}>
                                            <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                            <td className='py-3'>{item?.name}</td>
                                            <td className='py-3'>{item?.mobileNo}</td>
                                            <td className='py-3'>{item?.email}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

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
                                        onClick={() => handlePageChange(currentPage + 1)}>
                                        <MdOutlineKeyboardArrowRight />
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeactivatedAccount;
