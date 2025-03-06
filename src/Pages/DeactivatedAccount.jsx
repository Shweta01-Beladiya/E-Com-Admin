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
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);


    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        setCurrentPage(1);
    
        if (query.trim() === "") {
            fetchData();
            return;
        }
    
        const filtered = data.filter(item =>
            item.name?.toLowerCase().includes(query) ||
            item.email?.toLowerCase().includes(query) ||
            item.mobileNo?.toLowerCase().includes(query)
        );
    
        setFilteredData(filtered);
        setTotalPages(Math.ceil(filtered.length / itemsPerPage));
        setData(filtered.slice(0, itemsPerPage));
    };    

    const fetchData = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/api/allDeactiveUserAccount`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            const fetchedData = response.data.deactiveUser || [];
    
            const total = Math.ceil(fetchedData.length / itemsPerPage);
            setTotalPages(total);
    
            const startIndex = (currentPage - 1) * itemsPerPage;
            const paginatedData = fetchedData.slice(startIndex, startIndex + itemsPerPage);
    
            setData(paginatedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    

    useEffect(() => {
        fetchData();
    }, [currentPage, searchQuery]); 
    

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

    return (
        <>
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
                    <div className="col-12 ">
                        <div className="mv_product_table_content">
                            <div className='mv_table_search py-4'>
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
                            </div>
                            <div className="mv_product_table_padd">
                                <table className='mv_product_table justify-content-between'>
                                    <thead>
                                        <tr>
                                            <th className=''>ID</th>
                                            <th className=''>Customer Name</th>
                                            <th className=''>Contact No</th>
                                            <th className=''>Email</th>
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
                                    <div className='mv_other_category d-flex align-items-center justify-content-end pb-4 mt-4'>
                                        <p className='mb-0' onClick={() => handlePageChange(currentPage - 1)}>
                                            <MdOutlineKeyboardArrowLeft />
                                        </p>
                                        {getPaginationButtons().map((page) => (
                                            <p key={`page-${page}`}
                                                className={`mb-0 ${currentPage === page ? 'mv_active' : ''}`}
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
        </>
    );
};

export default DeactivatedAccount;