import React, { useEffect, useState } from 'react';
import { Button, Offcanvas, Modal, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import '../CSS/riya.css';
import axios from 'axios';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import NoResultsFound from '../Component/Noresult';

const Category = () => {

    const BaseUrl = process.env.REACT_APP_BASEURL;
    const token = localStorage.getItem('token');

    // State management
    const [categories, setCategories] = useState([]);
    const [mainCategory, setMainCategory] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    const [id, setId] = useState(null);
    const [filters, setFilters] = useState({
        mainCategory: '',
        status: ''
    });
    const [initialValues, setInitialValues] = useState({
        mainCategoryId: '',
        categoryName: '',
    });
    const [searchTerm, setSearchTerm] = useState('');

    const CategorySchema = Yup.object().shape({
        mainCategoryId: Yup.string().required('Main Category is required'),
        categoryName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Category Name is required'),
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BaseUrl}/api/allCategory`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // console.log("allCategory>>>",response.data);
                setCategories(response.data.category);
            } catch (error) {
                console.error('Data fetching Error:', error);
            }
        }

        const fetchMainCategory = async () => {
            try {
                const response = await axios.get(`${BaseUrl}/api/allMainCategory`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // console.log("response", response.data.users);
                setMainCategory(response.data.users);
            } catch (error) {
                console.error('Data fetching Error:', error);
            }
        }

        fetchMainCategory();
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [BaseUrl, token]);

    useEffect(() => {
        const fetchSingleData = async () => {
            if (id) {
                try {
                    const response = await axios.get(`${BaseUrl}/api/getCategory/${id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    const categoryData = response.data.category;
                    setInitialValues({
                        mainCategoryId: categoryData.mainCategoryId,
                        categoryName: categoryData.categoryName,
                    });
                } catch (error) {
                    console.error('Data fetching Error:', error);
                }
            } else {
                setInitialValues({
                    mainCategoryId: '',
                    categoryName: '',
                });
            }
        };
        fetchSingleData();
    }, [id, BaseUrl, token]);

    // Previous handlers remain the same
    const handleFilterChange = (e) => {
        const { name, value } = e.target;

        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const applyFilters = () => {
        setCurrentPage(1);
        setShowFilter(false);
    };

    const clearFilters = () => {
        setFilters({
            mainCategory: '',
            status: ''
        });
        setCurrentPage(1);
        setShowFilter(false);
    };

    const handleSubmit = async (values, { setFieldError }) => {
        try {

            if (id) {
                const response = await axios.put(`${BaseUrl}/api/updateCategry/${id}`, values, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // console.log("Response", response.data);
                if (response.data.status === 200) {
                    setShowAddModal(false);
                    setId(null);
                    setCategories((prevCategories) =>
                        prevCategories.map((cat) =>
                            cat._id === id ? { ...cat, ...values } : cat
                        )
                    );
                }
            } else {
                const response = await axios.post(`${BaseUrl}/api/createCategory`, values, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // console.log("Careate category",response.data);

                if (response.data.status === 201) {
                    setShowAddModal(false);
                    // fetchData();
                    setCategories((prevCategories) => [...prevCategories, response.data.category]);
                }
            }
        } catch (error) {
            console.error('Data Create and update Error:', error);
            if (error.response && error.response.status === 409) {
                setFieldError('categoryName', 'Category name already exists');
            }
        }
    }

    const handleDeleteCategory = async () => {
        const response = await axios.delete(`${BaseUrl}/api/deleteCategory/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.status === 200) {
            setCategories((prevCategories) => {
                
                const newCategories = prevCategories.filter((cat) => cat._id !== id);
                const newTotalItems = newCategories.length;
                const newTotalPages = Math.ceil(newTotalItems / itemsPerPage);

                if (currentPage > newTotalPages && newTotalPages > 0) {
                    setCurrentPage(newTotalPages);
                }

                return newCategories;
            });

            setShowDeleteModal(false);
            setCategoryToDelete(null)
        }
        // console.log("Response", response.data);
    };

    // ************************************** Pagination **************************************
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const filteredCategories = categories.filter((cat) => {
        const matchesSearch = searchTerm ? (
            cat.mainCategoryData[0].mainCategoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cat.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
        ) : true;

        const selectedMainCategory = filters.mainCategory ? filters.mainCategory.toString() : '';
        const selectedStatus = filters.status === 'Active' ? true : filters.status === 'Inactive' ? false : '';

        // Ensure correct comparisons
        const matchesFilters =
            (!filters.mainCategory || cat.mainCategoryId?.toString() === selectedMainCategory) &&
            (selectedStatus === '' || cat.status === selectedStatus);

        return matchesSearch && matchesFilters;
    });

    // Calculate pagination values
    const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

    // Get current page data
    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredCategories.slice(startIndex, endIndex);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    // Reset to first page when filters or search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, filters]);

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
    // *******************************************************************************

    const handleStatusChange = async (id, status) => {
        try {

            const updatedStatus = !status

            const response = await axios.put(`${BaseUrl}/api/updateCategry/${id}`, { status: updatedStatus }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.status === 200) {
                setCategories((prevCategories) =>
                    prevCategories.map((cat) =>
                        cat._id === id ? { ...cat, status: updatedStatus } : cat
                    )
                );
            }
        } catch (error) {
            console.error('Status Upadte error', error);
        }
    };

    return (
        <div>
            <div className="mv_main_heading mb-4 d-flex align-items-center justify-content-between">
                <div>
                    <p className='mb-1'>Category</p>
                    <div className='d-flex align-items-center'>
                        <p className='mv_dashboard_heading mb-0'>Dashboard /</p>
                        <p className='mv_category_heading mv_subcategory_heading mb-0'>Category</p>
                    </div>
                </div>
            </div>
            {/* Main Table */}
            <div className="bg-white rounded shadow-sm" style={{ padding: '20px' }}>
                <Row className="mb-4 align-items-center">
                    <Col xs={12} md={6} lg={4}>
                        <InputGroup className="mb-3 search-input-group r_inputgroup">
                            <InputGroup.Text className="search-icon-container">
                                <FaSearch className="search-icon" />
                            </InputGroup.Text >
                            <Form.Control
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </InputGroup>
                    </Col>
                    <Col xs={12} md={6} lg={8}>
                        <div className="d-flex justify-content-end gap-2">
                            <Button
                                className="r_filterbtn"
                                onClick={() => setShowFilter(true)}
                            >
                                <img src={require('../mv_img/filter.png')} alt="" style={{ width: '18px', height: '18px', marginRight: '5px' }} /> Filter
                            </Button>
                            <Button onClick={() => setShowAddModal(true)} className="r_add">
                                + Add
                            </Button>
                        </div>
                    </Col>
                </Row>

                {/* Table component */}
                {getCurrentPageData().length > 0 ? (
                    <>
                        <div className="mv_product_table_padd" >
                            <table className='mv_product_table justify-content-between'>
                                <thead className="bg-light">
                                    <tr>
                                        <th>ID</th>
                                        <th>Main Category</th>
                                        <th> Name</th>
                                        <th>Status</th>
                                        <th className='d-md-flex align-items-center justify-content-end'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getCurrentPageData().map((category, index) => (
                                        <tr key={category.id}>
                                            <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                            <td> {mainCategory.find(cat => cat._id === category.mainCategoryId)?.mainCategoryName || ''}</td>
                                            <td>{category.categoryName}</td>
                                            <td>
                                                <Form.Check
                                                    type="switch"
                                                    checked={category.status}
                                                    onChange={() => handleStatusChange(category._id, category.status)}
                                                />
                                            </td>
                                            <td className='d-flex align-items-center justify-content-end'>
                                                <div className="mv_pencil_icon" onClick={() => {
                                                    setShowAddModal(true);
                                                    setId(category._id);
                                                }}>
                                                    <img src={require('../mv_img/pencil_icon.png')} alt="" />
                                                </div>
                                                <div className="mv_pencil_icon" onClick={() => {
                                                    setShowDeleteModal(true);
                                                    setId(category._id);
                                                    setCategoryToDelete(category);
                                                }}>
                                                    <img src={require('../mv_img/trust_icon.png')} alt="" />
                                                </div>
                                            </td>
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

            {/* Filter Offcanvas */}
            <Offcanvas show={showFilter} onHide={() => setShowFilter(false)} placement="end" style={{ zIndex: 9999 }}>
                <Offcanvas.Header closeButton className="border-bottom">
                    <Offcanvas.Title className="r_filtertitle">Filter</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Main Category</Form.Label>
                            <Form.Select
                                name="mainCategory"
                                value={filters.mainCategory}
                                onChange={handleFilterChange}
                            >
                                <option value="">Select</option>
                                {mainCategory.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.mainCategoryName}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>Status</Form.Label>
                            <Form.Select
                                name="status"
                                value={filters.status}
                                onChange={handleFilterChange}
                            >
                                <option value="">Select</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Offcanvas.Body>
                <div class="mv_offcanvas_bottom_button">
                    <div class="mv_logout_Model_button d-flex align-items-center justify-content-center">
                        <div class="mv_logout_cancel">
                            <button type="button" onClick={clearFilters}>Cancel</button>
                        </div>
                        <div class="mv_logout_button">
                            <button type="submit" onClick={applyFilters}>Apply</button>
                        </div>
                    </div>
                </div>
            </Offcanvas>

            {/* Add and Edt Category Modal */}
            <Modal show={showAddModal} onHide={() => { setShowAddModal(false); setId(null); }} centered>
                <Modal.Header closeButton className="mv_edit_profile_header"></Modal.Header>
                <Modal.Title className='mv_edit_profile_title' id="contained-modal-title-vcenter">
                    {id ? 'Edit Category' : 'Add Category'}
                </Modal.Title>
                <Modal.Body className="mv_edit_profile_model_padd">
                    <Formik
                        enableReinitialize={true}
                        initialValues={initialValues}
                        validationSchema={CategorySchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                            <FormikForm onSubmit={handleSubmit}>
                                <div className="mv_input_content mb-3">
                                    <label className='mv_label_input'>Main Category</label>
                                    <Field as="select" name="mainCategoryId" className="form-select">
                                        <option value="">Select Main Category</option>
                                        {mainCategory.map((category) => (
                                            <option key={category._id} value={category._id}>
                                                {category.mainCategoryName}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="mainCategoryId" component="div" className="text-danger small" />
                                </div>
                                <div className="mv_input_content mb-5">
                                    <label className='mv_label_input'>Category Name</label>
                                    <InputGroup className="">
                                        <Form.Control
                                            placeholder="Enter Category name"
                                            name='categoryName'
                                            value={values.categoryName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </InputGroup>
                                    {errors.categoryName && touched.categoryName && <div className="text-danger small">{errors.categoryName}</div>}
                                </div>
                                <div className='mv_logout_Model_button d-flex align-items-center justify-content-center mb-4'>
                                    <div className="mv_logout_cancel">
                                        <button type="button" onClick={() => { setShowAddModal(false); setId(null) }}>
                                            Cancel
                                        </button>
                                    </div>
                                    <div className="mv_logout_button">
                                        <button type="submit" disabled={isSubmitting}>
                                            {id ? 'Update' : 'Add'}
                                        </button>
                                    </div>
                                </div>
                            </FormikForm>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>


            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Body className='p-5'>
                    <h6 className='text-center fw-bold mb-3'>Delete</h6>

                    <p className='mb-4 text-center text-muted'> Are you sure you want to delete {categoryToDelete?.categoryName}?</p>
                    <div className="d-flex justify-content-center gap-2">
                        <Button onClick={() => setShowDeleteModal(false)} className="r_cancel" >
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={handleDeleteCategory} className="r_delete" >
                            Delete
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Category;