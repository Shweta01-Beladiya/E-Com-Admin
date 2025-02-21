import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import '../CSS/vaidik.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Addsize = () => {

    const BaseUrl = process.env.REACT_APP_BASEURL;
    const token = localStorage.getItem('token');

    const navigate = useNavigate();

    // State variables
    let [isedit, setisedit] = useState(false);
    const [unit, setUnit] = useState([]);
    const [mainCategory, setMainCategory] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [allSubCategories, setAllSubCategories] = useState([]);
    const [filteredSubCategories, setFilteredSubCategories] = useState([]);

    let change_edit = () => {
        setisedit(!isedit);
    };

    // Edit Size
    const location = useLocation();
    const id = location.state?.id;

    // console.log("location",location.state);
    // console.log(id);

    // ******************************* Validation *******************************
    const sizeInit = {
        mainCategory: "",
        categoryId: "",
        subCategoryId: "",
        sizeName: "",
        size: "",
        unit: ""
    };

    const sizeValidate = Yup.object().shape({
        mainCategory: Yup.string().required("Main Category is required"),
        categoryId: Yup.string().required("Category is required"),
        subCategoryId: Yup.string().required("Sub Category is required"),
        sizeName: Yup.string().required("Size Name is required"),
        size: Yup.string().required("Size is required"),
        unit: Yup.string().required("Unit is required")
    });

    const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue } = useFormik({
        initialValues: sizeInit,
        validationSchema: sizeValidate,
        onSubmit: async (values) => {
            let response;

            if (id) {
                response = await axios.put(`${BaseUrl}/api/updateSize/${id}`, values, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                response = await axios.post(`${BaseUrl}/api/createSize`, values, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }

            if (response.data.status === 200 || response.data.status === 201) {
                navigate('/size');
            }
        }
    });

    // Custom handler for main category change
    const handleMainCategoryChange = (e) => {
        const mainCatId = e.target.value;
        setFieldValue("mainCategory", mainCatId);
        setFieldValue("categoryId", "");
        setFieldValue("subCategoryId", "");

        // Filter categories based on selected main category
        if (mainCatId) {
            const relatedCategories = allCategories.filter(cat => cat.mainCategoryId === mainCatId);
            setFilteredCategories(relatedCategories);
        } else {
            setFilteredCategories([]);
        }

        // Reset sub-categories when main category changes
        setFilteredSubCategories([]);
    };

    // Custom handler for category change
    const handleCategoryChange = (e) => {
        const catId = e.target.value;
        setFieldValue("categoryId", catId);
        setFieldValue("subCategoryId", "");

        // Filter sub-categories based on selected category
        if (catId) {
            const relatedSubCategories = allSubCategories.filter(subCat => subCat.categoryId === catId);
            setFilteredSubCategories(relatedSubCategories);
        } else {
            setFilteredSubCategories([]);
        }
    };

    const fetchMainCategory = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/api/allMainCategory`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // console.log("response", response.data.users);
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
            // console.log("categoryRe", response.data.category);
            setAllCategories(response.data.category);
        } catch (error) {
            console.error('Data Fetching Error:', error);
        }
    }

    const fetchSubCategory = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/api/allSubCategory`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // console.log("subcategoryRe", response.data.subCategory);
            setAllSubCategories(response.data.subCategory);
        } catch (error) {
            console.error('Data Fetching Error:', error);
        }
    }

    const fetchUnit = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/api/allUnits`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // console.log("response>>>>>>>>>",response.data.unit);
            setUnit(response.data.unit);
        } catch (error) {
            console.error('Data Fetching Error:', error);
        }
    }

    const fetchSingleData = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/api/getSizeData/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // console.log("Resposnse",response.data.size);

            const sizeData = response.data.size[0];

            setFieldValue("mainCategory", sizeData.mainCategory);
            setFieldValue("categoryId", sizeData.categoryId);
            setFieldValue("subCategoryId", sizeData.subCategoryId);
            setFieldValue("sizeName", sizeData.sizeName);
            setFieldValue("size", sizeData.size);
            setFieldValue("unit", sizeData.unit);
        } catch (error) {
            console.error('Data Fetching Error:', error);
        }
    }
    useEffect(() => {
        fetchMainCategory();
        fetchCategory();
        fetchSubCategory();
        fetchUnit();
        if (id) {
            fetchSingleData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [BaseUrl, token]);


    useEffect(() => {
        if (id && allCategories.length > 0 && allSubCategories.length > 0 && values.mainCategory) {
            const relatedCategories = allCategories.filter(cat => cat.mainCategoryId === values.mainCategory);
            setFilteredCategories(relatedCategories);
            
            if (values.categoryId) {
                const relatedSubCategories = allSubCategories.filter(subCat => subCat.categoryId === values.categoryId);
                setFilteredSubCategories(relatedSubCategories);
            }
        }
    }, [allCategories, allSubCategories, id, values.mainCategory, values.categoryId]);

    return (
        <>
            <div>
                <div className="mv_main_heading mb-4 d-flex align-items-center justify-content-between">
                    <div>
                        <p className='mb-1'>{id ? 'Edit Size' : 'Add Size'}</p>
                        <div className='d-flex align-items-center'>
                            <p className='mv_dashboard_heading mb-0'>Dashboard /</p>
                            <p className='mv_category_heading mv_subcategory_heading mb-0'>
                                {id ? 'Edit Size' : 'Add Size'}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mv_main_profile_change h-auto">
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
                                                    onChange={handleMainCategoryChange}
                                                    onBlur={handleBlur}
                                                    className='mv_form_select'>
                                                    <option value="">Select</option>
                                                    {mainCategory.map((mainCat) => (
                                                        <option value={mainCat._id} key={mainCat._id}>{mainCat.mainCategoryName}</option>
                                                    ))}
                                                </Form.Select>
                                                {errors.mainCategory && touched.mainCategory &&
                                                    <div className="text-danger small">{errors.mainCategory}</div>}
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content mb-3">
                                                <label className='mv_label_input'>Category</label>
                                                <Form.Select
                                                    name="categoryId"
                                                    value={values.categoryId}
                                                    onChange={handleCategoryChange}
                                                    onBlur={handleBlur}
                                                    className='mv_form_select'
                                                    disabled={!values.mainCategory}>
                                                    <option value="">Select</option>
                                                    {filteredCategories.map((cat) => (
                                                        <option value={cat._id} key={cat._id}>{cat.categoryName}</option>
                                                    ))}
                                                </Form.Select>
                                                {errors.categoryId && touched.categoryId &&
                                                    <div className="text-danger small">{errors.categoryId}</div>}
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
                                                    className='mv_form_select'
                                                    disabled={!values.categoryId}>
                                                    <option value="">Select</option>
                                                    {filteredSubCategories.map((subCat) => (
                                                        <option value={subCat._id} key={subCat._id}>{subCat.subCategoryName}</option>
                                                    ))}
                                                </Form.Select>
                                                {errors.subCategoryId && touched.subCategoryId &&
                                                    <div className="text-danger small">{errors.subCategoryId}</div>}
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
                                                {errors.sizeName && touched.sizeName &&
                                                    <div className="text-danger small">{errors.sizeName}</div>}
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
                                                {errors.size && touched.size &&
                                                    <div className="text-danger small">{errors.size}</div>}
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
                                                    {unit.map((unit) => (
                                                        <option value={unit._id} key={unit._id}>{unit.shortName}</option>
                                                    ))}
                                                </Form.Select>
                                                {errors.unit && touched.unit &&
                                                    <div className="text-danger small">{errors.unit}</div>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='text-center mt-5'>
                                        <div className="mv_edit_profile">
                                            <button type="button" className='border-0 bg-transparent'>
                                                Cancel
                                            </button>
                                            {id ?
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