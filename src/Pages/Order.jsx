import React, { useEffect, useState } from 'react';
import '../CSS/product.css';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import NoResultsFound from '../Component/Noresult';
import axios from 'axios';

const Order = () => {

  const BaseUrl = process.env.REACT_APP_BASEURL;
  const token = localStorage.getItem('token');

  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);
  // const [originalData] = useState(data);

  // ************************************** Pagination **************************************
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [searchTerm, filterDate, filterStatus]);

  const applyFilters = () => {
    // Reset to page 1 when filters change
    setCurrentPage(1);

    let results = [...data]; // Start with original data

    // Apply search filter
    if (searchTerm) {
      results = results.filter(item =>
        item.userData[0].name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Date filter
    if (filterDate) {
      const selectedDate = new Date(filterDate).setHours(0, 0, 0, 0);

      results = results.filter(item => {
        const orderDate = new Date(item.createdAt).setHours(0, 0, 0, 0);
        return orderDate === selectedDate;
      });
    }

    // Apply status filter
    if (filterStatus && filterStatus !== 'Select') {
      results = results.filter(item =>
        item.orderStatus === filterStatus
      );
    }

    setFilteredData(results);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDateChange = (e) => {
    setFilterDate(e.target.value);
  };

  const handleStatusChange = (e) => {
    setFilterStatus(e.target.value);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setFilterDate('');
    setFilterStatus('');
    // setFilteredData(originalData);
    handleClose();
  };


  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  // console.log("totalpage", totalPages)

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const getPaginationButtons = () => {
    if (totalPages <= 4) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const buttons = [];

    if (currentPage <= 2) {
      buttons.push(1, 2, 3, "...");
    } else if (currentPage >= totalPages - 1) {
      buttons.push("...", totalPages - 2, totalPages - 1, totalPages);
    } else {
      buttons.push(currentPage - 1, currentPage, currentPage + 1, "...");
    }

    return buttons;
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  // *******************************************************************************

  // Modal
  const [modalShow, setModalShow] = React.useState(false);

  // Offcanvas
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/api/allOrders`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        // console.log("response", response.data.orders);
        setData(response.data.orders);
        setFilteredData(response.data.orders)
      } catch (error) {
        console.error('Data Fetching Error:', error);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const clearDateFilter = () => {
    setFilterDate('');
  };

  const handlePrint = (orderData) => {
    // Create a new window or tab for printing
    const printWindow = window.open('', '_blank');

    // Generate HTML content for printing
    const printContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Order Details</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        .header { display: flex; justify-content: space-between; margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .order-info { margin-bottom: 20px; }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <h1>E Commerce</h1>
        </div>
        <div>
          <p>Order ID: ${orderData._id}</p>
          <p>Date: ${new Date(orderData.createdAt).toLocaleDateString('en-GB')}</p>
        </div>
      </div>
      
      <div class="order-info">
        <h2>Customer Information</h2>
        <p>Name: ${orderData.userData[0]?.name}</p>
      </div>
      
      <h2>Order Details</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Order Date</th>
            <th>Total Amount</th>
            <th>Order Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${orderData._id}</td>
            <td>${orderData.userData[0]?.name}</td>
            <td>${new Date(orderData.createdAt).toLocaleDateString('en-GB')}</td>
            <td>${orderData.totalAmount}</td>
            <td>${orderData.orderStatus}</td>
          </tr>
        </tbody>
      </table>
    </body>
    </html>
  `;

    // Write the content to the new window
    printWindow.document.write(printContent);
    printWindow.document.close();

    // Trigger print when content is loaded
    printWindow.onload = function () {
      printWindow.print();
      // Optionally close the window after printing
      printWindow.onafterprint = function() { printWindow.close(); };
    };
  };
  return (
    <>
      <div id='mv_container_fluid'>
        <div className="mv_main_heading mb-4 d-flex align-items-center justify-content-between">
          <div>
            <p className='mb-1'>Order</p>
            <div className='d-flex align-items-center'>
              <p className='mv_dashboard_heading mb-0'>Dashboard /</p>
              <p className='mv_category_heading mv_subcategory_heading mb-0'>Order</p>
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
                      onChange={handleSearchChange}
                    />
                  </InputGroup>
                </div>
                <div className='d-flex'>
                  {filterDate ? (
                    <div className="mv_column_button mv_column_padd">
                      <Button onClick={clearDateFilter}>Clear Date</Button>
                    </div>
                  ) : (
                    <div className="sb_date_input ">
                      <input
                        type="date"
                        value={filterDate}
                        onChange={handleDateChange}
                      />
                    </div>
                  )}

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
                            <label className='mv_offcanvas_filter_category'>Order Status</label>
                            <Form.Select className="mb-3" aria-label="Default select example" value={filterStatus}
                              onChange={handleStatusChange}>
                              <option>Select</option>
                              <option value="Delivered">Order Delivered</option>
                              <option value="Confirmed">Order Confirmed</option>
                              <option value="Cancelled">Order Cancelled</option>
                              <option value="outForDelivery">Order Out For Delivered</option>
                            </Form.Select>
                          </div>
                        </div>
                        <div className='mv_offcanvas_bottom_button'>
                          <div className='mv_logout_Model_button mv_cancel_apply_btn d-flex align-items-center justify-content-center'>
                            <div className="mv_logout_cancel">
                              <button type="button" onClick={clearFilters}>Cancel</button>
                            </div>
                            <div className="mv_logout_button">
                              <button type="submit" onClick={handleClose}>Apply</button>
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
                  <div className="mv_product_table_padd">
                    <table className='mv_product_table justify-content-between'>
                      <thead>
                        <tr>
                          <th className=''>ID</th>
                          <th className=''>Customer Name</th>
                          <th className=''>Order Date</th>
                          <th className=''>Total Amount</th>
                          <th className=''>Order Status</th>
                          <th className='d-flex align-items-center justify-content-end'>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedData.map((item, index) => (
                          <tr key={index}>
                            <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                            <td>{item.userData[0]?.name}</td>
                            <td>{new Date(item.createdAt).toLocaleDateString('en-GB')}</td>
                            <td>{item.totalAmount}</td>
                            <td>
                              {
                                item.orderStatus === 'Delivered' ? (
                                  <p className='m-0 mv_delivered_padd'>{item.orderStatus}</p>
                                ) : item.orderStatus === 'Confirmed' ? (
                                  <p className='m-0 mv_pending_padd'>{item.orderStatus}</p>
                                ) : item.orderStatus === 'Cancelled' ? (
                                  <p className='m-0 mv_cancelled_padd'>{item.orderStatus}</p>
                                ) : item.orderStatus === 'outForDelivery' ? (
                                  <p className='m-0 mv_ondelivery_padd'>{item.orderStatus}</p>
                                ) : null
                              }
                            </td>
                            <td className='d-flex align-items-center justify-content-end'>
                              <div className="mv_pencil_icon">
                                <Link to={`/viewOrder/${item._id}`}>
                                  <img src={require('../mv_img/eyes_icon.png')} alt="" />
                                </Link>
                              </div>
                              <div className="mv_pencil_icon">
                                <img src={require('../mv_img/print.png')} alt="" onClick={() => handlePrint(item)}
                                  style={{ cursor: 'pointer' }} />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {totalPages > 1 && (
                    <div className="mv_other_category d-flex align-items-center justify-content-end pb-4 mt-4">
                      {/* Previous Button */}
                      <p className={`mb-0 ${currentPage === 1 ? 'disabled' : ''}`}
                        onClick={() => handlePageChange(currentPage - 1)}>
                        <MdOutlineKeyboardArrowLeft />
                      </p>
                      {/* Pagination Buttons */}
                      {getPaginationButtons().map((page, index) => (
                        <p key={index}
                          className={`mb-0 ${currentPage === page ? "mv_active" : ""}`}
                          onClick={() => typeof page === "number" && handlePageChange(page)}
                          style={{ cursor: page === "..." ? "default" : "pointer" }}>
                          {page}
                        </p>
                      ))}
                      {/* Next Button */}
                      <p className={`mb-0 ${currentPage === totalPages ? 'disabled' : ''}`}
                        onClick={() => handlePageChange(currentPage + 1)} >
                        <MdOutlineKeyboardArrowRight />
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <NoResultsFound />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Product Model */}
      <Modal className='mv_logout_dialog' show={modalShow} onHide={() => setModalShow(false)} size="lg" centered >
        <Modal.Body className='text-center mv_logout'>
          <h5 className='mb-2'>Delete</h5>
          <p>Are you sure you want to <br /> delete? </p>
          <div className='mv_logout_Model_button d-flex align-items-center justify-content-center'>
            <div className="mv_logout_cancel">
              <button onClick={() => setModalShow(false)}>Cancel</button>
            </div>
            <div className="mv_logout_button">
              <button>Delete</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Order;