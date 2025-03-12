import React, { useEffect, useState } from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import '../CSS/vaidik.css';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';

const Addpopularbrands = () => {

    const BaseUrl = process.env.REACT_APP_BASEURL;
    const token = localStorage.getItem('token');

    const navigate = useNavigate();
    const location = useLocation();

    const editData = location.state?.brandData || null;

    // State variables
    let [isedit, setisedit] = useState(false);

    let change_edit = () => {
        setisedit(!isedit);
    };

    // Select img
    let [brandimg, setbrandimg] = useState("");
    let [addimg, setaddimg] = useState("");

    const [brandLogoPreview, setBrandLogoPreview] = useState(null);
    const [brandImagePreview, setBrandImagePreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (editData) {
            const filename1 = editData.brandLogo.split("\\").pop();
            setbrandimg(filename1.substring(filename1.indexOf('-') + 1));
            setBrandLogoPreview(`${BaseUrl}/${editData.brandLogo}`);

            const filename = editData.brandImage.split("\\").pop();
            setaddimg(filename.substring(filename.indexOf('-') + 1));
            setBrandImagePreview(`${BaseUrl}/${editData.brandImage}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editData]);

    // ******************************* Validation *******************************
    const addpopularbrandInit = {
        brandname: editData?.brandName || "",
        offer: editData?.offer || "",
        title: editData?.title || "",
        brandLogo: "",
        addpopularbrandimage: "",
    }

    const addpopularbrandValidate = Yup.object().shape({
        brandname: Yup.string().required("Brand name is required"),
        offer: Yup.string().matches(/^\d+% off$|^Buy \d+ Get \d+$/, "Offer must be like '10% off' or 'Buy 1 Get 1'").required("Offer is required"),
        title: Yup.string().required("Title is required"),
        brandLogo: editData ? Yup.mixed().optional() : Yup.mixed().required("Brand Logo is required"),
        addpopularbrandimage: editData ? Yup.mixed().optional() : Yup.mixed().required("Image is required"),
    });

    const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue } = useFormik({
        initialValues: addpopularbrandInit,
        validationSchema: addpopularbrandValidate,
        onSubmit: async (values) => {
            setIsSubmitting(true);

            try {
                const formData = new FormData();
                formData.append("brandName", values.brandname);
                formData.append("offer", values.offer);
                formData.append("title", values.title);

                if (values.brandLogo) {
                    formData.append("brandLogo", values.brandLogo);
                }
                if (values.addpopularbrandimage) {
                    formData.append("brandImage", values.addpopularbrandimage);
                }

                let response;
                if (editData) {
                    // Update existing brand
                    response = await axios.put(`${BaseUrl}/api/updateBrand/${editData._id}`, formData, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data"
                        }
                    });
                } else {
                    // Create new brand
                    response = await axios.post(`${BaseUrl}/api/createPopularBrand`, formData, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data"
                        }
                    });
                }

                if (response.data.status === 200 || response.data.status === 201) {
                    // Call the success callback provided by parent component
                    navigate('/popularbrands', { 
                        state: { 
                            formSubmitted: true,
                            currentPage: location.state?.currentPage || 1 
                        } 
                    });
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Error submitting form. Please try again.");
            } finally {
                setIsSubmitting(false);
            }
        }
    });
    // **************************************************************************

    const handleNavigateBack = () => {
        navigate('/popularbrands');
    }
    
    return (
        <>
            <div>
                <div className="mv_main_heading mb-4 d-flex align-items-center justify-content-between">
                    <div>
                        <p className='mb-1'>{editData ? 'Edit Popular Brands' : 'Add Popular Brands'}</p>
                        <div className='d-flex align-items-center'>
                            <p className='mv_dashboard_heading mb-0'>Dashboard /</p>
                            <p className='mv_category_heading mv_subcategory_heading mb-0'>
                                {editData ? 'Edit Popular Brands' : 'Add Popular Brands'}
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
                                                <label className='mv_label_input'>Brand Name</label>
                                                <Form.Select
                                                    name="brandname"
                                                    value={values.brandname}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className='mv_form_select'>
                                                    <option>Select</option>
                                                    <option value="Apple">Apple</option>
                                                    <option value="Noise">Noise</option>
                                                    <option value="Asus">Asus</option>
                                                    <option value="JBL">JBL</option>
                                                </Form.Select>
                                                {errors.brandname && touched.brandname && <div className="text-danger small">{errors.brandname}</div>}
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content mb-3">
                                                <label className='mv_label_input'>Offer</label>
                                                <InputGroup className="">
                                                    <Form.Control
                                                        name="offer"
                                                        value={values.offer}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder="Enter offer"
                                                        aria-label="name"
                                                        aria-describedby="basic-addon1"
                                                    />
                                                </InputGroup>
                                                {errors.offer && touched.offer && <div className="text-danger small">{errors.offer}</div>}
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content mb-3">
                                                <label className='mv_label_input'>Title</label>
                                                <InputGroup className="">
                                                    <Form.Control
                                                        name="title"
                                                        value={values.title}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder="Enter Title"
                                                        aria-label="name"
                                                        aria-describedby="basic-addon1"
                                                    />
                                                </InputGroup>
                                                {errors.title && touched.title && <div className="text-danger small">{errors.title}</div>}
                                            </div>
                                        </div>
                                        <div className="col-xxl-6 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content mb-3">
                                                <label className='mv_label_input'>Brand Logo</label>
                                                <div className="position-relative">
                                                    <div className="mv_img_border w-100 p-1 d-flex align-items-center justify-content-between">
                                                        <div className="d-flex align-items-center p-1" style={{ backgroundColor: brandimg ? '#EAEAEA' : 'transparent', width:'20%' }}>
                                                            {brandimg && (
                                                                <>
                                                                    <div className="me-2" style={{ width: '24px', height: '24px', overflow: 'hidden' }}>
                                                                        <img
                                                                            src={brandLogoPreview}
                                                                            alt="Preview"
                                                                            style={{ width: '100%' }}
                                                                        />
                                                                    </div>
                                                                    <span className='text-truncate' style={{width:'100%'}}>{brandimg}</span>
                                                                    <button
                                                                        type="button"
                                                                        className="btn text-danger p-0 ms-2"
                                                                        style={{ fontSize: '1.50rem', lineHeight: .5 }}
                                                                        onClick={() => {
                                                                            setbrandimg("");
                                                                            setBrandLogoPreview(null);
                                                                            setFieldValue("brandLogo", "");
                                                                        }}
                                                                    >
                                                                        ×
                                                                    </button>
                                                                </>
                                                            )}
                                                            {!brandimg && (
                                                                <span className="text-muted">Choose Image</span>
                                                            )}
                                                        </div>
                                                        <label className="btn" style={{
                                                            backgroundColor: '#3A2C2C',
                                                            color: 'white',
                                                            borderRadius: '4px',
                                                            padding: '3px 16px',
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
                                                                        setbrandimg(file.name);
                                                                        setFieldValue("brandLogo", file);
                                                                        setBrandLogoPreview(URL.createObjectURL(file));
                                                                    }
                                                                }}
                                                            />
                                                        </label>
                                                    </div>
                                                </div>
                                                {errors.brandLogo && touched.brandLogo && <div className="text-danger small">{errors.brandLogo}</div>}
                                            </div>
                                        </div>
                                        <div className="col-xxl-6 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content mb-3">
                                                <label className='mv_label_input'>Image</label>
                                                <div className="position-relative">
                                                    <div className="mv_img_border w-100 p-1 d-flex align-items-center justify-content-between">
                                                        <div className="d-flex align-items-center p-1" style={{ backgroundColor: addimg ? '#EAEAEA' : 'transparent', width:'20%' }}>
                                                            {addimg && (
                                                                <>
                                                                    <div className="me-2" style={{ width: '24px', height: '24px', overflow: 'hidden' }}>
                                                                        <img
                                                                            src={brandImagePreview}
                                                                            alt="Preview"
                                                                            style={{ width: '100%' }}
                                                                        />
                                                                    </div>
                                                                    <span className='text-truncate' style={{width:'100%'}}>{addimg}</span>
                                                                    <button
                                                                        type="button"
                                                                        className="btn text-danger p-0 ms-2"
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
                                                            padding: '3px 16px',
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
                                                                        setFieldValue("addpopularbrandimage", file);
                                                                        setBrandImagePreview(URL.createObjectURL(file));
                                                                    }
                                                                }}
                                                            />
                                                        </label>
                                                    </div>
                                                </div>
                                                {errors.addpopularbrandimage && touched.addpopularbrandimage && <div className="text-danger small">{errors.addpopularbrandimage}</div>}
                                            </div>
                                        </div>
                                        <div className='text-center mt-5'>
                                            <div className="mv_edit_profile">
                                                <button onClick={handleNavigateBack} className='border-0 bg-transparent'>
                                                    Cancel
                                                </button>
                                                {editData ?
                                                    <button type="submit" className='border-0 bg-transparent' onClick={() => setisedit()}>
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

export default Addpopularbrands;
