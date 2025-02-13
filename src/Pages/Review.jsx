

import React, { useState } from 'react';
import { Table, Card, Button, Modal } from 'react-bootstrap';
import { FaStar, FaEye, FaTrashAlt } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReviewManagement = () => {
  const [selectedReview, setSelectedReview] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  // Sample review data
  const reviews = [
    {
      id: 1,
      customerName: "John Doe",
      productName: "Wireless Headphones",
      rating: 4,
      date: "2024-02-12",
      status: "Published",
      comment: "Great product, very comfortable and good sound quality."
    },
    {
      id: 2,
      customerName: "Jane Smith",
      productName: "Smart Watch",
      rating: 5,
      date: "2024-02-11",
      status: "Published",
      comment: "Amazing features and battery life!"
    },
    // Add more sample reviews as needed
  ];

  const handleDelete = (review) => {
    setSelectedReview(review);
    setShowDeleteModal(true);
  };

  const handleView = (review) => {
    setSelectedReview(review);
    setShowViewModal(true);
  };

  const confirmDelete = () => {
    // Add delete logic here
    console.log('Deleting review:', selectedReview);
    setShowDeleteModal(false);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        style={{
          color: index < rating ? '#ffc107' : '#e4e5e9',
          marginRight: '2px'
        }}
      />
    ));
  };

  const styles = {
    actionButton: {
      marginRight: '5px',
      padding: '5px 10px'
    },
    statusBadge: {
      backgroundColor: '#e8f5e9',
      color: '#2e7d32',
      padding: '5px 10px',
      borderRadius: '20px',
      fontSize: '14px'
    }
  };

  return (
    <div className="p-4">
      <Card>
        <Card.Body>
          <h2 className="mb-4">Review Management</h2>
          
          <Table responsive hover>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Product</th>
                <th>Rating</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review.id}>
                  <td>{review.customerName}</td>
                  <td>{review.productName}</td>
                  <td>{renderStars(review.rating)}</td>
                  <td>{review.date}</td>
                  <td>
                    <span style={styles.statusBadge}>
                      {review.status}
                    </span>
                  </td>
                  <td>
                    <Button 
                      variant="outline-primary"
                      size="sm"
                      style={styles.actionButton}
                      onClick={() => handleView(review)}
                    >
                      <FaEye />
                    </Button>
                    <Button 
                      variant="outline-danger"
                      size="sm"
                      style={styles.actionButton}
                      onClick={() => handleDelete(review)}
                    >
                      <FaTrashAlt />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* View Review Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Review Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedReview && (
            <div>
              <p><strong>Customer:</strong> {selectedReview.customerName}</p>
              <p><strong>Product:</strong> {selectedReview.productName}</p>
              <p>
                <strong>Rating:</strong>{' '}
                {renderStars(selectedReview.rating)}
              </p>
              <p><strong>Comment:</strong> {selectedReview.comment}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this review? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ReviewManagement;