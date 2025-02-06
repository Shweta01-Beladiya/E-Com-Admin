import React, { useEffect, useState } from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import '../CSS/vaidik.css';
import { IoEyeSharp } from 'react-icons/io5';
import { FaEyeSlash } from 'react-icons/fa';

const Viewprofile = () => {
    // State variables
    let [isedit, setisedit] = useState(false);
    let [email, setemail] = useState('');
    let [name, setname] = useState('');
    let [contact, setcontact] = useState('');
    let [gender, setgender] = useState('');

    let handle_onload = () => {
        let data = JSON.parse(localStorage.getItem('user'));
        console.log(data);
        if (data) {
            setname(data.name);
            setcontact(data.contact);
            setemail(data.email);
            setgender(data.gender);
        } else {
            return;
        }
    }

    useEffect(() => {
        handle_onload();
    }, []);

    let change_edit = () => {
        setisedit(!isedit);
    };

    let handlesubmit = (event) => {
        event.preventDefault();

        const formData = {
            name,
            email,
            contact,
            gender,
        };

        console.log('Form Submitted:', formData);
        localStorage.setItem('user', JSON.stringify(formData));
        setisedit(false);
    };

    // navs & tabs
    const [activeTab, setActiveTab] = useState("edit-profile");

    // change password
    const [showPassword, setShowPassword] = useState(false);
      
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

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
                                    <img src={require('../mv_img/profile_user_img.png')} alt="" />
                                </div>
                            </div>
                            <div className='mv_main_profile_name_email'>
                                <p className='mv_profile_name'>John Patel</p>
                                <p className='mv_profile_email mb-4'>example@gmail.com</p>
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
                                        <p className='mv_user_name mb-0'>Johan Patel</p>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-xxl-4 col-xl-12 col-lg-12 col-md-4 col-sm-5 col-5">
                                        <div className='mv_full_name'>
                                            <div className='mv_heading_full_name'>Email</div>
                                            <div>:</div>
                                        </div>
                                    </div>
                                    <div className="col-xxl-8 col-xl-12 col-lg-12 col-md-8 col-sm-7 col-7">
                                        <p className='mv_user_name mb-0'>example@gmail.com</p>
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
                                        <p className='mv_user_name mb-0'>+91 8523698521</p>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-xxl-4 col-xl-12 col-lg-12 col-md-4 col-sm-5 col-5">
                                        <div className='mv_full_name'>
                                            <div className='mv_heading_full_name'>Gender</div>
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
                            <ul className="nav nav-tabs">
                                <li className="nav-item">
                                    <button className={`nav-link ${activeTab === "edit-profile" ? "active" : ""}`}
                                        onClick={() => setActiveTab("edit-profile")}>
                                        Edit Profile
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className={`nav-link ${activeTab === "change-password" ? "active" : ""}`}
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
                                                <img src={require('../mv_img/profile_img.png')} alt="" />
                                            </div>
                                            <div className='mv_main_pro_img_camera'>
                                                <img className='mv_pro_img_camera' src={require('../mv_img/profile_img_camera.png')} alt="" />
                                            </div>
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
                                                                value={name}
                                                                onChange={(e) => setname(e.target.value)}
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
                                                                value={email}
                                                                onChange={(e) => setemail(e.target.value)}
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
                                                                value={contact}
                                                                onChange={(e) => setcontact(e.target.value)}
                                                                placeholder="+91"
                                                                aria-label="Contact"
                                                                aria-describedby="basic-addon1"
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
                                                            value={gender} 
                                                            onChange={(e) => setgender(e.target.value)} 
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
                                                            Cnacel
                                                        </button>
                                                        <button className='border-0 bg-transparent' onClick={change_edit}>
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
                                    <div className="row">
                                        <div className="col-12">
                                            <div className='mv_old_pass'>
                                                <label className='mv_label_old_pass'>Old Password</label>
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Enter old password"
                                                    className="p-2 w-100"
                                                />
                                                {showPassword ? (
                                                    <IoEyeSharp
                                                        onClick={togglePasswordVisibility}
                                                        className="mv_change_pass_icon"
                                                    />
                                                    ) : (
                                                    <FaEyeSlash
                                                        onClick={togglePasswordVisibility}
                                                        className="mv_change_pass_icon"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className='mv_old_pass'>
                                                <label className='mv_label_old_pass'>New Password</label>
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Enter new password"
                                                    className="p-2 w-100"
                                                />
                                                {showPassword ? (
                                                    <IoEyeSharp
                                                        onClick={togglePasswordVisibility}
                                                        className="mv_change_pass_icon"
                                                    />
                                                    ) : (
                                                    <FaEyeSlash
                                                        onClick={togglePasswordVisibility}
                                                        className="mv_change_pass_icon"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className='mv_old_pass'>
                                                <label className='mv_label_old_pass'>Confirm Password</label>
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Confirm password"
                                                    className="p-2 w-100"
                                                />
                                                {showPassword ? (
                                                    <IoEyeSharp
                                                        onClick={togglePasswordVisibility}
                                                        className="mv_change_pass_icon"
                                                    />
                                                    ) : (
                                                    <FaEyeSlash
                                                        onClick={togglePasswordVisibility}
                                                        className="mv_change_pass_icon"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <div className=' text-center mt-4'>
                                            <div className="mv_edit_profile">
                                                <button className='border-0 bg-transparent'>
                                                    Cnacel
                                                </button>
                                                <button className='border-0 bg-transparent' onClick={change_edit}>
                                                    Reset Password
                                                </button>
                                            </div>
                                        </div>
                                    </div>
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
