import React, { useState } from 'react';
import { Container, Row, Col, Table, Button, Offcanvas, Form, Card } from 'react-bootstrap';
import { FiFilter, FiEye } from 'react-icons/fi';
import 'bootstrap/dist/css/bootstrap.min.css';


import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Component/Layout';
import './CSS/s_style.css';
import Dashboard from './Pages/Dashboard';
// import LoginPage from './Pages/login';
import Forgotpassword from './Pages/Forgotpassword';
import VerifyOTP from './Pages/Veriftotp';
import ResetPassword from './Pages/Resetpassword';
import UserTable from './Pages/User';


const OrderManagement = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'detail'

  // Sample order data
  const orders = [
    { 
      id: 1, 
      customer: "John Doe", 
      date: "2024-02-11", 
      status: "Pending", 
      total: 299.99,
      email: "john@example.com",
      phone: "+1 234 567 8900",
      address: "123 Main St, City, Country",
      items: [
        { name: "Product 1", quantity: 2, price: 149.99 },
        { name: "Product 2", quantity: 1, price: 99.99 }
      ]
    },
    { 
      id: 2, 
      customer: "Jane Smith", 
      date: "2024-02-10", 
      status: "Completed", 
      total: 149.99,
      email: "jane@example.com",
      phone: "+1 234 567 8901",
      address: "456 Oak St, City, Country",
      items: [
        { name: "Product 3", quantity: 1, price: 149.99 }
      ]
    },
  ];

  const handleFilterClose = () => setShowFilter(false);
  const handleFilterShow = () => setShowFilter(true);
  
  const handleOrderView = (order) => {
    setSelectedOrder(order);
    setViewMode('detail');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedOrder(null);
  };


import Product from "./Pages/product";
import Unit from './Pages/unit';
import Size from './Pages/size';
import Addsize from './Pages/add_size';
import Stock from './Pages/stock';
import Addstock from './Pages/add_stock';

import Coupon from './Pages/coupon';
import Addcoupon from './Pages/add_coupon';
import Productoffer from './Pages/product_offer';
import Addproductoffer from './Pages/add_product_offer';
import Login from './Pages/Login';
import DeactivatedAccount from './Pages/DeactivatedAccount';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path='/' element={<LoginPage />}></Route> */}
          {/* <Route path='/' element={<Login/>}></Route> */}
          <Route path='/verify-otp' element={<VerifyOTP />}></Route>
          <Route path='/forgot-password' element={<Forgotpassword />}></Route>
          <Route path='/reset-password' element={<ResetPassword />}></Route>

          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<UserTable/>}/>
            <Route path='/maincategory' element={<Maincategory/>}></Route>
            <Route path='/category' element={<Category/>}></Route>
            <Route path='/subcategory' element={<Subcategory/>}></Route>
            <Route path='/view_profile' element={<Viewprofile />}></Route>
            <Route path="/product" element={<Product />}></Route>
            <Route path='/unit' element={<Unit />}></Route>
            <Route path='/size' element={<Size />}></Route>
            <Route path='/addsize' element={<Addsize />}></Route>
            <Route path='/stock' element={<Stock />}></Route>
            <Route path='/addstock' element={<Addstock />}></Route>
            <Route path="/riyansee" element={<Riyansee/>}></Route>
            <Route path="/DeactivateAccount" element={<DeactivatedAccount/>}></Route>
          </Route>

        </Routes>
      </BrowserRouter>
    </div>

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

  const OrderListView = () => (
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
  );

  const OrderDetailView = () => (
    <Card className="shadow-sm">
      <Card.Header className="bg-white">
        <Row className="align-items-center">
          <Col>
            <Button 
              variant="light" 
              onClick={handleBackToList}
              className="me-2"
            >
              Back
            </Button>
            <span className="fw-bold">Order #{selectedOrder?.id}</span>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={6} className="mb-4">
            <h6>Customer Information</h6>
            <p className="mb-1">Name: {selectedOrder?.customer}</p>
            <p className="mb-1">Email: {selectedOrder?.email}</p>
            <p className="mb-1">Phone: {selectedOrder?.phone}</p>
            <p className="mb-1">Address: {selectedOrder?.address}</p>
          </Col>
          <Col md={6} className="mb-4">
            <h6>Order Details</h6>
            <p className="mb-1">Order Date: {selectedOrder?.date}</p>
            <p className="mb-1">Status: 
              <span className={`ms-2 ${getStatusBadgeClass(selectedOrder?.status)}`}>
                {selectedOrder?.status}
              </span>
            </p>
            <p className="mb-1">Total Amount: ${selectedOrder?.total}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h6>Order Items</h6>
            <Table className="mt-2">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder?.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price}</td>
                    <td>${item.quantity * item.price}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );

  return (
    <Container fluid className="py-4">
      {viewMode === 'list' ? <OrderListView /> : <OrderDetailView />}

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

            <Route path='coupon' element={<Coupon />}></Route>
            <Route path='addcoupon' element={<Addcoupon />}></Route>
            <Route path='Productoffer' element={<Productoffer />}></Route>
            <Route path='addproductoffer' element={<Addproductoffer />}></Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
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
    </Container>
  );
};

export default OrderManagement;