
import React, { useEffect, useState } from 'react';
import '../CSS/product.css';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import axios from 'axios';
import NoResultsFound from '../Component/Noresult';

const UserTable = () => {

  const BaseUrl = process.env.REACT_APP_BASEURL;
  const token = localStorage.getItem('token');

  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);  // Modal
  const [userToDelete, setUserToDelete] = useState(null);
  const [show, setShow] = useState(false);   // Offcanvas
  const [searchTerm, setSearchTerm] = useState('');
  // Add these state variables after your existing useState declarations
  const [filters, setFilters] = useState({
    gender: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/api/getAllUsers`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const filteredData = response.data.user.filter(user => user.role === 'user');
        setData(filteredData);
        // console.log("response", response.data.user);

      } catch (error) {
        console.error('Data fetching Error:', error);
      }
    }
    fetchData();
  }, [BaseUrl, token]);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);


  useEffect(() => {
    let result = data;


    if (filters.gender) {
      result = result.filter(user => user.gender === filters.gender);
    }

    if (searchTerm) {
      result = result.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.mobileNo.includes(searchTerm)
      );
    }

    setFilteredData(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [data, filters, searchTerm]);

  // Add these handler functions
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const applyFilters = () => {
    handleClose(); // Close the offcanvas
  };

  const resetFilters = () => {
    setFilters({
      gender: '',
      name: '',
      email: ''
    });
    handleClose();
  };
  const handeleDelete = (id, name) => {
    setModalShow(true);
    setUserToDelete({ id, name });
  }
  const confirmDelete = async() => {
    try {
      const response = await axios.delete(`${BaseUrl}/api/deleteUser/${userToDelete.id}`, {
        headers: {Authorization: `Bearer ${token}`}
      });
      if(response.data.status === 200) {
        setData(prevData => prevData.filter(user => user._id !== userToDelete.id));
        setModalShow(false);
      }
      
    } catch (error) {
      console.error('Data Deleting error:',error);
    }
  }
  // ************************************** Pagination **************************************
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState(data);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const getPaginationButtons = () => {
    const buttons = [];
    const maxButtonsToShow = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxButtonsToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);

    // Adjust startPage if we're near the end
    if (endPage - startPage + 1 < maxButtonsToShow) {
      startPage = Math.max(1, endPage - maxButtonsToShow + 1);
    }

    // Add first page if not included
    if (startPage > 1) {
      buttons.push(1);
      if (startPage > 2) buttons.push('...');
    }

    // Add main page numbers
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(i);
    }

    // Add last page if not included
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) buttons.push('...');
      buttons.push(totalPages);
    }
    return buttons;
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  // *******************************************************************************


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div id='mv_container_fluid'>
        <div className="mv_main_heading mb-4 d-flex align-items-center justify-content-between">
          <div>
            <p className='mb-1'>User</p>
            <div className='d-flex align-items-center'>
              <p className='mv_dashboard_heading mb-0'>Dashboard /</p>
              <p className='mv_category_heading mv_subcategory_heading mb-0'>User</p>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12">
            <div className="mv_product_table_content">
              <div className='mv_table_search'>
                <div className="mv_product_search">
                  <InputGroup>
                    <Form.Control
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </InputGroup>
                </div>
                <div className='d-flex'>
                  <div className="mv_column_button mv_column_padd">
                    <Button variant="primary" onClick={handleShow}>
                      <img src={require('../mv_img/filter.png')} alt="" />
                      Filters
                    </Button>
                    <Offcanvas show={show} onHide={handleClose} placement='end' className="mv_offcanvas_filter">
                      <Offcanvas.Header closeButton className='mv_offcanvas_filter_heading'>
                        <Offcanvas.Title className='mv_offcanvas_filter_title'>Filters</Offcanvas.Title>
                      </Offcanvas.Header>
                      <Offcanvas.Body className=''>
                        <div>
                          <div className="mv_input_content">
                            <label className='mv_offcanvas_filter_category'>Gender</label>
                            <Form.Select className="mb-3" value={filters.gender}
                              onChange={(e) => handleFilterChange('gender', e.target.value)}>
                              <option>Select Status</option>
                              <option value="Female">Female</option>
                              <option value="Male">Male</option>
                              <option value="Others">Others</option>
                            </Form.Select>
                          </div>
                        </div>
                        <div className='mv_offcanvas_bottom_button'>
                          <div className='mv_logout_Model_button mv_cancel_apply_btn d-flex align-items-center justify-content-center'>
                            <div className="mv_logout_cancel">
                              <button type="button" onClick={resetFilters}>Cancel</button>
                            </div>
                            <div className="mv_logout_button">
                              <button type="submit" onClick={applyFilters}>Apply</button>
                            </div>
                          </div>
                        </div>
                      </Offcanvas.Body>
                    </Offcanvas>
                  </div>
                </div>
              </div>
              {paginatedData.length > 0 ? (
                <>
                  <div className="mv_product_table_padd" style={{height:'65vh'}}>
                    <table className='mv_product_table justify-content-between'>
                      <thead>
                        <tr>
                          <th className=''>ID</th>
                          <th className=''>Name</th>
                          <th className=''>Mobile No.</th>
                          <th className=''>DOB</th>
                          <th className=''>Gender</th>
                          <th className=''>Email</th>
                          <th className='d-flex align-items-center justify-content-end'>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedData.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.mobileNo}</td>
                            <td>{item.dateOfBirth}</td>
                            <td>{item.gender}</td>
                            <td>{item.email}</td>
                            <td className='d-flex align-items-center justify-content-end'>
                              <div className="mv_pencil_icon" onClick={() => handeleDelete(item._id, item.name)}>
                                <img src={require('../mv_img/trust_icon.png')} alt="" />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {totalPages > 1 && (
                    <div className='mv_other_category d-flex align-items-center justify-content-end pb-4 mt-4'>
                      <p className='mb-0' onClick={() => handlePageChange(currentPage - 1)}>
                        <MdOutlineKeyboardArrowLeft />
                      </p>
                      {getPaginationButtons().map((page, index) => (
                        <p key={index} className={`mb-0 ${currentPage === page ? 'mv_active' : ''}`}
                          onClick={() => handlePageChange(page)}>
                          {page}
                        </p>
                      ))}
                      <p className='mb-0' onClick={() => handlePageChange(currentPage + 1)}>
                        <MdOutlineKeyboardArrowRight />
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <NoResultsFound/>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Product Model */}
      <Modal className='mv_logout_dialog' show={modalShow} onHide={() => setModalShow(false)} size="lg" centered >
        <Modal.Body className='text-center mv_logout'>
          <h5 className='mb-2'>Delete</h5>
          <p>Are you sure you want to delete <br /> {userToDelete?.name}?</p>
          <div className='mv_logout_Model_button d-flex align-items-center justify-content-center'>
            <div className="mv_logout_cancel">
              <button onClick={() => setModalShow(false)}>Cancel</button>
            </div>
            <div className="mv_logout_button">
              <button onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserTable;