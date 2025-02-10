import React, { useState } from 'react';
import { Button, Modal, Form, Table, Pagination, Offcanvas } from 'react-bootstrap';
import { FaFilter } from "react-icons/fa6";
import "../CSS/riya.css";


const SubCategoryManagement = () => {
    const mainCategories = [
        "Woman",
        "Men",
        "Kids",
        "Beauty & Health",
        "Mobile & Electronics",
        "Sports",
        "Luggage",
        "Home & Kitchen"
    ];

    const categories = [
        "Indian Wear",
        "Western Wear",
        "Watches",
        "Footwear",
        "Sports & Active Wear",
        "Lingerie & Sleepwear",
        "Beauty & Personal Care",
        "Belts, Scarves & More",
        "Maternity",
        "Sunglasses & Frames",
        "Jewellary",
        "Bags",
        "Topwear",
        "Indian & Festive Wear",
        "Bottomwear",
        "Footwear",
        "Innerwear & Sleepwear",
        "Personal Care & Grooming",
        "Boy",
        "Girl",
        "Toys & Games",
        "Kids Accessories",
        "Personal Care",
        "Winterwear",
        "Mackup",
        "Skin Care",
        "Health & Personal Care",
        "Fragrances",
        "Baby Care",
        "Men's Grooming",
        "Makeup Set",
        "Company",
        "Mobile, TV & More",
        "Wearable Device",
        "Games",
        "Accessories",
        "Shoes",
        "Sport Accessories & Gear",
        "Trolley Bag",
        "Duffle Bags",
        "Backpacks",
        "Cookwear & Kitchenwear",
        "Table wear & Dinner wear",
        "Home Decor",
        "Smart Home",
    ]
    const [subCategories, setSubCategories] = useState([
        { id: 1, name: 'SubCategory 1', category: 'Category 1', mainCategory: 'Main Category 1', status: 'Active' },
        { id: 2, name: 'SubCategory 2', category: 'Category 2', mainCategory: 'Main Category 2', status: 'Inactive' },
        { id: 1, name: 'SubCategory 1', category: 'Category 1', mainCategory: 'Main Category 1', status: 'Active' },
        { id: 2, name: 'SubCategory 2', category: 'Category 2', mainCategory: 'Main Category 2', status: 'Inactive' },
        { id: 1, name: 'SubCategory 1', category: 'Category 1', mainCategory: 'Main Category 1', status: 'Active' },
        { id: 2, name: 'SubCategory 2', category: 'Category 2', mainCategory: 'Main Category 2', status: 'Inactive' },
        { id: 1, name: 'SubCategory 1', category: 'Category 1', mainCategory: 'Main Category 1', status: 'Active' },
        { id: 2, name: 'SubCategory 2', category: 'Category 2', mainCategory: 'Main Category 2', status: 'Inactive' },
        { id: 1, name: 'SubCategory 1', category: 'Category 1', mainCategory: 'Main Category 1', status: 'Active' },
        { id: 2, name: 'SubCategory 2', category: 'Category 2', mainCategory: 'Main Category 2', status: 'Inactive' },
        { id: 1, name: 'SubCategory 1', category: 'Category 1', mainCategory: 'Main Category 1', status: 'Active' },
        { id: 2, name: 'SubCategory 2', category: 'Category 2', mainCategory: 'Main Category 2', status: 'Inactive' },
        { id: 1, name: 'SubCategory 1', category: 'Category 1', mainCategory: 'Main Category 1', status: 'Active' },
        { id: 2, name: 'SubCategory 2', category: 'Category 2', mainCategory: 'Main Category 2', status: 'Inactive' },
        { id: 1, name: 'SubCategory 1', category: 'Category 1', mainCategory: 'Main Category 1', status: 'Active' },
        { id: 2, name: 'SubCategory 2', category: 'Category 2', mainCategory: 'Main Category 2', status: 'Inactive' },
        { id: 1, name: 'SubCategory 1', category: 'Category 1', mainCategory: 'Main Category 1', status: 'Active' },
        { id: 2, name: 'SubCategory 2', category: 'Category 2', mainCategory: 'Main Category 2', status: 'Inactive' },
        { id: 1, name: 'SubCategory 1', category: 'Category 1', mainCategory: 'Main Category 1', status: 'Active' },
        { id: 2, name: 'SubCategory 2', category: 'Category 2', mainCategory: 'Main Category 2', status: 'Inactive' },
        { id: 1, name: 'SubCategory 1', category: 'Category 1', mainCategory: 'Main Category 1', status: 'Active' },
        { id: 2, name: 'SubCategory 2', category: 'Category 2', mainCategory: 'Main Category 2', status: 'Inactive' },
    ]);
    const [showFilter, setShowFilter] = useState(false);
    const [showAddEditModal, setShowAddEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentSubCategory, setCurrentSubCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({ category: '', mainCategory: '', status: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredSubCategories = subCategories.filter((sub) => {
        return (
            sub.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (!filters.category || sub.category === filters.category) &&
            (!filters.mainCategory || sub.mainCategory === filters.mainCategory) &&
            (!filters.status || sub.status === filters.status)
        );
    });

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredSubCategories.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredSubCategories.length / itemsPerPage);

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

    const handleAddEditSave = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const subCategory = {
            id: currentSubCategory ? currentSubCategory.id : Date.now(),
            name: formData.get('name'),
            category: formData.get('category'),
            mainCategory: formData.get('mainCategory'),
            status: formData.get('status'),
        };

        if (currentSubCategory) {
            setSubCategories((prev) =>
                prev.map((sub) => (sub.id === currentSubCategory.id ? subCategory : sub))
            );
        } else {
            setSubCategories((prev) => [...prev, subCategory]);
        }
        setShowAddEditModal(false);
    };

    const handleDelete = () => {
        setSubCategories((prev) => prev.filter((sub) => sub.id !== currentSubCategory.id));
        setShowDeleteModal(false);
    };

    return (
        <div className="container-fluid">
            <h4 className="mb-0">Sub Category</h4>
            <p className="text-muted">Dashboard <span>/ Sub Category</span></p>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="form-control d-inline-block w-auto me-2"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="d-flex gap-2">
                    <Button variant="outline-secondary" className="d-flex align-items-center" onClick={() => setShowFilter(true)} style={{ padding: '5px 30px', borderRadius: '0', color: 'black' }}>
                        <FaFilter className='me-2' /> Filter
                    </Button>
                    <Button variant="dark" onClick={() => {
                        setCurrentSubCategory(null);
                        setShowAddEditModal(true);
                    }} className="d-flex align-items-center" style={{ padding: '5px 30px', borderRadius: '0' }}>
                        + Add
                    </Button>
                </div>
            </div>

            <Table hover responsive borderless>
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
                    {currentItems.map((sub) => (
                        <tr key={sub.id}>
                            <td>{sub.id}</td>
                            <td>{sub.mainCategory}</td>
                            <td>{sub.category}</td>
                            <td>{sub.name}</td>
                            <td>{sub.status}</td>
                            <td>
                                <Button
                                    variant="link"
                                    className="me-2 p-0"
                                    onClick={() => {
                                        setCurrentSubCategory(sub);
                                        setShowAddEditModal(true);
                                    }}
                                >
                                    {/* <FaEdit /> */}
                                    <img src={require('../Photos/edit.png')} style={{ border: '1px solid #919191', padding: '2px' }}></img>
                                </Button>
                                <Button
                                    variant="link"
                                    onClick={() => {
                                        setCurrentSubCategory(sub);
                                        setShowDeleteModal(true);
                                    }}
                                    className='p-0'
                                >
                                    {/* <FaTrash /> */}
                                    <img src={require('../Photos/delet.png')} style={{ border: '1px solid #919191', padding: '2px' }}></img>
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

            <Offcanvas show={showFilter} onHide={() => setShowFilter(false)} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Filter Sub Categories</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form onSubmit={(e) => {
                        e.preventDefault();
                        setShowFilter(false);
                    }}>
                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                as="select"
                                value={filters.category}
                                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                            >
                                <option value="">Select Category</option>
                                <option value="Category 1">Category 1</option>
                                <option value="Category 2">Category 2</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Main Category</Form.Label>
                            <Form.Control
                                as="select"
                                value={filters.mainCategory}
                                onChange={(e) => setFilters({ ...filters, mainCategory: e.target.value })}
                            >
                                <option value="">Select Main Category</option>
                                <option value="Main Category 1">Main Category 1</option>
                                <option value="Main Category 2">Main Category 2</option>
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
                        <div className="d-flex justify-content-end">
                            <Button variant="secondary" className="me-2" onClick={() => setFilters({ category: '', mainCategory: '', status: '' })}>
                                Clear
                            </Button>
                            <Button variant="primary" type="submit">
                                Apply
                            </Button>
                        </div>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>

            <Modal show={showAddEditModal} onHide={() => setShowAddEditModal(false)} centered>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <h6 className='text-center fw-bold'>Add Sub Category</h6>
                    <Form onSubmit={handleAddEditSave}>


                        {/* Select for Main Categories */}
                        <Form.Group className="mb-3">
                            <Form.Label>Main Category</Form.Label>
                            <Form.Control
                                as="select"
                                name="mainCategory"
                                required
                            >
                                <option value="">Select</option>
                                {mainCategories.map((mainCategory, index) => (
                                    <option key={index} value={mainCategory}>{mainCategory}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        {/* Select for Categories */}
                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                as="select"
                                name="category"
                                required
                            >
                                <option value="">Select </option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Sub Category</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder='Enter Sub Category'
                                defaultValue={currentSubCategory?.name || ''}
                                required
                            />
                        </Form.Group>
                        <div className="d-flex justify-content-center gap-2">
                            <Button variant="secondary" onClick={() => setShowAddEditModal(false)} className='r_btn text-black' style={{ backgroundColor: "transparent" }}>
                                Cancel
                            </Button>
                            <Button variant="primary" type="submit" className='r_btn text-white' style={{ backgroundColor: "black" }}>
                                Save
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>

                <Modal.Body>Are you sure you want to delete this sub-category?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default SubCategoryManagement;
