import React, { useState } from 'react';
import { Modal, Button, Form, Table, Container, Row, Col, Card } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

const MainCategoryManagement = () => {
  const [categories, setCategories] = useState([
    { id: '01', name: 'Women', status: true },
    { id: '02', name: 'Men', status: false },
    { id: '03', name: 'Baby & Kids', status: true },
    { id: '04', name: 'Beauty & Health', status: true },
    { id: '05', name: 'Electronics & Mobile', status: true },
    { id: '06', name: 'Sports', status: true },
    { id: '07', name: 'Luggage', status: true },
    { id: '08', name: 'Home & Kitchen', status: true },
  ]);

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [editCategory, setEditCategory] = useState({ id: '', name: '' });
  const [deleteCategory, setDeleteCategory] = useState({ id: '', name: '' });

  // Add category handlers
  const handleAddShow = () => setShowAddModal(true);
  const handleAddClose = () => {
    setShowAddModal(false);
    setNewCategory('');
  };

  const handleAdd = () => {
    if (newCategory.trim()) {
      const newId = (categories.length + 1).toString().padStart(2, '0');
      setCategories([...categories, { id: newId, name: newCategory, status: true }]);
      handleAddClose();
    }
  };

  // Edit category handlers
  const handleEditShow = (category) => {
    setEditCategory(category);
    setShowEditModal(true);
  };
  
  const handleEditClose = () => {
    setShowEditModal(false);
    setEditCategory({ id: '', name: '' });
  };

  const handleEdit = () => {
    if (editCategory.name.trim()) {
      setCategories(categories.map(cat => 
        cat.id === editCategory.id ? { ...cat, name: editCategory.name } : cat
      ));
      handleEditClose();
    }
  };

  // Delete category handlers
  const handleDeleteShow = (category) => {
    setDeleteCategory(category);
    setShowDeleteModal(true);
  };

  const handleDeleteClose = () => {
    setShowDeleteModal(false);
    setDeleteCategory({ id: '', name: '' });
  };

  const handleDelete = () => {
    setCategories(categories.filter(cat => cat.id !== deleteCategory.id));
    handleDeleteClose();
  };

  // Toggle status handler
  const handleToggleStatus = (id) => {
    setCategories(categories.map(cat =>
      cat.id === id ? { ...cat, status: !cat.status } : cat
    ));
  };

  // Component sections
  const HeaderSection = () => (
    <Row className="mb-3">
      <Col>
        <h4 className="mb-0">User</h4>
        <p className="text-muted">Dashboard <span>/ User</span></p>
      </Col>
    </Row>
  );

  const ActionSection = () => (
    <Row className="mb-4">
      <Col className="d-flex justify-content-between align-items-center">
        <Button variant="dark" onClick={handleAddShow}>+ Add</Button>
      </Col>
    </Row>
  );

  const TableSection = () => (
    <Row>
      <Col>
        <Card className="shadow-sm">
          <Card.Body className="p-0">
            <div className="table-responsive">
              <Table hover className="mb-0">
                <thead>
                  <tr>
                    <th className="px-4">ID</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th className="px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map(category => (
                    <tr key={category.id}>
                      <td className="px-4">{category.id}</td>
                      <td>{category.name}</td>
                      <td>
                        <Form.Check
                          type="switch"
                          checked={category.status}
                          onChange={() => handleToggleStatus(category.id)}
                        />
                      </td>
                      <td className="px-4">
                        <Button
                          variant="link"
                          className="text-success p-1"
                          onClick={() => handleEditShow(category)}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="link"
                          className="text-danger p-1"
                          onClick={() => handleDeleteShow(category)}
                        >
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );

  const ModalsSection = () => (
    <>
      {/* Add Modal */}
      <Modal show={showAddModal} onHide={handleAddClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Main Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Main Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter main category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleAddClose}>
            Cancel
          </Button>
          <Button variant="dark" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={handleEditClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Main Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Main Category</Form.Label>
                <Form.Control
                  type="text"
                  value={editCategory.name}
                  onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })}
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleEditClose}>
            Cancel
          </Button>
          <Button variant="dark" onClick={handleEdit}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={handleDeleteClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col className="text-center">
              <p className="mb-0">
                Are you sure you want to delete {deleteCategory.name}?
              </p>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleDeleteClose}>
            Cancel
          </Button>
          <Button variant="dark" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

  return (
    <Container fluid className="py-3">
      <HeaderSection />
      <ActionSection />
      <TableSection />
      <ModalsSection />
    </Container>
  );
};

export default MainCategoryManagement;