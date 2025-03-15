import React, { useEffect, useState } from 'react';
import '../CSS/product.css';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';
import { Link, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import axios from 'axios';
import NoResultsFound from '../Component/Noresult';

const Stock = () => {

    const BaseUrl = process.env.REACT_APP_BASEURL;
    const token = localStorage.getItem('token');

    // ************************************** Pagination **************************************
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [modalShow, setModalShow] = React.useState(false); // Modal
    const [show, setShow] = useState(false);  // Offcanvas
    const [maincategory, setMainCategory] = useState([]);
    const [category, setCategory] = useState([]);
    const [subcategory, setSubcategory] = useState([]);
    const [product, setProduct] = useState([]);
    const [id, setId] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // Add search term state
    const location = useLocation();
    const [refreshData, setRefreshData] = useState(false);

    useEffect(() => {
        if (location.state?.formSubmitted) {
            const savedPage = location.state?.currentPage;
            if (savedPage) {
                setCurrentPage(savedPage);
            }
            // Reset the location state to avoid refreshing on further navigation
            window.history.replaceState({}, document.title);
            // Refresh the data
            setRefreshData(prev => !prev);
        }
    }, [location.state]);

    // Add state for filtered dropdown options
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [filteredSubcategories, setFilteredSubcategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    // Add state for selected values
    const [selectedMainCategory, setSelectedMainCategory] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('');
    const [selectedStockStatus, setSelectedStockStatus] = useState(''); // Add stock status state

    const totalPages = Math.ceil(filteredData?.length / itemsPerPage);

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

    const paginatedData = filteredData?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    // *******************************************************************************


    const handleClose = () => {
        setShow(false);
    };

    const handleShow = () => setShow(true);

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
            setSubcategory(response.data.subCategory);
        } catch (error) {
            console.error('Data Fetching Error', error);
        }
    }

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/api/allProduct`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProduct(response.data.product);
        } catch (error) {
            console.error('Data Fetching Error :', error);
        }
    }

    const fetchStockData = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/api/allStocks`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setData(response.data.stock);
        } catch (error) {
            console.error('Data Fetching Error:', error);
        }
    }

    useEffect(() => {
        fetchMainCategory();
        fetchCategory();
        fetchSubCategory();
        fetchProduct();
        fetchStockData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshData]);

    // Update filteredData when data or searchTerm changes
    useEffect(() => {
        let result = [...data];

        // Apply search filter
        if (searchTerm.trim() !== '') {
            result = result.filter(item =>
                (item.mainCategoriesData && item.mainCategoriesData.length > 0 &&
                    item.mainCategoriesData[0].mainCategoryName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.categoriesData && item.categoriesData.length > 0 &&
                    item.categoriesData[0].categoryName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.subCategoriesData && item.subCategoriesData.length > 0 &&
                    item.subCategoriesData[0].subCategoryName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.productData && item.productData.length > 0 &&
                    item.productData[0].productName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.stockStatus && item.stockStatus.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.quantity && item.quantity.toString().includes(searchTerm))
            );
        }

        setFilteredData(result);
    }, [data, searchTerm]);

    // Handle search input change
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        if (!location.state?.formSubmitted) {
            setCurrentPage(1);
        }
    };

    // Filter categories when main category is selected
    const handleMainCategoryChange = (e) => {
        const mainCatId = e.target.value;
        setSelectedMainCategory(mainCatId);

        // Reset other selections
        setSelectedCategory('');
        setSelectedSubcategory('');
        setSelectedProduct('');

        // Filter categories related to selected main category
        if (mainCatId) {
            const relatedCategories = category.filter(cat => cat.mainCategoryId === mainCatId);
            setFilteredCategories(relatedCategories);
        } else {
            setFilteredCategories([]);
        }

        // Clear filtered subcategories and products
        setFilteredSubcategories([]);
        setFilteredProducts([]);
    };

    // Filter subcategories when category is selected
    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        setSelectedCategory(categoryId);

        // Reset subcategory and product selections
        setSelectedSubcategory('');
        setSelectedProduct('');

        // Filter subcategories related to selected category
        if (categoryId) {
            const relatedSubcategories = subcategory.filter(subCat => subCat.categoryId === categoryId);
            setFilteredSubcategories(relatedSubcategories);
        } else {
            setFilteredSubcategories([]);
        }

        // Clear filtered products
        setFilteredProducts([]);
    };

    // Filter products when subcategory is selected
    const handleSubcategoryChange = (e) => {
        const subCategoryId = e.target.value;
        setSelectedSubcategory(subCategoryId);

        // Reset product selection
        setSelectedProduct('');

        // Filter products related to selected subcategory
        if (subCategoryId) {
            const relatedProducts = product.filter(prod => prod.subCategoryId === subCategoryId);
            setFilteredProducts(relatedProducts);
        } else {
            setFilteredProducts([]);
        }
    };

    // Handle product selection
    const handleProductChange = (e) => {
        setSelectedProduct(e.target.value);
    };

    // Handle stock status selection
    const handleStockStatusChange = (e) => {
        setSelectedStockStatus(e.target.value);
    };

    const handleDelete = (id) => {
        setModalShow(true);
        setId(id);
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await axios.delete(`${BaseUrl}/api/deleteStock/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.status === 200) {
                setModalShow(false);
                setData((prevData) => prevData.filter((stock) => stock._id !== id));
            }
        } catch (error) {
            console.error('Data fetching Error:', error);
        }
    };

    // Reset filters
    const handleResetFilters = () => {
        setSelectedMainCategory('');
        setSelectedCategory('');
        setSelectedSubcategory('');
        setSelectedProduct('');
        setSelectedStockStatus('');
        setFilteredCategories([]);
        setFilteredSubcategories([]);
        setFilteredProducts([]);
        setFilteredData(data);
        handleClose();
    };

    const handleApplyFilters = () => {
        let result = [...data];

        // Apply search filter
        if (searchTerm.trim() !== '') {
            result = result.filter(item =>
                (item.mainCategoriesData && item.mainCategoriesData.length > 0 &&
                    item.mainCategoriesData[0].mainCategoryName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.categoriesData && item.categoriesData.length > 0 &&
                    item.categoriesData[0].categoryName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.subCategoriesData && item.subCategoriesData.length > 0 &&
                    item.subCategoriesData[0].subCategoryName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.productData && item.productData.length > 0 &&
                    item.productData[0].productName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.stockStatus && item.stockStatus.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.quantity && item.quantity.toString().includes(searchTerm))
            );
        }

        // Apply dropdown filters
        if (selectedMainCategory) {
            result = result.filter(item =>
                item.mainCategoriesData &&
                item.mainCategoriesData.length > 0 &&
                item.mainCategoriesData[0]._id === selectedMainCategory
            );
        }

        if (selectedCategory) {
            result = result.filter(item =>
                item.categoriesData &&
                item.categoriesData.length > 0 &&
                item.categoriesData[0]._id === selectedCategory
            );
        }

        if (selectedSubcategory) {
            result = result.filter(item =>
                item.subCategoriesData &&
                item.subCategoriesData.length > 0 &&
                item.subCategoriesData[0]._id === selectedSubcategory
            );
        }

        if (selectedProduct) {
            result = result.filter(item =>
                item.productData &&
                item.productData.length > 0 &&
                item.productData[0]._id === selectedProduct
            );
        }

        // Apply stock status filter
        if (selectedStockStatus) {
            result = result.filter(item =>
                item.stockStatus === selectedStockStatus
            );
        }

        setFilteredData(result);
    };

    // Update filteredData when any filter changes
    useEffect(() => {
        handleApplyFilters();
        setCurrentPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, searchTerm, selectedMainCategory, selectedCategory, selectedSubcategory, selectedProduct, selectedStockStatus]);


    return (
        <>
            <div id='mv_container_fluid'>
                <div className="mv_main_heading mb-4 d-flex align-items-center justify-content-between">
                    <div>
                        <p className='mb-1'>Stock</p>
                        <div className='d-flex align-items-center'>
                            <p className='mv_dashboard_heading mb-0'>Dashboard /</p>
                            <p className='mv_category_heading mv_subcategory_heading mb-0'>Stock</p>
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
                                                            aria-label="Default select example"
                                                            value={selectedMainCategory}
                                                            onChange={handleMainCategoryChange}
                                                        >
                                                            <option value="">Select</option>
                                                            {maincategory.map((mainCat) => (
                                                                <option value={mainCat._id} key={mainCat._id}>{mainCat.mainCategoryName}</option>
                                                            ))}
                                                        </Form.Select>
                                                    </div>
                                                    <div className="mv_input_content">
                                                        <label className='mv_offcanvas_filter_category'>Category</label>
                                                        <Form.Select
                                                            className="mb-3"
                                                            aria-label="Default select example"
                                                            value={selectedCategory}
                                                            onChange={handleCategoryChange}
                                                            disabled={!selectedMainCategory}
                                                        >
                                                            <option value="">Select</option>
                                                            {filteredCategories.map((cat) => (
                                                                <option value={cat._id} key={cat._id}>{cat.categoryName}</option>
                                                            ))}
                                                        </Form.Select>
                                                    </div>
                                                    <div className="mv_input_content">
                                                        <label className='mv_offcanvas_filter_category'>Sub Category</label>
                                                        <Form.Select
                                                            className="mb-3"
                                                            aria-label="Default select example"
                                                            value={selectedSubcategory}
                                                            onChange={handleSubcategoryChange}
                                                            disabled={!selectedCategory}
                                                        >
                                                            <option value="">Select</option>
                                                            {filteredSubcategories.map((subCat) => (
                                                                <option value={subCat._id} key={subCat._id}>{subCat.subCategoryName}</option>
                                                            ))}
                                                        </Form.Select>
                                                    </div>
                                                    <div className="mv_input_content">
                                                        <label className='mv_offcanvas_filter_category'>Product</label>
                                                        <Form.Select
                                                            className="mb-3"
                                                            aria-label="Default select example"
                                                            value={selectedProduct}
                                                            onChange={handleProductChange}
                                                            disabled={!selectedSubcategory}
                                                        >
                                                            <option value="">Select</option>
                                                            {filteredProducts.map((pro) => (
                                                                <option value={pro._id} key={pro._id}>{pro.productName}</option>
                                                            ))}
                                                        </Form.Select>
                                                    </div>
                                                    <div className="mv_input_content">
                                                        <label className='mv_offcanvas_filter_category'>Stock Status</label>
                                                        <Form.Select
                                                            className="mb-3"
                                                            aria-label="Default select example"
                                                            value={selectedStockStatus}
                                                            onChange={handleStockStatusChange}
                                                        >
                                                            <option value="">Select</option>
                                                            <option value="In Stock">In Stock</option>
                                                            <option value="Out Of Stock">Out of Stock</option>
                                                            <option value="Low Stock">Low Stock</option>
                                                        </Form.Select>
                                                    </div>
                                                </div>
                                                <div className='mv_offcanvas_bottom_button'>
                                                    <div className='mv_logout_Model_button mv_cancel_apply_btn d-flex align-items-center justify-content-center'>
                                                        <div className="mv_logout_cancel">
                                                            <button type="button" onClick={handleResetFilters}>Cancel</button>
                                                        </div>
                                                        <div className="mv_logout_button">
                                                            <button type="button" onClick={handleApplyFilters}>Apply</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Offcanvas.Body>
                                        </Offcanvas>
                                    </div>
                                    <div className='mv_category_side mv_product_page_category d-flex align-items-center'>
                                        <div className="mv_add_category mv_add_subcategory mv_add_product">
                                            <Link to='/addstock'><button>+ Add</button></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {paginatedData && paginatedData.length > 0 ? (
                                <div className="mv_product_table_padd">
                                    <table className='mv_product_table justify-content-between'>
                                        <thead>
                                            <tr>
                                                <th className=''>ID</th>
                                                <th className=''>Main Category</th>
                                                <th className=''>Category</th>
                                                <th className=''>Sub Category</th>
                                                <th className=''>Product</th>
                                                <th className=''>Stock Status</th>
                                                <th className=''>Qty.</th>
                                                <th className='d-flex align-items-center justify-content-end'>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {paginatedData.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                                    <td>{item.mainCategoriesData[0]?.mainCategoryName}</td>
                                                    <td>{item.categoriesData[0]?.categoryName}</td>
                                                    <td>{item.subCategoriesData[0]?.subCategoryName}</td>
                                                    <td>{item.productData[0]?.productName}</td>
                                                    <td>
                                                        {
                                                            item.stockStatus === 'In Stock' ? (
                                                                <p className='m-0 mv_delivered_padd'>{item.stockStatus}</p>
                                                            ) : item.stockStatus === 'Low Stock' ? (
                                                                <p className='m-0 mv_pending_padd'>{item.stockStatus}</p>
                                                            ) : item.stockStatus === 'Out Of Stock' ? (
                                                                <p className='m-0 mv_cancelled_padd'>{item.stockStatus}</p>
                                                            ) : null
                                                        }
                                                    </td>
                                                    <td>{item.quantity}</td>
                                                    <td className='d-flex align-items-center justify-content-end'>
                                                        <div className="mv_pencil_icon">
                                                            <Link to='/addstock' state={{ id: item._id, currentPage: currentPage }}>
                                                                <img src={require('../mv_img/pencil_icon.png')} alt="" />
                                                            </Link>
                                                        </div>
                                                        <div className="mv_pencil_icon" onClick={() => handleDelete(item._id)}>
                                                            <img src={require('../mv_img/trust_icon.png')} alt="" />
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <NoResultsFound />
                            )}
                            {totalPages > 1 && (
                                <div className="mv_other_category d-flex align-items-center justify-content-end pb-4 mt-4">
                                    {/* Previous Button */}
                                    <p className={`mb-0 ${currentPage === 1 ? 'disabled' : ''}`} 
                                        onClick={() => handlePageChange(currentPage - 1)}>
                                        <MdOutlineKeyboardArrowLeft />
                                    </p>
                                    {/* Pagination Buttons */}
                                    {getPaginationButtons().map((page, index) => (
                                        <p key={index}
                                        className={`mb-0 ${currentPage === page ? "mv_active" : ""}`}
                                        onClick={() => typeof page === "number" && handlePageChange(page)}
                                        style={{ cursor: page === "..." ? "default" : "pointer" }}>
                                        {page}
                                        </p>
                                    ))}
                                    {/* Next Button */}
                                    <p className={`mb-0 ${currentPage === totalPages ? 'disabled' : ''}`} 
                                        onClick={() => handlePageChange(currentPage + 1)} >
                                        <MdOutlineKeyboardArrowRight />
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Product Model */}
            <Modal className='mv_logout_dialog' show={modalShow} onHide={() => setModalShow(false)} size="lg" centered >
                <Modal.Body className='text-center mv_logout'>
                    <h5 className='mb-2'>Delete</h5>
                    <p>Are you sure you want to <br /> delete? </p>
                    <div className='mv_logout_Model_button d-flex align-items-center justify-content-center'>
                        <div className="mv_logout_cancel">
                            <button onClick={() => setModalShow(false)}>Cancel</button>
                        </div>
                        <div className="mv_logout_button">
                            <button onClick={handleConfirmDelete}>Delete</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Stock;