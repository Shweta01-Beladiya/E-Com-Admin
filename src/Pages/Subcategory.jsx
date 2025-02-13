import React, { useState } from 'react';
import { Button, Modal, Form, Table, Pagination, Offcanvas, InputGroup, Col, Row } from 'react-bootstrap';
import { FaFilter } from "react-icons/fa6";
import "../CSS/riya.css";
import { FaSearch } from 'react-icons/fa';


const SubCategory = () => {
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
        { id: 1, name: 'Saree', category: 'Indian Wear', mainCategory: 'Woman', status: true },
        { id: 2, name: 'Blazer', category: 'Western Wear', mainCategory: 'Men', status: false },
        { id: 3, name: 'Baby Soap', category: 'Baby Care', mainCategory: 'Beauty & Health', status: true },
        { id: 4, name: 'Sports Shoes', category: 'Shoes', mainCategory: 'Sports', status: true },
        { id: 5, name: 'Duffle Bag', category: 'Bag Packs', mainCategory: 'Luggage', status: false },
        { id: 6, name: 'Mens San', category: 'Footwear', mainCategory: 'Men', status: true },
        { id: 7, name: 'SubCategory 1', category: 'Sunglasses & Frames', mainCategory: 'Women', status: false },
        { id: 8, name: 'SubCategory 2', category: 'Skin Care', mainCategory: 'Beauty & Health', status: true },

    ]);
    const [showFilter, setShowFilter] = useState(false);
    const [showAddEditModal, setShowAddEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentSubCategory, setCurrentSubCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({ category: '', mainCategory: '', status: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const mainCategoriesObj = mainCategories.map((category) => ({ value: category, label: category }));
    const categoriesObj = categories.map((category) => ({ value: category, label: category }));

    const handleStatusChange = (id) => {
        setSubCategories(prev =>
            prev.map(sub =>
                sub.id === id ? { ...sub, status: !sub.status } : sub
            )
        );
    };

    const filteredSubCategories = subCategories.filter((sub) => {
        return (
            sub.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (!filters.category || sub.category === filters.category) &&
            (!filters.mainCategory || sub.mainCategory === filters.mainCategory) &&
            (!filters.status || (filters.status === 'Active' ? sub.status : !sub.status))
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
            status: formData.get('status') === 'Active',
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
            <h5 className="mb-0 fw-bold">Sub Category</h5>
            <div className='d-flex'>
                <p class="text-muted">Dashboard /</p>
                <p className='ms-1'>Sub Category</p>
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
                                <FaFilter className='me-2' /> Filter
                            </Button>
                            <Button onClick={() => {
                                setCurrentSubCategory(null);
                                setShowAddEditModal(true);
                            }} className="r_add">
                                + Add
                            </Button>
                        </div>
                    </Col>
                </Row>
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
                                <td>
                                    <Form.Check
                                        type="switch"
                                        id={`status-switch-${sub.id}`}
                                        checked={sub.status}
                                        onChange={() => handleStatusChange(sub.id)}
                                        className="status-switch"
                                    />
                                </td>
                                <td>
                                    <Button
                                        className="r_deleticon me-2"
                                        onClick={() => {
                                            setCurrentSubCategory(sub);
                                            setShowAddEditModal(true);
                                        }}
                                    >
                                        <img src={require('../Photos/edit.png')} className="r_deletimg" alt="edit" />
                                    </Button>
                                    <Button
                                        className="r_deleticon"
                                        onClick={() => {
                                            setCurrentSubCategory(sub);
                                            setShowDeleteModal(true);
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
                <div className="d-flex justify-content-end mt-3">
                    <Pagination className="mb-0">
                        {paginationItems}
                    </Pagination>
                </div>

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
                                    {mainCategoriesObj.map((mainCat) => (
                                        <option key={mainCat.value} value={mainCat.value}>{mainCat.label}</option>
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
                                    {categoriesObj.map((cat) => (
                                        <option key={cat.value} value={cat.value}>{cat.label}</option>
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
                            <Button className="flex-grow-1 r_outlinebtn" onClick={() => setFilters({ category: '', mainCategory: '', status: '' })}>
                                Clear
                            </Button>
                            <Button className="flex-grow-1 r_bgbtn" type="submit">
                                Apply
                            </Button>
                        </div>
                    </div>
                </Offcanvas>

                {/* Add Subcategory Modal */}
                <Modal show={showAddEditModal && !currentSubCategory} onHide={() => setShowAddEditModal(false)} centered>
                    <Modal.Header closeButton className="r_modalheader">
                    </Modal.Header>
                    <Modal.Body className="r_modalbody">
                    <h6 className='text-center fw-bold'>Add Sub Category</h6>
                        <Form onSubmit={handleAddEditSave} className="r_form">
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
                                    required
                                />
                            </Form.Group>
                            <div className="d-flex justify-content-center gap-2 mt-4">
                                <Button onClick={() => setShowAddEditModal(false)} className="r_cancel">
                                    Cancel
                                </Button>
                                <Button type="submit" className="r_delete">
                                    Save
                                </Button>
                            </div>
                        </Form>
                    </Modal.Body>
                </Modal>

                {/* Edit Subcategory Modal */}
                <Modal show={showAddEditModal && currentSubCategory} onHide={() => setShowAddEditModal(false)} centered>
                    <Modal.Header closeButton className="r_modalheader">
                    </Modal.Header>
                    <Modal.Body className="r_modalbody">
                    <h6 className='text-center fw-bold'>Edit Sub Category</h6>
                        <Form onSubmit={handleAddEditSave} className="r_form">
                            {/* Select for Main Categories */}
                            <Form.Group className="mb-3">
                                <Form.Label>Main Category</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="mainCategory"
                                    defaultValue={currentSubCategory?.mainCategory}
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
                                    defaultValue={currentSubCategory?.category}
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
                            <div className="d-flex justify-content-center gap-2 mt-4">
                                <Button onClick={() => setShowAddEditModal(false)} className="r_cancel">
                                    Cancel
                                </Button>
                                <Button type="submit" className="r_delete">
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
                        <p className='mb-4 text-center text-muted'>Are you sure you want to delete this sub-category?</p>
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
