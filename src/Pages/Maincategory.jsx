
import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Table, InputGroup, Col, Row } from "react-bootstrap";
import '../CSS/riya.css';
import { FaSearch } from 'react-icons/fa';
import axios from "axios";
import { Formik, ErrorMessage, Field } from "formik";
import * as Yup from 'yup';

const MainCategory = () => {
  const BaseUrl = process.env.REACT_APP_BASEURL;
  const token = localStorage.getItem('token');

  const [categories, setCategories] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [id, setId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const categorySchema = Yup.object().shape({
    mainCategoryName: Yup.string()
      .min(2, 'Main Category name must be at least 2 characters')
      .max(50, 'Main Category name must be less than 50 characters')
      .required('Main Category name is required')
  });

  const initialValues = ({
    mainCategoryName: ''
  })
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/api/allMainCategory`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        // console.log("response",response.data.users);
        setCategories(response.data.users);
      } catch (error) {
        console.error('Data Fetching Error:', error);
      }
    }
    fetchData();
  }, [BaseUrl, token]);

  const handleSubmit = async (value, { resetForm }) => {
    try {
      if (id) {
        // console.log("id",id);

        const response = await axios.put(`${BaseUrl}/api/updateMainCategory/${id}`, value, {
          headers: { Authorization: `Bearer ${token}` }
        });
        // console.log("response",response.data);
        if (response.data.status === 200) {
          setCategories((prevCategories) =>
            prevCategories.map((cat) =>
              cat._id === id ? { ...cat, ...value } : cat
            )
          );
          setId(null);
          setShowEditModal(false);
          resetForm();
        }
      } else {
        const response = await axios.post(`${BaseUrl}/api/createMaincategory`, value, {
          headers: { Authorization: `Bearer ${token}` }
        })
        // console.log("Response", response.data);
        if (response.data.status === 201) {
          setCategories((prevCategories) => [...prevCategories, response.data.maincategory]);
          setShowAddModal(false);
          resetForm();
        }
      }
    } catch (error) {
      console.error('Data create and update Error:', error);
    }
  };

  const handleDelete = async () => {
    const response = await axios.delete(`${BaseUrl}/api/deleteMainCategory/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (response.data.status === 200) {
      setCategories((prevCategories) =>
        prevCategories.filter((cat) => cat._id !== id)
      );
      setShowDeleteModal(false);
      setId(null);
      setCategoryToDelete(null);
    }
    // setCategories(categories.filter((cat) => cat.id !== currentCategory.id));
    setShowDeleteModal(false);
  };

  const handleStatusChange = async (id, status) => {
    try {

      const updatedStatus = !status

      const response = await axios.put(`${BaseUrl}/api/updateMainCategory/${id}`, { status: updatedStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.status === 200) {
        setCategories((prevCategories) =>
          prevCategories.map((cat) =>
            cat._id === id ? { ...cat, status: updatedStatus } : cat
          )
        );
      }
    } catch (error) {
      console.error('Status Upadte error', error);
    }
  }

  const filteredCategories = categories.filter((cat) =>
    cat?.mainCategoryName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

   // No Results Found Component
  const NoResultsFound = () => (
    <div style={{transform: 'translateY(50%)'}}>
      <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
        <img src={require('../Photos/notfind.png')}></img>
      </div>
    <div>
    <h3 className="text-lg font-semibold mb-2">Result Not Found</h3>
    </div>
  <div>
        <p className="text-gray-500">Whoops... No matching data found</p>
  </div>
    </div>
    </div>
  );

  return (
    <div >
      <h5 className="mb-0 fw-bold">Main Category</h5>
      <div className='d-flex'>
        <p class="text-muted">Dashboard /</p>
        <p className='ms-1'>Main Category</p>
      </div>
      <div style={{ backgroundColor: 'white', padding: '20px',height:'100vh' }}>
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
          <Col xs={12} md={6} lg={8} className="text-end mt-3 mt-md-0">
            <Button className="r_add" onClick={() => setShowAddModal(true)}>
              + Add
            </Button>
          </Col>
        </Row>
        {filteredCategories.length > 0 ? (
          <Table responsive borderless>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((cat, index) => (
                <tr key={cat.id}>
                  <td>{index + 1}</td>
                  <td>{cat.mainCategoryName}</td>
                  <td>
                    <Form.Check
                      type="switch"
                      checked={cat.status}
                      onChange={() => handleStatusChange(cat._id, cat.status)}

                    />
                  </td>
                  <td>
                    <Button
                      className="r_deleticon me-2"
                      onClick={() => {
                        setId(cat._id);
                        setSelectedCategory(cat);
                        setShowEditModal(true);
                      }}
                    >
                      <img src={require('../Photos/edit.png')} alt="" class="r_deletimg" ></img>
                    </Button>
                    <Button
                      className="r_deleticon"
                      onClick={() => { setId(cat._id); setShowDeleteModal(true); setCategoryToDelete(cat); }}
                    >
                      <img src={require('../Photos/delet.png')} alt="" class="r_deletimg" ></img>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

        ) : (
          <NoResultsFound />
        )}
      </div>

      {/* Add Modal */}
      <Modal
        show={showAddModal}
        onHide={() => {
          setShowAddModal(false);
        }}
        centered
      >
        <Modal.Header closeButton className="r_modalheader" />
        <Modal.Body className="r_modalbody">
          <p className="text-center fw-bold">Add Main Category</p>
          <Formik
            validationSchema={categorySchema}
            onSubmit={handleSubmit}
            initialValues={initialValues}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <Form className="r_form" onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Main Category</Form.Label>
                  {/* <Form.Control
                    type="text"
                    name="mainCategoryName"
                    placeholder="Enter main category"
                    value={values.mainCategoryName}
                    onChange={handleChange}
                  /> */}
                  <Field type="text" name="mainCategoryName" className="form-control" placeholder="Enter main category " value={values.mainCategoryName}
                    onChange={handleChange} />
                  <ErrorMessage name="mainCategoryName" component="div" className="text-danger small" />
                </Form.Group>
                <div className='d-flex justify-content-center gap-3 mt-4'>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setShowAddModal(false);
                    }}
                    className="r_cancel"
                  >
                    Cancel
                  </Button>
                  <Button variant="dark" type="submit" className="r_delete">
                    Add
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>

      {/* Edit Modal */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
      >
        <Modal.Header closeButton className="r_modalheader">
        </Modal.Header>
        <Modal.Body className="r_modalbody">
          <p className="text-center fw-bold">Edit Main Category</p>
          <Formik
            validationSchema={categorySchema}
            onSubmit={handleSubmit}
            initialValues={{
              mainCategoryName: selectedCategory?.mainCategoryName || ''
            }}
            enableReinitialize
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <Form className="r_form" onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Main Category</Form.Label>
                  <Field type="text" name="mainCategoryName" className="form-control" placeholder="Enter main category " value={values.mainCategoryName}
                    onChange={handleChange} />
                  <ErrorMessage name="mainCategoryName" component="div" className="text-danger small" />
                </Form.Group>
                <div className='d-flex justify-content-center gap-3 mt-4'>
                  <Button onClick={() => setShowEditModal(false)} className="r_cancel">
                    Cancel
                  </Button>
                  <Button type="submit" className="r_delete">
                    Update
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Body className=" p-5" >
          <h5 className='font-weight-bold text-center mb-3'>Delete</h5>
          <p className='text-center text-muted mb-4'> Are you sure you want to delete {categoryToDelete?.mainCategoryName}?</p>
          <div className='d-flex justify-content-center gap-3 mt-4'>
            <Button onClick={() => setShowDeleteModal(false)} className="r_cancel" >
              Cancel
            </Button>
            <Button onClick={handleDelete} className="r_delete" >
              Delete
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MainCategory;
