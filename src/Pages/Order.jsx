import React, { useState } from 'react';
import { Container, Row, Col, Table, Button, Offcanvas, Form, Card } from 'react-bootstrap';
import { FiFilter, FiEye, FiX } from 'react-icons/fi';
import 'bootstrap/dist/css/bootstrap.min.css';

const OrderManagement = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [showOrderView, setShowOrderView] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Sample order data
  const orders = [
    { id: 1, customer: "John Doe", date: "2024-02-11", status: "Pending", total: 299.99 },
    { id: 2, customer: "Jane Smith", date: "2024-02-10", status: "Completed", total: 149.99 },
    { id: 3, customer: "Mike Johnson", date: "2024-02-09", status: "Processing", total: 499.99 },
  ];

  const handleFilterClose = () => setShowFilter(false);
  const handleFilterShow = () => setShowFilter(true);
  
  const handleOrderViewClose = () => {
    setShowOrderView(false);
    setSelectedOrder(null);
  };

  const handleOrderView = (order) => {
    setSelectedOrder(order);
    setShowOrderView(true);
  };

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'text-success';
      case 'pending':
        return 'text-warning';
      case 'processing':
        return 'text-primary';
      default:
        return 'text-secondary';
    }
  };

  return (
    <Container fluid className="py-4">
      <Card className="shadow-sm">
        <Card.Header className="bg-white">
          <Row className="align-items-center">
            <Col>
              <h5 className="mb-0">Orders</h5>
            </Col>
            <Col xs="auto">
              <Button 
                variant="light" 
                className="d-flex align-items-center gap-2"
                onClick={handleFilterShow}
              >
                <FiFilter /> Filter
              </Button>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table hover className="mb-0">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.date}</td>
                    <td>
                      <span className={getStatusBadgeClass(order.status)}>
                        {order.status}
                      </span>
                    </td>
                    <td>${order.total}</td>
                    <td>
                      <Button 
                        variant="light" 
                        size="sm" 
                        onClick={() => handleOrderView(order)}
                      >
                        <FiEye />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      {/* Filter Offcanvas */}
      <Offcanvas show={showFilter} onHide={handleFilterClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filter Orders</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select>
                <option value="">All</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date Range</Form.Label>
              <Form.Control type="date" className="mb-2" />
              <Form.Control type="date" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Customer Name</Form.Label>
              <Form.Control type="text" placeholder="Search customer..." />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary">Apply Filters</Button>
              <Button variant="light" onClick={handleFilterClose}>Cancel</Button>
            </div>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Order View Offcanvas */}
      <Offcanvas show={showOrderView} onHide={handleOrderViewClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            Order Details #{selectedOrder?.id}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {selectedOrder && (
            <div className="d-flex flex-column gap-4">
              <div>
                <h6 className="mb-2">Customer Information</h6>
                <p className="mb-0">{selectedOrder.customer}</p>
              </div>
              
              <div>
                <h6 className="mb-2">Order Date</h6>
                <p className="mb-0">{selectedOrder.date}</p>
              </div>

              <div>
                <h6 className="mb-2">Status</h6>
                <p className={`mb-0 ${getStatusBadgeClass(selectedOrder.status)}`}>
                  {selectedOrder.status}
                </p>
              </div>

              <div>
                <h6 className="mb-2">Order Total</h6>
                <p className="mb-0">${selectedOrder.total}</p>
              </div>
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
};

export default OrderManagement;