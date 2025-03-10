import React, { useEffect, useState } from 'react';
import '../CSS/product.css';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import axios from 'axios';
import NoResultsFound from '../Component/Noresult';

const Size = () => {

    const BaseUrl = process.env.REACT_APP_BASEURL;
    const token = localStorage.getItem('token');

    const [data, setData] = useState([]);
    const [mainCategory, setMainCategory] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sizeFilter, setSizeFilter] = useState('');
    const [availableSizes, setAvailableSizes] = useState([]);
    // Selected values states
    const [selectedMainCategory, setSelectedMainCategory] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');

    // Filtered options states
    const [filteredCategory, setFilteredCategory] = useState([]);
    const [filteredSubCategory, setFilteredSubCategory] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchData = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/api/allSizes`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // console.log("response", response.data.sizes);
            setData(response.data.sizes);
            setFilteredData(response.data.sizes);
        } catch (error) {
            console.error('Data fetching failed', error);
        }
    }

    const fetchMainCategory = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/api/allMainCategory`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMainCategory(response.data.users);
        } catch (error) {
            console.error('Data Fetching Error:', error);
        }
    }

    const fetchCategory = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/api/allCategory`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCategory(response.data.category);
        } catch (error) {
            console.error('Data Fetching Error:', error);
        }
    }

    const fetchSubCategory = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/api/allSubCategory`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSubCategory(response.data.subCategory);
        } catch (error) {
            console.error('Data Fetching Error:', error);
        }
    }



    useEffect(() => {
        fetchMainCategory();
        fetchCategory();
        fetchSubCategory();
        // fetchUnit();
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [BaseUrl, token]);

    // Extract available size names from data
    useEffect(() => {
        if (data.length > 0) {
            const uniqueSizes = [...new Set(data.map(item => item.sizeName))];
            setAvailableSizes(uniqueSizes);
        }
    }, [data]);

    // Apply filters when filter states change
    useEffect(() => {
        if (data.length > 0) {
            applyFilters();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, selectedMainCategory, selectedCategory, selectedSubCategory, sizeFilter]);

    // Handle Main Category Change
    const handleMainCategoryChange = (mainCategoryId) => {
        setSelectedMainCategory(mainCategoryId);
        setSelectedCategory('');
        setSelectedSubCategory('');

        const filtered = category.filter((cat) => cat.mainCategoryId === mainCategoryId);
        setFilteredCategory(filtered);
        setFilteredSubCategory([]);
    };

    // Handle Category Change
    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
        setSelectedSubCategory('');

        const filtered = subCategory.filter((subCat) => subCat.categoryId === categoryId);
        setFilteredSubCategory(filtered);
    };

    // Handle search functionality
    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (term.trim() === '') {
            setFilteredData(data);
        } else {
            const filtered = data.filter((item) =>
                item.sizeName.toLowerCase().includes(term.toLowerCase()) ||
                item.size.toString().includes(term) ||
                item.mainCategoryData[0].mainCategoryName.toLowerCase().includes(term.toLowerCase()) ||
                item.categoryData[0].categoryName.toLowerCase().includes(term.toLowerCase()) ||
                item.subCategoryData[0].subCategoryName.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredData(filtered);
        }
        setCurrentPage(1);
    };

    const applyFilters = () => {
        let filtered = [...data];

        if (selectedMainCategory) {
            filtered = filtered.filter(item =>
                item.mainCategoryData &&
                item.mainCategoryData[0] &&
                item.mainCategoryData[0]._id === selectedMainCategory);
        }

        if (selectedCategory) {
            filtered = filtered.filter(item =>
                item.categoryData &&
                item.categoryData[0] &&
                item.categoryData[0]._id === selectedCategory);
        }

        if (selectedSubCategory) {
            filtered = filtered.filter(item =>
                item.subCategoryData &&
                item.subCategoryData[0] &&
                item.subCategoryData[0]._id === selectedSubCategory);
        }

        if (sizeFilter) {
            filtered = filtered.filter(item => item.sizeName === sizeFilter);
        }

        setFilteredData(filtered);
        setCurrentPage(1);
    };

    const resetFilters = () => {
        setSelectedMainCategory('');
        setSelectedCategory('');
        setSelectedSubCategory('');
        setFilteredCategory([]);
        setFilteredSubCategory([]);
        setSizeFilter('');
        setFilteredData(data);
        setCurrentPage(1);
        handleClose();
    };
    const applyFiltersAndClose = () => {
        applyFilters();
        handleClose();
    };
    
    // ************************************** Pagination **************************************
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

    const paginatedData = filteredData?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    // *******************************************************************************

    // Modal
    const [modalShow, setModalShow] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const handleDeleteClick = (item) => {
        setItemToDelete(item);
        setModalShow(true);
    };

    const handleDelete = async () => {
        if (!itemToDelete) return;

        try {
            // Implement your delete API call here
            // await axios.delete(`${BaseUrl}/api/deleteSize/${itemToDelete._id}`, {
            //     headers: { Authorization: `Bearer ${token}` }
            // });

            // Update the local state after successful delete
            const updatedData = data.filter(item => item._id !== itemToDelete._id);
            setData(updatedData);
            setFilteredData(updatedData);

            setModalShow(false);
            setItemToDelete(null);
        } catch (error) {
            console.error('Delete operation failed', error);
        }
    };

    // Offcanvas
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div id='mv_container_fluid'>
                <div className="mv_main_heading mb-4 d-flex align-items-center justify-content-between">
                    <div>
                        <p className='mb-1'>Size</p>
                        <div className='d-flex align-items-center'>
                            <p className='mv_dashboard_heading mb-0'>Dashboard /</p>
                            <p className='mv_category_heading mv_subcategory_heading mb-0'>Size</p>
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
                                            aria-label="Search"
                                            value={searchTerm}
                                            onChange={handleSearch}
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
                                                    <div className="mv_input_content mt-3">
                                                        <label className='mv_offcanvas_filter_category'>Main Category</label>
                                                        <Form.Select
                                                            className="mb-3"
                                                            value={selectedMainCategory}
                                                            onChange={(e) => handleMainCategoryChange(e.target.value)}
                                                        >
                                                            <option value="">Select</option>
                                                            {mainCategory.map((mainCat) => (
                                                                <option value={mainCat._id} key={mainCat._id}>{mainCat.mainCategoryName}</option>
                                                            ))}
                                                        </Form.Select>
                                                    </div>
                                                    <div className="mv_input_content">
                                                        <label className='mv_offcanvas_filter_category'>Category</label>
                                                        <Form.Select
                                                            className="mb-3"
                                                            value={selectedCategory}
                                                            onChange={(e) => handleCategoryChange(e.target.value)}
                                                            disabled={!selectedMainCategory}
                                                        >
                                                            <option value="">Select</option>
                                                            {filteredCategory.map((cat) => (
                                                                <option value={cat._id} key={cat._id}>
                                                                    {cat.categoryName}
                                                                </option>
                                                            ))}
                                                        </Form.Select>
                                                    </div>
                                                    <div className="mv_input_content">
                                                        <label className='mv_offcanvas_filter_category'>Sub Category</label>
                                                        <Form.Select
                                                            className="mb-3"
                                                            value={selectedSubCategory}
                                                            onChange={(e) => setSelectedSubCategory(e.target.value)}
                                                            disabled={!selectedCategory}
                                                        >
                                                            <option value="">Select</option>
                                                            {filteredSubCategory.map((subCat) => (
                                                                <option value={subCat._id} key={subCat._id}>{subCat.subCategoryName}</option>
                                                            ))}
                                                        </Form.Select>
                                                    </div>
                                                    <div className="mv_input_content">
                                                        <label className='mv_offcanvas_filter_category'>Size Name</label>
                                                        <Form.Select className="mb-3" value={sizeFilter}
                                                            onChange={(e) => setSizeFilter(e.target.value)}>
                                                            <option>Select</option>
                                                            {availableSizes.map((size, index) => (
                                                                <option value={size} key={index}>{size}</option>
                                                            ))}
                                                        </Form.Select>
                                                    </div>
                                                </div>
                                                <div className='mv_offcanvas_bottom_button'>
                                                    <div className='mv_logout_Model_button mv_cancel_apply_btn d-flex align-items-center justify-content-center'>
                                                        <div className="mv_logout_cancel">
                                                            <button type="button" onClick={resetFilters}>Cancel</button>
                                                        </div>
                                                        <div className="mv_logout_button">
                                                            <button type="button" onClick={applyFiltersAndClose}>Apply</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Offcanvas.Body>
                                        </Offcanvas>
                                    </div>
                                    <div className='mv_category_side mv_product_page_category d-flex align-items-center'>
                                        <div className="mv_add_category mv_add_subcategory mv_add_product">
                                            <Link to='/addsize'><button>+ Add</button></Link>
                                        </div>
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
                                                    <th className=''>Main Category</th>
                                                    <th className=''>Category</th>
                                                    <th className=''>Sub Category</th>
                                                    <th className=''>Size Name</th>
                                                    <th className=''>Size</th>
                                                    <th className=''>Unit</th>
                                                    <th className='d-flex align-items-center justify-content-end'>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {paginatedData?.map((item, index) => (
                                                    <tr key={index}>
                                                         <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                                        <td>{item.mainCategoryData[0]?.mainCategoryName}</td>
                                                        <td>{item.categoryData[0]?.categoryName}</td>
                                                        <td>{item.subCategoryData[0]?.subCategoryName}</td>
                                                        <td>{item.sizeName}</td>
                                                        <td>{item.size}</td>
                                                        <td>{item.unitData[0]?.shortName}</td>
                                                        <td className='d-flex align-items-center justify-content-end'>
                                                            <div className="mv_pencil_icon">
                                                                <Link to='/addsize' state={{ id: item._id }}>
                                                                    <img src={require('../mv_img/pencil_icon.png')} alt="" />
                                                                </Link>
                                                            </div>
                                                            <div className="mv_pencil_icon" onClick={() => handleDeleteClick(item)}>
                                                                <img src={require('../mv_img/trust_icon.png')} alt="" />
                                                            </div>
                                                        </td>
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
                                                    onClick={() => typeof page === 'number' ? handlePageChange(page) : null}>
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
                                <NoResultsFound/>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Size Modal */}
            <Modal className='mv_logout_dialog' show={modalShow} onHide={() => setModalShow(false)} size="lg" centered >
                <Modal.Body className='text-center mv_logout'>
                    <h5 className='mb-2'>Delete</h5>
                    <p>Are you sure you want to delete this <br /> size?</p>
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
        </>
    );
};

export default Size;