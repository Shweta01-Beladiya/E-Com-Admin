import React, { useState } from 'react';
import { Offcanvas, Form, Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/riya.css'

const FilterOffcanvas = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Open Filter
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement="end" className="filter-offcanvas">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filter</Offcanvas.Title>
        </Offcanvas.Header>
        
        <Offcanvas.Body className="filter-body">
          <div className="filter-content">
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Select>
                  <option>Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Form.Select>
              </Form.Group>
              
              {/* Add more filter options here */}
            </Form>
          </div>

          <div className="button-container">
            <Container fluid>
              <div className="d-flex gap-3">
                <Button 
                  variant="outline-secondary" 
                  className="flex-grow-1"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button 
                  variant="dark" 
                  className="flex-grow-1"
                >
                  Apply
                </Button>
              </div>
            </Container>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default FilterOffcanvas;