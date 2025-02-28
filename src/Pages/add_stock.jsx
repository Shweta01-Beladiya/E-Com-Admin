import React, { useEffect, useState } from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import '../CSS/vaidik.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Addstock = () => {

    const BaseUrl = process.env.REACT_APP_BASEURL;
    const token = localStorage.getItem('token');

    const navigate = useNavigate();

    const [mainCategory, setMainCategory] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [product, setProduct] = useState([]);

    // Filtered Lists
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [filteredSubCategories, setFilteredSubCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    // State variables
    let [isedit, setisedit] = useState(false);


    let change_edit = () => {
        setisedit(!isedit);
    };

    // Edit Stock
    const location = useLocation();
    const id = location.state?.id;


    // ******************************* Validation *******************************
      const [initialValues, setInitialValues] = useState({
        mainCategoryId: "",
        categoryId: "",
        subCategoryId: "",
        productId: "",
        stockStatus: "",
        quantity: "",
    })

    const stockValidate = Yup.object().shape({
        mainCategoryId: Yup.string().required("Main Category is required"),
        categoryId: Yup.string().required("Category is required"),
        subCategoryId: Yup.string().required("Sub Category is required"),
        productId: Yup.string().required("Product is required"),
        stockStatus: Yup.string().required("Stock Status is required"),
        quantity: Yup.number().required("Quantity is required"),
    });

    const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: stockValidate,
        enableReinitialize: true, 
        onSubmit: async (values) => {
            // console.log(values);
            // addstock(values)
            if (id) {
                const response = await axios.put(`${BaseUrl}/api/updateStock/${id}`, values, {
                    headers: {Authorization: `Bearer ${token}`}
                });
                // console.log("response",response.data);
                if(response.data.status === 200) {
                    navigate('/stock');
                }
            } else {
                try {
                    const response = await axios.post(`${BaseUrl}/api/createStock`, values, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    // console.log("Response", response.data);
                    if (response.data.status === 201) {
                        navigate('/stock');
                    }
                } catch (error) {
                    console.error('Data Fetching Error:', error)
                }
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
        const fetchSingleData = async() => {
           if(id) {
            try {
                const response = await axios.get(`${BaseUrl}/api/getStock/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // console.log("response",response.data.stock);
               const stockData = response.data.stock;
               
               setInitialValues({
                mainCategoryId: stockData.mainCategoryId,
                categoryId:stockData.categoryId,
                subCategoryId:stockData.subCategoryId,
                productId: stockData.productId,
                stockStatus: stockData.stockStatus,
                quantity: stockData.quantity
               });
            } catch (error) {
                console.error('Data fetching error:', error);
            }
           } else {
                setInitialValues({
                    mainCategoryId: "",
                    categoryId: "",
                    subCategoryId: "",
                    productId: "",
                    stockStatus: "",
                    quantity: ""
                })
           }
        }
        fetchSingleData();
    },[id]);

    useEffect(() => {
        fetchMainCategory();
        fetchCategory();
        fetchSubCategory();
        fetchProduct();
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
    }, [values.mainCategoryId, category]);
    
    useEffect(() => {
        if (values.categoryId) {
            const filtered = subCategory.filter(subCat => subCat.categoryId === values.categoryId);
            setFilteredSubCategories(filtered);
    
            if (!filtered.some(subCat => subCat._id === values.subCategoryId)) {
                setFieldValue("subCategoryId", ""); 
            }
        }
    }, [values.categoryId, subCategory]);
    
    useEffect(() => {
        if (values.subCategoryId) {
            const filtered = product.filter(pro => pro.subCategoryId === values.subCategoryId);
            setFilteredProducts(filtered);
    
            if (!filtered.some(pro => pro._id === values.productId)) {
                setFieldValue("productId", ""); 
            }
        }
    }, [values.subCategoryId, product]);    

    
    return (
        <>
            <div>
                <div className="mv_main_heading mb-4 d-flex align-items-center justify-content-between">
                    <div>
                        <p className='mb-1'>{id ? 'Edit Stock' : 'Add Stock'}</p>
                        <div className='d-flex align-items-center'>
                            <p className='mv_dashboard_heading mb-0'>Dashboard /</p>
                            <p className='mv_category_heading mv_subcategory_heading mb-0'>
                                {id ? 'Edit Stock' : 'Add Stock'}
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
                                                    <option>Select</option>
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
                                                    <option>Select</option>
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
                                                <label className='mv_label_input'>Stock Status</label>
                                                <Form.Select
                                                    name="stockStatus"
                                                    value={values.stockStatus}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className='mv_form_select'>
                                                    <option value="">Select</option>
                                                    <option value="In Stock">In Stock</option>
                                                    <option value="Out Of Stock">Out of Stock</option>
                                                    <option value="Low Stock">Low Stock</option>
                                                </Form.Select>
                                                {errors.stockStatus && touched.stockStatus && <div className="text-danger small">{errors.stockStatus}</div>}
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content mb-3">
                                                <label className='mv_label_input'>Quantity</label>
                                                <InputGroup className="">
                                                    <Form.Control
                                                        name="quantity"
                                                        value={values.quantity}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder="Enter qty."
                                                        aria-label="name"
                                                        aria-describedby="basic-addon1"
                                                    />
                                                </InputGroup>
                                                {errors.quantity && touched.quantity && <div className="text-danger small">{errors.quantity}</div>}
                                            </div>
                                        </div>
                                        <div className='text-center mt-5'>
                                            <div className="mv_edit_profile">
                                                <button className='border-0 bg-transparent'>
                                                    Cancel
                                                </button>
                                                {id ?
                                                    <button type="submit" className='border-0 bg-transparent' >
                                                        Update
                                                    </button> :
                                                    <button type="submit" className='border-0 bg-transparent'>
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
