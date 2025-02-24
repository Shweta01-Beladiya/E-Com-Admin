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

const Cards = ({ editData }) => {

    const BaseUrl = process.env.REACT_APP_BASEURL;
    const token = localStorage.getItem('token');
   
    var data = [
    //     {   
    //         id: 1,
    //         img: "mobile.png",
    //         title: "lorem ipsum",
    //         subtitle: "Lorem ipsum",
    //     },
    //     {   
    //         id: 2,
    //         img: "watch.png",
    //         title: "lorem ipsum",
    //         subtitle: "Lorem ipsum",
    //     },
    //     {   
    //         id: 3,
    //         img: "book.png",
    //         title: "lorem ipsum",
    //         subtitle: "Lorem ipsum",
    //     },
    //     {   
    //         id: 4,
    //         img: "mobile.png",
    //         title: "lorem ipsum",
    //         subtitle: "Lorem ipsum",
    //     },
    //     {   
    //         id: 5,
    //         img: "book.png",
    //         title: "lorem ipsum",
    //         subtitle: "Lorem ipsum",
    //     },
    //     {   
    //         id: 6,
    //         img: "mobile.png",
    //         title: "lorem ipsum",
    //         subtitle: "Lorem ipsum",
    //     },
    //     {   
    //         id: 7,
    //         img: "book.png",
    //         title: "lorem ipsum",
    //         subtitle: "Lorem ipsum",
    //     },
    //     {   
    //         id: 8,
    //         img: "mobile.png",
    //         title: "lorem ipsum",
    //         subtitle: "Lorem ipsum",
    //     },
    //     {   
    //         id: 9,
    //         img: "book.png",
    //         title: "lorem ipsum",
    //         subtitle: "Lorem ipsum",
    //     },
    //     {   
    //         id: 10,
    //         img: "watch.png",
    //         title: "lorem ipsum",
    //         subtitle: "Lorem ipsum",
    //     },
    //     {   
    //         id: 11,
    //         img: "mobile.png",
    //         title: "lorem ipsum",
    //         subtitle: "Lorem ipsum",
    //     },
    ];

    // ************************************** Pagination **************************************
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredData, setFilteredData] = useState(data);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    console.log("totalpage",totalPages)
    const [toggle, setToggle] = useState(false)


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

    const paginatedData = filteredData.slice(
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

    // Select img
    let [addimg, setaddimg] = useState("");

    const [brandLogoPreview, setBrandLogoPreview] = useState(null);
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
        addcardimage: editData ? Yup.mixed().optional() : Yup.mixed().required("Image is required"),
    });
    
    const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue } = useFormik({
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
            if (editData) {
                try {
                    const response = await axios.put(`${BaseUrl}/api/updateCard/${editData._id}`, formData, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data"
                        }
                    });
                    console.log("Response:", response?.data);

                    // window.location.href = "./popularbrands"
                    // navigate("/popularbrands")

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

                    // window.location.href = "./popularbrands"
                    // navigate("/popularbrands")

                } catch (error) {
                    console.error("Error:", error);
                    alert("Error submitting form. Please try again.");
                }
            }
        }
    })
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
            //   console.log("data" , response?.data?.popularBrand);
            //   setFilteredData(response?.data?.popularBrand)
            //   setData(response?.data?.popularBrand)/
           }catch(error){
              
           }
       }

       fetchBrandData()
    },[toggle])
    // ***************************************************************************************

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
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                        />
                                    </InputGroup>
                                </div>
                                <div>
                                    <div className='mv_category_side mv_product_page_category d-flex align-items-center'>
                                        <div className="mv_add_category mv_add_subcategory mv_add_product" onClick={() => setModalShow1(true)}>
                                            <button><Link>+ Add</Link></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                                            <td>{item.id}</td>
                                            <td>
                                                <img className='mv_product_img mv_product_radius_img' src={require(`../mv_img/${item.img}`)}  alt="" />
                                            </td>
                                            <td>{item.title}</td>
                                            <td>{item.subtitle}</td>
                                            <td className='d-flex align-items-center justify-content-end'>
                                                <div className="mv_pencil_icon" onClick={() => setModalShow1(true)}>
                                                    <Link>
                                                        <img src={require('../mv_img/pencil_icon.png')} alt="" />
                                                    </Link>
                                                </div>
                                                <div className="mv_pencil_icon" onClick={() => setModalShow(true)}>
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

            {/* Delete Cards Modal */}
            <Modal className='mv_logout_dialog' show={modalShow} onHide={() => setModalShow(false)} size="lg" aria- labelledby="contained-modal-title-vcenter" centered >
                <Modal.Body className='text-center mv_logout'>
                    <h5 className='mb-2'>Delete</h5>
                    <p>Are you sure you want to delete Cards?</p>
                    <div className='mv_logout_Model_button d-flex align-items-center justify-content-center'>
                        <div className="mv_logout_cancel">
                            <button onClick={() => setModalShow(false)}>Cancel</button>
                        </div>
                        <div className="mv_logout_button">
                            <button>Delete</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Add Edit Cards Modal */}
            <Modal show={modalShow1} onHide={() => { setModalShow1(false); setId(null); }} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header className='mv_edit_profile_header' closeButton>
                    
                </Modal.Header>
                <Modal.Title className='mv_edit_profile_title' id="contained-modal-title-vcenter">
                    {id ? 'Edit Cards' : 'Add Cards'}
                </Modal.Title>
                <Modal.Body className='mv_edit_profile_model_padd'>
                    <form onSubmit={handleSubmit} enctype="multipart/form-data">
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
                            <InputGroup className="">
                                <Form.Control
                                    placeholder="Choose Image"
                                    aria-label=""
                                    readOnly
                                    value={addimg}
                                    name="addcardimage"
                                    onBlur={handleBlur}
                                />
                                <label className="mv_browse_button">
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
                                            setToggle(true)
                                        }}
                                    />
                                </label>
                            </InputGroup>
                            {errors.addcardimage && touched.addcardimage && <div className="text-danger small">{errors.addcardimage}</div>}
                            {brandImagePreview && (
                                <div className="mt-2">
                                    <img
                                        className='mv_update_img'
                                        src={`${toggle ? `${brandImagePreview}` : `${BaseUrl}/${brandLogoPreview}`}`}
                                        alt="Brand Image Preview"
                                        style={{
                                            maxWidth: '20px',
                                            maxHeight: '20px',
                                            objectFit: 'contain',
                                            border: '1px solid #ddd',
                                            borderRadius: '4px',
                                            padding: '2px'
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                        <div className='mv_logout_Model_button d-flex align-items-center justify-content-center mb-4'>
                            <div className="mv_logout_cancel">
                                <button type="button" onClick={() => setModalShow1(false)}>Cancel</button>
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

export default Cards