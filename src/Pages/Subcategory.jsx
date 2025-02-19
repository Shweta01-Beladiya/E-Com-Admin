import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Table, Pagination, Offcanvas, InputGroup, Col, Row } from 'react-bootstrap';
import { FaFilter } from "react-icons/fa6";
import "../CSS/riya.css";
import { FaSearch } from 'react-icons/fa';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import axios from 'axios';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


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
    const [filteredCategories, setFilteredCategories] = useState([]); // use for Fileter category
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
    }, []);

    useEffect(() => {
        const fetchSingleSubCategory = async () => {
            if (id) {
                try {
                    const response = await axios.get(`${BaseUrl}/api/getSubCategory/${id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    console.log("response", response.data.subCategory);
                    const subcategoryData = response.data.subCategory;
                    setInitialValues({
                        mainCategoryId: subcategoryData.mainCategoryId,
                        categoryId: subcategoryData.categoryId,
                        subCategoryName: subcategoryData.subCategoryName
                    })
                } catch (error) {
                    console.error('Data Fetching Error:', error);
                }
            } else {
                setInitialValues({
                    mainCategoryId: '',
                    categoryId: '',
                    subCategoryName: ''
                })
            }
        }
        fetchSingleSubCategory();

    }, [id, BaseUrl, token])

    const handleSubmit = async (values) => {
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
                sub.mainCategoryData[0].mainCategoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                sub.categoriesData[0].categoryName.toLowerCase().includes(searchQuery.toLowerCase());

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
    }, [searchQuery, filters, subCategories]);

    useEffect(() => {
        const handleCategoryFilter = (mainCatId) => {
            if (!mainCatId) {
                setFilteredCategories([]); // Reset filtered categories if no main category selected
                return;
            }

            const relatedCategories = category.filter(cat => cat.mainCategoryId === mainCatId);
            setFilteredCategories(relatedCategories);
        };

        // For the filter modal
        if (filters.mainCategory) {
            handleCategoryFilter(filters.mainCategory);
        }

        // For the add/edit form - watch initialValues.mainCategoryId
        if (initialValues.mainCategoryId) {
            handleCategoryFilter(initialValues.mainCategoryId);
        }
    }, [filters.mainCategory, initialValues.mainCategoryId, category]);

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
        setFilters({ category: '', mainCategory: '', status: '' });
        setSearchQuery('');
    };

    // No Results Found Component
    const NoResultsFound = () => (
        <div style={{ transform: 'translateY(50%)' }}>
            <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <img src={require('../Photos/notfind.png')}></img>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-2">Result Not Found</h3>
                </div>
                <div>
                    <p className="text-gray-500">Whoops... No matching data found</p>
                </div>
            </div>
        </div>
    );

    return (
        <div>
            <h5 className="mb-0 fw-bold">Sub Category</h5>
            <div className='d-flex'>
                <p class="text-muted">Dashboard /</p>
                <p className='ms-1'>Sub Category</p>
            </div>
            <div style={{ backgroundColor: 'white', padding: '20px', height:'100vh' }}>
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
                                <FaFilter className='me-2' /> Filter
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
                        <Table responsive borderless>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Main Category</th>
                                    <th>Category</th>
                                    <th>Name</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.map((sub, index) => (
                                    <tr key={index}>
                                        {/* {console.log("sub?????????",sub)} */}
                                        <td>{index + 1}</td>
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
                                        <td>
                                            <Button
                                                className="r_deleticon me-2"
                                                onClick={() => {
                                                    setId(sub._id);
                                                    setShowAddEditModal(true);
                                                }}
                                            >
                                                <img src={require('../Photos/edit.png')} className="r_deletimg" alt="edit" />
                                            </Button>
                                            <Button
                                                className="r_deleticon"
                                                onClick={() => {
                                                    setId(sub._id);
                                                    setShowDeleteModal(true);
                                                    setSubCatToDelete(sub.subCategoryName);
                                                }}
                                            >
                                                <img src={require('../Photos/delet.png')} className="r_deletimg" alt="delete" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                        {/* Enhanced Pagination */}
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
                                <Form.Control
                                    as="select"
                                    value={filters.mainCategory}
                                    onChange={(e) => setFilters({ ...filters, mainCategory: e.target.value })}
                                >
                                    <option value="">Select Main Category</option>
                                    {mainCategory.map((mainCat) => (
                                        <option key={mainCat._id} value={mainCat._id}>{mainCat.mainCategoryName}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={filters.category}
                                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                                >
                                    <option value="">Select Category</option>
                                    {category.map((cat) => (
                                        <option key={cat._id} value={cat._id}>{cat.categoryName}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Status</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={filters.status}
                                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                >
                                    <option value="">Select Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </Offcanvas.Body>
                    <div className="p-3 mt-auto">
                        <div className="d-flex gap-5">
                            <Button className="flex-grow-1 r_outlinebtn" onClick={handleClearFilters}>
                                Cancel
                            </Button>
                            <Button className="flex-grow-1 r_bgbtn" type="submit" onClick={handleApplyFilters}>
                                Apply
                            </Button>
                        </div>
                    </div>
                </Offcanvas>

                {/* Add and Update Subcategory Modal */}
                <Modal show={showAddEditModal} onHide={() => { setShowAddEditModal(false); setId(null); }} centered>
                    <Modal.Header closeButton className="r_modalheader">
                    </Modal.Header>
                    <Modal.Body className="r_modalbody">
                        <h6 className='text-center fw-bold'>{id ? 'Edit Sub Category' : 'Add Sub Category'}</h6>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                            enableReinitialize={true}
                        >
                            {({ handleSubmit, setFieldValue }) => (
                                <FormikForm onSubmit={handleSubmit} className="r_form">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Main Category</Form.Label>
                                        <Field
                                            as="select"
                                            name="mainCategoryId"
                                            className="form-control"
                                            onChange={(e) => {
                                                setFieldValue('mainCategoryId', e.target.value);
                                                setFieldValue('categoryId', ''); // Reset category when main category changes
                                                const relatedCategories = category.filter(
                                                    cat => cat.mainCategoryId === e.target.value
                                                );
                                                setFilteredCategories(relatedCategories);
                                            }}
                                        >
                                            <option value="">Select</option>
                                            {mainCategory.map((main) => (
                                                <option key={main._id} value={main._id}>
                                                    {main.mainCategoryName}
                                                </option>
                                            ))}
                                        </Field>
                                        <ErrorMessage name="mainCategoryId" component="div" className="text-danger" />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Category</Form.Label>
                                        <Field
                                            as="select"
                                            name="categoryId"
                                            className="form-control"
                                        // disabled={!initialValues.mainCategoryId} 
                                        >
                                            <option value="">Select</option>
                                            {filteredCategories.map((cat) => (
                                                <option key={cat._id} value={cat._id}>
                                                    {cat.categoryName}
                                                </option>
                                            ))}
                                        </Field>
                                        <ErrorMessage name="categoryId" component="div" className="text-danger" />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Sub Category</Form.Label>
                                        <Field
                                            type="text"
                                            name="subCategoryName"
                                            placeholder="Enter Sub Category"
                                            className="form-control"
                                        />
                                        <ErrorMessage name="subCategoryName" component="div" className="text-danger" />
                                    </Form.Group>

                                    <div className="d-flex justify-content-center gap-2 mt-4">
                                        <Button onClick={() => setShowAddEditModal(false)} className="r_cancel">
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
