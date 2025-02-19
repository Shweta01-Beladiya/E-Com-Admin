import React, { useEffect, useState, useRef } from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import '../CSS/vaidik.css';
import { useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Addcoupon = () => {
    // State variables
    let [isedit, setisedit] = useState(false);
    // let [code, setCode] = useState("");
    // let [couponName, setCouponName] = useState("");
    // let [description, setDescription] = useState("");
    // let [couponType, setCouponType] = useState("");
    // let [price, setPrice] = useState("");

    let change_edit = () => {
        setisedit(!isedit);
    };

    // let handlesubmit = (event) => {
    //     event.preventDefault();

    //     const formData = {
    //         code,
    //         couponName,
    //         description,
    //         couponType,
    //         price,
    //     };

    //     console.log('Form Submitted:', formData);
    //     setisedit(false);
    // };

    // Edit Coupon
    const location = useLocation();
    const editCoupon = location.state?.editCoupon;
    console.log(editCoupon)

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

    // ******************************* Validation *******************************
    const couponInit = {
        code: "",
        couponName: "",
        description: "",
        couponType: "",
        price: "",
        startDate: "",
        endDate: "",
    }

    const couponValidate = Yup.object().shape({
        code: Yup.string().required("Code is required"),
        couponName: Yup.string().required("Coupon Name is required"),
        description: Yup.string().required("Description is required"),
        couponType: Yup.string().required("CouponType is required"),
        price: Yup.number().required("Price is required"),
        startDate: Yup.string().required("Start Date is required"),
        endDate: Yup.string().required("End Date is required"),
    });

    const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: couponInit,
        validationSchema: couponValidate,
        onsubmit: (values) => {
            console.log(values);
            // addcoupen(values)
        }
    })
    // **************************************************************************

    return (
        <>
            <div>
                <div className="mv_main_heading mb-4 d-flex align-items-center justify-content-between">
                    <div>
                        <p className='mb-1'>{editCoupon ? 'Edit Coupon' : 'Add Coupon'}</p>
                        <div className='d-flex align-items-center'>
                            <p className='mv_dashboard_heading mb-0'>Dashboard /</p>
                            <p className='mv_category_heading mv_subcategory_heading mb-0'>
                                {editCoupon ? 'Edit Coupon' : 'Add Coupon'}
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
                                            <div className="mv_input_content mb-3">
                                                <label className='mv_label_input'>Code</label>
                                                <InputGroup className="">
                                                    <Form.Control
                                                        name="code"
                                                        value={values.code}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder="Enter Code"
                                                        aria-label="name"
                                                        aria-describedby="basic-addon1"
                                                    />
                                                </InputGroup>
                                                {errors.code && touched.code && <div className="text-danger small">{errors.code}</div>}
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content mb-3">
                                                <label className='mv_label_input'>Coupon Name</label>
                                                <InputGroup className="">
                                                    <Form.Control
                                                        name="couponName"
                                                        value={values.couponName}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder="Enter Coupon Name"
                                                        aria-label="name"
                                                        aria-describedby="basic-addon1"
                                                    />
                                                </InputGroup>
                                                {errors.couponName && touched.couponName && <div className="text-danger small">{errors.couponName}</div>}
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content mb-3">
                                                <label className='mv_label_input'>Description</label>
                                                <InputGroup className="">
                                                    <Form.Control
                                                        name="description"
                                                        value={values.description}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder="Enter Description"
                                                        aria-label="name"
                                                        aria-describedby="basic-addon1"
                                                    />
                                                </InputGroup>
                                                {errors.description && touched.description && <div className="text-danger small">{errors.description}</div>}
                                            </div>
                                        </div>
                                        <div className="col-xxl-6 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content mb-3">
                                                <label className='mv_label_input'>Coupon type</label>
                                                <Form.Select
                                                    name="couponType"
                                                    value={values.couponType}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    aria-label="Default select example"
                                                    className='mv_form_select'>
                                                    <option value="">Select</option>
                                                    <option value="Fixed">Fixed</option>
                                                    <option value="Percentage">Percentage</option>
                                                </Form.Select>
                                                {errors.couponType && touched.couponType && <div className="text-danger small">{errors.couponType}</div>}
                                            </div>
                                        </div>
                                        <div className="col-xxl-6 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content mb-3">
                                                <label className='mv_label_input'>Price</label>
                                                <InputGroup className="">
                                                    <Form.Control
                                                        name="price"
                                                        value={values.price}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder="Enter Price"
                                                        aria-label="name"
                                                        aria-describedby="basic-addon1"
                                                    />
                                                </InputGroup>
                                                {errors.price && touched.price && <div className="text-danger small">{errors.price}</div>}
                                            </div>
                                        </div>
                                        <div className="col-xxl-6 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <label className='mv_offcanvas_filter_category'>Start Date</label>
                                            <div className="mv_input_content mv_add_product_date_scheduled mb-3">
                                                <label className='mv_label_input mv_add_product_date mv_filter_start_date'>{date}</label>
                                                <Form.Control className='' type="date" 
                                                    name="startDate"
                                                    value={values.startDate}
                                                    // onChange={handleChange}
                                                    onChange={(e) => handleDateChange(e, 'start')} 
                                                    onBlur={handleBlur}
                                                />
                                                {errors.startDate && touched.startDate && <div className="text-danger small">{errors.startDate}</div>}
                                            </div>
                                        </div>
                                        <div className="col-xxl-6 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <label className='mv_offcanvas_filter_category'>End Date</label>
                                            <div className="mv_input_content mv_add_product_date_scheduled mb-3">
                                                <label className='mv_label_input mv_add_product_date mv_filter_start_date'>{date1}</label>
                                                <Form.Control className='' type="date" 
                                                    name="endDate"
                                                    value={values.endDate}
                                                    // onChange={handleChange}
                                                    onChange={(e) => handleDateChange(e, 'end')} 
                                                    onBlur={handleBlur}
                                                />
                                                {errors.endDate && touched.endDate && <div className="text-danger small">{errors.endDate}</div>}
                                            </div>
                                        </div>
                                        <div className='text-center mt-5'>
                                            <div className="mv_edit_profile">
                                                <button className='border-0 bg-transparent'>
                                                    Cnacel
                                                </button>
                                                {editCoupon === true ? 
                                                    <button type="submit" className='border-0 bg-transparent' onClick={change_edit}>
                                                        Update
                                                    </button> : 
                                                    <button type="submit" className='border-0 bg-transparent' onClick={change_edit}>
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

export default Addcoupon;
