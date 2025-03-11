import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Offcanvas, InputGroup, Col, Row } from 'react-bootstrap';
import "../CSS/riya.css";
import { FaSearch } from 'react-icons/fa';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import axios from 'axios';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import NoResultsFound from '../Component/Noresult';


const SubCategory = () => {

    const BaseUrl = process.env.REACT_APP_BASEURL;
    const token = localStorage.getItem('token');

    const [subCategories, setSubCategories] = useState([]);
    const [category, setCategory] = useState([]);
    const [mainCategory, setMainCategory] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const [showAddEditModal, setShowAddEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({ category: '', mainCategory: '', status: '' });
    const [id, setId] = useState(null);
    const [subCatToDelete, setSubCatToDelete] = useState(null);
    const [filteredCategories, setFilteredCategories] = useState([]); // use for Filter category
    const [initialValues, setInitialValues] = useState({
        mainCategoryId: '',
        categoryId: '',
        subCategoryName: '',
    });

    const validationSchema = Yup.object().shape({
        mainCategoryId: Yup.string().required('Main Category is required'),
        categoryId: Yup.string().required('Category is required'),
        subCategoryName: Yup.string().min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Sub Category Name is required'),
    });

    useEffect(() => {
        const fetchSubCategory = async () => {
            try {
                const response = await axios.get(`${BaseUrl}/api/allSubCategory`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // console.log("response??????",response.data.subCategory);
                setSubCategories(response.data.subCategory);
            } catch (error) {
                console.error('Data fetching error:', error);
            }
        }

        const fetchCategory = async () => {
            try {
                const response = await axios.get(`${BaseUrl}/api/allCategory`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // console.log("Response>>>>>>>",response.data.category);
                setCategory(response.data.category);
            } catch (error) {
                console.error('Data Fetching Error:', error);
            }
        }
        const fetchMainCategory = async () => {
            try {
                const response = await axios.get(`${BaseUrl}/api/allMainCategory`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // console.log("Response>>>>>>>",response.data.users);
                setMainCategory(response.data.users);
            } catch (error) {
                console.error('Data Fetching Error:', error);
            }
        }

        fetchSubCategory();
        fetchCategory();
        fetchMainCategory();
    }, [BaseUrl, token]);

    useEffect(() => {
        const fetchSingleSubCategory = async () => {
            if (id) {
                try {
                    const response = await axios.get(`${BaseUrl}/api/getSubCategory/${id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    // console.log("response", response.data.subCategory);
                    const subcategoryData = response.data.subCategory;
                    setInitialValues({
                        mainCategoryId: subcategoryData.mainCategoryId,
                        categoryId: subcategoryData.categoryId,
                        subCategoryName: subcategoryData.subCategoryName
                    });

                    // When editing, filter categories based on the mainCategoryId
                    filterCategoriesByMainCategory(subcategoryData.mainCategoryId);
                } catch (error) {
                    console.error('Data Fetching Error:', error);
                }
            } else {
                setInitialValues({
                    mainCategoryId: '',
                    categoryId: '',
                    subCategoryName: ''
                });
                setFilteredCategories([]);
            }
        }
        fetchSingleSubCategory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, BaseUrl, token]);

    // Function to filter categories based on selected main category
    const filterCategoriesByMainCategory = (mainCatId) => {
        if (!mainCatId) {
            setFilteredCategories([]);
            return;
        }

        const relatedCategories = category.filter(cat => cat.mainCategoryId === mainCatId);
        setFilteredCategories(relatedCategories);
    };

    // Watch for filter changes
    useEffect(() => {
        if (filters.mainCategory) {
            filterCategoriesByMainCategory(filters.mainCategory);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters.mainCategory, category]);

    const handleSubmit = async (values, { setFieldError }) => {
        setId(id);
        try {
            if (id) {
                const response = await axios.put(`${BaseUrl}/api/updateSubCategory/${id}`, values, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // console.log("REsposne", response);
                if (response.data.status === 200) {
                    setId(null);
                    setShowAddEditModal(false);
                    setSubCategories((prevSubCat) => prevSubCat.map((sub) => sub._id === id ? { ...sub, ...values } : sub));
                }
            } else {
                const response = await axios.post(`${BaseUrl}/api/createSubCategory`, values, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // console.log("response", response);
                if (response.data.status === 201) {
                    setShowAddEditModal(false);
                    setSubCategories((prevSubCat) => [...prevSubCat, response.data.subCategory]);
                }
            }
        } catch (error) {
            console.error('Data Create and update error:', error);
            if (error.response && error.response.status === 409) {
                setFieldError('subCategoryName', 'Sub category name already exists');
            }
        }
    }

    const handleStatusChange = async (id, status) => {
        try {
            const updatedStatus = !status
            const response = await axios.put(`${BaseUrl}/api/updateSubCategory/${id}`, { status: updatedStatus }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // console.log("Response",response.data);
            if (response.data.status === 200) {
                setSubCategories((prevSubCat) => prevSubCat.map((sub) =>
                    sub._id === id ? { ...sub, status: updatedStatus } : sub
                ))
            }
        } catch (error) {
            console.error('Data Fetching Error:', error);
        }

    };

    const getFilteredData = () => {
        return subCategories.filter((sub) => {

            const matchesSearch = sub.subCategoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                sub.mainCategoryData[0]?.mainCategoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                sub.categoriesData[0]?.categoryName.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesMainCategory = !filters.mainCategory || sub.mainCategoryId === filters.mainCategory;
            const matchesCategory = !filters.category || sub.categoryId === filters.category;
            const matchesStatus = !filters.status ||
                (filters.status === 'Active' ? sub.status : filters.status === 'Inactive' ? !sub.status : true);

            return matchesSearch && matchesMainCategory && matchesCategory && matchesStatus;
        });
    };

    useEffect(() => {
        const filtered = getFilteredData();
        setFilteredData(filtered);
        setCurrentPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery, filters, subCategories]);

    // ************************************** Pagination **************************************
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredData, setFilteredData] = useState(subCategories);

    const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
    //   console.log("totalpage",totalPages)

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

    const handleDelete = async () => {
        const response = await axios.delete(`${BaseUrl}/api/deleteSubCategory/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        // console.log("DeleteRespo", response.data);
        if (response.data.status === 200) {
            setSubCategories((prevSubCat) => prevSubCat.filter((sub) => sub._id !== id));
            setShowDeleteModal(false);
            setSubCatToDelete(null);
        }
    };

    const handleApplyFilters = () => {
        setShowFilter(false);
    };

    const handleClearFilters = () => {
        setShowFilter(false);
        setFilters({ category: '', mainCategory: '', status: '' });
        setSearchQuery('');
    };

    return (
        <div>
            <div className="mv_main_heading mb-4 d-flex align-items-center justify-content-between">
                <div>
                    <p className='mb-1'>Sub Category</p>
                    <div className='d-flex align-items-center'>
                        <p className='mv_dashboard_heading mb-0'>Dashboard /</p>
                        <p className='mv_category_heading mv_subcategory_heading mb-0'>Sub Category</p>
                    </div>
                </div>
            </div>
            <div style={{ backgroundColor: 'white', padding: '20px' }}>
                <Row className="mb-4 align-items-center">
                    <Col xs={12} md={6} lg={4}>
                        <InputGroup className="mb-3 search-input-group r_inputgroup">
                            <InputGroup.Text className="search-icon-container">
                                <FaSearch className="search-icon" />
                            </InputGroup.Text >
                            <Form.Control
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input"
                            />
                        </InputGroup>
                    </Col>
                    <Col xs={12} md={6} lg={8}>
                        <div className="d-flex justify-content-end gap-2">
                            <Button className="r_filterbtn" onClick={() => setShowFilter(true)} >
                                <img src={require('../mv_img/filter.png')} alt="" style={{ width: '18px', height: '18px', marginRight: '5px' }} /> Filter
                            </Button>
                            <Button onClick={() => {
                                // setCurrentSubCategory(null);
                                setShowAddEditModal(true);
                            }} className="r_add">
                                + Add
                            </Button>
                        </div>
                    </Col>
                </Row>
                {paginatedData.length > 0 ? (
                    <>
                        <div className="mv_product_table_padd" >
                            <table className='mv_product_table justify-content-between'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Main Category</th>
                                        <th>Category</th>
                                        <th>Name</th>
                                        <th>Status</th>
                                        <th className='d-md-flex align-items-center justify-content-end'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedData.map((sub, index) => (
                                        <tr key={index}>
                                            {/* {console.log("sub?????????",sub)} */}
                                            <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                            <td>{mainCategory.find((main) => main._id === sub.mainCategoryId)?.mainCategoryName || ''}</td>
                                            <td>{category.find((main) => main._id === sub.categoryId)?.categoryName || ''}</td>
                                            <td>{sub.subCategoryName}</td>
                                            <td>
                                                <Form.Check
                                                    type="switch"
                                                    checked={sub.status}
                                                    onChange={() => handleStatusChange(sub._id, sub.status)}
                                                    className="status-switch"
                                                />
                                            </td>
                                            <td className='d-flex align-items-center justify-content-end'>
                                                <div className="mv_pencil_icon" onClick={() => {
                                                    setId(sub._id);
                                                    setShowAddEditModal(true);
                                                }}>
                                                    <img src={require('../mv_img/pencil_icon.png')} alt="" />
                                                </div>
                                                <div className="mv_pencil_icon" onClick={() => {
                                                    setId(sub._id);
                                                    setShowDeleteModal(true);
                                                    setSubCatToDelete(sub.subCategoryName);
                                                }}>
                                                    <img src={require('../mv_img/trust_icon.png')} alt="" />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Enhanced Pagination */}
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

                {/* Filter Offcanvas */}
                <Offcanvas show={showFilter} onHide={() => setShowFilter(false)} placement="end">
                    <Offcanvas.Header closeButton >
                        <Offcanvas.Title className="r_filtertitle">Filter </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Form onSubmit={(e) => {
                            e.preventDefault();
                            setShowFilter(false);
                        }}>
                            <Form.Group className="mb-3">
                                <Form.Label>Main Category</Form.Label>
                                <Form.Select
                                    value={filters.mainCategory}
                                    onChange={(e) => setFilters({ ...filters, mainCategory: e.target.value })}
                                >
                                    <option value="">Select Main Category</option>
                                    {mainCategory.map((mainCat) => (
                                        <option key={mainCat._id} value={mainCat._id}>{mainCat.mainCategoryName}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Category</Form.Label>
                                <Form.Select
                                    value={filters.category}
                                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                                >
                                    <option value="">Select Category</option>
                                    {filters.mainCategory ?
                                        filteredCategories.map((cat) => (
                                            <option key={cat._id} value={cat._id}>{cat.categoryName}</option>
                                        ))
                                        :
                                        category.map((cat) => (
                                            <option key={cat._id} value={cat._id}>{cat.categoryName}</option>
                                        ))
                                    }
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Status</Form.Label>
                                <Form.Select
                                    value={filters.status}
                                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                >
                                    <option value="">Select Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </Form.Select>
                            </Form.Group>
                        </Form>
                    </Offcanvas.Body>
                    <div class="mv_offcanvas_bottom_button">
                        <div class="mv_logout_Model_button d-flex align-items-center justify-content-center">
                            <div class="mv_logout_cancel">
                                <button type="button" onClick={handleClearFilters}>Cancel</button>
                            </div>
                            <div class="mv_logout_button">
                                <button type="submit" onClick={handleApplyFilters}>Apply</button>
                            </div>
                        </div>
                    </div>
                </Offcanvas>

                {/* Add and Update Subcategory Modal */}
                <Modal show={showAddEditModal} onHide={() => { setShowAddEditModal(false); setId(null); }} centered>
                <Modal.Header className='mv_edit_profile_header' closeButton>

                </Modal.Header>
                <Modal.Title className='mv_edit_profile_title' id="contained-modal-title-vcenter">
                    {id ? 'Edit Sub Category' : 'Add Sub Category'}
                </Modal.Title>
                    <Modal.Body className="r_modalbody">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                            enableReinitialize={true}
                        >
                            {({ handleBlur,handleChange, handleSubmit, setFieldValue, values }) => (
                                <FormikForm onSubmit={handleSubmit} className="r_form">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Main Category</Form.Label>
                                        <Field
                                            as="select"
                                            name="mainCategoryId"
                                            className="form-select"
                                            onChange={(e) => {
                                                const mainCatId = e.target.value;
                                                setFieldValue('mainCategoryId', mainCatId);
                                                setFieldValue('categoryId', ''); // Reset category when main category changes
                                                filterCategoriesByMainCategory(mainCatId);
                                            }}
                                        >
                                            <option value="">Select</option>
                                            {mainCategory.map((main) => (
                                                <option key={main._id} value={main._id}>
                                                    {main.mainCategoryName}
                                                </option>
                                            ))}
                                        </Field>
                                        <ErrorMessage name="mainCategoryId" component="small" className="text-danger" />
                                    </Form.Group>
                                    
                                    <div className="mv_input_content mb-3">
                                        <label className='mv_label_input'>Category</label>
                                        <Form.Select
                                            name="categoryId"
                                            value={values.categoryId}
                                            disabled={!values.mainCategoryId}
                                            onChange={(e) => {
                                                handleChange(e);
                                            }}
                                            onBlur={handleBlur}
                                            className='mv_form_select'>
                                            <option>Select</option>
                                            {filteredCategories.map((cat) => (
                                                <option key={cat._id} value={cat._id}>
                                                    {cat.categoryName}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        <ErrorMessage name="categoryId" component="small" className="text-danger" />
                                    </div>

                                    <div className="mv_input_content mb-5">
                                        <label className='mv_label_input'>Sub Category</label>
                                        <InputGroup className="">
                                            <Form.Control
                                            placeholder="Enter sub category"
                                            name='subCategoryName'
                                            value={values.subCategoryName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            />
                                        </InputGroup>
                                        <ErrorMessage name="subCategoryName" component="small" className="text-danger" />
                                    </div>

                                    <div className="d-flex justify-content-center gap-2 mt-4">
                                        <Button onClick={() => {
                                            setShowAddEditModal(false);
                                            setId(null);
                                        }} className="r_cancel">
                                            Cancel
                                        </Button>
                                        <Button type="submit" className="r_delete">
                                            {id ? 'Update' : 'Add'}
                                        </Button>
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
                        <p className='mb-4 text-center text-muted'>Are you sure you want to delete {subCatToDelete}?</p>
                        <div className="d-flex justify-content-center gap-2">
                            <Button className="r_cancel" onClick={() => setShowDeleteModal(false)}>
                                Cancel
                            </Button>
                            <Button className="r_delete" onClick={handleDelete}>
                                Delete
                            </Button>
                        </div>
                    </Modal.Body>

                </Modal>
            </div>
        </div>
    );
};

export default SubCategory;