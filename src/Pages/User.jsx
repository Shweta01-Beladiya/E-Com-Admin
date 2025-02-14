import React, { useEffect, useState } from 'react';
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
import { FaSearch } from 'react-icons/fa';
import { FaFilter } from "react-icons/fa";
import '../CSS/riya.css';
import axios from 'axios';


const UserTable = () => {

  const BaseUrl = process.env.REACT_APP_BASEURL;
  const token = localStorage.getItem('token');

   // States
   const [data, setData] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [searchTerm, setSearchTerm] = useState("");
   const [itemsPerPage] = useState(10);
   const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
   const [showFilter, setShowFilter] = useState(false);
   const [selectedGenders, setSelectedGenders] = useState([]);
   const [showDeleteModal, setShowDeleteModal] = useState(false);
   const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await axios.get(`${BaseUrl}/api/getAllUsers`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const filteredData = response.data.user.filter(user => user.role === 'user');
        setData(filteredData);
        // console.log("response",response.data.user);
        
      } catch (error) {
        console.error('Data fetching Error:',error);
      }
    }
    fetchData();
  },[]);

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
    <div style={{transform: 'translateY(50%)'}}>
      <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
        <img src={require('../Photos/notfind.png')}></img>
      </div>
    <div>
    <h3 className="text-lg font-semibold mb-2">Result Not Found</h3>
    </div>
  <div>
        <p className="text-gray-500">Whoops... No matching data found</p>
  </div>
    </div>
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
    setShowFilter(false)
  };

  // Custom styles
  const styles = {
    card: {
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      padding: '20px',
      marginTop: '20px',
      height: '750px'
    },
    tableHeader: {
      backgroundColor: '#FFF9F6',
      cursor: 'pointer'
    },
  };

  return (

    <Container fluid className="py-3" style={{ backgroundColor: '#F7F7F7', height: '100vh' }}>
      <h5 className="mb-0 fw-bold">User</h5>
      <div className='d-flex'>
        <p class="text-muted">Dashboard /</p>
        <p className='ms-1'>User</p>
      </div>
      <div style={styles.card}>
        {/* Search and Filter Section */}
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
            <Button
              className="r_filterbtn"
              onClick={() => setShowFilter(true)}

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
                  {currentItems.map((item, index) => (
                    <tr key={item.id}>
                      <td>0{index +1}</td>
                      <td>{item.name}</td>
                      <td>{item.mobileNo}</td>
                      <td>{item.dateOfBirth}</td>
                      <td>{item.gender}</td>
                      <td>{item.email}</td>
                      <td>
                        <button
                          className="r_deleticon"
                          onClick={() => handleDelete(item._id, item.name)}
                        >
                          {/* <FaTrash /> */}
                          <img src={require('../Photos/delet.png')} class="r_deletimg" ></img>
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
            <Offcanvas.Title className="r_filtertitle">Filter</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Form.Group >
              <Form.Label>Gender</Form.Label>
              <Form.Select
                value={selectedGenders.length > 0 ? selectedGenders[0] : ""}
                onChange={(e) => handleGenderChange(e.target.value)}
              >
                <option value="">Select</option>
                {['Male', 'Female', 'Other'].map((gender) => (
                  <option key={gender} value={gender}>{gender}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Offcanvas.Body>
          <div className="p-3 mt-auto">
            <div className="d-flex gap-5">
              <Button
                onClick={handleClearFilter}
                className="flex-grow-1 r_outlinebtn"
              >
                Cancel
              </Button>
              <Button
                onClick={handleApplyFilter}
                className="flex-grow-1 r_bgbtn"
              >
                Apply
              </Button>
            </div>
          </div>
        </Offcanvas>

        {/* Delete Confirmation Modal */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
          <Modal.Body className='p-5'>
            <h5 className='font-weight-bold text-center mb-3'>Delete</h5>
            <p className='text-center text-muted mb-4'> Are you sure you want to delete {userToDelete?.name}?</p>
            <div className='d-flex justify-content-center gap-3'>
              <Button onClick={() => setShowDeleteModal(false)} className="r_cancel" >
                Cancel
              </Button>
              <Button onClick={confirmDelete} className="r_delete">
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