import React, { useEffect, useState, useRef } from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import '../CSS/vaidik.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

const Addpopularbrands = ({ editData }) => {

    const BaseUrl = process.env.REACT_APP_BASEURL;
    const token = localStorage.getItem('token');
    const navigate = useNavigate()
    const [toggle, setToggle] = useState(false)
    const [myToggle, setMyToggle] = useState(false)

    // State variables
    let [isedit, setisedit] = useState(false);
    // let [brandName, setBrandName] = useState("");
    // let [offer, setOffer] = useState("");
    // let [title, setTitle] = useState("");

    let change_edit = () => {
        setisedit(!isedit);
    };

    // let handlesubmit = (event) => {
    //     event.preventDefault();

    //     const formData = {
    //         brandName,
    //         offer,
    //         title,
    //     };

    //     console.log("Form Submitted:", formData);
    //     setisedit(false);
    // };

    // Edit Popularbrands
    const location = useLocation();
    const editPopularbrands = location.state?.editPopularbrands;
    console.log(editPopularbrands)

    // Select img
    let [brandimg, setbrandimg] = useState("");
    let [addimg, setaddimg] = useState("");

    const [brandLogoPreview, setBrandLogoPreview] = useState(null);
    const [brandImagePreview, setBrandImagePreview] = useState(null);

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
            console.log(values);

            // addpopularbrand(values)
            const formData = new FormData();
            formData.append("brandName", values.brandname);
            formData.append("offer", values.offer);
            formData.append("title", values.title);
            // formData.append("brandLogo", values.brandLogo);  
            // formData.append("brandImage", values.addpopularbrandimage);

            if (values.brandLogo) {
                formData.append("brandLogo", values.brandLogo);
            }
            if (values.addpopularbrandimage) {
                formData.append("brandImage", values.addpopularbrandimage);
            }

            if (editData) {
                debugger
                try {
                    const response = await axios.put(`${BaseUrl}/api/updateBrand/${editData._id}`, formData, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data"
                        }
                    });
                    console.log("Response:", response?.data);

                    // window.location.href = "./popularbrands"
                    navigate("/popularbrands")

                } catch (error) {
                    console.error("Error:", error);
                    alert("Error submitting form. Please try again.");
                }
            }
            // console.log("FormData Content:", [...formData.entries()]);  // Debugging
            else {
                try {
                    const response = await axios.post(`${BaseUrl}/api/createPopularBrand`, formData, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data"
                        }
                    });
                    console.log("Response:", response?.data);

                    // window.location.href = "./popularbrands"
                    navigate("/popularbrands")

                } catch (error) {
                    console.error("Error:", error);
                    alert("Error submitting form. Please try again.");
                }
            }
        }
    })
    // **************************************************************************

    useEffect(() => {
        if (editData) {
            setBrandLogoPreview(editData.brandLogo);
            setBrandImagePreview(editData.brandImage);
        }
    }, [editData]);

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
                                                <InputGroup className="">
                                                    <Form.Control
                                                        placeholder="Choose Image"
                                                        aria-label=""
                                                        readOnly
                                                        value={brandimg}
                                                        name="brandLogo"
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
                                                                    setbrandimg(file.name);
                                                                    setFieldValue("brandLogo", file);
                                                                    setBrandLogoPreview(URL.createObjectURL(file));
                                                                }
                                                                setMyToggle(true)
                                                            }}
                                                        />
                                                    </label>
                                                </InputGroup>
                                                {errors.brandLogo && touched.brandLogo && <div className="text-danger small">{errors.brandLogo}</div>}
                                                {brandLogoPreview && (
                                                    <div className="mt-2">
                                                        <img
                                                            className='mv_update_img'
                                                            src={`${myToggle ? `${brandLogoPreview}` : `${BaseUrl}/${brandLogoPreview}`}`}
                                                            alt="Brand Logo Preview"
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
                                        </div>
                                        <div className="col-xxl-6 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content mb-3">
                                                <label className='mv_label_input'>Image</label>
                                                <InputGroup className="">
                                                    <Form.Control
                                                        placeholder="Choose Image"
                                                        aria-label=""
                                                        readOnly
                                                        value={addimg}
                                                        name="addpopularbrandimage"
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
                                                                    setFieldValue("addpopularbrandimage", file);
                                                                    setBrandImagePreview(URL.createObjectURL(file));
                                                                }
                                                                setToggle(true)
                                                            }}
                                                        />
                                                    </label>
                                                </InputGroup>
                                                {errors.addpopularbrandimage && touched.addpopularbrandimage && <div className="text-danger small">{errors.addpopularbrandimage}</div>}
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
                                        </div>
                                        <div className='text-center mt-5'>
                                            <div className="mv_edit_profile">
                                                <button className='border-0 bg-transparent'>
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
