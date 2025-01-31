import zIndex from '@mui/material/styles/zIndex';
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
  Offcanvas
} from 'react-bootstrap';
import { FaSearch, FaTrash } from 'react-icons/fa';
import { FaFilter } from "react-icons/fa";

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

  // Filter functionality
  const filteredData = data.filter(item => {
    const matchesSearch = Object.values(item).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const matchesGender = selectedGenders.length === 0 || selectedGenders.includes(item.gender);
    
    return matchesSearch && matchesGender;
  });

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
  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id));
  };

  // Handle filter actions
  const handleGenderChange = (gender) => {
    if (selectedGenders.includes(gender)) {
      setSelectedGenders(selectedGenders.filter(g => g !== gender));
    } else {
      setSelectedGenders([...selectedGenders, gender]);
    }
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
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      padding: '20px',
      marginTop: '20px'
    },
    tableHeader: {
      backgroundColor: '#f8f9fa',
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
    <Container fluid className="py-4">
      <div style={styles.card}>
        <h2 className="mb-4">User</h2>
        
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
            >
                <FaFilter className='me-2' />
              Filter {selectedGenders.length > 0 && `(${selectedGenders.length})`}
            </Button>
          </Col>
        </Row>

        {/* Table Section */}
        <div className="table-responsive">
          <Table hover>
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
                      onClick={() => handleDelete(item.id)}
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

        {/* Filter Offcanvas */}
        <Offcanvas 
          show={showFilter} 
          onHide={() => setShowFilter(false)} 
          placement="end"
          style={{zIndex: 9999}}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Filter</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Form.Group style={styles.filterGroup}>
              <Form.Label>Gender</Form.Label>
              {['Male', 'Female', 'Other'].map((gender) => (
                <Form.Check
                  key={gender}
                  type="checkbox"
                  id={`gender-${gender}`}
                  label={gender}
                  checked={selectedGenders.includes(gender)}
                  onChange={() => handleGenderChange(gender)}
                  className="mb-2"
                />
              ))}
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
      </div>
    </Container>
  );
};

export default UserTable;