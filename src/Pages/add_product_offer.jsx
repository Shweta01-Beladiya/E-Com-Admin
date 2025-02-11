import React, { useEffect, useState, useRef } from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import '../CSS/vaidik.css';
import { useLocation } from 'react-router-dom';

const Addproductoffer = () => {
    // State variables
    let [isedit, setisedit] = useState(false);
    let [name, setname] = useState('');
    let [mainCategory, setMainCategory] = useState("");
    let [category, setCategory] = useState("");
    let [subCategory, setSubCategory] = useState("");
    let [product, setProduct] = useState("");
    let [offerName, setOfferName] = useState("");
    let [code, setCode] = useState("");
    let [discountPrice, setDiscountPrice] = useState("");
    let [price, setPrice] = useState("");
    let [startDate, setStartDate] = useState("");
    let [endDate, setEndDate] = useState("");
    let [minPurchase, setMinPurchase] = useState("");
    let [maxPurchase, setMaxPurchase] = useState("");
    let [description, setDescription] = useState("");


    let handle_onload = () => {
        let data = JSON.parse(localStorage.getItem('user'));
        console.log(data);
        if (data) {
            setname(data.name || "");
            setMainCategory(data.mainCategory || "");
            setCategory(data.category || "");
            setSubCategory(data.subCategory || "");
            setProduct(data.product || "");
            setOfferName(data.offerName || "");
            setCode(data.code || "");
            setDiscountPrice(data.discountPrice || "");
            setPrice(data.price || "");
            setStartDate(data.startDate || "");
            setEndDate(data.endDate || "");
            setMinPurchase(data.minPurchase || "");
            setMaxPurchase(data.maxPurchase || "");
            setDescription(data.description || "");
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
            mainCategory,
            category,
            subCategory,
            product,
            offerName,
            code,
            discountPrice,
            price,
            startDate,
            endDate,
            minPurchase,
            maxPurchase,
            description,
        };
    
        console.log("Form Submitted:", formData);
        localStorage.setItem("user", JSON.stringify(formData));
        setisedit(false);
    };

    // Edit Product Offer
    const location = useLocation();
    const editProductoffer = location.state?.editProductoffer;
    console.log(editProductoffer)

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
                        <p className='mb-1'>{editProductoffer ? 'Edit Product Offer' : 'Add Product Offer'}</p>
                        <div className='d-flex align-items-center'>
                            <p className='mv_dashboard_heading mb-0'>Dashboard /</p>
                            <p className='mv_category_heading mv_subcategory_heading mb-0'>
                                {editProductoffer ? 'Edit Product Offer' : 'Add Product Offer'}
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
                                                <label className='mv_label_input'>Offer Name</label>
                                                <InputGroup className="mb-3">
                                                    <Form.Control
                                                        value={offerName}
                                                        onChange={(e) => setOfferName(e.target.value)}
                                                        placeholder="Enter Offer Name"
                                                        aria-label="name"
                                                        aria-describedby="basic-addon1"
                                                    />
                                                </InputGroup>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content">
                                                <label className='mv_label_input'>Code</label>
                                                <InputGroup className="mb-3">
                                                    <Form.Control
                                                        value={code}
                                                        onChange={(e) => setCode(e.target.value)}
                                                        placeholder="Enter Code"
                                                        aria-label="name1"
                                                        aria-describedby="basic-addon1"
                                                    />
                                                </InputGroup>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content">
                                                <label className='mv_label_input'>Discount Price</label>
                                                <InputGroup className="mb-3">
                                                    <Form.Control
                                                        value={discountPrice}
                                                        onChange={(e) => setDiscountPrice(e.target.value)}
                                                        placeholder="Enter Discount Price"
                                                        aria-label="name"
                                                        aria-describedby="basic-addon1"
                                                    />
                                                </InputGroup>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
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
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <label className='mv_offcanvas_filter_category'>Start Date</label>
                                            <div className="mv_input_content mv_add_product_date_scheduled">
                                                <label className='mv_label_input mv_add_product_date mv_filter_start_date'>{date}</label>
                                                <Form.Control className='mb-3' type="date" onChange={(e) => handleDateChange(e, 'start')} />
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <label className='mv_offcanvas_filter_category'>End Date</label>
                                            <div className="mv_input_content mv_add_product_date_scheduled">
                                                <label className='mv_label_input mv_add_product_date mv_filter_start_date'>{date1}</label>
                                                <Form.Control className='mb-3' type="date" onChange={(e) => handleDateChange(e, 'end')} />
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content">
                                                <label className='mv_label_input'>Minimum Purchase</label>
                                                <InputGroup className="mb-3">
                                                    <Form.Control
                                                        value={minPurchase}
                                                        onChange={(e) => setMinPurchase(e.target.value)}
                                                        placeholder="Enter Minimum Purchase"
                                                        aria-label="name"
                                                        aria-describedby="basic-addon1"
                                                    />
                                                </InputGroup>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content">
                                                <label className='mv_label_input'>Maximum Purchase</label>
                                                <InputGroup className="mb-3">
                                                    <Form.Control
                                                        value={maxPurchase}
                                                        onChange={(e) => setMaxPurchase(e.target.value)}
                                                        placeholder="Enter Maximum Purchase"
                                                        aria-label="name"
                                                        aria-describedby="basic-addon1"
                                                    />
                                                </InputGroup>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="mv_input_content">
                                                <label className='mv_label_input'>Description</label>
                                                <InputGroup className="mb-3">
                                                    <Form.Control
                                                        value={description}
                                                        onChange={(e) => setDescription(e.target.value)}
                                                        placeholder="Enter Description"
                                                        as="textarea" 
                                                        aria-label="With textarea"
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
                                                {editProductoffer === true ? <button className='border-0 bg-transparent' onClick={change_edit}>
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

export default Addproductoffer;
