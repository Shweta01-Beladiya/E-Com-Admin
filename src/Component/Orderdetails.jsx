
import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Offcanvas, Form, InputGroup } from 'react-bootstrap';
import { FiFilter, FiEye } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

// Order Detail Component

const OrderDetail = () => {
    const order = {
      id: "ORD-0001",
      customerName: "John Doe",
      orderDate: "2024-02-13",
      status: "Pending",
      total: 299.99,
      items: [
        { name: "Product 1", quantity: 2, price: 149.99, image: "/api/placeholder/40/40" },
        { name: "Product 2", quantity: 1, price: 99.99, image: "/api/placeholder/40/40" }
      ]
    };
  
    return (
      <Container fluid className="p-4">
        <div className="mb-4">
          <h5 className="mb-1">View Order</h5>
          <div className="text-muted">
            Dashboard / Order / View
          </div>
        </div>
  
        <div className="bg-white rounded shadow-sm p-4">
          <div className="row mb-4">
            <div className="col-md-6">
              <h6 className="fw-bold mb-3">Order Information</h6>
              <p className="mb-2">Order ID: {order.id}</p>
              <p className="mb-2">Customer Name: {order.customerName}</p>
              <p className="mb-2">Order Date: {order.orderDate}</p>
              <p className="mb-0">
                Status: 
                <span className={`badge ${order.status.toLowerCase() === 'completed' ? 'bg-success' : 'bg-warning'} ms-2`}>
                  {order.status}
                </span>
              </p>
            </div>
          </div>
  
          <h6 className="fw-bold mb-3">Order Items</h6>
          <Table responsive hover className="align-middle">
            <thead className="bg-light">
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="me-3"
                        style={{ width: 40, height: 40, objectFit: 'cover' }}
                      />
                      {item.name}
                    </div>
                  </td>
                  <td>{item.quantity}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>${(item.quantity * item.price).toFixed(2)}</td>
                </tr>
              ))}
              <tr className="fw-bold">
                <td colSpan="3" className="text-end">Total:</td>
                <td>${order.total.toFixed(2)}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Container>
    );
  };
  
  export default  OrderDetail ;