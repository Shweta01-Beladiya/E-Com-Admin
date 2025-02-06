import React, { useState } from "react";
import { Modal, Button, Form, Table, Offcanvas } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import '../CSS/riya.css';
import { FaFilter } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

const Subcategory = () => {
    const [categories, setCategories] = useState([
        { id: 1, mainname: "Women", subname: "Indian Wear", name:"Saree", status: true },
        { id: 2, mainname: "Men", subname: "Western Wear", name:"Blazer", status: false },
        { id: 4, mainname: "Beauty & Health", subname: "Baby Care", name:"Baby Soap", status: true },
        { id: 6, mainname: "Sports", subname: "Shoes", name:"Sports shoes", status: true },
        { id: 7, mainname: "Luggage", subname: "Bag Packs", name:"Duffle Bag", status: true },
        { id: 9, mainname: "Women", subname: "Sunglasses & Frames", name:"Goggles", status: true },
        { id: 10, mainname: "Men", subname: "Footwear", name:"Men's Sandal", status: false },
        { id: 12,mainname: "Beauty & Health", subname: "Skin Care", name:"Facewash", status: true },
    ]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [showFilter, setShowFilter] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const [filters, setFilters] = useState({
        mainCategory: '',
        status: ''
    });
    const handleAdd = (newCategory) => {
        setCategories([
            ...categories,
            { id: categories.length + 1, name: newCategory, status: true },
        ]);
        setShowAddModal(false);
    };

    const handleEdit = (updatedCategory) => {
        setCategories(
            categories.map((cat) =>
                cat.id === currentCategory.id
                    ? { ...cat, name: updatedCategory }
                    : cat
            )
        );
        setShowEditModal(false);
    };

    const handleDelete = () => {
        setCategories(categories.filter((cat) => cat.id !== currentCategory.id));
        setShowDeleteModal(false);
    };

    const handleFilterChange = (field, value) => {
        setFilters(prev => ({
            ...prev,
            [field]: value
        }));
        setCurrentPage(1);
    };

    const handleFilterApply = () => {
        // Reset filters if both fields are empty or "Select"
        if ((!filters.mainCategory || filters.mainCategory === "Select") &&
            (!filters.status || filters.status === "Select")) {
            setFilters({
                mainCategory: '',
                status: ''
            });
        }
        setCurrentPage(1); // Reset to first page when applying filters
        setShowFilter(false);
    };

    const handleFilterReset = () => {
        setFilters({
            mainCategory: '',
            status: ''
        });
        setCurrentPage(1); // Reset to first page when resetting filters
        setShowFilter(false);
    };

    const getFilteredCategories = () => {
        return categories.filter(cat => {
            // First apply search term filter
            const matchesSearch = cat.name.toLowerCase().includes(searchTerm.toLowerCase());

            // Then apply main category filter
            const matchesCategory = !filters.mainCategory ||
                filters.mainCategory === "Select" ||
                cat.name === filters.mainCategory;

            // Then apply status filter
            const matchesStatus = !filters.status ||
                filters.status === "Select" ||
                (filters.status === "available" ? cat.status : !cat.status);

            return matchesSearch && matchesCategory && matchesStatus;
        });
    };


    // Get current items for pagination
    const filteredCategories = getFilteredCategories();
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate total pages
    const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

    // Pagination change handler
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    return (
        <div>
            <h4 className="mb-0">Main Category</h4>
            <p className="text-muted">Dashboard <span>/ Main Category</span></p>
            <div style={{ backgroundColor: 'white', padding: '20px' }}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <input
                            type="text"
                            className="form-control w-50"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="gap-3 d-flex">
                        <Button
                            variant="outline-secondary"
                            onClick={() => setShowFilter(true)}
                        >
                            <FaFilter className="me-2" />
                            Filter
                            {(filters.mainCategory || filters.status) &&
                                filters.mainCategory !== "Select" &&
                                filters.status !== "Select" &&
                                " (Active)"}
                        </Button>
                        <Button variant="dark" onClick={() => setShowAddModal(true)}>
                            + Add
                        </Button>
                    </div>
                </div>

                {/* Display active filters if any */}
                {(filters.mainCategory || filters.status) &&
                    filters.mainCategory !== "Select" &&
                    filters.status !== "Select" && (
                        <div className="mb-3 p-2 bg-light rounded">
                            <strong>Active Filters:</strong>
                            {filters.mainCategory && filters.mainCategory !== "Select" && (
                                <span className="ms-2 badge bg-secondary">
                                    Category: {filters.mainCategory}
                                </span>
                            )}
                            {filters.status && filters.status !== "Select" && (
                                <span className="ms-2 badge bg-secondary">
                                    Status: {filters.status}
                                </span>
                            )}
                            <Button
                                variant="link"
                                size="sm"
                                className="ms-2"
                                onClick={handleFilterReset}
                            >
                                Clear Filters
                            </Button>
                        </div>
                    )}

                <Table hover responsive borderless>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Main Category</th>
                            <th>Category</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((cat) => (
                            <tr key={cat.id}>
                                <td>{cat.id.toString().padStart(2, "0")}</td>
                                <td>{cat.mainname}</td>
                                <td>{cat.subname}</td>
                                <td>{cat.name}</td>
                                <td>
                                    <Form.Check
                                        type="switch"
                                        checked={cat.status}
                                        onChange={() =>
                                            setCategories(
                                                categories.map((c) =>
                                                    c.id === cat.id ? { ...c, status: !c.status } : c
                                                )
                                            )
                                        }
                                    />
                                </td>
                                <td>
                                    <Button
                                        variant="success"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => {
                                            setCurrentCategory(cat);
                                            setShowEditModal(true);
                                        }}
                                    >
                                        <FaEdit />
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => {
                                            setCurrentCategory(cat);
                                            setShowDeleteModal(true);
                                        }}
                                    >
                                        <FaTrash />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className="d-flex justify-content-end mt-3">
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                <FaAngleLeft />
                            </button>
                        </li>
                        {[...Array(totalPages)].map((_, index) => (
                            <li
                                key={index + 1}
                                className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                <FaAngleRight />
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Add Modal */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <p className="text-center fw-bold">Add Main Category</p>
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const newCategory = e.target.elements.categoryName.value;
                            handleAdd(newCategory);
                        }}
                    >
                        <Form.Group className="mb-4">
                            <Form.Label>Main Category</Form.Label>
                            <Form.Control
                                type="text"
                                name="categoryName"
                                placeholder="Enter main category"
                                required
                            />
                        </Form.Group>
                        <div className='d-flex justify-content-center gap-3'>
                            <Button
                                variant="secondary"
                                onClick={() => setShowAddModal(false)}
                                className='r_btn text-black'
                                style={{ backgroundColor: "transparent" }}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="dark"
                                type="submit"
                                className="r_btn text-white"
                                style={{ backgroundColor: "black" }}
                            >
                                Add
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <p className="text-center fw-bold">Edit Main Category</p>
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const updatedCategory = e.target.elements.categoryName.value;
                            handleEdit(updatedCategory);
                        }}
                    >
                        <Form.Group className="mb-4">
                            <Form.Label>Main Category</Form.Label>
                            <Form.Control
                                type="text"
                                name="categoryName"
                                defaultValue={currentCategory?.name}
                                required
                            />
                        </Form.Group>
                        <div className='d-flex justify-content-center gap-3'>
                            <Button
                                variant="secondary"
                                onClick={() => setShowEditModal(false)}
                                className='r_btn text-black'
                                style={{ backgroundColor: "transparent" }}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="dark"
                                type="submit"
                                className="ms-2 r_btn text-white"
                                style={{ backgroundColor: "black" }}
                            >
                                Update
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Delete Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <p className="text-center fw-bold">Delete</p>
                    Are you sure you want to delete{" "}
                    <strong>{currentCategory?.name}</strong>?
                </Modal.Body>
                <div className='d-flex justify-content-center gap-3 mt-4'>
                    <Button
                        variant="secondary"
                        onClick={() => setShowDeleteModal(false)}
                        className='r_btn text-black'
                        style={{ backgroundColor: "transparent" }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                        onClick={handleDelete}
                        className='r_btn text-white'
                        style={{ backgroundColor: "black" }}
                    >
                        Delete
                    </Button>
                </div>
            </Modal>

            {/* Offcanvas for Filter */}
            <Offcanvas
                show={showFilter}
                onHide={() => setShowFilter(false)}
                placement="end"
                style={{ zIndex: 9999 }}
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Filter</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Main Category</Form.Label>
                            <Form.Control
                                as="select"
                                value={filters.mainCategory}
                                onChange={(e) => handleFilterChange('mainCategory', e.target.value)}
                            >
                                <option>Select</option>
                                <option>Women</option>
                                <option>Men</option>
                                <option>Kids</option>
                                <option>Beauty & Health</option>
                                <option>Mobile & Electronics</option>
                                <option>Sports</option>
                                <option>Luggage</option>
                                <option>Home & Kitchen</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                as="select"
                                value={filters.Category}
                                onChange={(e) => handleFilterChange('Category', e.target.value)}
                            >
                                <option>Select</option>
                                <option>Indian Wear</option>
                                <option>Western Wear</option>
                                <option>Watches</option>
                                <option>Footwear</option>
                                <option>Sports & Active Wear</option>
                                <option>Lingerie & Sleepwear</option>
                                <option>Beauty & Personal Care</option>
                                <option>Bags</option>
                                <option>Jewellary</option>
                                <option>Sunglasses & Frames</option>
                                <option>Maternity</option>
                                <option>Belts,Scarves & More</option>
                                <option>Topwear</option>
                                <option>Bottomwear</option>
                                <option>Indian & Festive Wear</option>
                                <option>Innerwear & Sleepwear</option>
                                <option>Parsonal Care & Grooming</option>
                                <option>Boy</option>
                                <option>Girl</option>
                                <option>Toys & Games</option>
                                <option>Kids Accessories</option>
                                <option>Winterwear</option>
                                <option>Toys & Games</option>
                                <option>Toys & Games</option>
                                <option>Toys & Games</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                value={filters.status}
                                onChange={(e) => handleFilterChange('status', e.target.value)}
                            >
                                <option>Select</option>
                                <option value="available">Available</option>
                                <option value="unavailable">Unavailable</option>
                            </Form.Control>
                        </Form.Group>
                        <div className='d-flex justify-content-end'>
                            <Button
                                variant="secondary"
                                onClick={handleFilterReset}
                                className='me-2'
                            >
                                Reset
                            </Button>
                            <Button
                                variant="dark"
                                onClick={handleFilterApply}
                            >
                                Apply
                            </Button>
                        </div>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
};

export default Subcategory;
