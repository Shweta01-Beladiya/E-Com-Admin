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

const Termsconditions = (props) => {

    const BaseUrl = process.env.REACT_APP_BASEURL;
    const token = localStorage.getItem('token');

    const [toggle, setToggle] = useState(false)
    const [deleteToggle, setDeleteToggle] = useState(null)
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // ************************************** Pagination **************************************
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredData, setFilteredData] = useState();

    const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
    console.log("totalpage",totalPages)

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

    const paginatedData = filteredData?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    // *******************************************************************************
    
    // Modal
    const [modalShow, setModalShow] = React.useState(false);
    const [modalShow1, setModalShow1] = React.useState(false);

    // const [values, setValues] = useState({
    //     name: "",
    //     name1: ""
    // });

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setValues({ ...values, [name]: value });
    // };

    // ******************************* Validation *******************************
    const [id, setId] = useState(null);

    const init = {
        title: "",
        description: "",
    };
    
    const validate = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        description: Yup.string().required("Description is required")
    });
    
    const formik = useFormik({
        initialValues: init,
        validationSchema: validate,
        onSubmit: async (values) => {
            console.log(values);
            // termsconditions(values)

            const termsconditions = {
                title:values?.title,
                description:values?.description
            }

            //************************************** Edit and Add **************************************
            if (id) {
                try {
                    const response = await axios.put(`${BaseUrl}/api/updateTerm/${id}`, termsconditions, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    });
                    console.log("Response:", response?.data);
                    setModalShow1(false);
                    setToggle(!toggle);
                    resetForm();
                } catch (error) {
                    console.error("Error:", error);
                    alert("Error submitting form. Please try again.");
                }
            }
            else {
                try {
                    const response = await axios.post(`${BaseUrl}/api/createTerms`, termsconditions, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    });
                    console.log("Response:", response?.data);
                    setModalShow1(false);
                    setToggle(!toggle);
                    resetForm();
                } catch (error) {
                    console.error("Error:", error);
                    alert("Error submitting form. Please try again.");
                }
            }
        }
    });

    const { values, handleBlur, handleChange, handleSubmit, errors, touched, resetForm,setValues } = formik;
    // ***************************************************************************

    // ************************************** Show Data **************************************
    useEffect(()=>{
        const fetchBrandData = async () => {
            try{
               const response = await axios.get(`${BaseUrl}/api/allTerms`,{
                 headers: {
                     Authorization: `Bearer ${token}`,
                 }
               })
               console.log("data" , response?.data);
               setFilteredData(response?.data?.terms)
               setData(response?.data?.terms)
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
            const response = await axios.delete(`${BaseUrl}/api/deleteTerm/${deleteToggle}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            console.log("delete response " , response);
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
        
        // Set form values with the selected item data
        setValues({
            title: item.title || "",
            description: item.description || "",
        });
        
        setModalShow1(true);
    };

    // Add new item
    const handleAddNew = () => {
        setId(null);
        resetForm();
        setModalShow1(true);
    };

    // Reset form when modal closes
    const handleCloseModal = () => {
        setModalShow1(false);
        setId(null);
        resetForm();
    };

    // Search Data
    useEffect(() => {
        let result = data;
        console.log("" , result);
    
        if (searchTerm) {
          result = result.filter(user =>
            user.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.description?.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
    
        setFilteredData(result);
        setCurrentPage(1);
    }, [data, searchTerm]);

    return (
        <>
            <div id='mv_container_fluid'>
                <div className="mv_main_heading mb-4 d-flex align-items-center justify-content-between">
                    <div>
                        <p className='mb-1'>Terms & Conditions</p>
                        <div className='d-flex align-items-center'>
                            <p className='mv_dashboard_heading mb-0'>Dashboard /</p>
                            <p className='mv_category_heading mv_subcategory_heading mb-0'>Terms & Conditions</p>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-12">
                        <div className="mv_product_table_content">
                            <div className='mv_table_search'>
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
                                        <div className="mv_column_button mv_view_status_padd">
                                            <Link to="/viewtermsconditions"><button>View Status</button></Link>
                                        </div>
                                        <div className="mv_add_category mv_add_subcategory mv_add_product" onClick={handleAddNew}>
                                            <button><Link>+ Add</Link></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mv_product_table_padd">
                                <table className='mv_product_table mv_help_table justify-content-between'>
                                    <thead>
                                        <tr>
                                            <th className=''>ID</th>
                                            <th className=''>Title</th>
                                            <th className=''>Description</th>
                                            <th className='d-flex align-items-center justify-content-end'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedData?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                            <td>{item.title}</td>
                                            <td>{item.description}</td>
                                            <td className='d-flex align-items-center justify-content-end'>
                                                <div className="mv_pencil_icon" onClick={() => handleEdit(item)}>
                                                    <Link>
                                                        <img src={require('../mv_img/pencil_icon.png')} alt="" />
                                                    </Link>
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
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Reason Model */}
            <Modal className='mv_logout_dialog' show={modalShow} onHide={() => setModalShow(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Body className='text-center mv_logout'>
                    <h5 className='mb-2'>Delete</h5>
                    <p>Are you sure you want to delete reason for cancellation ?</p>
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

            {/* Add Terms & Condition Model */}
            <Modal show={modalShow1} onHide={handleCloseModal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header className='mv_edit_profile_header' closeButton>
                    
                </Modal.Header>
                <Modal.Title className='mv_edit_profile_title' id="contained-modal-title-vcenter">
                    {id ? 'Edit Terms & Condition' : 'Add Terms & Condition'}
                </Modal.Title>
                <Modal.Body className='mv_edit_profile_model_padd'>
                    <form onSubmit={handleSubmit}>
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
                        <div className="mv_input_content mb-5">
                            <label className='mv_label_input'>Description</label>
                            <InputGroup className="">
                                <Form.Control
                                    name="description"
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter Description"
                                    as="textarea" 
                                    aria-label="With textarea"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                            {errors.description && touched.description && <div className="text-danger small">{errors.description}</div>}
                        </div>
                        <div className='mv_logout_Model_button d-flex align-items-center justify-content-center mb-4'>
                            <div className="mv_logout_cancel">
                                <button type="button" onClick={handleCloseModal}>Cancel</button>
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

export default Termsconditions