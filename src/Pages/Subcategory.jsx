import React, { useState } from 'react';
import { Table, Button, Offcanvas, Modal, Form, Pagination } from 'react-bootstrap';
import { FiFilter } from 'react-icons/fi';
import '../CSS/riya.css';

const CategoryManagement = () => {
    // Main categories for dropdown
    const mainCategories = [
        "Electronics",
        "Fashion",
        "Home & Living",
        "Books",
        "Sports"
    ];

    // State management
    const [categories, setCategories] = useState([
        { id: 1, name: 'Smartphones', mainCategory: 'Electronics', status: 'Active' },
        { id: 2, name: 'Laptops', mainCategory: 'Electronics', status: 'Inactive' },
        { id: 3, name: 'T-Shirts', mainCategory: 'Fashion', status: 'Active' },
        { id: 4, name: 'Smartphones', mainCategory: 'Electronics', status: 'Active' },
        { id: 5, name: 'Laptops', mainCategory: 'Electronics', status: 'Inactive' },
        { id: 6, name: 'T-Shirts', mainCategory: 'Fashion', status: 'Active' },
        { id: 7, name: 'Smartphones', mainCategory: 'Electronics', status: 'Active' },
        { id: 8, name: 'Laptops', mainCategory: 'Electronics', status: 'Inactive' },
        { id: 9, name: 'T-Shirts', mainCategory: 'Fashion', status: 'Active' },
        { id: 10, name: 'Smartphones', mainCategory: 'Electronics', status: 'Active' },
        { id: 11, name: 'Laptops', mainCategory: 'Electronics', status: 'Inactive' },
        { id: 12, name: 'T-Shirts', mainCategory: 'Fashion', status: 'Active' },
        // Add more sample data as needed
    ]);

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

    // Search handler
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page when searching
    };

    // Modified filter logic to include search
    const filteredCategories = categories.filter((cat) => {
        const matchesSearch =
            cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cat.mainCategory.toLowerCase().includes(searchTerm.toLowerCase());

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
            <h4 className="mb-0">Category</h4>
            <p className="text-muted">Dashboard <span>/ Category</span></p>


            {/* Main Table */}
            <div className="bg-white rounded shadow-sm" style={{ padding: '20px' }}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <input
                            type="search"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="form-control"
                            style={{ minWidth: '200px' }}
                        />
                    </div>
                    <div className="d-flex gap-2">
                        <Button
                            variant="outline-secondary"
                            onClick={() => setShowFilter(true)}
                            className="d-flex align-items-center"
                            style={{ padding: '5px 30px', borderRadius: '0' }}
                        >
                            <FiFilter className="me-2" /> Filter
                        </Button>
                        <Button variant="dark" onClick={() => setShowAddModal(true)} style={{ padding: '5px 30px', borderRadius: '0' }}>
                            + Add
                        </Button>
                    </div>
                </div>

                {/* Table component */}
                <Table responsive hover borderless className="mb-0">
                    <thead className="bg-light">
                        <tr>
                            <th>ID</th>
                            <th>Category Name</th>
                            <th>Main Category</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((category) => (
                            <tr key={category.id}>
                                <td>{category.id}</td>
                                <td>{category.name}</td>
                                <td>{category.mainCategory}</td>
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
                                        variant="link"
                                        className="p-0 me-2 text-primary"
                                        onClick={() => {
                                            setEditingCategory(category);
                                            setShowEditModal(true);
                                        }}
                                    >
                                        <img src={require('../Photos/edit.png')} style={{ border: '1px solid #919191', padding: '2px' }}></img>
                                        {/* <FiEdit size={18} /> */}
                                    </Button>
                                    <Button
                                        variant="link"
                                        className="p-0 text-danger"
                                        onClick={() => {
                                            setDeletingCategory(category);
                                            setShowDeleteModal(true);
                                        }}
                                    >
                                        <img src={require('../Photos/delet.png')} style={{ border: '1px solid #919191', padding: '2px' }}></img>
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
                    <Offcanvas.Title>Filter</Offcanvas.Title>
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
                        <div className="d-flex justify-content-space-between gap-2">
                            <Button variant="outline-secondary" onClick={applyFilters}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={clearFilters}>
                                Applay
                            </Button>
                        </div>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>

            {/* Add Category Modal */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
                <Modal.Header closeButton>
                   
                </Modal.Header>
                <Modal.Body>
                    <h6 className='text-center fw-bold'>Add Category</h6>
                    <Form>
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
                        <div className="d-flex justify-content-center gap-2">
                        <Button variant="secondary" onClick={() => setShowAddModal(false)} className='r_btn text-black' style={{ backgroundColor: "transparent" }}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAddCategory} className='r_btn text-white' style={{ backgroundColor: "black" }}>
                        Add
                    </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Edit Category Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
                <Modal.Header closeButton >
                </Modal.Header>
                <Modal.Body>
                <h6 className='text-center fw-bold'>Edit Category</h6>
                    <Form>
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
                        <Button variant="secondary" onClick={() => setShowEditModal(false)} className='r_btn text-black' style={{ backgroundColor: "transparent" }}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleEditCategory} className='r_btn text-white' style={{ backgroundColor: "black" }}>
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
                   <p className='mb-4 text-center'> Are you sure you want to delete "{deletingCategory?.name}"?</p>
                    <div className="d-flex justify-content-center gap-2">
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)} className='r_btn text-black' style={{ backgroundColor: "transparent" }}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteCategory} className='r_btn text-white' style={{ backgroundColor: "black" }}>
                        Delete
                    </Button>
                    </div>
                </Modal.Body>
                </Modal>
        </div>
    );
};

export default CategoryManagement;