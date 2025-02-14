import React, { useEffect, useState } from 'react';
import {
    Table, Button, Offcanvas, Modal, Form, Pagination, Row,
    Col, InputGroup,
} from 'react-bootstrap';
import { FiFilter } from 'react-icons/fi';
import { FaSearch } from 'react-icons/fa';
import '../CSS/riya.css';
import axios from 'axios';

const Category = () => {

    const BaseUrl = process.env.REACT_APP_BASEURL;
    const token = localStorage.getItem('token');

    // Main categories for dropdown
    const mainCategories = [
        "Electronics",
        "Fashion",
        "Home & Living",
        "Books",
        "Sports"
    ];

    // State management
    const [categories, setCategories] = useState([]);

    const [showFilter, setShowFilter] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [filters, setFilters] = useState({
        mainCategory: '',
        status: ''
    });
    const [editingCategory, setEditingCategory] = useState(null);
    const [deletingCategory, setDeletingCategory] = useState(null);
    const [newCategory, setNewCategory] = useState({
        name: '',
        mainCategory: '',
        status: 'Active'
    });
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.get(`${BaseUrl}/api/allCategory`, {
                    headers: {Authorization: `Bearer ${token}`}
                });
                // console.log("response",response.data);
                setCategories(response.data.category);
            } catch (error) {
                console.error('Data fetching Error:',error);
            }
        }
        fetchData();
    },[BaseUrl, token]);
    // Search handler
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page when searching
    };

    // Modified filter logic to include search
    const filteredCategories = categories.filter((cat) => {
        const matchesSearch =
            cat.categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cat.mainCategoryData[0].mainCategoryName.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilters =
            (!filters.mainCategory || cat.mainCategory === filters.mainCategory) &&
            (!filters.status || cat.status === filters.status);

        return matchesSearch && matchesFilters;
    });

    // Previous handlers remain the same
    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
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

    // Previous CRUD operations remain the same
    const handleAddCategory = () => {
        setCategories([...categories, { ...newCategory, id: categories.length + 1 }]);
        setNewCategory({ name: '', mainCategory: '', status: 'Active' });
        setShowAddModal(false);
    };

    const handleEditCategory = () => {
        setCategories(
            categories.map((cat) =>
                cat.id === editingCategory.id ? editingCategory : cat
            )
        );
        setShowEditModal(false);
    };

    const handleDeleteCategory = () => {
        setCategories(categories.filter((cat) => cat.id !== deletingCategory.id));
        setShowDeleteModal(false);
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

    const handlePreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const paginationItems = [];
    paginationItems.push(
        <Pagination.Prev
            key="prev"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
        />
    );

    for (let number = 1; number <= totalPages; number++) {
        paginationItems.push(
            <Pagination.Item
                key={number}
                active={number === currentPage}
                onClick={() => setCurrentPage(number)}
            >
                {number}
            </Pagination.Item>
        );
    }

    paginationItems.push(
        <Pagination.Next
            key="next"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
        />
    );

    const handleStatusToggle = (id) => {
        setCategories(categories.map((cat) =>
            cat.id === id ? { ...cat, status: cat.status === 'Active' ? 'Inactive' : 'Active' } : cat
        ));
    };

    return (
        <div className="container-fluid">
            {/* Header with title and buttons */}
            <h5 className="mb-0 fw-bold">Category</h5>
            <div className='d-flex'>
                <p class="text-muted">Dashboard /</p>
                <p className='ms-1'>Category</p>
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
                                <FiFilter className="me-2" /> Filter
                            </Button>
                            <Button onClick={() => setShowAddModal(true)} className="r_add">
                                + Add
                            </Button>
                        </div>
                    </Col>
                </Row>
                {/* Table component */}
                <Table responsive hover borderless className="mb-0">
                    <thead className="bg-light">
                        <tr>
                            <th>ID</th>
                            <th>Main Category</th>
                            <th> Name</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((category,index) => (
                            
                            <tr key={category.id}>
                                <td>0{index + 1}</td>
                                <td>{category.mainCategoryData[0].mainCategoryName}</td>
                                <td>{category.categoryName}</td>

                                <td>
                                    <Form.Check
                                        type="switch"
                                        id={`status-switch-${category.id}`}

                                        checked={category.status === 'Active'}
                                        onChange={() => handleStatusToggle(category.id)}
                                    />
                                </td>
                                <td>
                                    <Button
                                        className="r_deleticon me-2"
                                      

                                        onClick={() => {
                                            setEditingCategory(category);
                                            setShowEditModal(true);
                                        }}
                                    >
                                        <img src={require('../Photos/edit.png')} class="r_deletimg" alt=''></img>
                                        {/* <FiEdit size={18} /> */}
                                    </Button>
                                    <Button
                                        className="r_deleticon"
                                        onClick={() => {
                                            setDeletingCategory(category);
                                            setShowDeleteModal(true);
                                        }}
                                    >
                                        <img src={require('../Photos/delet.png')} class="r_deletimg" alt=''></img>
                                        {/* <FiTrash2 size={18} /> */}
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                {/* Enhanced Pagination */}
                <div className="d-flex justify-content-end mt-3">
                    <Pagination className="mb-0">
                        {paginationItems}
                    </Pagination>
                </div>
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
                                {mainCategories.map((category, index) => (
                                    <option key={index} value={category}>
                                        {category}
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
                <div className="p-3 mt-auto">
                    <div className="d-flex gap-5">
                        <Button className="flex-grow-1 r_outlinebtn" onClick={clearFilters}>
                            Cnncel
                        </Button>
                        <Button className="flex-grow-1 r_bgbtn" onClick={applyFilters}>
                            Applay
                        </Button>

                    </div>
                </div>
            </Offcanvas>

            {/* Add Category Modal */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
                <Modal.Header closeButton className="r_modalheader">

                </Modal.Header>
                <Modal.Body className="r_modalbody">
                    <h6 className='text-center fw-bold'>Add Category</h6>
                    <Form className="r_form">
                        <Form.Group className="mb-3">
                            <Form.Label>Main Category</Form.Label>
                            <Form.Select
                                value={newCategory.mainCategory}
                                onChange={(e) =>
                                    setNewCategory({ ...newCategory, mainCategory: e.target.value })
                                }
                            >
                                <option value="">Select Main Category</option>
                                {mainCategories.map((category, index) => (
                                    <option key={index} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-5">
                            <Form.Label>Category Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={newCategory.name}
                                onChange={(e) =>
                                    setNewCategory({ ...newCategory, name: e.target.value })
                                }
                                placeholder="Enter category name"
                            />
                        </Form.Group>
                        <div className="d-flex justify-content-center gap-2 mt-4">
                            <Button onClick={() => setShowAddModal(false)} className="r_cancel">
                                Cancel
                            </Button>
                            <Button onClick={handleAddCategory} className="r_delete">
                                Add
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Edit Category Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
                <Modal.Header closeButton className="r_modalheader" >
                </Modal.Header>
                <Modal.Body className="r_modalbody">
                    <h6 className='text-center fw-bold'>Edit Category</h6>
                    <Form className="r_form">
                        <Form.Group className="mb-3">
                            <Form.Label>Main Category</Form.Label>
                            <Form.Select
                                value={editingCategory?.mainCategory || ''}
                                onChange={(e) =>
                                    setEditingCategory({
                                        ...editingCategory,
                                        mainCategory: e.target.value
                                    })
                                }
                            >
                                <option value="">Select Main Category</option>
                                {mainCategories.map((category, index) => (
                                    <option key={index} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-5">
                            <Form.Label>Category Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={editingCategory?.name || ''}
                                onChange={(e) =>
                                    setEditingCategory({
                                        ...editingCategory,
                                        name: e.target.value
                                    })
                                }
                                placeholder="Enter category name"
                            />
                        </Form.Group>
                        <div className="d-flex justify-content-center gap-2">
                            <Button onClick={() => setShowEditModal(false)} className="r_cancel">
                                Cancel
                            </Button>
                            <Button onClick={handleEditCategory} className="r_delete">
                                Update
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Body className='p-5'>
                    <h6 className='text-center fw-bold mb-3'>Delete</h6>
                    <p className='mb-4 text-center text-muted'> Are you sure you want to delete {deletingCategory?.name}?</p>
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