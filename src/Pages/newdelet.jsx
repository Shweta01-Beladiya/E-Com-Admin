import React, { useState } from 'react';
import { 
  Container, 
  Table, 
  Form, 
  InputGroup, 
  Button, 
  Row, 
  Col, 
  Pagination,
  Offcanvas,
  Modal
} from 'react-bootstrap';
import { FaSearch, FaTrash, FaFilter } from 'react-icons/fa';
import '../CSS/riya.css';

const UserTable = () => {
  const initialData = [
    { id: "01", name: "Mitesh Shah", mobile: "+91 85555 85555", dob: "02/09/1994", gender: "Male", email: "example@gmail.com" },
    { id: "02", name: "Riya Patel", mobile: "+91 85555 85555", dob: "27/09/1994", gender: "Female", email: "example@gmail.com" }
  ];

  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage] = useState(10);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = () => {
    setData(data.filter(item => item.id !== deleteId));
    setShowDeleteModal(false);
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <Container fluid className="py-5">
      <h4>User</h4>
      <p className='text-muted'>Dashboard <span>/ User</span></p>
      <div className="table-responsive">
        <Table hover borderless>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Mobile No.</th>
              <th>DOB</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.mobile}</td>
                <td>{item.dob}</td>
                <td>{item.gender}</td>
                <td>{item.email}</td>
                <td>
                  <button
                    className="btn btn-link text-danger"
                    onClick={() => confirmDelete(item.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      
      <Pagination className="justify-content-end">
        <Pagination.Prev
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        />
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={currentPage === index + 1}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        />
      </Pagination>
      
      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this user?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserTable;
