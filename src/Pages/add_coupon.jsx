import React, { useEffect, useState, useRef } from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import '../CSS/vaidik.css';
import { useLocation } from 'react-router-dom';

const Addcoupon = () => {
    // State variables
    let [isedit, setisedit] = useState(false);
    let [code, setCode] = useState("");
    let [couponName, setCouponName] = useState("");
    let [description, setDescription] = useState("");
    let [couponType, setCouponType] = useState("");
    let [price, setPrice] = useState("");

    let handle_onload = () => {
        let data = JSON.parse(localStorage.getItem('user'));
        console.log(data);
        if (data) {
            setCode(data.code || "");
            setCouponName(data.couponName || "");
            setDescription(data.description || "");
            setCouponType(data.couponType || "");
            setPrice(data.price || "");
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
            code,
            couponName,
            description,
            couponType,
            price,
        };

        console.log('Form Submitted:', formData);
        localStorage.setItem('user', JSON.stringify(formData));
        setisedit(false);
    };

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
                                <form onSubmit={handlesubmit}>
                                    <div className="row">
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content">
                                                <label className='mv_label_input'>Code</label>
                                                <InputGroup className="mb-3">
                                                    <Form.Control
                                                        value={code}
                                                        onChange={(e) => setCode(e.target.value)}
                                                        placeholder="Enter Code"
                                                        aria-label="name"
                                                        aria-describedby="basic-addon1"
                                                    />
                                                </InputGroup>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content">
                                                <label className='mv_label_input'>Coupon Name</label>
                                                <InputGroup className="mb-3">
                                                    <Form.Control
                                                        value={couponName}
                                                        onChange={(e) => setCouponName(e.target.value)}
                                                        placeholder="Enter Coupon Name"
                                                        aria-label="name"
                                                        aria-describedby="basic-addon1"
                                                    />
                                                </InputGroup>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content">
                                                <label className='mv_label_input'>Description</label>
                                                <InputGroup className="mb-3">
                                                    <Form.Control
                                                        value={description}
                                                        onChange={(e) => setDescription(e.target.value)}
                                                        placeholder="Enter Description"
                                                        aria-label="name"
                                                        aria-describedby="basic-addon1"
                                                    />
                                                </InputGroup>
                                            </div>
                                        </div>
                                        <div className="col-xxl-6 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content">
                                                <label className='mv_label_input'>Coupon type</label>
                                                <Form.Select
                                                    value={couponType}
                                                    onChange={(e) => setCouponType(e.target.value)}
                                                    aria-label="Default select example"
                                                    className='mv_form_select mb-3'>
                                                    <option value="">Select</option>
                                                    <option value="Fixed">Fixed</option>
                                                    <option value="Percentage">Percentage</option>
                                                </Form.Select>
                                            </div>
                                        </div>
                                        <div className="col-xxl-6 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content">
                                                <label className='mv_label_input'>Price</label>
                                                <InputGroup className="mb-3">
                                                    <Form.Control
                                                        value={price}
                                                        onChange={(e) => setPrice(e.target.value)}
                                                        placeholder="Enter Price"
                                                        aria-label="name"
                                                        aria-describedby="basic-addon1"
                                                    />
                                                </InputGroup>
                                            </div>
                                        </div>
                                        <div className="col-xxl-6 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <label className='mv_offcanvas_filter_category'>Start Date</label>
                                            <div className="mv_input_content mv_add_product_date_scheduled">
                                                <label className='mv_label_input mv_add_product_date mv_filter_start_date'>{date}</label>
                                                <Form.Control className='mb-3' type="date" onChange={(e) => handleDateChange(e, 'start')} />
                                            </div>
                                        </div>
                                        <div className="col-xxl-6 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <label className='mv_offcanvas_filter_category'>End Date</label>
                                            <div className="mv_input_content mv_add_product_date_scheduled">
                                                <label className='mv_label_input mv_add_product_date mv_filter_start_date'>{date1}</label>
                                                <Form.Control className='mb-3' type="date" onChange={(e) => handleDateChange(e, 'end')} />
                                            </div>
                                        </div>
                                        <div className='text-center mt-5'>
                                            <div className="mv_edit_profile">
                                                <button className='border-0 bg-transparent'>
                                                    Cnacel
                                                </button>
                                                {editCoupon === true ? <button className='border-0 bg-transparent' onClick={change_edit}>
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

export default Addcoupon;
