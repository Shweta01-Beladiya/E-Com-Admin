import React, { useEffect, useState } from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import '../CSS/vaidik.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Addcoupon = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const id = location.state?.id;
    // console.log("id",id)
    const BaseUrl = process.env.REACT_APP_BASEURL;
    const token = localStorage.getItem('token');

    // Date function
    const [date, setDate] = useState("Select Date");
    const [date1, setDate1] = useState("Select Date");

    const handleDateChange = (e, dateType) => {
        const selectedDate = e.target.value;
        const [year, month, day] = selectedDate.split("-");
        const formattedDate = `${day}-${month}-${year}`;

        if (dateType === "start") {
            setDate(formattedDate);
            setFieldValue("startDate", selectedDate);
        } else if (dateType === "end") {
            setDate1(formattedDate);
            setFieldValue("endDate", selectedDate);
        }
    };


    // ******************************* Validation *******************************
    const couponInit = {
        code: "",
        title: "",
        description: "",
        coupenType: "",
        offerDiscount: "",
        startDate: "",
        endDate: "",
        status:true
    }

    const couponValidate = Yup.object().shape({
        code: Yup.string().required("Code is required"),
        title: Yup.string().required("Coupon Name is required"),
        description: Yup.string().required("Description is required"),
        coupenType: Yup.string().required("CouponType is required"),
        offerDiscount: Yup.number().required("Price is required"),
        startDate: Yup.date().required("Start Date is required"),
        endDate: Yup.date().required("End Date is required"),
    });

    const { values, handleBlur, handleChange, handleSubmit, errors, touched , setFieldValue,setFieldError } = useFormik({
        initialValues: couponInit,
        validationSchema: couponValidate,
        onSubmit:  async(values) => {
            // console.log(values);

            try {
                if(id) {
                    const response = await axios.put(`${BaseUrl}/api/updateSpecialOffer/${id}`, values, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    // console.log("resposne",response.data);
                    if(response.data.status === 200) {
                        navigate('/coupon');
                    }
                } else {
                    const response = await axios.post(`${BaseUrl}/api/createSpecialOffer`, values, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    // console.log("response",response.data);
                    if(response.data.status === 201){
                        navigate('/coupon');
                    }
                }
            } catch (error) {
                console.error('Data Create and update Error:',error);
                if (error.response && error.response.status === 400) {
                    setFieldError('title', 'Coupon Name already exists');
                  }
            }
        }
    })
    // **************************************************************************

    const handleCancel = () => {
        navigate('/coupon');
    }

    useEffect(() => {
        const fetchCouponData = async () => {
            if (id) {
                try {
                    const response = await axios.get(`${BaseUrl}/api/getSpecialOffer/${id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    
                    const couponData = response.data.specialOffer;
                    
                    // Format dates for form display
                    if (couponData.startDate) {
                        const startDateObj = new Date(couponData.startDate);
                        const formattedStartDate = startDateObj.toISOString().split('T')[0];
                        setFieldValue("startDate", formattedStartDate);
                        
                        const day = startDateObj.getDate().toString().padStart(2, '0');
                        const month = (startDateObj.getMonth() + 1).toString().padStart(2, '0');
                        const year = startDateObj.getFullYear();
                        setDate(`${day}-${month}-${year}`);
                    }
                    
                    if (couponData.endDate) {
                        const endDateObj = new Date(couponData.endDate);
                        const formattedEndDate = endDateObj.toISOString().split('T')[0];
                        setFieldValue("endDate", formattedEndDate);
                        
                        const day = endDateObj.getDate().toString().padStart(2, '0');
                        const month = (endDateObj.getMonth() + 1).toString().padStart(2, '0');
                        const year = endDateObj.getFullYear();
                        setDate1(`${day}-${month}-${year}`);
                    }
                    
                    // Set all other form values
                    setFieldValue("code", couponData.code || "");
                    setFieldValue("title", couponData.title || "");
                    setFieldValue("description", couponData.description || "");
                    setFieldValue("coupenType", couponData.coupenType || "");
                    setFieldValue("offerDiscount", couponData.offerDiscount || "");
                    setFieldValue("status", couponData.status !== undefined ? couponData.status : true);
                    
                } catch (error) {
                    console.error("Error fetching coupon data:", error);
                }
            }
        };
    
        fetchCouponData();
    }, [id, BaseUrl, token, setFieldValue]);
    return (
        <>
            <div>
                <div className="mv_main_heading mb-4 d-flex align-items-center justify-content-between">
                    <div>
                        <p className='mb-1'>{id ? 'Edit Coupon' : 'Add Coupon'}</p>
                        <div className='d-flex align-items-center'>
                            <p className='mv_dashboard_heading mb-0'>Dashboard /</p>
                            <p className='mv_category_heading mv_subcategory_heading mb-0'>
                                {id ? 'Edit Coupon' : 'Add Coupon'}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="mv_main_profile_change h-auto">
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
                                                        name="title"
                                                        value={values.title}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder="Enter Coupon Name"
                                                    />
                                                </InputGroup>
                                                {errors.title && touched.title && <div className="text-danger small">{errors.title}</div>}
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
                                                    />
                                                </InputGroup>
                                                {errors.description && touched.description && <div className="text-danger small">{errors.description}</div>}
                                            </div>
                                        </div>
                                        <div className="col-xxl-6 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content mb-3">
                                                <label className='mv_label_input'>Coupon type</label>
                                                <Form.Select
                                                    name="coupenType"
                                                    value={values.coupenType}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    aria-label="Default select example"
                                                    className='mv_form_select'>
                                                    <option value="">Select</option>
                                                    <option value="Fixed">Fixed</option>
                                                    <option value="Percentage">Percentage</option>
                                                </Form.Select>
                                                {errors.coupenType && touched.coupenType && <div className="text-danger small">{errors.coupenType}</div>}
                                            </div>
                                        </div>
                                        <div className="col-xxl-6 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content mb-3">
                                                <label className='mv_label_input'>Price</label>
                                                <InputGroup className="">
                                                    <Form.Control
                                                        name="offerDiscount"
                                                        value={values.offerDiscount}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder="Enter Price"
                                                        aria-label="name"
                                                        aria-describedby="basic-addon1"
                                                    />
                                                </InputGroup>
                                                {errors.offerDiscount && touched.offerDiscount && <div className="text-danger small">{errors.offerDiscount}</div>}
                                            </div>
                                        </div>
                                        <div className="col-xxl-6 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <label className='mv_offcanvas_filter_category'>Start Date</label>
                                            <div className="mv_input_content mv_add_product_date_scheduled mb-3">
                                                <label className='mv_label_input mv_add_product_date mv_filter_start_date'>{date}</label>
                                                <Form.Control
                                                    className=""
                                                    type="date"
                                                    name="startDate"
                                                    value={values.startDate}
                                                    onChange={(e) => handleDateChange(e, "start")}
                                                    onBlur={handleBlur}
                                                />
                                                {errors.startDate && touched.startDate && <div className="text-danger small">{errors.startDate}</div>}
                                            </div>
                                        </div>
                                        <div className="col-xxl-6 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <label className='mv_offcanvas_filter_category'>End Date</label>
                                            <div className="mv_input_content mv_add_product_date_scheduled mb-3">
                                                <label className='mv_label_input mv_add_product_date mv_filter_start_date'>{date1}</label>
                                                <Form.Control
                                                    className=""
                                                    type="date"
                                                    name="endDate"
                                                    value={values.endDate}
                                                    onChange={(e) => handleDateChange(e, "end")}
                                                    onBlur={handleBlur}
                                                />
                                                {errors.endDate && touched.endDate && <div className="text-danger small">{errors.endDate}</div>}
                                            </div>
                                        </div>
                                        <div className='text-center mt-5'>
                                            <div className="mv_edit_profile">
                                                <button className='border-0 bg-transparent' onClick={handleCancel}>
                                                    Cancel
                                                </button>
                                                { id ? 
                                                    <button type="submit" className='border-0 bg-transparent' >
                                                        Update
                                                    </button> : 
                                                    <button type="submit" className='border-0 bg-transparent' >
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
