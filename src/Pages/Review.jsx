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

  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [id, setId] = useState(null);

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
      (item.customerName && item.customerName.toLowerCase().includes(query)) ||
      (item.product && item.product.toLowerCase().includes(query)) ||
      (item.date && item.date.includes(query)) ||
      (item.rate && item.rate.toString().includes(query)) ||
      (item.description && item.description.toLowerCase().includes(query))
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
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/api/allratingAndReview`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        // console.log("repsonse", response.data.ratingAndReview);
        setData(response.data.ratingAndReview);
        const formattedData = response.data.ratingAndReview.map(item => {
          return {
            id: item._id,
            customerName: item.userData[0]?.name,
            product: item.productData[0]?.productName,
            date: new Date(item.createdAt).toLocaleDateString(),
            rate: parseFloat(item.rating),
            description: item.review,
            userId: item.userId,
            productId: item.productId,
            productVariantId: item.productVariantId,
            productImages: item.productImages
          };
        });

        setData(formattedData);
        setFilteredData(formattedData);
      } catch (error) {
        console.error('Data Fetching Error:', error);
      }
    }
    fetchData();
  }, []);

  const handleViewModal = (item) => {
    setSelectedItem(item);
    setViewModalShow(true);
  }

  const handleDelete = (id) => {
    setId(id);
    setModalShow(true);
  }

  const handleConfirm = async() => {
    try {
        const response = await axios.delete(`${BaseUrl}/api/deleteRatingAndReview/${id}`, {
          headers: {Authorization: `Bearer ${token}`}
        });
        // console.log("response",response.data);
        if(response.data.status === 200) {
          setModalShow(false);
          setData(prevData => {
            const updatedData = prevData.filter(review => review.id !== id);
            setFilteredData(updatedData); 
            return updatedData;
          });
        }
    } catch (error) {
        console.error('Data Fetching Error:', error);
    }
  }
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
            <div className="mv_product_table_content" >
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
                            <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                            <td>{item.customerName}</td>
                            <td>{item.product}</td>
                            <td>{item.date}</td>
                            <td>{renderStars(item.rate)}</td>
                            <td>{item.description}</td>
                            <td className='d-flex align-items-center justify-content-end'>
                              <div className="mv_pencil_icon" onClick={() => handleViewModal(item)} >
                                <img src={require('../mv_img/eyes_icon.png')} alt="" />
                              </div>
                              <div className="mv_pencil_icon" onClick={() => handleDelete(item.id)}>
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
                <NoResultsFound />
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
              <button onClick={handleConfirm}>Delete</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* view Review Model */}
      <Modal className='mv_logout_dialog' show={viewModalShow} onHide={() => setViewModalShow(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
        <Modal.Body className='text-center'>
          <Modal.Header closeButton className="r_modalheader p-0"></Modal.Header>
          {selectedItem && (
            <div>
              <p className='fw-bold' style={{ fontSize: '18px' }}>View Review</p>
              <table className='sb_table1' width={'100%'}>
                <tbody>
                  <tr>
                    <td>Profile Photo : </td>
                    <td><img src={require('../s_img/profile.png')} alt="" /></td>
                  </tr>
                  <tr>
                    <td>Name : </td>
                    <td>{selectedItem.customerName}</td>
                  </tr>
                  <tr>
                    <td>Date : </td>
                    <td>{selectedItem.date}</td>
                  </tr>
                  <tr>
                    <td>Rating : </td>
                    <td>{renderStars(selectedItem.rate)}</td>
                  </tr>
                  <tr>
                    <td>Description : </td>
                    <td>{selectedItem.description}</td>
                  </tr>
                </tbody>
              </table>
              <Modal.Footer style={{ justifyContent: 'flex-start', borderTop: 'none', padding: '0' }}>
                {selectedItem.productImages && selectedItem.productImages.map((img, idx) => (
                  <img key={idx} src={`${BaseUrl}/${img}`} alt={`Product ${idx}`} style={{ width: '70px', height: '70px' }} />
                ))}
              </Modal.Footer>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ReviewManagement;