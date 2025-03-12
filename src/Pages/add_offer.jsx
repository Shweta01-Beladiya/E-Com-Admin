import React, { useEffect, useState } from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import '../CSS/vaidik.css';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';

const Addoffer = () => {

    const BaseUrl = process.env.REACT_APP_BASEURL;
    const token = localStorage.getItem('token');

    const navigate = useNavigate();
    const location = useLocation();

    const editData = location.state?.offerData || null;

    // State variables
    let [isedit, setisedit] = useState(false);

    let change_edit = () => {
        setisedit(!isedit);
    };

    // Select img
    let [addimg, setaddimg] = useState("");

    const [brandImagePreview, setBrandImagePreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (editData && editData.offerImage) {
            try {
                const filename = editData.offerImage.split("\\").pop();
                setaddimg(filename.substring(filename.indexOf('-') + 1));
                setBrandImagePreview(`${BaseUrl}/${editData.offerImage}`);
            } catch (error) {
                console.error("Error processing offerImg:", error);
                setaddimg("");
                setBrandImagePreview(null);
            }
        }
    }, [editData, BaseUrl]);

    // Date function
    let [date, setDate] = useState('Select Date');
    let [date1, setDate1] = useState('Select Date');

    const handleDateChange = (e, dateType) => {
        const selectedDate = e.target.value;
        const [year, month, day] = selectedDate.split("-");
        const formattedDate = `${day}-${month}-${year}`;

        if (dateType === 'start') {
            setDate(formattedDate); // For UI display
            setFieldValue("startDate", selectedDate)
        } else if (dateType === 'end') {
            setDate1(formattedDate); // For UI display
            setFieldValue("endDate", selectedDate);
        }
    };

    // ******************************* Validation *******************************
    const addofferInit = {
        mainCategoryId: editData?.mainCategoryId || "",
        categoryId: editData?.categoryId || "",
        subCategoryId: editData?.subCategoryId || "",
        offerType: editData?.offerType || "",
        offerName: editData?.offerName || "",
        addpopularbrandimage: "",
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
        addpopularbrandimage: editData ? Yup.mixed().optional() : Yup.mixed().required("Image is required"),
        buttonText: Yup.string().required("Button Text is required"),
        startDate: Yup.string().required("Start Date is required"),
        endDate: Yup.string().required("End Date is required"),
        description: Yup.string().required("Description is required"),
    });

    const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue } = useFormik({
        initialValues: addofferInit,
        validationSchema: addofferValidate,
        onSubmit: async (values) => {
            setIsSubmitting(true);

            try {
                const formData = new FormData();
                formData.append("mainCategoryId", values.mainCategoryId);
                formData.append("categoryId", values.categoryId);
                formData.append("subCategoryId", values.subCategoryId);
                formData.append("offerType", values.offerType);
                formData.append("offerName", values.offerName);
                if (values.addpopularbrandimage) {
                    formData.append("offerImage", values.addpopularbrandimage);
                }
                formData.append("buttonText", values.buttonText);
                formData.append("startDate", values.startDate);
                formData.append("endDate", values.endDate);
                formData.append("description", values.description);

                let response;
                //************************************** Edit and Add **************************************
                if (editData) {
                    response = await axios.put(`${BaseUrl}/api/updateOffer/${editData._id}`, formData, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data"
                        }
                    });
                } else {
                    response = await axios.post(`${BaseUrl}/api/createOffer`, formData, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data"
                        }
                    });
                }

                if (response.data.status === 200 || response.data.status === 201) {
                    // Call the success callback provided by parent component
                    navigate('/offer', { 
                        state: { 
                            formSubmitted: true,
                            currentPage: location.state?.currentPage || 1 
                        } 
                    });
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Error submitting form. Please try again.");
            } finally {
                setIsSubmitting(false);
            }
        }
    });

    const handleNavigateBack = () => {
        navigate('/offer');
    }

    const [mainCategory, setMainCategory] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategories, setsubCategories] = useState([]);
    const [selectedCategories, setselectedCategories] = useState([]);
    const [selectedSubCategories, setselectedSubCategories] = useState([]);


    const fetchMainCategory = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/api/allMainCategory`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // console.log("response", response.data.users);
            setMainCategory(response.data.users);
        } catch (error) {
            console.error('Data fetching Error:', error);
        }
    }
    const fetchCategory = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/api/allCategory`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // console.log("response", response.data.category);
            setCategories(response.data.category);
        } catch (error) {
            console.error('Data fetching Error:', error);
        }
    }
    const fetchsubCategory = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/api/allSubCategory`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // console.log("response", response.data);
            setsubCategories(response.data.subCategory);
        } catch (error) {
            console.error('Data fetching Error:', error);
        }
    }
    function mCategory(value) {
        var fliter = categories.filter(item => item.mainCategoryId === value)
        console.log('f', fliter);
        setselectedCategories(fliter)
    }
    function sCategory(value) {
        console.log('sub', subcategories);
        var fliter = subcategories.filter(item => item.categoryId === value)
        console.log('f123', fliter);
        setselectedSubCategories(fliter)
    }
    useEffect(() => {
        fetchMainCategory();
        fetchCategory();
        fetchsubCategory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Set initial selected categories and subcategories when editData is loaded
    useEffect(() => {
        if (editData && editData.mainCategoryId) {
            mCategory(editData.mainCategoryId);
        }
        if (editData && editData.categoryId) {
            sCategory(editData.categoryId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editData, categories, subcategories]);
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
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                        mCategory(e.target.value);
                                                    }}
                                                    onBlur={handleBlur}
                                                    className='mv_form_select'>
                                                    <option value="">Select</option>
                                                    {mainCategory.map(cat => (
                                                        <option key={cat._id} value={cat._id}>
                                                            {cat.mainCategoryName}
                                                        </option>
                                                    ))}
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
                                                    onChange={(e) => {
                                                        handleChange(e);  // ✅ Correctly pass the event
                                                        sCategory(e.target.value);  // ✅ Get updated value from the event
                                                    }}
                                                    onBlur={handleBlur}
                                                    className='mv_form_select'>
                                                    <option>Select</option>
                                                    {selectedCategories.map(cat => (
                                                        <option key={cat._id} value={cat._id}>
                                                            {cat.categoryName}
                                                        </option>
                                                    ))}
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
                                                    {selectedSubCategories.map(cat => (
                                                        <option key={cat._id} value={cat._id}>
                                                            {cat.subCategoryName}
                                                        </option>
                                                    ))}
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
                                                <div className="position-relative">
                                                    <div className="mv_img_border w-100 p-1 d-flex align-items-center justify-content-between">
                                                        <div className="d-flex align-items-center p-1" style={{backgroundColor: addimg ? '#EAEAEA' :'transparent', width:'25%'}}>
                                                            {addimg && (
                                                                <>
                                                                    <div className="me-2" style={{ width: '24px', height: '24px', overflow: 'hidden' }}>
                                                                        <img
                                                                            src={brandImagePreview || `${BaseUrl}/${editData?.offerImage}`}
                                                                            alt="Preview"
                                                                            style={{ width: '100%' }}
                                                                        />
                                                                    </div>
                                                                    <span className='text-truncate' style={{width:'100%'}}>{addimg}</span>
                                                                    <button
                                                                        type="button"
                                                                        className="btn text-danger p-0 ms-2"
                                                                        style={{ fontSize: '1.50rem', lineHeight: .5 }}
                                                                        onClick={() => {
                                                                            setaddimg("");
                                                                            setBrandImagePreview(null);
                                                                            setFieldValue("addpopularbrandimage", "");
                                                                        }}
                                                                    >
                                                                        ×
                                                                    </button>
                                                                </>
                                                            )}
                                                            {!addimg && (
                                                                <span className="text-muted ">Choose Image</span>
                                                            )}
                                                        </div>
                                                        <label className="btn" style={{
                                                            backgroundColor: '#3A2C2C',
                                                            color: 'white',
                                                            borderRadius: '4px',
                                                            padding: '3px 16px',
                                                            marginLeft: '8px',
                                                            cursor: 'pointer',
                                                            fontSize:'12px'
                                                        }}>
                                                            Browse
                                                            <input
                                                                type="file"
                                                                hidden
                                                                accept="image/jpeg, image/png, image/jpg"
                                                                onChange={(e) => {
                                                                    const file = e.currentTarget.files[0];
                                                                    if (file) {
                                                                        setaddimg(file.name);
                                                                        setFieldValue("addpopularbrandimage", file);
                                                                        setBrandImagePreview(URL.createObjectURL(file));
                                                                    }
                                                                }}
                                                            />
                                                        </label>
                                                    </div>
                                                </div>
                                                {errors.addpopularbrandimage && touched.addpopularbrandimage &&
                                                    <div className="text-danger small">{errors.addpopularbrandimage}</div>
                                                }
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
                                                {
                                                    values.startDate ? null :
                                                        <label className='mv_label_input mv_add_product_date mv_filter_start_date'>{date}</label>
                                                }
                                                <Form.Control
                                                    className=""
                                                    type="date"
                                                    name="startDate"
                                                    placeholder='hello'
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
                                                {
                                                    values.endDate ? null :
                                                        <label className='mv_label_input mv_add_product_date mv_filter_start_date'>{date1}</label>
                                                }
                                                <Form.Control
                                                    className=""
                                                    type="date"
                                                    name="endDate"
                                                    value={values.endDate}
                                                    onChange={(e) => handleDateChange(e, "end")}
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
                                                <button onClick={handleNavigateBack} className='border-0 bg-transparent'>
                                                    Cancel
                                                </button>
                                                {editData ?
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
