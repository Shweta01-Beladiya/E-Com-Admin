import React, { useEffect, useState, useRef } from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import '../CSS/vaidik.css';
import { IoEyeSharp } from 'react-icons/io5';
import { FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

const Viewprofile = () => {

    const BaseUrl = process.env.REACT_APP_BASEURL;
    const token = localStorage.getItem('token');
    const defaultProfileImage = require('../mv_img/profile_img.png');
    const navigate = useNavigate();

    const [data, setData] = useState({
        email: '',
        name: '',
        mobileNo: '',
        image: '',
        gender: ''
    });

    const passwordChangeSchema = Yup.object().shape({
        currentPassword: Yup.string()
            .required('Current password is required'),
        newPassword: Yup.string()
            .required('New password is required'),
        confirmPassword: Yup.string()
            .required('Please confirm your password')
            .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BaseUrl}/api/getUser`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // console.log("response",response.data.user);
                setData(response.data.user);
            } catch (error) {
                console.error('Data Fetching Error:', error);
            }
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            Object.keys(data).forEach(key => {
                if (key !== 'image' || !selectedFile) {
                    formData.append(key, data[key]);
                }
            });

            if (selectedFile) {
                formData.append('image', selectedFile);
            }

            const response = await axios.put(`${BaseUrl}/api/updateUser`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            // console.log("response", response.data);
            if (response.data.status === 200) {
                navigate('/dashboard');
            }

        } catch (error) {
            console.error('Data Update Error:', error);
        }
    };

    // navs & tabs
    const [activeTab, setActiveTab] = useState("edit-profile");
    const [selectedFile, setSelectedFile] = useState(null);

    // change password
    const [showPassword, setShowPassword] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false
    });

    const togglePasswordVisibility = (field) => {
        setShowPassword((prevState) => ({
            ...prevState,
            [field]: !prevState[field]
        }));
    };

    // Profile Image
    const fileInputRef = useRef(null);

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file); // Save the actual file
            const imageURL = URL.createObjectURL(file);
            setData(prev => ({ ...prev, image: imageURL })); // For preview only
        }
    };

    const handleCancel = () => {
        navigate('/dashboard');
    }
    const handleChangePassword = async (values) => {
        try {
            const response = await axios.put(`${BaseUrl}/api/updatePassword`, values, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // console.log("response", response.data);
            if (response.data.status === 200) {
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Data Fetching Error:', error);
        }
    }
    return (
        <>
            <div>
                <div className="mv_main_heading d-flex align-items-center">
                    <p className='mb-4'>View Profile</p>
                </div>
                <div className="row">
                    <div className="col-lg-3 col-md-12">
                        <div className="mv_main_bg_color">
                            <div className='mv_user_bgimg'>
                                <div className='d-flex justify-content-center'>
                                    <img src={`${BaseUrl}/${data.image}`} alt="" />
                                </div>
                            </div>
                            <div className='mv_main_profile_name_email'>
                                <p className='mv_profile_name'>{data.name}</p>
                                <p className='mv_profile_email mb-4'>{data.email}</p>
                            </div>
                            <div className='mv_main_personal_info'>
                                <p className='mv_personal_info mb-5'>Personal Info</p>
                                <div className="row mb-3">
                                    <div className="col-xxl-4 col-xl-12 col-lg-12 col-md-4 col-sm-5 col-5">
                                        <div className='mv_full_name'>
                                            <div className='mv_heading_full_name'>Full Name</div>
                                            <div>:</div>
                                        </div>
                                    </div>
                                    <div className="col-xxl-8 col-xl-12 col-lg-12 col-md-8 col-sm-7 col-7">
                                        <p className='mv_user_name mb-0'>{data.name}</p>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-xxl-4 col-xl-12 col-lg-12 col-md-4 col-sm-5 col-12">
                                        <div className='mv_full_name mv_personal_email'>
                                            <div className='mv_heading_full_name'>Email</div>
                                            <div>:</div>
                                        </div>
                                    </div>
                                    <div className="col-xxl-8 col-xl-12 col-lg-12 col-md-8 col-sm-7 col-12">
                                        <p className='mv_user_name mb-0'>{data.email}</p>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-xxl-4 col-xl-12 col-lg-12 col-md-4 col-sm-5 col-5">
                                        <div className='mv_full_name'>
                                            <div className='mv_heading_full_name'>Phone Number</div>
                                            <div>:</div>
                                        </div>
                                    </div>
                                    <div className="col-xxl-8 col-xl-12 col-lg-12 col-md-8 col-sm-7 col-7">
                                        <p className='mv_user_name mb-0'>+91 {data.mobileNo}</p>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-xxl-4 col-xl-12 col-lg-12 col-md-4 col-sm-5 col-5">
                                        <div className='mv_full_name'>
                                            <div className='mv_heading_full_name'>{data.gender}</div>
                                            <div>:</div>
                                        </div>
                                    </div>
                                    <div className="col-xxl-8 col-xl-12 col-lg-12 col-md-8 col-sm-7 col-7">
                                        <p className='mv_user_name mb-0'>Male</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9 col-md-12">
                        <div class="mv_main_profile_change">
                            {/* navs & tabs */}
                            <ul className="nav nav-tabs mv_edit_navs_tabs">
                                <li className="nav-item">
                                    <button className={`nav-link mv_edit_nav_link ${activeTab === "edit-profile" ? "active" : ""}`}
                                        onClick={() => setActiveTab("edit-profile")}>
                                        Edit Profile
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className={`nav-link mv_edit_nav_link ${activeTab === "change-password" ? "active" : ""}`}
                                        onClick={() => setActiveTab("change-password")}>
                                        Change Password
                                    </button>
                                </li>
                            </ul>
                            {/* Tabs Content */}
                            <div className="tab-content">
                                {activeTab === "edit-profile" && (
                                    // Edit Profile
                                    <div className="mv_view_edit_profile">
                                        <div className='mv_profile'>
                                            <p className='mv_profile_image_heading'>Profile Image</p>
                                            <div className='mv_main_profile_img'>
                                                <div className="mv_profile_img">
                                                    <img src={data.image ? `${BaseUrl}/${data.image}` : defaultProfileImage} alt="Profile" />
                                                </div>
                                                <div className='mv_main_pro_img_camera' onClick={handleImageClick}>
                                                    <img className='mv_pro_img_camera' src={require('../mv_img/profile_img_camera.png')} alt="" />
                                                </div>
                                                <input
                                                    type="file"
                                                    ref={fileInputRef}
                                                    style={{ display: 'none' }}
                                                    onChange={handleImageChange}
                                                />
                                            </div>
                                        </div>
                                        <div className='mv_profile_type'>
                                            <form onSubmit={handlesubmit}>
                                                <div className="row">
                                                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                                        <div className="mv_input_content">
                                                            <label className='mv_label_input'>Name</label>
                                                            <InputGroup className="mb-3">
                                                                <Form.Control
                                                                    value={data.name}
                                                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                                                    placeholder="Name"
                                                                    aria-label="name"
                                                                    aria-describedby="basic-addon1"
                                                                />
                                                            </InputGroup>
                                                        </div>
                                                    </div>
                                                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                                        <div className="mv_input_content">
                                                            <label className='mv_label_input'>Email</label>
                                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                                <Form.Control
                                                                    value={data.email}
                                                                    onChange={(e) => setData({ ...data, email: e.target.value })}
                                                                    type="email"
                                                                    placeholder="Email" />
                                                            </Form.Group>
                                                        </div>
                                                    </div>
                                                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                                        <div className="mv_input_content">
                                                            <label className='mv_label_input'>Phone</label>
                                                            <InputGroup className="mb-3">
                                                                <Form.Control
                                                                    value={data.mobileNo}
                                                                    onChange={(e) => setData({ ...data, mobileNo: e.target.value })}
                                                                    placeholder="+91"
                                                                    maxLength="10"
                                                                    onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                                                                />
                                                            </InputGroup>
                                                        </div>
                                                    </div>
                                                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                                        <div className="mv_input_content">
                                                            <label className='mv_label_input'>Gender</label>
                                                            <Form.Select
                                                                value={data.gender}
                                                                onChange={(e) => setData({ ...data, gender: e.target.value })}
                                                                aria-label="Default select example"
                                                                className='mv_form_select'>
                                                                <option value="">Select</option>
                                                                <option value="Male">Male</option>
                                                                <option value="Female">Female</option>
                                                                <option value="Other">Other</option>
                                                            </Form.Select>
                                                        </div>
                                                    </div>
                                                    <div className=' text-center mt-4'>
                                                        <div className="mv_edit_profile">
                                                            <button className='border-0 bg-transparent'>
                                                                Cancel
                                                            </button>
                                                            <button className='border-0 bg-transparent'>
                                                                Update
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                )}
                                {activeTab === "change-password" && (
                                    // Change Password
                                    <div className="mv_main_change_pass">
                                        <Formik
                                            initialValues={{
                                                currentPassword: '',
                                                newPassword: '',
                                                confirmPassword: ''
                                            }}
                                            validationSchema={passwordChangeSchema}
                                            onSubmit={handleChangePassword}
                                        >
                                            {({ values, handleChange, handleSubmit, errors, touched }) => (
                                                <form onSubmit={handleSubmit}>
                                                    <div className="row">
                                                        <div className="col-12 mb-3">
                                                            <div className="mv_old_pass">
                                                                <label className="mv_label_old_pass">Old Password</label>
                                                                <input
                                                                    type={showPassword.currentPassword ? "text" : "password"}
                                                                    name="currentPassword"
                                                                    value={values.currentPassword}
                                                                    onChange={handleChange}
                                                                    placeholder="Enter old password"
                                                                    className="p-2 w-100 "
                                                                />
                                                                {showPassword.currentPassword ? (
                                                                    <IoEyeSharp onClick={() => togglePasswordVisibility("currentPassword")} className="mv_change_pass_icon" />
                                                                ) : (
                                                                    <FaEyeSlash onClick={() => togglePasswordVisibility("currentPassword")} className="mv_change_pass_icon" />
                                                                )}
                                                            </div>
                                                            {errors.currentPassword && touched.currentPassword && (
                                                                <small className="text-danger">{errors.currentPassword}</small>
                                                            )}
                                                        </div>
                                                        <div className="col-12 mb-3">
                                                            <div className="mv_old_pass">
                                                                <label className="mv_label_old_pass">New Password</label>
                                                                <input
                                                                    type={showPassword.newPassword ? "text" : "password"}
                                                                    name="newPassword"
                                                                    value={values.newPassword}
                                                                    onChange={handleChange}
                                                                    placeholder="Enter new password"
                                                                    className="p-2 w-100 "
                                                                />
                                                                {showPassword.newPassword ? (
                                                                    <IoEyeSharp onClick={() => togglePasswordVisibility("newPassword")} className="mv_change_pass_icon" />
                                                                ) : (
                                                                    <FaEyeSlash onClick={() => togglePasswordVisibility("newPassword")} className="mv_change_pass_icon" />
                                                                )}
                                                            </div>
                                                            {errors.newPassword && touched.newPassword && (
                                                                <small className="text-danger">{errors.newPassword}</small>
                                                            )}
                                                        </div>
                                                        <div className="col-12 mb-3">
                                                            <div className="mv_old_pass">
                                                                <label className="mv_label_old_pass">Confirm Password</label>
                                                                <input
                                                                    type={showPassword.confirmPassword ? "text" : "password"}
                                                                    name="confirmPassword"
                                                                    value={values.confirmPassword}
                                                                    onChange={handleChange}
                                                                    placeholder="Confirm password"
                                                                    className="p-2 w-100"
                                                                />
                                                                {showPassword.confirmPassword ? (
                                                                    <IoEyeSharp onClick={() => togglePasswordVisibility("confirmPassword")} className="mv_change_pass_icon" />
                                                                ) : (
                                                                    <FaEyeSlash onClick={() => togglePasswordVisibility("confirmPassword")} className="mv_change_pass_icon" />
                                                                )}
                                                            </div>
                                                            {errors.confirmPassword && touched.confirmPassword && (
                                                                <small className="text-danger">{errors.confirmPassword}</small>
                                                            )}
                                                        </div>
                                                        <div className="text-center mt-4">
                                                            <div className="mv_edit_profile">
                                                                <button
                                                                    type="button"
                                                                    className="border-0 bg-transparent"
                                                                    onClick={() => handleCancel()}
                                                                >
                                                                    Cancel
                                                                </button>
                                                                <button
                                                                    type="submit"
                                                                    className="border-0 bg-transparent"
                                                                >
                                                                    Reset Password
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            )}
                                        </Formik>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Viewprofile;
