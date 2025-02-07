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
import { FaSearch, FaTrash } from 'react-icons/fa';
import { FaFilter } from "react-icons/fa";
import '../CSS/riya.css';


const UserTable = () => {
  // Sample data
  const initialData = [
    { id: "01", name: "Mitesh Shah", mobile: "+91 85555 85555", dob: "02/09/1994", gender: "Male", email: "example@gmail.com" },
    { id: "02", name: "Riya Patel", mobile: "+91 85555 85555", dob: "27/09/1994", gender: "Female", email: "example@gmail.com" },
    { id: "03", name: "Mitesh Shah", mobile: "+91 85555 85555", dob: "25/09/1994", gender: "Male", email: "example@gmail.com" },
    { id: "04", name: "Riya Patel", mobile: "+91 85555 85555", dob: "12/07/1994", gender: "Other", email: "example@gmail.com" },
    { id: "05", name: "Mitesh Shah", mobile: "+91 85555 85555", dob: "22/06/1994", gender: "Male", email: "example@gmail.com" },
    { id: "06", name: "Riya Patel", mobile: "+91 85555 85555", dob: "21/06/1994", gender: "Female", email: "example@gmail.com" },
    { id: "07", name: "Mitesh Shah", mobile: "+91 85555 85555", dob: "02/09/1994", gender: "Male", email: "example@gmail.com" },
    { id: "08", name: "Riya Patel", mobile: "+91 85555 85555", dob: "02/09/1994", gender: "Female", email: "example@gmail.com" },
    { id: "09", name: "Mitesh Shah", mobile: "+91 85555 85555", dob: "02/09/1994", gender: "Male", email: "example@gmail.com" },
    { id: "10", name: "Riya Patel", mobile: "+91 85555 85555", dob: "02/09/1994", gender: "Female", email: "example@gmail.com" },
    { id: "11", name: "Mitesh Shah", mobile: "+91 85555 85555", dob: "02/09/1994", gender: "Male", email: "example@gmail.com" },
    { id: "12", name: "Riya Patel", mobile: "+91 85555 85555", dob: "27/09/1994", gender: "Female", email: "example@gmail.com" },
    { id: "13", name: "Mitesh Shah", mobile: "+91 85555 85555", dob: "25/09/1994", gender: "Male", email: "example@gmail.com" },
    { id: "14", name: "Riya Patel", mobile: "+91 85555 85555", dob: "12/07/1994", gender: "Other", email: "example@gmail.com" },
    { id: "15", name: "Mitesh Shah", mobile: "+91 85555 85555", dob: "22/06/1994", gender: "Male", email: "example@gmail.com" },
    { id: "16", name: "Riya Patel", mobile: "+91 85555 85555", dob: "21/06/1994", gender: "Female", email: "example@gmail.com" },
    { id: "17", name: "Mitesh Shah", mobile: "+91 85555 85555", dob: "02/09/1994", gender: "Male", email: "example@gmail.com" },
    { id: "18", name: "Riya Patel", mobile: "+91 85555 85555", dob: "02/09/1994", gender: "Female", email: "example@gmail.com" },
    { id: "19", name: "Mitesh Shah", mobile: "+91 85555 85555", dob: "02/09/1994", gender: "Male", email: "example@gmail.com" },
    { id: "20", name: "Riya Patel", mobile: "+91 85555 85555", dob: "02/09/1994", gender: "Female", email: "example@gmail.com" },
  ];

  // States
  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [showFilter, setShowFilter] = useState(false);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);


  // Filter functionality
  const filteredData = data.filter(item => {
    const matchesSearch = Object.values(item).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    const matchesGender = selectedGenders.length === 0 || selectedGenders.includes(item.gender);

    return matchesSearch && matchesGender;
  });

  // No Results Found Component
  const NoResultsFound = () => (
    <div className="text-center ">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
        {/* <X className="w-8 h-8 text-gray-400" /> */}
        <img src={require('../Photos/notfind.png')}></img>
      </div>
      <h3 className="text-lg font-semibold mb-2">Result Not Found</h3>
      <p className="text-gray-500">Whoops... No matching data found</p>
    </div>
  );

  // Sorting functionality
  const sortData = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = (data) => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  };

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = getSortedData(filteredData).slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Handle delete
  const handleDelete = (id, name) => {
    setUserToDelete({ id, name });
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setData(data.filter(item => item.id !== userToDelete.id));
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  // Handle filter actions
  const handleGenderChange = (gender) => {
    setSelectedGenders([gender]); // Allow only one selection
  };

  const handleApplyFilter = () => {
    setShowFilter(false);
  };

  const handleClearFilter = () => {
    setSelectedGenders([]);
  };

  // Custom styles
  const styles = {
    card: {
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      padding: '20px',
      marginTop: '20px'
    },
    tableHeader: {
      backgroundColor: '#FFF9F6',
      cursor: 'pointer'
    },
    searchIcon: {
      color: '#6c757d'
    },
    deleteButton: {
      color: '#dc3545',
      border: 'none',
      background: 'none',
      padding: '0',
      cursor: 'pointer'
    },
    filterGroup: {
      marginBottom: '20px'
    }

  };

  return (

    <Container fluid className="py-3" style={{ backgroundColor: '#F7F7F7', height: '100vh' }}>
      <h4 className="mb-0">User</h4>
      <p className="text-muted">Dashboard <span>/ User</span></p>
      <div style={styles.card}>
        {/* Search and Filter Section */}
        <Row className="mb-4 align-items-center">
          <Col xs={12} md={6} lg={4}>
            <InputGroup>
              <InputGroup.Text>
                <FaSearch style={styles.searchIcon} />
              </InputGroup.Text>
              <Form.Control
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col xs={12} md={6} lg={8} className="text-end mt-3 mt-md-0">
            <Button
              variant="outline-secondary"
              onClick={() => setShowFilter(true)}
              color='black'
            >
              <FaFilter className="me-2" />
              Filter {selectedGenders.length > 0 && `(${selectedGenders.length})`}
            </Button>
          </Col>
        </Row>

        {/* Conditional rendering based on filtered results */}
        {filteredData.length > 0 ? (
          <>
            {/* Table Section */}
            <div className="table-responsive">
              <Table hover borderless>
                <thead>
                  <tr>
                    {['ID', 'Name', 'Mobile No.', 'DOB', 'Gender', 'Email', 'Action'].map((header, index) => (
                      <th
                        key={index}
                        style={styles.tableHeader}
                        onClick={() => sortData(header.toLowerCase())}
                      >
                        {header}
                      </th>
                    ))}
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
                          style={styles.deleteButton}
                          onClick={() => handleDelete(item.id, item.name)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            {/* Pagination Section */}
            <div className="d-flex justify-content-end mt-4">
              <Pagination>
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
            </div>
          </>
        ) : (
          <NoResultsFound />
        )}

        {/* Filter Offcanvas */}
        <Offcanvas
          show={showFilter}
          onHide={() => setShowFilter(false)}
          placement="end"
          style={{ zIndex: 9999 }}
        >
          <Offcanvas.Header closeButton className="border-bottom">
            <Offcanvas.Title>Filter</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Form.Group style={styles.filterGroup}>
              <Form.Label>Gender</Form.Label>
              <Form.Select
                value={selectedGenders.length > 0 ? selectedGenders[0] : ""}
                onChange={(e) => handleGenderChange(e.target.value)}
              >
                <option value="">Select Gender</option>
                {['Male', 'Female', 'Other'].map((gender) => (
                  <option key={gender} value={gender}>{gender}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <div className="d-flex justify-content-space-between gap-2">
              <Button
                variant="outline-secondary"
                onClick={handleClearFilter}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleApplyFilter}
              >
                Apply
              </Button>
            </div>
          </Offcanvas.Body>
        </Offcanvas>

        {/* Delete Confirmation Modal */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>

          <Modal.Body className='p-5'>
            <h5 className='font-weight-bold text-center mb-3'>Delete</h5>
            <p className='text-center text-muted mb-4'> Are you sure you want to delete {userToDelete?.name}?</p>
            <div className='d-flex justify-content-center gap-3'>
              <Button onClick={() => setShowDeleteModal(false)} className='r_btn text-black' style={{ backgroundColor: "transparent" }}>
                Cancel
              </Button>
              <Button onClick={confirmDelete} className='r_btn text-white' style={{ backgroundColor: "black" }}>
                Delete
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </Container>
  );
};

export default UserTable;