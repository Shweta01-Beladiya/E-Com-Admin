import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Offcanvas, Form, InputGroup, Pagination, Col, Row } from 'react-bootstrap';
import { FiFilter, FiEye, FiSearch, FiCalendar } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const OrderManagement = () => {
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  // Sample order data
  const orders = [
    {
      id: "ORD-0001",
      customerName: "John Doe",
      orderDate: "2024-02-13",
      status: "Pending",
      total: 299.99
    },
    {
      id: "ORD-0002",
      customerName: "Jane Smith",
      orderDate: "2024-02-12",
      status: "Completed",
      total: 199.99
    },
    // Add more sample orders as needed
  ];

  // Filter logic
  useEffect(() => {
    let result = [...orders];

    // Search filter
    if (searchTerm) {
      result = result.filter(order =>
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Date range filter
    if (dateRange.startDate && dateRange.endDate) {
      result = result.filter(order => {
        const orderDate = new Date(order.orderDate);
        const start = new Date(dateRange.startDate);
        const end = new Date(dateRange.endDate);
        return orderDate >= start && orderDate <= end;
      });
    }

    // Status filter
    if (statusFilter) {
      result = result.filter(order =>
        order.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    setFilteredOrders(result);
  }, [searchTerm, dateRange, statusFilter]);

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  // Calendar Filter Component
  const CalendarFilter = () => (
    <Offcanvas show={showCalendar} onHide={() => setShowCalendar(false)} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Select Date Range</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              value={dateRange.startDate}
              onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              value={dateRange.endDate}
              onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
            />
          </Form.Group>
          <Button
            variant="dark"
            className="w-100"
            onClick={() => setShowCalendar(false)}
          >
            Apply
          </Button>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );

  // Filter Offcanvas Component
  const FilterOffcanvas = () => (
    <Offcanvas show={showFilter} onHide={() => setShowFilter(false)} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Filter Orders</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="processing">Processing</option>
            </Form.Select>
          </Form.Group>
          <Button
            variant="dark"
            className="w-100"
            onClick={() => setShowFilter(false)}
          >
            Apply Filters
          </Button>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );

  return (
    <Container fluid>
      <div className="mb-4">
        <h5 className="mb-1">Order</h5>
        <div className="text-muted">
          Dashboard / Order
        </div>
      </div>

      <div className="bg-white rounded shadow-sm p-4">

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
          <Col xs={12} md={6} lg={8}>
            <div className="d-flex justify-content-end gap-2">
              <Button
                className="r_filterbtn"
                onClick={() => setShowCalendar(true)}
              >
                <FiCalendar className="me-2" /> Calendar
              </Button>
              <Button
                className="r_filterbtn"
                onClick={() => setShowFilter(true)}
              >
                <FiFilter className="me-2" /> Filter
              </Button>
            </div>
          </Col>
          {/* <div style={{ width: '300px' }}>
            <InputGroup>
              <Form.Control
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <InputGroup.Text>
                <FiSearch />
              </InputGroup.Text>
            </InputGroup>
          </div> */}
        </Row>


        <Table responsive hover className="align-middle">
          <thead className="bg-light">
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Order Date</th>
              <th>Total Amount</th>
              <th>Order Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customerName}</td>
                <td>{order.orderDate}</td>
                <td>${order.total.toFixed(2)}</td>
                <td>
                  <span className={`badge ${order.status.toLowerCase() === 'completed' ? 'bg-success' : 'bg-warning'}`}>
                    {order.status}
                  </span>
                </td>

                <td>
                  <Button
                    className="r_deleticon me-2"

                    onClick={() => navigate(`/order/${order.id}`)}
                  >
                    <img src={require('../Photos/eye.png')} className="r_deletimg" alt="edit" />
                  </Button>
                  <Button
                    className="r_deleticon"
                    
                  >
                    <img src={require('../Photos/print.png')} className="r_deletimg" alt="delete" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Pagination */}
        <div className="d-flex justify-content-end mt-4">
          <Pagination>
            {/* <Pagination.First
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            /> */}
            <Pagination.Prev
              onClick={() => setCurrentPage(curr => curr - 1)}
              disabled={currentPage === 1}
            />
            {[...Array(totalPages)].map((_, idx) => (
              <Pagination.Item
                key={idx + 1}
                active={idx + 1 === currentPage}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => setCurrentPage(curr => curr + 1)}
              disabled={currentPage === totalPages}
            />
            {/* <Pagination.Last
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            /> */}
          </Pagination>
        </div>

        <CalendarFilter />
        <FilterOffcanvas />
      </div>
    </Container>
  );
};

export default OrderManagement;