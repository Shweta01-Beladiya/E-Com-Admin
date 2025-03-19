import React, { useEffect, useState } from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import '../CSS/vaidik.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Addproductoffer = () => {

    const BaseUrl = process.env.REACT_APP_BASEURL;
    const token = localStorage.getItem('token');

    const navigate = useNavigate();

    // const editData = location.state?.id || null;

    const [mainCategory, setMainCategory] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [product, setProduct] = useState([]);

    // Filtered Lists
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [filteredSubCategories, setFilteredSubCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    // Edit Product Offer
    const location = useLocation();
    const id = location.state.id;
    // console.log("id>>>>>>>>>",id);

    const handleDateChange = (e, type) => {
        let selectedDate = e.target.value;

        setFieldValue(type === "start" ? "startDate" : "endDate", selectedDate);
    };

    // Select img
    let [addimg, setaddimg] = useState("");

    const [brandImagePreview, setBrandImagePreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (id && id.offerImage) {
            try {
                const filename = id.offerImage.split("\\").pop();
                setaddimg(filename.substring(filename.indexOf('-') + 1));
                setBrandImagePreview(`${BaseUrl}/${id.offerImage}`);
            } catch (error) {
                console.error("Error processing offerImg:", error);
                setaddimg("");
                setBrandImagePreview(null);
            }
        }
    }, [id, BaseUrl]);

    // ******************************* Validation *******************************
    const [initialValues, setInitialValues] = useState({
        mainCategoryId: "",
        categoryId: "",
        subCategoryId: "",
        productId: "",
        offerName: "",
        offerImage: "",
        code: "",
        discountPrice: "",
        price: "",
        startDate: "",
        endDate: "",
        minimumPurchase: "",
        maximumPurchase: "",
        description: "",
    })

    const productofferValidate = Yup.object().shape({
        mainCategoryId: Yup.string().required("Main Category is required"),
        categoryId: Yup.string().required("Category is required"),
        subCategoryId: Yup.string().required("Sub Category is required"),
        productId: Yup.string().required("Product is required"),
        offerName: Yup.string().required("Offer Name is required"),
        offerImage: id ? Yup.mixed().optional() : Yup.mixed().required("Image is required"),
        code: Yup.string().required("Code is required"),
        discountPrice: Yup.string().required("Discount Price is required"),
        price: Yup.string().required("Price is required"),
        startDate: Yup.date().required("Start Date is required"),
        endDate: Yup.date().required("End Date is required"),
        minimumPurchase: Yup.string().required("Min Purchase is required"),
        maximumPurchase: Yup.string().required("Max Purchase is required"),
        description: Yup.string().required("Description is required"),
    });

    const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: productofferValidate,
        enableReinitialize: true,
        onSubmit: async (values) => {
            let formattedValues = {
                ...values,
                startDate: values.startDate.split("-").reverse().join("-"), // Convert yyyy-mm-dd to dd-mm-yyyy
                endDate: values.endDate.split("-").reverse().join("-"),
            };

        
            try {
                const formData = new FormData();
                if (values.offerImage) {
                    formData.append("offerImage", values.offerImage);
                }
                console.log("values.offerImage",values.offerImage);
                let response;
                
                if (id) {
                    response = await axios.put(`${BaseUrl}/api/updateProductOffer/${id._id}`, formattedValues, {
                        headers: { Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data"
                        },
                    });
                } else {
                    response = await axios.post(`${BaseUrl}/api/createProductOffer`, formattedValues, {
                        headers: { Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data"
                        }
                    });
                }
                console.log("response",response.data);
                if (response.data.status === 200 || response.data.status === 201) {
                    navigate('/Productoffer', { 
                        state: { 
                            formSubmitted: true,
                            currentPage: location.state?.currentPage || 1 
                        } 
                    });
                }
            } catch (error) {
                console.error('Data operation error:', error);
            }
        }
    })
    // **************************************************************************
    const fetchMainCategory = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/api/allMainCategory`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // console.log("reposne",response.data.users);
            setMainCategory(response.data.users);
        } catch (error) {
            console.error('Data Fetching Error:', error);
        }
    }

    const fetchCategory = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/api/allCategory`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // console.log("reposne",response.data.category);
            setCategory(response.data.category);
        } catch (error) {
            console.error('Data Fetching Error:', error);
        }
    }

    const fetchSubCategory = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/api/allSubCategory`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // console.log("fetchsubcategory",response.data.subCategory);
            setSubCategory(response.data.subCategory);
        } catch (error) {
            console.error('Data Fetching Error:', error);
        }
    }

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/api/allProduct`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // console.log("repsone",response.data.product);
            setProduct(response.data.product);

        } catch (error) {
            console.error('Data Fetching Error:', error);
        }
    }
    useEffect(() => {
        fetchMainCategory();
        fetchCategory();
        fetchSubCategory();
        fetchProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const fetchSingleData = async () => {
            if (id) {
                try {
                    const response = await axios.get(`${BaseUrl}/api/getProductOffer/${id._id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    console.log("repsonse",response.data.productOffer[0].offerImage);
                    const data = response.data.productOffer;
                    // console.log("data",data[0].startDate);

                    const formatDateForInput = (date) => {
                        if (!date) return "";
                        const [day, month, year] = date.split("-");
                        return `${year}-${month}-${day}`;
                    };
                    setInitialValues({
                        mainCategoryId: data[0].mainCategoryId,
                        categoryId: data[0].categoryId,
                        subCategoryId: data[0].subCategoryId,
                        productId: data[0].productId,
                        offerName: data[0].offerName,
                        offerImage: data[0].offerImage,
                        code: data[0].code,
                        discountPrice: data[0].discountPrice,
                        price: data[0].price,
                        startDate: formatDateForInput(data[0].startDate),
                        endDate: formatDateForInput(data[0].endDate),
                        minimumPurchase: data[0].minimumPurchase,
                        maximumPurchase: data[0].maximumPurchase,
                        description: data[0].description,
                    });
                } catch (error) {
                    console.error('Data Fetching Error:', error);
                }
            } else {
                setInitialValues({
                    mainCategoryId: "",
                    categoryId: "",
                    subCategoryId: "",
                    productId: "",
                    offerName: "",
                    offerImage: "",
                    code: "",
                    discountPrice: "",
                    price: "",
                    startDate: "",
                    endDate: "",
                    minimumPurchase: "",
                    maximumPurchase: "",
                    description: "",
                });
            }
        }
        fetchSingleData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (values.mainCategoryId) {
            const filtered = category.filter(cat => cat.mainCategoryId === values.mainCategoryId);
            setFilteredCategories(filtered);

            if (!filtered.some(cat => cat._id === values.categoryId)) {
                setFieldValue("categoryId", "");
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values.mainCategoryId, category]);

    useEffect(() => {
        if (values.categoryId && subCategory.length > 0) {
            const filtered = subCategory.filter(subCat => subCat.categoryId === values.categoryId);
            setFilteredSubCategories(filtered);
        }
    }, [values.categoryId, subCategory]);
    
    useEffect(() => {
        if (values.subCategoryId && product.length > 0) {
            const filtered = product.filter(pro => pro.subCategoryId === values.subCategoryId);
            setFilteredProducts(filtered);
        }
    }, [values.subCategoryId, product]);

    const handlenavigate = () => {
        navigate('/Productoffer');
    }

    return (
        <>
            <div>
                <div className="mv_main_heading mb-4 d-flex align-items-center justify-content-between">
                    <div>
                        <p className='mb-1'>{id ? 'Edit Product Offer' : 'Add Product Offer'}</p>
                        <div className='d-flex align-items-center'>
                            <p className='mv_dashboard_heading mb-0'>Dashboard /</p>
                            <p className='mv_category_heading mv_subcategory_heading mb-0'>
                                {id ? 'Edit Product Offer' : 'Add Product Offer'}
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
                                                    <option value="">Select</option>
                                                    {mainCategory.map((mainCat) => (
                                                        <option value={mainCat._id} key={mainCat._id}>{mainCat.mainCategoryName}</option>
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
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className='mv_form_select'>
                                                    <option value="">Select</option>
                                                    {filteredCategories.map((cat) => (
                                                        <option value={cat._id} key={cat._id}>{cat.categoryName}</option>
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
                                                    <option value="">Select</option>
                                                    {filteredSubCategories.map((subCat) => (
                                                        <option value={subCat._id} key={subCat._id}>{subCat.subCategoryName}</option>
                                                    ))}
                                                </Form.Select>
                                                {errors.subCategoryId && touched.subCategoryId && <div className="text-danger small">{errors.subCategoryId}</div>}
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content mb-3">
                                                <label className='mv_label_input'>Product</label>
                                                <Form.Select
                                                    name="productId"
                                                    value={values.productId}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className='mv_form_select'>
                                                    <option value="">Select</option>
                                                    {filteredProducts.map((pro) => (
                                                        <option value={pro._id} key={pro._id}>{pro.productName}</option>
                                                    ))}
                                                </Form.Select>
                                                {errors.productId && touched.productId && <div className="text-danger small">{errors.productId}</div>}
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
                                                                            src={brandImagePreview || `${BaseUrl}/${id?.offerImage}`}
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
                                                                            setFieldValue("offerImage", "");
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
                                                                        setFieldValue("offerImage", file);
                                                                        setBrandImagePreview(URL.createObjectURL(file));
                                                                    }
                                                                }}
                                                            />
                                                        </label>
                                                    </div>
                                                </div>
                                                {errors.offerImage && touched.offerImage &&
                                                    <div className="text-danger small">{errors.offerImage}</div>
                                                }
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
                                                    />
                                                </InputGroup>
                                                {errors.price && touched.price && <div className="text-danger small">{errors.price}</div>}
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <label className='mv_offcanvas_filter_category'>Start Date</label>
                                            <div className="mv_input_content mv_add_product_date_scheduled mb-3">
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
                                                        name="minimumPurchase"
                                                        value={values.minimumPurchase}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder="Minimum Purchase"
                                                    />
                                                </InputGroup>
                                                {errors.minimumPurchase && touched.minimumPurchase && <div className="text-danger small">{errors.minimumPurchase}</div>}
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content mb-3">
                                                <label className='mv_label_input'>Maximum Purchase</label>
                                                <InputGroup className="">
                                                    <Form.Control
                                                        name="maximumPurchase"
                                                        value={values.maximumPurchase}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder="Maximum Purchase"
                                                    />
                                                </InputGroup>
                                                {errors.maximumPurchase && touched.maximumPurchase && <div className="text-danger small">{errors.maximumPurchase}</div>}
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
                                                    />
                                                </InputGroup>
                                                {errors.description && touched.description && <div className="text-danger small">{errors.description}</div>}
                                            </div>
                                        </div>
                                        <div className='text-center mt-5'>
                                            <div className="mv_edit_profile">
                                                <button className='border-0 bg-transparent' onClick={handlenavigate}>
                                                    Cancel
                                                </button>
                                                {id ?
                                                    <button type="submit" className='border-0 bg-transparent'>
                                                        Update
                                                    </button> :
                                                    <button type="submit" className='border-0 bg-transparent' >
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
