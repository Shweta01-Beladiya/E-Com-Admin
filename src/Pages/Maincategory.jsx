import React, { useEffect, useState } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import '../CSS/riya.css';
import axios from "axios";
import { Formik, ErrorMessage, Field } from "formik";
import * as Yup from 'yup';
import NoResultsFound from "../Component/Noresult";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

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
  const [filteredData, setFilteredData] = useState([]);

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

  const handleSubmit = async (value, { resetForm,setFieldError  }) => {
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
        console.log("Response", response.data);
        if (response.data.status === 201) {
          setCategories((prevCategories) => [...prevCategories, response.data.maincategory]);
          setShowAddModal(false);
          resetForm();
        }
      }
    } catch (error) {
      console.error('Data create and update Error:', error);
      if (error.response && error.response.status === 409) {
        setFieldError('mainCategoryName', 'This category name already exists');
      }
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
  // ************************************** Pagination **************************************
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const getPaginationButtons = () => {
    if (totalPages <= 4) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
  
    const buttons = [];
  
    if (currentPage <= 2) {
      buttons.push(1, 2, 3, "...");
    } else if (currentPage >= totalPages - 1) {
      buttons.push("...", totalPages - 2, totalPages - 1, totalPages);
    } else {
      buttons.push(currentPage - 1, currentPage, currentPage + 1, "...");
    }
  
    return buttons;
  };

  useEffect(() => {
    setFilteredData(filteredCategories);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories, searchTerm]);

  // *******************************************************************************
  return (
    <>
      <div id='mv_container_fluid'>
        <div className="mv_main_heading mb-4 d-flex align-items-center justify-content-between">
          <div>
            <p className='mb-1'>Main Category</p>
            <div className='d-flex align-items-center'>
              <p className='mv_dashboard_heading mb-0'>Dashboard /</p>
              <p className='mv_category_heading mv_subcategory_heading mb-0'>Main Category</p>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12">
            <div className="mv_product_table_content">
              <div className='mv_table_search mv_table_no_flex'>
                <div className="mv_product_search ">
                  <InputGroup>
                    <Form.Control
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </InputGroup>
                </div>
                <div>
                  <div className='mv_category_side mv_product_page_category d-flex align-items-center'>
                    <div className="mv_add_category mv_add_subcategory mv_add_product">
                      <button onClick={() => setShowAddModal(true)}>+ Add</button>
                    </div>
                  </div>
                </div>
              </div>
              {paginatedData.length > 0 ? (
                <>
                  <div className="mv_product_table_padd" >
                    <table className='mv_product_table justify-content-between'>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Status</th>
                          <th className='d-flex align-items-center justify-content-end'>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedData.map((cat, index) => (
                          <tr key={cat.id}>
                            <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                            <td>{cat.mainCategoryName}</td>
                            <td >
                              <Form.Check
                                type="switch"
                                checked={cat.status}
                                onChange={() => handleStatusChange(cat._id, cat.status)}

                              />
                            </td>
                            <td className='d-flex align-items-center justify-content-end'>
                              <div className="mv_pencil_icon" onClick={() => { setId(cat._id); setShowDeleteModal(true); setCategoryToDelete(cat); }}>
                                <img src={require('../mv_img/trust_icon.png')} alt="" />
                              </div>
                              <div className="mv_pencil_icon" onClick={() => {
                                setId(cat._id);
                                setSelectedCategory(cat);
                                setShowEditModal(true);
                              }}>
                                <img src={require('../mv_img/pencil_icon.png')} alt="" />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {totalPages > 1 && (
                    <div className="mv_other_category d-flex align-items-center justify-content-end pb-4 mt-4">
                      {/* Previous Button */}
                      <p className={`mb-0 ${currentPage === 1 ? 'disabled' : ''}`} 
                        onClick={() => handlePageChange(currentPage - 1)}>
                        <MdOutlineKeyboardArrowLeft />
                      </p>
                      {/* Pagination Buttons */}
                      {getPaginationButtons().map((page, index) => (
                        <p key={index}
                          className={`mb-0 ${currentPage === page ? "mv_active" : ""}`}
                          onClick={() => typeof page === "number" && handlePageChange(page)}
                          style={{ cursor: page === "..." ? "default" : "pointer" }}>
                          {page}
                        </p>
                      ))}
                      {/* Next Button */}
                      <p className={`mb-0 ${currentPage === totalPages ? 'disabled' : ''}`} 
                        onClick={() => handlePageChange(currentPage + 1)} >
                        <MdOutlineKeyboardArrowRight />
                      </p>
                    </div>
                  )}
                </>
              ) : (<NoResultsFound />)}
            </div>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      <Modal
        show={showAddModal}
        onHide={() => {
          setShowAddModal(false);
        }}
        centered
      >
        <Modal.Header className='mv_edit_profile_header' closeButton>

        </Modal.Header>
        <Modal.Title className='mv_edit_profile_title' id="contained-modal-title-vcenter">
          <p className="mb-0">Add Main Category</p>
        </Modal.Title>
        <Modal.Body className="r_modalbody">
          <Formik
            validationSchema={categorySchema}
            onSubmit={handleSubmit}
            initialValues={initialValues}
          >
            {({ handleBlur, handleChange, handleSubmit, values, setFieldError , touched }) => (
              <Form className="r_form" onSubmit={handleSubmit}>
                <div className="mv_input_content mb-5">
                  <label className='mv_label_input'>Main Category</label>
                  <InputGroup className="">
                    <Form.Control
                      placeholder="Enter main category"
                      name='mainCategoryName'
                      value={values.mainCategoryName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    </InputGroup>
                  <ErrorMessage name="mainCategoryName" component="small" className="text-danger small" />
                </div>
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
        <Modal.Header className='mv_edit_profile_header' closeButton>

        </Modal.Header>
        <Modal.Title className='mv_edit_profile_title' id="contained-modal-title-vcenter">
          <p className="mb-0">Add Main Category</p>
        </Modal.Title>
        <Modal.Body className="r_modalbody">
          <Formik
            validationSchema={categorySchema}
            onSubmit={handleSubmit}
            initialValues={{
              mainCategoryName: selectedCategory?.mainCategoryName || ''
            }}
            enableReinitialize
          >
            {({ handleBlur, handleChange, handleSubmit, values, errors, touched }) => (
              <Form className="r_form" onSubmit={handleSubmit}>
                <div className="mv_input_content mb-5">
                  <label className='mv_label_input'>Main Category</label>
                  <InputGroup className="">
                    <Form.Control
                      placeholder="Enter main category"
                      name='mainCategoryName'
                      value={values.mainCategoryName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    </InputGroup>
                  <ErrorMessage name="mainCategoryName" component="small" className="text-danger small" />
                </div>
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
    </>
  );
};

export default MainCategory;
