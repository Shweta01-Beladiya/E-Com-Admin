import React, { useEffect, useState } from 'react';
import '../CSS/product.css';
import Form from 'react-bootstrap/Form';
import { Dropdown, DropdownButton, InputGroup } from 'react-bootstrap';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Accountpolicy = (props) => {

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
        const buttons = [];
        const maxButtonsToShow = 5;
        
        let startPage = Math.max(1, currentPage - Math.floor(maxButtonsToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);
        
        // Adjust startPage if we're near the end
        if (endPage - startPage + 1 < maxButtonsToShow) {
            startPage = Math.max(1, endPage - maxButtonsToShow + 1);
        }

        // Add first page if not included
        if (startPage > 1) {
            buttons.push(1);
            if (startPage > 2) buttons.push('...');
        }

        // Add main page numbers
        for (let i = startPage; i <= endPage; i++) {
            buttons.push(i);
        }

        // Add last page if not included
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) buttons.push('...');
            buttons.push(totalPages);
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
        policyName: "",
    };
    
    const validate = Yup.object().shape({
        policyName: Yup.string().required("Account Policy is required")
    });
    
    const formik = useFormik({
        initialValues: init,
        validationSchema: validate,
        onSubmit: async (values) => {
            console.log(values);
            // accountpolicy(values)

            const accpolicy = {
                policyName:values?.policyName
            }

            //************************************** Edit and Add **************************************
            if (id) {
                try {
                    const response = await axios.put(`${BaseUrl}/api/updatePolicy/${id}`, accpolicy, {
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
                    const response = await axios.post(`${BaseUrl}/api/createPolicy`, accpolicy, {
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
    // *******************************************************************************

    // ************************************** Show Data **************************************
    useEffect(()=>{
        const fetchBrandData = async () => {
            try{
               const response = await axios.get(`${BaseUrl}/api/allPolicy`,{
                 headers: {
                     Authorization: `Bearer ${token}`,
                 }
               })
               console.log("data" , response?.data);
               setFilteredData(response?.data?.
                accountpolicy)
               setData(response?.data?.accountpolicy)
            }catch(error){
               console.error("Error fetching data:", error);
            }
        }
        fetchBrandData()
    },[toggle])
    // ***************************************************************************************
 
    // ************************************** Delete Item **************************************
    const handleManage = (id) =>{
        setModalShow(true)
        setDeleteToggle(id)
    }
 
    const handleDelete = async () => {
        try{
            const response = await axios.delete(`${BaseUrl}/api/deletePolicy/${deleteToggle}`,{
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
            policyName: item.policyName || "",
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
            user.policyName?.toLowerCase().includes(searchTerm.toLowerCase())
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
                        <p className='mb-1'>Account Policy</p>
                        <div className='d-flex align-items-center'>
                            <p className='mv_dashboard_heading mb-0'>Dashboard /</p>
                            <p className='mv_category_heading mv_subcategory_heading mb-0'>Account Policy</p>
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
                            <div className="mv_product_table_padd">
                                <table className='mv_product_table justify-content-between'>
                                    <thead>
                                        <tr>
                                            <th width="33.33%" className=''>ID</th>
                                            <th width="33.33%" className=''>Account Policy</th>
                                            <th className='d-flex align-items-center justify-content-end'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedData?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                            <td>{item.policyName}</td>
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
                                <div className='mv_other_category d-flex align-items-center justify-content-end pb-4 mt-4'>
                                    <p className='mb-0' onClick={() => handlePageChange(currentPage - 1)}>
                                        <MdOutlineKeyboardArrowLeft />
                                    </p>
                                    {getPaginationButtons().map((page, index) => (
                                        <p key={index} className={`mb-0 ${currentPage === page ? 'mv_active' : ''}`}
                                            onClick={() => handlePageChange(page)}>
                                            {page}
                                        </p>
                                    ))}
                                    <p className='mb-0' onClick={() => handlePageChange(currentPage + 1)}>
                                        <MdOutlineKeyboardArrowRight />
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Account Policy Modal */}
            <Modal className='mv_logout_dialog' show={modalShow} onHide={() => setModalShow(false)} size="lg" aria- labelledby="contained-modal-title-vcenter" centered >
                <Modal.Body className='text-center mv_logout'>
                    <h5 className='mb-2'>Delete</h5>
                    <p>Are you sure you want to delete Account Policy?</p>
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

            {/* Add Edit Account Policy Modal */}
            <Modal show={modalShow1}  onHide={handleCloseModal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header className='mv_edit_profile_header' closeButton>

                </Modal.Header>
                <Modal.Title className='mv_edit_profile_title' id="contained-modal-title-vcenter">
                    {id ? 'Edit Account Policy' : 'Add Account Policy'}
                </Modal.Title>
                <Modal.Body className='mv_edit_profile_model_padd'>
                    <form onSubmit={handleSubmit}>
                        <div className="mv_input_content mb-5">
                            <label className='mv_label_input'>Account Policy</label>
                            <InputGroup>
                                <Form.Control
                                    placeholder="Enter account policy"
                                    name="policyName"
                                    value={values.policyName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </InputGroup>
                            {errors.policyName && touched.policyName && <div className="text-danger small">{errors.policyName}</div>}
                        </div>
                        <div className='mv_logout_Model_button d-flex align-items-center justify-content-center mb-4'>
                            <div className="mv_logout_cancel">
                                <button type="button"  onClick={handleCloseModal}>Cancel</button>
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

export default Accountpolicy