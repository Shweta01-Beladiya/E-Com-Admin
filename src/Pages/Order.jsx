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

const Order = () => {

  var data = [
    {
      id: 1,
      CustomerName: "John Desai",
      OrderDate: "02/09/2024",
      TotalAmount: "$2000",
      OrderStatus: "Deliverd"
    },
    {
      id: 2,
      CustomerName: "Mitesh Shah",
      OrderDate: "02/08/2024",
      TotalAmount: "$3000",
      OrderStatus: "Panding"
    },
    {
      id: 3,
      CustomerName: "John Desai",
      OrderDate: "02/01/2025",
      TotalAmount: "$2200",
      OrderStatus: "Cancelled"
    },
    {
      id: 4,
      CustomerName: "Om Patel",
      OrderDate: "20/02/2025",
      TotalAmount: "$800",
      OrderStatus: "Deliverd"
    },
    {
      id: 5,
      CustomerName: "Nizam Patel ",
      OrderDate: "18/11/2024",
      TotalAmount: "$1200",
      OrderStatus: "Cancelled"
    },
  ];
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [originalData] = useState(data);

  // ************************************** Pagination **************************************
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, filterDate, filterStatus]);

  const applyFilters = () => {
    // Reset to page 1 when filters change
    setCurrentPage(1);

    let results = originalData;

    // Apply search filter
    if (searchTerm) {
      results = results.filter(item =>
        item.CustomerName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply date filter
    if (filterDate) {
      const formattedFilterDate = formatDateForComparison(filterDate);
      results = results.filter(item => {
        const orderDate = formatDateForComparison(item.OrderDate);
        return orderDate === formattedFilterDate;
      });
    }

    // Apply status filter
    if (filterStatus && filterStatus !== 'Select') {
      results = results.filter(item =>
        item.OrderStatus === filterStatus
      );
    }

    setFilteredData(results);
  };

  const formatDateForComparison = (dateString) => {
    if (!dateString) return '';

    if (dateString.includes('-')) {
      const [year, month, day] = dateString.split('-');
      return `${day}/${month}/${year}`;
    }

    return dateString;
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
    setFilteredData(originalData);
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
    const buttons = [];
    const maxButtonsToShow = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxButtonsToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);

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

  // Modal
  const [modalShow, setModalShow] = React.useState(false);

  // Offcanvas
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
            <div className="mv_product_table_content" style={{height:'80vh'}}>
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
                  <div className="sb_date_input">
                    {/* {selectedDate ? (
                                    <Button variant="primary" onClick={clearDateFilter}>
                                        <IoMdClose /> Clear Date
                                    </Button>
                                ) : ( */}
                    <input type="date" name="" id="" value={filterDate}
                      onChange={handleDateChange} />
                    {/* )} */}
                  </div>
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
                              <option value="Deliverd">Order Delivered</option>
                              <option value="Panding">Order Panding</option>
                              <option value="Cancelled">Order Cancelled</option>
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
                            <td>{index + 1}</td>
                            <td>{item.CustomerName}</td>
                            <td>{item.OrderDate}</td>
                            <td>{item.TotalAmount}</td>
                            <td>
                              {
                                item.OrderStatus === 'Deliverd' ? (
                                  <p className='m-0 mv_delivered_padd'>{item.OrderStatus}</p>
                                ) : item.OrderStatus === 'Panding' ? (
                                  <p className='m-0 mv_pending_padd'>{item.OrderStatus}</p>
                                ) : item.OrderStatus === 'Cancelled' ? (
                                  <p className='m-0 mv_cancelled_padd'>{item.OrderStatus}</p>
                                ) : null
                              }
                            </td>
                            <td className='d-flex align-items-center justify-content-end'>
                              <div className="mv_pencil_icon">
                                <Link to={'/viewOrder'}>
                                  <img src={require('../mv_img/eyes_icon.png')} alt="" />
                                </Link>
                              </div>
                              <div className="mv_pencil_icon">
                                <img src={require('../mv_img/print.png')} alt="" />
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
                <NoResultsFound />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Product Model */}
      <Modal className='mv_logout_dialog' show={modalShow} onHide={() => setModalShow(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
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