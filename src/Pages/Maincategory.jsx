
import React, { useState } from "react";
import { Modal, Button, Form, Table, InputGroup, Col, Row } from "react-bootstrap";
import '../CSS/riya.css';
import { FaSearch } from 'react-icons/fa';

const MainCategory = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Women", status: true },
    { id: 2, name: "Men", status: false },
    { id: 3, name: "Baby & Kids", status: true },
    { id: 4, name: "Beauty & Health", status: true },
    { id: 5, name: "Electronics & Mobile", status: true },
    { id: 6, name: "Sports", status: true },
    { id: 7, name: "Luggage", status: true },
    { id: 8, name: "Home & Kitchen", status: true },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h5 className="mb-0 fw-bold">Main Category</h5>
      <div className='d-flex'>
        <p class="text-muted">Dashboard /</p>
        <p className='ms-1'>Main Category</p>
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </InputGroup>
          </Col>
          <Col xs={12} md={6} lg={8} className="text-end mt-3 mt-md-0">
            <Button className="r_add" onClick={() => setShowAddModal(true)}>
              + Add
            </Button>
          </Col>
        </Row>

        <Table hover responsive borderless>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((cat) => (
              <tr key={cat.id}>
                <td>{cat.id.toString().padStart(2, "0")}</td>
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
                    className="r_deleticon me-2"
                    onClick={() => {
                      setCurrentCategory(cat);
                      setShowEditModal(true);
                    }}
                  >
                    <img src={require('../Photos/edit.png')} class="r_deletimg" ></img>
                  </Button>
                  <Button
                    className="r_deleticon"
                    onClick={() => {
                      setCurrentCategory(cat);
                      setShowDeleteModal(true);
                    }}
                  >
                    <img src={require('../Photos/delet.png')} class="r_deletimg" ></img>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Add Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton className="r_modalheader">

        </Modal.Header>
        <Modal.Body className="r_modalbody">
          <p className="text-center fw-bold">Add Main Category</p>
          <Form
            className="r_form"
            onSubmit={(e) => {
              e.preventDefault();
              const newCategory = e.target.elements.categoryName.value;
              handleAdd(newCategory);
            }}
          >
            <Form.Group >
              <Form.Label>Main Category</Form.Label>
              <Form.Control
                type="text"
                name="categoryName"
                placeholder="Enter main category"
                required
              />
            </Form.Group>
            <div className='d-flex justify-content-center gap-3 mt-4'>
              <Button variant="secondary" onClick={() => setShowAddModal(false)} className="r_cancel">
                Cancel
              </Button>
              <Button variant="dark" type="submit" className="r_delete">
                Add
              </Button>
            </div>

          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Modal */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
      >
        <Modal.Header closeButton className="r_modalheader">
        </Modal.Header>
        <Modal.Body className="r_modalbody">
          <p className="text-center fw-bold">Edit Main Category</p>
          <Form
            className="r_form"
            onSubmit={(e) => {
              e.preventDefault();
              const updatedCategory = e.target.elements.categoryName.value;
              handleEdit(updatedCategory);
            }}
          >
            <Form.Group >
              <Form.Label>Main Category</Form.Label>
              <Form.Control
                type="text"
                name="categoryName"
                defaultValue={currentCategory?.name}
                required
              />
            </Form.Group>
            <div className='d-flex justify-content-center gap-3 mt-4'>
              <Button onClick={() => setShowEditModal(false)} className="r_cancel">
                Cancel
              </Button>
              <Button type="submit" className="r_delete">
                Update
              </Button>
            </div>

          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Body className=" p-5" >
          <h5 className='font-weight-bold text-center mb-3'>Delete</h5>
          <p className='text-center text-muted mb-4'> Are you sure you want to delete {currentCategory?.name}?</p>
          <div className='d-flex justify-content-center gap-3 mt-4'>
            <Button onClick={() => setShowDeleteModal(false)} className="r_cancel" >
              Cancel
            </Button>
            <Button onClick={handleDelete} className="r_delete" >
              Delete
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MainCategory;
