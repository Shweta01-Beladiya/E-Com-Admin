import React, { useEffect, useState, useRef } from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import '../CSS/vaidik.css';
import { useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Addoffer = () => {
    // State variables
    let [isedit, setisedit] = useState(false);
    // let [name, setname] = useState('');
    // let [mainCategory, setMainCategory] = useState("");
    // let [category, setCategory] = useState("");
    // let [subCategory, setSubCategory] = useState("");
    // let [offerType, setOfferType] = useState("");
    // let [offerName, setOfferName] = useState("");
    // let [buttonText, setButtonText] = useState("");
    // let [startDate, setStartDate] = useState("");
    // let [endDate, setEndDate] = useState("");
    // let [description, setDescription] = useState("");

    let change_edit = () => {
        setisedit(!isedit);
    };

    // let handlesubmit = (event) => {
    //     event.preventDefault();
    
    //     const formData = {
    //         name,
    //         mainCategory,
    //         category,
    //         subCategory,
    //         offerType,
    //         offerName,
    //         buttonText,
    //         startDate,
    //         endDate,
    //         description,
    //     };
    
    //     console.log("Form Submitted:", formData);
    //     setisedit(false);
    // };

    // Edit Offer
    const location = useLocation();
    const editOffer = location.state?.editOffer;
    console.log(editOffer)

    // Date function
    let [date, setDate] = useState('Select Date');
    let [date1, setDate1] = useState('Select Date');

    const handleDateChange = (e, dateType) => {
        const [year, month, day] = e.target.value.split("-");
        const formattedDate = `${day}-${month}-${year}`;
        
        if (dateType === 'start') {
            setDate(formattedDate);
        } else if (dateType === 'end') {
            setDate1(formattedDate);
        }
    };

    // Select img
    let [img, setimg] = useState("");


    // ******************************* Validation *******************************
    const addofferInit = {
        mainCategory: "",
        category: "",
        subCategory: "",
        offerType: "",
        offerName: "",
        buttonText: "",
        startDate: "",
        endDate: "",
        description: "",
    }

    const addofferValidate = Yup.object().shape({
        mainCategory: Yup.string().required("Main Category is required"),
        category: Yup.string().required("Category is required"),
        subCategory: Yup.string().required("Sub Category is required"),
        offerType: Yup.string().required("Product is required"),
        offerName: Yup.string().required("Offer Name is required"),
        offerName: Yup.string().required("Code is required"),
        buttonText: Yup.string().required("Discount Price is required"),
        startDate: Yup.string().required("Start Date is required"),
        endDate: Yup.string().required("End Date is required"),
        description: Yup.string().required("Description is required"),
    });

    const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: addofferInit,
        validationSchema: addofferValidate,
        onsubmit: (values) => {
            console.log(values);
            // addproductoffer(values)
        }
    })
    // **************************************************************************

    return (
        <>
            <div>
                <div className="mv_main_heading mb-4 d-flex align-items-center justify-content-between">
                    <div>
                        <p className='mb-1'>{editOffer ? 'Edit Offer' : 'Add Offer'}</p>
                        <div className='d-flex align-items-center'>
                            <p className='mv_dashboard_heading mb-0'>Dashboard /</p>
                            <p className='mv_category_heading mv_subcategory_heading mb-0'>
                                {editOffer ? 'Edit Offer' : 'Add Offer'}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="mv_main_profile_change h-auto">
                    {/* Tabs Content */}
                    <div className="tab-content">
                        <div className="mv_view_edit_profile">
                            <div className='mv_profile_type'>
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content">
                                                <label className='mv_label_input'>Main Category</label>
                                                <Form.Select
                                                    name="mainCategory"
                                                    value={values.mainCategory}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className='mv_form_select mb-3'>
                                                    <option>Select</option>
                                                    <option value="Women">Women</option>
                                                    <option value="Men">Men</option>
                                                    <option value="Baby & Kids">Baby & Kids</option>
                                                    <option value="Beauty & Health">Beauty & Health</option>
                                                    <option value="Home & Kitchen">Home & Kitchen</option>
                                                    <option value="Mobile & Electronics">Mobile & Electronics</option>
                                                </Form.Select>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content">
                                                <label className='mv_label_input'>Category</label>
                                                <Form.Select
                                                    name="category"
                                                    value={values.category}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className='mv_form_select mb-3'>
                                                    <option>Select</option>
                                                    <option value="Jewelry">Jewelry</option>
                                                    <option value="Western Wear">Western Wear</option>
                                                    <option value="Baby Care">Baby Care</option>
                                                    <option value="Skin Care">Skin Care</option>
                                                    <option value="Electronics">Electronics</option>
                                                    <option value="Fragrance">Fragrance</option>
                                                    <option value="Kitchen wear">Kitchen wear</option>
                                                    <option value="Mobile">Mobile</option>
                                                </Form.Select>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content">
                                                <label className='mv_label_input'>Sub Category</label>
                                                <Form.Select
                                                    name="subCategory"
                                                    value={values.subCategory}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className='mv_form_select mb-3'>
                                                    <option>Select</option>
                                                    <option value="Necklace">Necklace</option>
                                                    <option value="Blazer">Blazer</option>
                                                    <option value="Baby Soap">Baby Soap</option>
                                                    <option value="Facewash">Facewash</option>
                                                    <option value="Refrigerator">Refrigerator</option>
                                                    <option value="Perfume">Perfume</option>
                                                    <option value="Pressure Cooker">Pressure Cooker</option>
                                                    <option value="Smart Phone">Smart Phone</option>
                                                </Form.Select>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content">
                                                <label className='mv_label_input'>Offer Type</label>
                                                <InputGroup className="mb-3">
                                                    <Form.Control
                                                        name="offerType"
                                                        value={values.offerType}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder="Enter Offer Type"
                                                        aria-label="name"
                                                        aria-describedby="basic-addon1"
                                                    />
                                                </InputGroup>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content">
                                                <label className='mv_label_input'>Offer Name</label>
                                                <InputGroup className="mb-3">
                                                    <Form.Control
                                                        name="offerName"
                                                        value={values.offerName}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder="Enter Offer Name"
                                                        aria-label="name"
                                                        aria-describedby="basic-addon1"
                                                    />
                                                </InputGroup>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content">
                                                <label className='mv_label_input'>Description Image</label>
                                                <InputGroup className="mb-3">
                                                    <Form.Control
                                                        placeholder="Choose Image"
                                                        aria-label=""
                                                        readOnly
                                                        value={img}
                                                    />
                                                    <label className="mv_browse_button">
                                                    Browse
                                                    <input type="file" hidden onChange={(e) => { setimg(e.currentTarget.files[0].name) }} />
                                                    </label>
                                                </InputGroup>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content">
                                                <label className='mv_label_input'>Button Text</label>
                                                <InputGroup className="mb-3">
                                                    <Form.Control
                                                        name="buttonText"
                                                        value={values.buttonText}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder="Enter Button Text"
                                                        aria-label="name"
                                                        aria-describedby="basic-addon1"
                                                    />
                                                </InputGroup>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <label className='mv_offcanvas_filter_category'>Start Date</label>
                                            <div className="mv_input_content mv_add_product_date_scheduled">
                                                <label className='mv_label_input mv_add_product_date mv_filter_start_date'>{date}</label>
                                                <Form.Control className='mb-3' type="date" 
                                                    name="startDate"
                                                    value={values.startDate}
                                                    // onChange={handleChange}
                                                    onChange={(e) => handleDateChange(e, 'start')} 
                                                    onBlur={handleBlur}
                                                 />
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <label className='mv_offcanvas_filter_category'>End Date</label>
                                            <div className="mv_input_content mv_add_product_date_scheduled">
                                                <label className='mv_label_input mv_add_product_date mv_filter_start_date'>{date1}</label>
                                                <Form.Control className='mb-3' type="date" 
                                                    name="endDate"
                                                    value={values.endDate}
                                                    // onChange={handleChange}
                                                    onChange={(e) => handleDateChange(e, 'end')} 
                                                    onBlur={handleBlur}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="mv_input_content">
                                                <label className='mv_label_input'>Description</label>
                                                <InputGroup className="mb-3">
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
                                            </div>
                                        </div>
                                        <div className='text-center mt-5'>
                                            <div className="mv_edit_profile">
                                                <button className='border-0 bg-transparent'>
                                                    Cnacel
                                                </button>
                                                {editOffer === true ? <button className='border-0 bg-transparent' onClick={change_edit}>
                                                    Update
                                                </button> : 
                                                <button className='border-0 bg-transparent' onClick={change_edit}>
                                                    Add
                                                </button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Addoffer;
