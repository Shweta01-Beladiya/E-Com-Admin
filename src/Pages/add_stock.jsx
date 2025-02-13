import React, { useEffect, useState, useRef } from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import '../CSS/vaidik.css';
import { useLocation } from 'react-router-dom';

const Addstock = () => {
    // State variables
    let [isedit, setisedit] = useState(false);
    let [mainCategory, setMainCategory] = useState("");
    let [category, setCategory] = useState("");
    let [subCategory, setSubCategory] = useState("");
    let [product, setProduct] = useState("");
    let [stockStatus, setStockStatus] = useState("");
    let [quantity, setQuantity] = useState("");

    let change_edit = () => {
        setisedit(!isedit);
    };

    let handlesubmit = (event) => {
        event.preventDefault();

        const formData = {
            mainCategory,
            category,
            subCategory,
            product,
            stockStatus,
            quantity,
        };

        console.log('Form Submitted:', formData);
        setisedit(false);
    };

    // Edit Stock
    const location = useLocation();
    const editStock = location.state?.editStock;
    console.log(editStock)

    return (
        <>
            <div>
                <div className="mv_main_heading mb-4 d-flex align-items-center justify-content-between">
                    <div>
                        <p className='mb-1'>{editStock ? 'Edit Stock' : 'Add Stock'}</p>
                        <div className='d-flex align-items-center'>
                            <p className='mv_dashboard_heading mb-0'>Dashboard /</p>
                            <p className='mv_category_heading mv_subcategory_heading mb-0'>
                                {editStock ? 'Edit Stock' : 'Add Stock'}
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
                                                    value={mainCategory}
                                                    onChange={(e) => setMainCategory(e.target.value)}
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
                                                    value={category}
                                                    onChange={(e) => setCategory(e.target.value)}
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
                                                    value={subCategory}
                                                    onChange={(e) => setSubCategory(e.target.value)}
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
                                                <label className='mv_label_input'>Product</label>
                                                <Form.Select
                                                    value={product}
                                                    onChange={(e) => setProduct(e.target.value)}
                                                    aria-label="Default select example"
                                                    className='mv_form_select mb-3'>
                                                    <option value="">Select</option>
                                                    <option value="Gold Necklace">Gold Necklace</option>
                                                    <option value="Black blazer">Black blazer</option>
                                                    <option value="White Soap">White Soap</option>
                                                    <option value="vitamin c facewash">vitamin c facewash</option>
                                                    <option value="265 L fridge">265 L fridge</option>
                                                    <option value="Denver scent">Denver scent</option>
                                                    <option value="3 L Coocker">3 L Coocker</option>
                                                    <option value="Vivo v27 Pro">Vivo v27 Pro</option>
                                                </Form.Select>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content">
                                                <label className='mv_label_input'>Stock Status</label>
                                                <Form.Select
                                                    value={stockStatus}
                                                    onChange={(e) => setStockStatus(e.target.value)}
                                                    aria-label="Default select example"
                                                    className='mv_form_select mb-3'>
                                                    <option value="">Select</option>
                                                    <option value="In Stock">In Stock</option>
                                                    <option value="Out of Stock">Out of Stock</option>
                                                    <option value="Low Stock">Low Stock</option>
                                                </Form.Select>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content">
                                                <label className='mv_label_input'>Quantity</label>
                                                <InputGroup className="mb-3">
                                                    <Form.Control
                                                        value={quantity}
                                                        onChange={(e) => setQuantity(e.target.value)}
                                                        placeholder="Enter qty."
                                                        aria-label="name"
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
                                                {editStock === true ? <button className='border-0 bg-transparent' onClick={change_edit}>
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

export default Addstock;
