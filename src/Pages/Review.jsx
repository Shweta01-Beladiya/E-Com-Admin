import React, { useEffect, useState } from 'react';
import '../CSS/product.css';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import NoResultsFound from '../Component/Noresult';
import axios from 'axios';

const ReviewManagement = () => {

  const BaseUrl = process.env.REACT_APP_BASEURL;
  const token = localStorage.getItem('token');

  const [data,setData] = useState([]);

  // var data = [
  //   {
  //     id: 1,
  //     customerName: "Johan Desai",
  //     product: 'Smart Watch',
  //     date: "02/09/2023",
  //     rate: '4.5',
  //     description: "Lorem ipsum dolor sit",
  //   },
  //   {
  //     id: 2,
  //     customerName: "Om Patel",
  //     product: 'Skin Care',
  //     date: "12/08/2024",
  //     rate: '4.0',
  //     description: "Lorem ipsum dolor sit",
  //   },
  //   {
  //     id: 3,
  //     customerName: "Nizam Patel",
  //     product: 'Smart Watch',
  //     date: "02/10/2024",
  //     rate: '3.5',
  //     description: "Lorem ipsum dolor sit",
  //   },
  //   {
  //     id: 5,
  //     customerName: "Johan Desai",
  //     product: 'Smart Watch',
  //     date: "02/09/2023",
  //     rate: '4.1',
  //     description: "Lorem ipsum dolor sit",
  //   },
  // ];

  const renderStars = (rating) => {
    const stars = [];
    const roundedRating = Math.round(rating * 2) / 2; // Round to nearest 0.5

    for (let i = 1; i <= 5; i++) {
      if (i <= roundedRating) {
        stars.push(<FaStar key={i} color="#FDC040" />); // Full Star
      } else if (i - 0.5 === roundedRating) {
        stars.push(<FaStarHalfAlt key={i} color="#FDC040" />); // Half Star
      } else {
        stars.push(<FaRegStar key={i} color="#FDC040" />); // Empty Star
      }
    }
    return stars;
  };

  // ************************************** Pagination **************************************
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = data.filter(item =>
      item.customerName.toLowerCase().includes(query) ||
      item.product.toLowerCase().includes(query) ||
      item.date.includes(query) ||
      item.rate.includes(query) ||
      item.description.toLowerCase().includes(query)
    );

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page after search
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

  // Modal
  const [modalShow, setModalShow] = React.useState(false);
  const [viewModalShow, setViewModalShow] = React.useState(false);

  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await axios.get(`${BaseUrl}/api/allratingAndReview`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log("repsonse",response.data.ratingAndReview);
        setData(response.data.ratingAndReview);
      } catch (error) {
        console.error('Data Fetching Error:', error);
      }
    }
    fetchData();
  },[]);
  return (
    <>
      <div id='mv_container_fluid'>
        <div className="mv_main_heading mb-4 d-flex align-items-center justify-content-between">
          <div>
            <p className='mb-1'>Review</p>
            <div className='d-flex align-items-center'>
              <p className='mv_dashboard_heading mb-0'>Dashboard /</p>
              <p className='mv_category_heading mv_subcategory_heading mb-0'>Review</p>
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
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={handleSearch}
                    />
                  </InputGroup>
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
                          <th className=''>Product</th>
                          <th className=''>Date</th>
                          <th className=''>Rate</th>
                          <th className=''>Description</th>
                          <th className='d-flex align-items-center justify-content-end'>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedData.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.customerName}</td>
                            <td>{item.product}</td>
                            <td>{item.date}</td>
                            <td>{renderStars(item.rate)}</td>
                            <td>{item.description}</td>
                            <td className='d-flex align-items-center justify-content-end'>
                              <div className="mv_pencil_icon" onClick={() => setViewModalShow(true)} >
                                <img src={require('../mv_img/eyes_icon.png')} alt="" />
                              </div>
                              <div className="mv_pencil_icon" onClick={() => setModalShow(true)}>
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

      {/* Delete Review Model */}
      <Modal className='mv_logout_dialog' show={modalShow} onHide={() => setModalShow(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
        <Modal.Body className='text-center mv_logout'>
          <h5 className='mb-2'>Delete</h5>
          <p>Are you sure you want to delete Review? </p>
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

      {/* view Review Model */}
      <Modal className='mv_logout_dialog' show={viewModalShow} onHide={() => setViewModalShow(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
        <Modal.Body className='text-center'>
          <Modal.Header closeButton className="r_modalheader p-0"></Modal.Header>
          <div>
            <p className='fw-bold' style={{ fontSize: '18px' }}>View Review</p>
            <table className='sb_table1' width={'100%'}>
              <tr>
                <td>Profile Photo : </td>
                <td><img src={require('../s_img/profile.png')} alt="" /></td>
              </tr>
              <tr>
                <td>Name : </td>
                <td>Johan Desai</td>
              </tr>
              <tr>
                <td>Date : </td>
                <td>09/02/2024</td>
              </tr>
              <tr>
                <td>Rating : </td>
                <td></td>
              </tr>
              <tr>
                <td>Description : </td>
                <td>Lorem ispum dolor sit amet consectetu <br />Lorem ispum dolor sit amet</td>
              </tr>
            </table>
            <Modal.Footer style={{ justifyContent: 'flex-start', borderTop: 'none', padding: '0' }}>
              <img src={require('../s_img/image1.png')} alt="" style={{ width: '70px', height: '70px' }} />
              <img src={require('../s_img/image2.png')} alt="" style={{ width: '70px', height: '70px' }} />
            </Modal.Footer>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ReviewManagement;