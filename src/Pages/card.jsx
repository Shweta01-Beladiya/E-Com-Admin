import React, { useEffect, useState } from 'react';
import '../CSS/product.css';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import NoResultsFound from "../Component/Noresult";

const Cards = ({ editData }) => {

    const BaseUrl = process.env.REACT_APP_BASEURL;
    const token = localStorage.getItem('token');

    const [toggle, setToggle] = useState(false)
    const [deleteToggle, setDeleteToggle] = useState(null)
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);

    // ************************************** Pagination **************************************
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredData, setFilteredData] = useState([]);
    const [shouldResetPage, setShouldResetPage] = useState(false);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    // console.log("totalpage",totalPages)

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

    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    // *******************************************************************************
    
    // Modal
    const [modalShow, setModalShow] = React.useState(false);
    const [modalShow1, setModalShow1] = React.useState(false);

    // Select img
    const [addimg, setaddimg] = useState("");

    const [brandImagePreview, setBrandImagePreview] = useState(null);

    useEffect(() => {
        if (editData) {
            setBrandImagePreview(editData.cardImage);
        }
    }, [editData]);

    // ******************************* Validation *******************************
    const [id, setId] = useState(null);

    const init = {
        title: "",
        subTitle: "",
        addcardimage: "",
    };
    
    const validate = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        subTitle: Yup.string().required("subTitle is required"),
        addcardimage: id ? Yup.mixed().optional() : Yup.mixed().required("Image is required"),

    });
    
    const formik = useFormik({
        initialValues: init,
        validationSchema: validate,
        onSubmit: async (values) => {
            console.log(values);
            // card(values)

            // addpopularbrand(values)
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("subTitle", values.subTitle);
            // formData.append("brandImage", values.addcardimage);

            if (values.addcardimage) {
                formData.append("cardImage", values.addcardimage);
            }

            //************************************** Edit and Add **************************************
            if (id) {
                try {
                    const response = await axios.put(`${BaseUrl}/api/updateCard/${id}`, formData, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data"
                        }
                    });
                    console.log("Response:", response?.data);
                    setModalShow1(false);
                    setToggle(!toggle); // Refresh data
                    resetForm();
                } catch (error) {
                    console.error("Error:", error);
                    alert("Error submitting form. Please try again.");
                }
            }
            else {
                try {
                    const response = await axios.post(`${BaseUrl}/api/createCard`, formData, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data"
                        }
                    });
                    console.log("Response:", response?.data);
                    setModalShow1(false);
                    setToggle(!toggle); // Refresh data
                    resetForm();
                } catch (error) {
                    console.error("Error:", error);
                    alert("Error submitting form. Please try again.");
                }
            }
        }
    });
    
    const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue, resetForm, setValues } = formik;
    // *******************************************************************************

    // ************************************** Show Data **************************************
    useEffect(()=>{
       const fetchBrandData = async () => {
           try{
              const response = await axios.get(`${BaseUrl}/api/allCards`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                }
              })
            //   console.log("data" , response?.data);
              setFilteredData(response?.data?.card)
              setData(response?.data?.card)
           }catch(error){
              console.error("Error fetching data:", error);
           }
       }

       fetchBrandData()
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[toggle])
    // ***************************************************************************************

    // ************************************** Delete Item **************************************
    const handleManage = (id) =>{
        setModalShow(true)
        setDeleteToggle(id)
    }

    const handleDelete = async () => {
        try{
           const response = await axios.delete(`${BaseUrl}/api/deleteCard/${deleteToggle}`,{
               headers: {
                   Authorization: `Bearer ${token}`,
               }
           })
            const updatedData = filteredData.filter(item => item._id !== deleteToggle);
            setFilteredData(updatedData);
            setData(updatedData);
            
            if (updatedData.length === 0) {
                setCurrentPage(1);
            }
            
           setModalShow(false)
           setToggle(!toggle)
        }catch(error){
            alert(error)
        }
    }
    // ***************************************************************************************

    // Edit
    const handleEdit = (item) => {
        setId(item._id);
        setSelectedItem(item);
        console.log("item" , item?.cardImage.split("\\").pop());
        
        // Set form values with the selected item data
        setValues({
            title: item.title || "",
            subTitle: item.subTitle || "",
            addcardimage: ""  // Don't set the file input
        });
        
        // Set image preview
        if(item.cardImage) {
            let fileimg = item.cardImage.split("\\").pop();
            setBrandImagePreview(`${BaseUrl}/${item.cardImage}`);
            setaddimg(fileimg.substring(fileimg.indexOf('-') + 1)); // Show some text to indicate there's an existing image
        } else {
            setBrandImagePreview(null);
            setaddimg("");
        }
        
        setModalShow1(true);
    };

    // Add new - reset form
    const handleAddNew = () => {
        setId(null);
        setSelectedItem(null);
        resetForm();
        setBrandImagePreview(null);
        setaddimg("");
        setModalShow1(true);
    };

    // Search Data
    useEffect(() => {
        let result = data;
        // console.log("" , result);
    
        if (searchTerm) {
          result = result.filter(user =>
            user.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.subTitle?.includes(searchTerm)
          );
        }
        setFilteredData(result); 
    
        if (shouldResetPage) {
            setCurrentPage(1);
            setShouldResetPage(false);
        }

        const newTotalPages = Math.ceil(result.length / itemsPerPage);
        if (currentPage > newTotalPages && newTotalPages > 0) {
            setCurrentPage(newTotalPages);
        }
    }, [data, searchTerm, shouldResetPage]);

    // Reset form when modal closes
    const handleModalClose = () => {
        setModalShow1(false);
        setId(null);
        setSelectedItem(null);
        resetForm();
        setBrandImagePreview(null);
        setaddimg("");
    };

    return (
        <>
            <div id='mv_container_fluid'>
                <div className="mv_main_heading mb-4 d-flex align-items-center justify-content-between">
                    <div>
                        <p className='mb-1'>Cards</p>
                        <div className='d-flex align-items-center'>
                            <p className='mv_dashboard_heading mb-0'>Dashboard /</p>
                            <p className='mv_category_heading mv_subcategory_heading mb-0'>Cards</p>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-12">
                        <div className="mv_product_table_content">
                            <div className='mv_table_search mv_table_no_flex'>
                                <div className="mv_product_search">
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
                                        <div className="mv_add_category mv_add_subcategory mv_add_product" onClick={handleAddNew}>
                                            <button><Link>+ Add</Link></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {paginatedData.length > 0 ? (
                                <>
                                    <div className="mv_product_table_padd">
                                        <table className='mv_product_table justify-content-between'>
                                            <thead>
                                                <tr>
                                                    <th className=''>ID</th>
                                                    <th className=''>Image</th>
                                                    <th className=''>Title</th>
                                                    <th className=''>Subtitle</th>
                                                    <th className='d-flex align-items-center justify-content-end'>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {paginatedData.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td> 
                                                    <td>
                                                        <img className='mv_product_img mv_product_radius_img' src={`${BaseUrl}/${item?.cardImage }`}  alt="" />
                                                        {/* <img className='mv_product_img mv_product_radius_img' src={require(`../mv_img/${item.img}`)}  alt="" /> */}
                                                    </td>
                                                    <td>{item.title}</td>
                                                    <td>{item.subTitle}</td>
                                                    <td className='d-flex align-items-center justify-content-end'>
                                                        <div className="mv_pencil_icon" onClick={() => handleEdit(item)}>
                                                            <img src={require('../mv_img/pencil_icon.png')} alt="" />
                                                        </div>
                                                        <div className="mv_pencil_icon" onClick={() => handleManage(item?._id)}>
                                                            <img src={require('../mv_img/trust_icon.png')} alt="" />
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

            {/* Delete Cards Modal */}
            <Modal className='mv_logout_dialog' show={modalShow} onHide={() => setModalShow(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Body className='text-center mv_logout'>
                    <h5 className='mb-2'>Delete</h5>
                    <p>Are you sure you want to delete Cards?</p>
                    <div className='mv_logout_Model_button d-flex align-items-center justify-content-center'>
                        <div className="mv_logout_cancel">
                            <button onClick={() => setModalShow(false)}>Cancel</button>
                        </div>
                        <div className="mv_logout_button">
                            <button onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Add Edit Cards Modal */}
            <Modal show={modalShow1} onHide={handleModalClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header className='mv_edit_profile_header' closeButton>
                    
                </Modal.Header>
                <Modal.Title className='mv_edit_profile_title' id="contained-modal-title-vcenter">
                    {id ? 'Edit Cards' : 'Add Cards'}
                </Modal.Title>
                <Modal.Body className='mv_edit_profile_model_padd'>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="mv_input_content mb-3">
                            <label className='mv_label_input'>Title</label>
                            <InputGroup className="">
                                <Form.Control
                                    placeholder="Enter title"
                                    name="title"
                                    value={values.title}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </InputGroup>
                            {errors.title && touched.title && <div className="text-danger small">{errors.title}</div>}
                        </div>
                        <div className="mv_input_content mb-3">
                            <label className='mv_label_input'>Subtitle</label>
                            <InputGroup className="">
                                <Form.Control
                                    placeholder="Enter Subtitle"
                                    name="subTitle"
                                    value={values.subTitle}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </InputGroup>
                            {errors.subTitle && touched.subTitle && <div className="text-danger small">{errors.subTitle}</div>}
                        </div>
                         <div className="mv_input_content mb-5">
                            <label className='mv_label_input'>Image</label>
                            <div className="position-relative">
                                <div className="mv_img_border w-100 p-1 d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center p-1" style={{ backgroundColor: addimg ? '#EAEAEA' :'transparent', width:'30%' }}>
                                        {addimg && (
                                            <>
                                                <div className="me-2" style={{ width: '24px', height: '24px', overflow: 'hidden' }}>
                                                    <img
                                                        src={brandImagePreview || `${BaseUrl}/${editData?.addcardimage}`}
                                                        alt="Preview"
                                                        style={{ width: '100%' }}
                                                    />
                                                </div>
                                                <span className='text-truncate' style={{width:'100%'}}>{addimg}</span>
                                                <button
                                                    type="button"
                                                    className="btn text-danger p-0 text-end "
                                                    style={{ fontSize: '1.50rem', lineHeight: .5 }}
                                                    onClick={() => {
                                                        setaddimg("");
                                                        setBrandImagePreview(null);
                                                        setFieldValue("addpopularbrandimage", "");
                                                    }}
                                                >
                                                    ×
                                                </button>
                                            </>
                                        )}
                                        {!addimg && (
                                            <span className="text-muted">Choose Image</span>
                                        )}
                                    </div>
                                    <label className="btn" style={{
                                        backgroundColor: '#3A2C2C',
                                        color: 'white',
                                        borderRadius: '4px',
                                        padding: '4px 16px',
                                        marginLeft: '8px',
                                        cursor: 'pointer',
                                        fontSize: '12px'
                                    }}>
                                        Browse
                                        <input
                                            type="file"
                                            hidden
                                            accept="image/jpeg, image/png, image/jpg"
                                            onChange={(e) => {
                                                const file = e.currentTarget.files[0];
                                                    if (file) {
                                                        setaddimg(file.name);
                                                        setFieldValue("addcardimage", file);
                                                        setBrandImagePreview(URL.createObjectURL(file));
                                                    }
                                                }}
                                        />
                                    </label>
                                </div>
                            </div>
                            {errors.addcardimage && touched.addcardimage && <div className="text-danger small">{errors.addcardimage}</div>}
                        </div>
                        <div className='mv_logout_Model_button d-flex align-items-center justify-content-center mb-4'>
                            <div className="mv_logout_cancel">
                                <button type="button" onClick={handleModalClose}>Cancel</button>
                            </div>
                            <div className="mv_logout_button">
                                <button type="submit">
                                    {id ? 'Update' : 'Add'}
                                </button>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

        </>
    );
};

export default Cards;