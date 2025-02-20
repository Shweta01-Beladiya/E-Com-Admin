import React, { useEffect, useState, useRef } from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import '../CSS/vaidik.css';
import { useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Addproductoffer = () => {
    // State variables
    let [isedit, setisedit] = useState(false);
    // let [name, setname] = useState('');
    // let [mainCategory, setMainCategory] = useState("");
    // let [category, setCategory] = useState("");
    // let [subCategory, setSubCategory] = useState("");
    // let [product, setProduct] = useState("");
    // let [offerName, setOfferName] = useState("");
    // let [code, setCode] = useState("");
    // let [discountPrice, setDiscountPrice] = useState("");
    // let [price, setPrice] = useState("");
    // let [startDate, setStartDate] = useState("");
    // let [endDate, setEndDate] = useState("");
    // let [minPurchase, setMinPurchase] = useState("");
    // let [maxPurchase, setMaxPurchase] = useState("");
    // let [description, setDescription] = useState("");

    let change_edit = () => {
        setisedit(!isedit);
    };

    // let handlesubmit = (event) => {
    //     event.preventDefault();
    
    //     const formData = {
    //         name,
    //         mainCategory,
    //         category,
    //         subCategory,
    //         product,
    //         offerName,
    //         code,
    //         discountPrice,
    //         price,
    //         startDate,
    //         endDate,
    //         minPurchase,
    //         maxPurchase,
    //         description,
    //     };
    
    //     console.log("Form Submitted:", formData);
    //     setisedit(false);
    // };

    // Edit Product Offer
    const location = useLocation();
    const editProductoffer = location.state?.editProductoffer;
    console.log(editProductoffer)

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
    const productofferInit = {
        mainCategory: "",
        category: "",
        subCategory: "",
        product: "",
        offerName: "",
        code: "",
        discountPrice: "",
        price: "",
        startDate: "",
        endDate: "",
        minPurchase: "",
        maxPurchase: "",
        description: "",
    }

    const productofferValidate = Yup.object().shape({
        mainCategory: Yup.string().required("Main Category is required"),
        category: Yup.string().required("Category is required"),
        subCategory: Yup.string().required("Sub Category is required"),
        product: Yup.string().required("Product is required"),
        offerName: Yup.string().required("Offer Name is required"),
        code: Yup.string().required("Code is required"),
        discountPrice: Yup.string().required("Discount Price is required"),
        price: Yup.string().required("Price is required"),
        startDate: Yup.date().required("Start Date is required"),
        endDate: Yup.date().required("End Date is required"),
        minPurchase: Yup.string().required("Min Purchase is required"),
        maxPurchase: Yup.string().required("Max Purchase is required"),
        description: Yup.string().required("Description is required"),
    });

    const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue } = useFormik({
        initialValues: productofferInit,
        validationSchema: productofferValidate,
        onsubmit: (values) => {
            console.log(values);
            // addproductoffer(values)
        }
    })
    // **************************************************************************

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
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content mb-3">
                                                <label className='mv_label_input'>Main Category</label>
                                                <Form.Select
                                                    name="mainCategory"
                                                    value={values.mainCategory}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className='mv_form_select'>
                                                    <option>Select</option>
                                                    <option value="Women">Women</option>
                                                    <option value="Men">Men</option>
                                                    <option value="Baby & Kids">Baby & Kids</option>
                                                    <option value="Beauty & Health">Beauty & Health</option>
                                                    <option value="Home & Kitchen">Home & Kitchen</option>
                                                    <option value="Mobile & Electronics">Mobile & Electronics</option>
                                                </Form.Select>
                                                {errors.mainCategory && touched.mainCategory && <div className="text-danger small">{errors.mainCategory}</div>}
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content mb-3">
                                                <label className='mv_label_input'>Category</label>
                                                <Form.Select
                                                    name="category"
                                                    value={values.category}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className='mv_form_select'>
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
                                                {errors.category && touched.category && <div className="text-danger small">{errors.category}</div>}
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content mb-3">
                                                <label className='mv_label_input'>Sub Category</label>
                                                <Form.Select
                                                    name="subCategory"
                                                    value={values.subCategory}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className='mv_form_select'>
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
                                                {errors.subCategory && touched.subCategory && <div className="text-danger small">{errors.subCategory}</div>}
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content mb-3">
                                                <label className='mv_label_input'>Product</label>
                                                <Form.Select
                                                    name="product"
                                                    value={values.product}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className='mv_form_select'>
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
                                                {errors.product && touched.product && <div className="text-danger small">{errors.product}</div>}
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content mb-3">
                                                <label className='mv_label_input'>Offer Name</label>
                                                <InputGroup className="">
                                                    <Form.Control
                                                        name="offerName"
                                                        value={values.offerName}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder="Enter Offer Name"
                                                        aria-label="name"
                                                        aria-describedby="basic-addon1"
                                                    />
                                                </InputGroup>
                                                {errors.offerName && touched.offerName && <div className="text-danger small">{errors.offerName}</div>}
                                            </div>
                                        </div>
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
                                                        aria-label="name1"
                                                        aria-describedby="basic-addon1"
                                                    />
                                                </InputGroup>
                                                {errors.code && touched.code && <div className="text-danger small">{errors.code}</div>}
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content mb-3">
                                                <label className='mv_label_input'>Discount Price</label>
                                                <InputGroup className="">
                                                    <Form.Control
                                                        name="discountPrice"
                                                        value={values.discountPrice}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder="Enter Discount Price"
                                                        aria-label="name"
                                                        aria-describedby="basic-addon1"
                                                    />
                                                </InputGroup>
                                                {errors.discountPrice && touched.discountPrice && <div className="text-danger small">{errors.discountPrice}</div>}
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content mb-3">
                                                <label className='mv_label_input'>Price</label>
                                                <InputGroup className="">
                                                    <Form.Control
                                                        name="price"
                                                        value={values.price}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder="Enter Price"
                                                        aria-label="name"
                                                        aria-describedby="basic-addon1"
                                                    />
                                                </InputGroup>
                                                {errors.price && touched.price && <div className="text-danger small">{errors.price}</div>}
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <label className='mv_offcanvas_filter_category'>Start Date</label>
                                            <div className="mv_input_content mv_add_product_date_scheduled mb-3">
                                                <label className='mv_label_input mv_add_product_date mv_filter_start_date'>{date}</label>
                                                <Form.Control 
                                                    className='' 
                                                    type="date" 
                                                    name="startDate"
                                                    value={values.startDate}
                                                    onChange={(e) => handleDateChange(e, "start")}
                                                    onBlur={handleBlur}
                                                />
                                                {errors.startDate && touched.startDate && <div className="text-danger small">{errors.startDate}</div>}
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <label className='mv_offcanvas_filter_category'>End Date</label>
                                            <div className="mv_input_content mv_add_product_date_scheduled mb-3">
                                                <label className='mv_label_input mv_add_product_date mv_filter_start_date'>{date1}</label>
                                                <Form.Control 
                                                    className='' 
                                                    type="date" 
                                                    name="endDate"
                                                    value={values.endDate}
                                                    onChange={(e) => handleDateChange(e, "end")}
                                                    onBlur={handleBlur}
                                                />
                                                {errors.endDate && touched.endDate && <div className="text-danger small">{errors.endDate}</div>}
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content mb-3">
                                                <label className='mv_label_input'>Minimum Purchase</label>
                                                <InputGroup className="">
                                                    <Form.Control
                                                        name="minPurchase"
                                                        value={values.minPurchase}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder="Minimum Purchase"
                                                        aria-label="name"
                                                        aria-describedby="basic-addon1"
                                                    />
                                                </InputGroup>
                                                {errors.minPurchase && touched.minPurchase && <div className="text-danger small">{errors.minPurchase}</div>}
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content mb-3">
                                                <label className='mv_label_input'>Maximum Purchase</label>
                                                <InputGroup className="">
                                                    <Form.Control
                                                        name="maxPurchase"
                                                        value={values.maxPurchase}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder="Maximum Purchase"
                                                        aria-label="name"
                                                        aria-describedby="basic-addon1"
                                                    />
                                                </InputGroup>
                                                {errors.maxPurchase && touched.maxPurchase && <div className="text-danger small">{errors.maxPurchase}</div>}
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="mv_input_content mb-3">
                                                <label className='mv_label_input'>Description</label>
                                                <InputGroup className="">
                                                    <Form.Control
                                                        name="description"
                                                        value={values.description}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder="Enter Description"
                                                        as="textarea" 
                                                        aria-label="With textarea"
                                                        aria-describedby="basic-addon1"
                                                    />
                                                </InputGroup>
                                                {errors.description && touched.description && <div className="text-danger small">{errors.description}</div>}
                                            </div>
                                        </div>
                                        <div className='text-center mt-5'>
                                            <div className="mv_edit_profile">
                                                <button className='border-0 bg-transparent'>
                                                    Cnacel
                                                </button>
                                                {editProductoffer === true ? 
                                                    <button type="submit" className='border-0 bg-transparent' onClick={change_edit}>
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

export default Addproductoffer;
