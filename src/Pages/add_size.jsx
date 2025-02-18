import React, { useEffect, useState, useRef } from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import '../CSS/vaidik.css';
import { useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Addsize = () => {
    // State variables
    let [isedit, setisedit] = useState(false);
    // let [mainCategory, setMainCategory] = useState("");
    // let [category, setCategory] = useState("");
    // let [subCategory, setSubCategory] = useState("");
    // let [sizeName, setSizeName] = useState("");
    // let [size, setSize] = useState("");
    // let [unit, setUnit] = useState("");

    let change_edit = () => {
        setisedit(!isedit);
    };

    // let handlesubmit = (event) => {
    //     event.preventDefault();

    //     const formData = {
    //         mainCategory,
    //         category,
    //         subCategory,
    //         sizeName,
    //         size,
    //         unit,
    //     };

    //     console.log('Form Submitted:', formData);
    //     setisedit(false);
    // };

    // Edit Size
    const location = useLocation();
    const editSize = location.state?.editSize;
    console.log(editSize)

    // ******************************* Validation *******************************
    const sizeInit = {
        mainCategory: "",
        category: "",
        subCategory: "",
        sizeName: "",
        size: "",
        unit: ""
    };
    
    const sizeValidate = Yup.object().shape({
        mainCategory: Yup.string().required("Main Category is required"),
        category: Yup.string().required("Category is required"),
        subCategory: Yup.string().required("Sub Category is required"),
        sizeName: Yup.string().required("Size Name is required"),
        size: Yup.string().required("Size is required"),
        unit: Yup.string().required("Unit is required")
    });
    
    const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: sizeInit,
        validationSchema: sizeValidate,
        onSubmit: (values) => {
            console.log(values);
            // addsize(values)
        }
    });
    // **************************************************************************

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
                                                    <option value="">Select</option>
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
                                                    <option value="">Select</option>
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
                                                    <option value="">Select</option>
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
                                                <label className='mv_label_input'>Size Name</label>
                                                <Form.Control
                                                    name="sizeName"
                                                    value={values.sizeName}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    placeholder="Enter size name"
                                                />
                                                {errors.sizeName && touched.sizeName && <div className="text-danger small">{errors.sizeName}</div>}
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content mb-3">
                                                <label className='mv_label_input'>Size</label>
                                                <Form.Control
                                                    name="size"
                                                    value={values.size}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    placeholder="Enter size"
                                                />
                                                {errors.size && touched.size && <div className="text-danger small">{errors.size}</div>}
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content mb-3">
                                                <label className='mv_label_input'>Unit</label>
                                                <Form.Select
                                                    name="unit"
                                                    value={values.unit}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className='mv_form_select'>
                                                    <option value="">Select</option>
                                                    <option value="gm">gm</option>
                                                    <option value="ltr">ltr</option>
                                                    <option value="ml">ml</option>
                                                    <option value="GB">GB</option>
                                                </Form.Select>
                                                {errors.unit && touched.unit && <div className="text-danger small">{errors.unit}</div>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='text-center mt-5'>
                                        <div className="mv_edit_profile">
                                            <button type="button" className='border-0 bg-transparent'>
                                                Cnacel
                                            </button>
                                            {editSize === true ? 
                                                <button type="submit" className='border-0 bg-transparent' onClick={change_edit}>
                                                    Update
                                                </button> : 
                                                <button type="submit" className='border-0 bg-transparent' onClick={change_edit}>
                                                    Add
                                                </button>
                                            }
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
