import React, { useState } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import '../CSS/riya.css';

const App = () => {
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
     <h4 className="mb-0">Main Category</h4>
     <p className="text-muted">Dashboard <span>/ Main Category</span></p>
    <div style={{backgroundColor:'white',padding:'20px'}}>
    <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="dark" onClick={() => setShowAddModal(true)}>
          + Add
        </Button>
      </div>
      <Table  hover responsive borderless>
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
            <Form.Group className="r_bottom">
              <Form.Label>Main Category</Form.Label>
              <Form.Control
                type="text"
                name="categoryName"
                placeholder="Enter main category"
                required
              />
            </Form.Group>
            <div className='d-flex justify-content-center gap-3'>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}  className='r_btn text-black' style={{ backgroundColor: "transparent" }}>
              Cancel
            </Button>
            <Button variant="dark" type="submit" className=" r_btn text-white"  style={{ backgroundColor: "black" }}>
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
            <Form.Group className="r_bottom">
              <Form.Label>Main Category</Form.Label>
              <Form.Control
                type="text"
                name="categoryName"
                defaultValue={currentCategory?.name}
                required
              />
            </Form.Group>
            <div className='d-flex justify-content-center gap-3'>
            <Button variant="secondary" onClick={() => setShowEditModal(false)} className='r_btn text-black' style={{ backgroundColor: "transparent" }}>
              Cancel
            </Button>
            <Button variant="dark" type="submit" className="ms-2 r_btn text-white"  style={{ backgroundColor: "black" }}>
              Update
            </Button>
            </div>
           
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
       
        <Modal.Body className="text-center p-5" >
       <div className="r_bottom">
       <p className="text-center fw-bold">Delete</p>
          Are you sure you want to delete{" "}
          <strong>{currentCategory?.name}</strong>?

       </div>

          <div className='d-flex justify-content-center gap-3 mt-4'>
        <Button variant="secondary" onClick={() => setShowDeleteModal(false)} className='r_btn text-black' style={{ backgroundColor: "transparent" }}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} className='r_btn text-white' style={{ backgroundColor: "black" }}>
            Delete
          </Button>
        </div>
        </Modal.Body>
       
       
          
      
      </Modal>
    </div>
  );
};

export default App;
