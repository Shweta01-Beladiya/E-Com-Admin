import React, { useEffect, useState, useRef } from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import '../CSS/vaidik.css';
import { useLocation } from 'react-router-dom';

const Addpopularbrands = () => {
    // State variables
    let [isedit, setisedit] = useState(false);
    let [brandName, setBrandName] = useState("");
    let [offer, setOffer] = useState("");
    let [title, setTitle] = useState("");

    let change_edit = () => {
        setisedit(!isedit);
    };

    let handlesubmit = (event) => {
        event.preventDefault();
    
        const formData = {
            brandName,
            offer,
            title,
        };
    
        console.log("Form Submitted:", formData);
        setisedit(false);
    };

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
    let [brandimg, setbrandimg] = useState("");
    let [img, setimg] = useState("");

    return (
        <>
            <div>
                <div className="mv_main_heading mb-4 d-flex align-items-center justify-content-between">
                    <div>
                        <p className='mb-1'>{editOffer ? 'Edit Popular Brands' : 'Add Popular Brands'}</p>
                        <div className='d-flex align-items-center'>
                            <p className='mv_dashboard_heading mb-0'>Dashboard /</p>
                            <p className='mv_category_heading mv_subcategory_heading mb-0'>
                                {editOffer ? 'Edit Popular Brands' : 'Add Popular Brands'}
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
                                                <label className='mv_label_input'>Brand Name</label>
                                                <Form.Select
                                                    value={brandName}
                                                    onChange={(e) => setBrandName(e.target.value)}
                                                    aria-label="Default select example"
                                                    className='mv_form_select mb-3'>
                                                    <option>Select</option>
                                                    <option value="Apple">Apple</option>
                                                    <option value="Noise">Noise</option>
                                                    <option value="Asus">Asus</option>
                                                    <option value="JBL">JBL</option>
                                                </Form.Select>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content">
                                                <label className='mv_label_input'>Offer</label>
                                                <InputGroup className="mb-3">
                                                    <Form.Control
                                                        value={offer}
                                                        onChange={(e) => setOffer(e.target.value)}
                                                        placeholder="Enter offer"
                                                        aria-label="name"
                                                        aria-describedby="basic-addon1"
                                                    />
                                                </InputGroup>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content">
                                                <label className='mv_label_input'>Title</label>
                                                <InputGroup className="mb-3">
                                                    <Form.Control
                                                        value={title}
                                                        onChange={(e) => setTitle(e.target.value)}
                                                        placeholder="Enter Title"
                                                        aria-label="name"
                                                        aria-describedby="basic-addon1"
                                                    />
                                                </InputGroup>
                                            </div>
                                        </div>
                                        <div className="col-xxl-6 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content">
                                                <label className='mv_label_input'>Brand Logo</label>
                                                <InputGroup className="mb-3">
                                                    <Form.Control
                                                        placeholder="Choose Image"
                                                        aria-label=""
                                                        readOnly
                                                        value={brandimg}
                                                    />
                                                    <label className="mv_browse_button">
                                                    Browse
                                                    <input type="file" hidden onChange={(e) => { setbrandimg(e.currentTarget.files[0].name) }} />
                                                    </label>
                                                </InputGroup>
                                            </div>
                                        </div>
                                        <div className="col-xxl-6 col-xl-4 col-lg-4 col-md-6 col-sm-6">
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

export default Addpopularbrands;
