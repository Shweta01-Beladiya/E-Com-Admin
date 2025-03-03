import React, { useEffect, useState, useRef } from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import '../CSS/vaidik.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

const Addoffer = ({ editData }) => {

    const BaseUrl = process.env.REACT_APP_BASEURL;
    const token = localStorage.getItem('token');
    const navigate = useNavigate()
    const [toggle, setToggle] = useState(false)

    // State variables
    let [isedit, setisedit] = useState(false);
    // let [name, setname] = useState('');
    // let [mainCategory, setMainCategory] = useState("");
    // let [category, setCategory] = useState("");
    // let [subCategory, setSubCategory] = useState("");
    // let [offerType, setOfferType] = useState("");
    // let [offerName, setOfferName] = useState("");
    // let [buttonText, setButtonText] = useState("");
    // let [startDate, setStartDate] = useState("");
    // let [endDate, setEndDate] = useState("");
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
    //         offerType,
    //         offerName,
    //         buttonText,
    //         startDate,
    //         endDate,
    //         description,
    //     };
    
    //     console.log("Form Submitted:", formData);
    //     setisedit(false);
    // };

    // Edit Offer
    const location = useLocation();
    const editOffer = location.state?.editOffer;
    console.log(editOffer)

    // Select img
    let [addimg, setaddimg] = useState("");

    const [brandImagePreview, setBrandImagePreview] = useState(null);

    useEffect(() => {
        if (editData) {
            const filename = editData.offerImg.split("\\").pop();
            setaddimg(filename.substring(filename.indexOf('-') + 1));
            setBrandImagePreview(`${BaseUrl}/${editData.offerImg}`);
        }
    }, [editData]);

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

    // ******************************* Validation *******************************
    const addofferInit = {
        mainCategoryId:  editData?.mainCategoryId || "",
        categoryId:  editData?.categoryId || "",
        subCategoryId: editData?.subCategoryId || "",
        offerType: editData?.offerType || "",
        offerName: editData?.offerName || "",
        offerImage: "",
        buttonText: editData?.buttonText || "",
        startDate: editData?.startDate || "",
        endDate: editData?.endDate || "",
        description: editData?.description || "",
    }

    const addofferValidate = Yup.object().shape({
        mainCategoryId: Yup.string().required("Main Category is required"),
        categoryId: Yup.string().required("Category is required"),
        subCategoryId: Yup.string().required("Sub Category is required"),
        offerType: Yup.string().required("Product is required"),
        offerName: Yup.string().required("Offer Name is required"),
        offerImage: editData ? Yup.mixed().optional() : Yup.mixed().required("Image is required"),
        buttonText: Yup.string().required("Discount Price is required"),
        startDate: Yup.string().required("Start Date is required"),
        endDate: Yup.string().required("End Date is required"),
        description: Yup.string().required("Description is required"),
    });

    const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue } = useFormik({
        initialValues: addofferInit,
        validationSchema: addofferValidate,
        onsubmit: async (values) => {
            console.log(values);
            // addproductoffer(values)

            const formData = new FormData();
            formData.append("mainCategoryId", values.mainCategoryId);
            formData.append("categoryId", values.categoryId);
            formData.append("subCategoryId", values.subCategoryId);
            formData.append("offerType", values.offerType);
            formData.append("offerName", values.offerName);
            if (values.offerImage) {
                formData.append("offerImage", values.offerImage);
            }
            formData.append("buttonText", values.buttonText);
            formData.append("startDate", values.startDate);
            formData.append("endDate", values.endDate);
            formData.append("description", values.description);

            //************************************** Edit and Add **************************************
            if (editData) {
                try {
                    const response = await axios.put(`${BaseUrl}/api/updateOffer/${editData._id}`, formData, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data"
                        }
                    });
                    console.log("Response:", response?.data);

                    window.location.href = "./offer"
                    // navigate("/offer")

                } catch (error) {
                    console.error("Error:", error);
                    alert("Error submitting form. Please try again.");
                }
            }
            else {
                try {
                    const response = await axios.post(`${BaseUrl}/api/createOffer`, formData, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data"
                        }
                    });
                    console.log("Response:", response?.data);

                    window.location.href = "./offer"
                    // navigate("/offer")

                } catch (error) {
                    console.error("Error:", error);
                    alert("Error submitting form. Please try again.");
                }
            }
        }
    })
    // **************************************************************************

    return (
        <>
            <div>
                <div className="mv_main_heading mb-4 d-flex align-items-center justify-content-between">
                    <div>
                        <p className='mb-1'>{editData ? 'Edit Offer' : 'Add Offer'}</p>
                        <div className='d-flex align-items-center'>
                            <p className='mv_dashboard_heading mb-0'>Dashboard /</p>
                            <p className='mv_category_heading mv_subcategory_heading mb-0'>
                                {editData ? 'Edit Offer' : 'Add Offer'}
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
                                                    name="mainCategoryId"
                                                    value={values.mainCategoryId}
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
                                                {errors.mainCategoryId && touched.mainCategoryId && <div className="text-danger small">{errors.mainCategoryId}</div>}
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content mb-3">
                                                <label className='mv_label_input'>Category</label>
                                                <Form.Select
                                                    name="categoryId"
                                                    value={values.categoryId}
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
                                                {errors.categoryId && touched.categoryId && <div className="text-danger small">{errors.categoryId}</div>}
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content mb-3">
                                                <label className='mv_label_input'>Sub Category</label>
                                                <Form.Select
                                                    name="subCategoryId"
                                                    value={values.subCategoryId}
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
                                                {errors.subCategoryId && touched.subCategoryId && <div className="text-danger small">{errors.subCategoryId}</div>}
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content mb-3">
                                                <label className='mv_label_input'>Offer Type</label>
                                                <InputGroup className="">
                                                    <Form.Control
                                                        name="offerType"
                                                        value={values.offerType}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder="Enter Offer Type"
                                                        aria-label="name"
                                                        aria-describedby="basic-addon1"
                                                    />
                                                </InputGroup>
                                                {errors.offerType && touched.offerType && <div className="text-danger small">{errors.offerType}</div>}
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
                                                <label className='mv_label_input'>Image</label>
                                                <InputGroup className="">
                                                    <Form.Control
                                                        placeholder="Choose Image"
                                                        aria-label=""
                                                        readOnly
                                                        value={addimg}
                                                        name="offerImage"
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
                                                                    setFieldValue("offerImage", file);
                                                                    setBrandImagePreview(URL.createObjectURL(file));
                                                                }
                                                                setToggle(true)
                                                            }}
                                                        />
                                                    </label>
                                                </InputGroup>
                                                {errors.offerImage && touched.offerImage && <div className="text-danger small">{errors.offerImage}</div>}
                                                {brandImagePreview && (
                                                    <div className="mt-2">
                                                        <img
                                                            className='mv_update_img'
                                                            src={brandImagePreview}
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
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content mb-3">
                                                <label className='mv_label_input'>Button Text</label>
                                                <InputGroup className="">
                                                    <Form.Control
                                                        name="buttonText"
                                                        value={values.buttonText}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder="Enter Button Text"
                                                        aria-label="name"
                                                        aria-describedby="basic-addon1"
                                                    />
                                                </InputGroup>
                                                {errors.buttonText && touched.buttonText && <div className="text-danger small">{errors.buttonText}</div>}
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <label className='mv_offcanvas_filter_category'>Start Date</label>
                                            <div className="mv_input_content mv_add_product_date_scheduled mb-3">
                                                <label className='mv_label_input mv_add_product_date mv_filter_start_date'>{date}</label>
                                                <Form.Control className='' type="date" 
                                                    name="startDate"
                                                    value={values.startDate}
                                                    // onChange={handleChange}
                                                    onChange={(e) => handleDateChange(e, 'start')} 
                                                    onBlur={handleBlur}
                                                 />
                                                 {errors.startDate && touched.startDate && <div className="text-danger small">{errors.startDate}</div>}
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <label className='mv_offcanvas_filter_category'>End Date</label>
                                            <div className="mv_input_content mv_add_product_date_scheduled mb-3">
                                                <label className='mv_label_input mv_add_product_date mv_filter_start_date'>{date1}</label>
                                                <Form.Control className='' type="date" 
                                                    name="endDate"
                                                    value={values.endDate}
                                                    // onChange={handleChange}
                                                    onChange={(e) => handleDateChange(e, 'end')} 
                                                    onBlur={handleBlur}
                                                />
                                                {errors.endDate && touched.endDate && <div className="text-danger small">{errors.endDate}</div>}
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
                                                <button onClick={() => window.location.href = "/offer"} className='border-0 bg-transparent'>
                                                    Cnacel
                                                </button>
                                                {editData?
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

export default Addoffer;
