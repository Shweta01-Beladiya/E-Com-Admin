import React, { useEffect, useState, useRef } from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import '../CSS/vaidik.css';
import { useLocation } from 'react-router-dom';

const Addsize = () => {
    // State variables
    let [isedit, setisedit] = useState(false);
    let [email, setemail] = useState('');
    let [name, setname] = useState('');
    let [contact, setcontact] = useState('');
    let [gender, setgender] = useState('');

    const [profileImage, setProfileImage] = useState(require('../mv_img/profile_img.png'));

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
    const [showPassword, setShowPassword] = useState({
        old: false,
        new: false,
        confirm: false
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
          const imageURL = URL.createObjectURL(file); // Create a temporary URL for the uploaded image
          setProfileImage(imageURL); // Update the state with the new image
        }
    };

    // Edit Size
    const location = useLocation();
    const editSize = location.state?.editSize;
    console.log(editSize)

    return (
        <>
            <div>
                <div className="mv_main_heading mb-4 d-flex align-items-center justify-content-between">
                    <div>
                        <p className='mb-1'>{editSize ? 'Edit Size' : 'Add Size'}</p>
                        <div className='d-flex align-items-center'>
                            <p className='mv_dashboard_heading mb-0'>Dashboard /</p>
                            <p className='mv_category_heading mv_subcategory_heading mb-0'>
                                {editSize ? 'Edit Size' : 'Add Size'}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="mv_main_profile_change h-auto">
                    {/* Tabs Content */}
                    <div className="tab-content">
                        <div className="mv_view_edit_profile">
                            <div className='mv_profile_type'>
                                <form onSubmit={handlesubmit}>
                                    <div className="row">
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content">
                                                <label className='mv_label_input'>Main Category</label>
                                                <Form.Select
                                                    value={name}
                                                    onChange={(e) => setname(e.target.value)}
                                                    aria-label="Default select example"
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
                                                    value={name}
                                                    onChange={(e) => setname(e.target.value)}
                                                    aria-label="Default select example"
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
                                                    value={name}
                                                    onChange={(e) => setname(e.target.value)}
                                                    aria-label="Default select example"
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
                                                <label className='mv_label_input'>Size Name</label>
                                                <InputGroup className="mb-3">
                                                    <Form.Control
                                                        value={name}
                                                        onChange={(e) => setname(e.target.value)}
                                                        placeholder="Enter size name"
                                                        aria-label="name"
                                                        aria-describedby="basic-addon1"
                                                    />
                                                </InputGroup>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content">
                                                <label className='mv_label_input'>Size</label>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Control
                                                        value={name}
                                                        onChange={(e) => setname(e.target.value)}
                                                        type=""
                                                        placeholder="Enter size" />
                                                </Form.Group>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content">
                                                <label className='mv_label_input'>Unit</label>
                                                <Form.Select
                                                    value={name}
                                                    onChange={(e) => setname(e.target.value)}
                                                    aria-label="Default select example"
                                                    className='mv_form_select mb-3'>
                                                    <option value="">Select</option>
                                                    <option value="gm">gm</option>
                                                    <option value="ltr">ltr</option>
                                                    <option value="ml">ml</option>
                                                    <option value="GB">GB</option>
                                                </Form.Select>
                                            </div>
                                        </div>
                                        <div className='text-center mt-5'>
                                            <div className="mv_edit_profile">
                                                <button className='border-0 bg-transparent'>
                                                    Cnacel
                                                </button>
                                                {editSize === true ? <button className='border-0 bg-transparent' onClick={change_edit}>
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

export default Addsize;
