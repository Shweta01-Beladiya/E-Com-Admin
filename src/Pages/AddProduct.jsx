import React, { useEffect, useState, useRef } from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import '../CSS/vaidik.css';
import Select from 'react-select';
import { SketchPicker } from 'react-color';
import { IoMdClose } from "react-icons/io";
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const AddProduct = () => {

    const BaseUrl = process.env.REACT_APP_BASEURL;
    const token = localStorage.getItem('token');

    // State variables
    let [isedit, setisedit] = useState(false);
    const [colors, setColors] = useState([]);
    const [currentColor, setCurrentColor] = useState("#000");
    const [pickerPosition, setPickerPosition] = useState({ x: 0, y: 0 });
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [mainCategories, setMainCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [filteredSubCategories, setFilteredSubCategories] = useState([]);
    const fileInputRef = useRef(null);
    const [editSize, setEditSize] = useState(false);
    const [selectedOffers, setSelectedOffers] = useState([]);
    const [size, setSize] = useState([]);
    const [filteredSizes, setFilteredSizes] = useState([]);
    const [details, setDetails] = useState([
        { key: '', value: '' }
    ]);

    const options = [
        { value: 'New100', label: 'NEW100' },
        { value: 'New200', label: 'NEW200' },
        { value: 'New300', label: 'NEW300' }
    ]
    const change_edit = () => {
        setisedit(!isedit);
        setEditSize(!editSize);
    };

    // Validation Schema
    const validationSchema = Yup.object().shape({
        mainCategoryId: Yup.string()
            .required('Main category is required'),
        categoryId: Yup.string()
            .required('Category is required'),
        subCategoryId: Yup.string()
            .required('Sub category is required'),
        productName: Yup.string()
            .required('Product name is required')
            .min(3, 'Product name must be at least 3 characters'),
        sizeName: Yup.string()
            .required('Size name is required'),
        size: Yup.string()
            .required('Size is required'),
        unitId: Yup.string()
            .required('Unit is required'),
        shortDescription: Yup.string()
            .required('Short description is required')
            .max(200, 'Short description must not exceed 200 characters'),
        stockStatus: Yup.string()
            .required('Stock status is required'),
        originalPrice: Yup.number()
            .required('Price is required')
            .positive('Price must be positive')
            .min(0, 'Price must be greater than or equal to 0'),
        discountPrice: Yup.number()
            .nullable()
            .transform((value, originalValue) => originalValue.trim() === '' ? null : value)
            .lessThan(Yup.ref('originalPrice'), 'Discount price must be less than regular price'),
        productOfferId: Yup.array()
            .nullable()
            .min(0, 'Select at least one offer'),
        description: Yup.string()
            .required('Description is required')
            .min(20, 'Description must be at least 20 characters'),
        manufacturingDetails: Yup.string()
            .required('Manufacturing details are required'),
        shipping: Yup.string()
            .required('Shipping details are required'),
        returnPolicy: Yup.string()
            .required('Return/Exchange policy is required'),
        colorName: Yup.array()
            .min(1, 'At least one color must be selected'),
        images: Yup.array()
            .min(1, 'At least one image must be uploaded')
            .max(5, 'Maximum 5 images allowed'),
        details: Yup.array().of(
            Yup.object().shape({
                key: Yup.string().required('Key is required'),
                value: Yup.string().required('Value is required')
            })
        )
    });

    // Initial form values
    const initialValues = {
        mainCategoryId: '',
        categoryId: '',
        subCategoryId: '',
        productName: '',
        sizeNameId: '',
        size: '',
        unitId: '',
        shortDescription: '',
        stockStatus: '',
        originalPrice: '',
        discountPrice: '',
        productOfferId: [],
        description: '',
        manufacturingDetails: '',
        shipping: '',
        returnPolicy: '',
        details: [{ key: '', value: '' }]
    };

    // Form submission handler
    const handleSubmit = (values, { setSubmitting }) => {
        const formData = {
            ...values,
            colors,
            images: selectedImages
        };
        console.log('Form submitted with:', formData);
        setSubmitting(false);
        setisedit(false);
    };

    const handleOfferChange = (selectedOptions) => {
        setSelectedOffers(selectedOptions);
    };

    // Color picker handlers
    const handleColorChange = (color) => {
        setCurrentColor(color.hex);
    };

    const handleAddColorClick = (event) => {
        const buttonRect = event.currentTarget.getBoundingClientRect();
        setPickerPosition({
            x: buttonRect.left - 240,
            y: buttonRect.bottom + window.scrollY
        });
        setDisplayColorPicker(!displayColorPicker);
    };

    const addColor = () => {
        if (!colors.includes(currentColor)) {
            setColors([...colors, currentColor]);
        }
        setDisplayColorPicker(false);
    };

    const removeColor = (colorToRemove) => {
        setColors(colors.filter(color => color !== colorToRemove));
    };

    // Image handlers
    const handleImageSelect = (event) => {
        const files = Array.from(event.target.files);
        const newImages = files.map(file => ({
            file: file,
            name: file.name,
            preview: URL.createObjectURL(file)
        }));
        setSelectedImages(prevImages => [...prevImages, ...newImages]);
    };

    const removeImage = (index) => {
        setSelectedImages(prevImages => {
            URL.revokeObjectURL(prevImages[index].preview);
            return prevImages.filter((_, i) => i !== index);
        });
    };

    useEffect(() => {
        return () => {
            selectedImages.forEach(image => URL.revokeObjectURL(image.preview));
        };
          // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleAddMore = () => {
        setDetails([...details, { key: '', value: '' }]);
    };

    const handleDetailChange = (index, field, value) => {
        const newDetails = [...details];
        newDetails[index][field] = value;
        setDetails(newDetails);
    };

    const fetchMainCategory = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/api/allMainCategory`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // console.log("MainCategoryREsposnse",response.data);
            setMainCategories(response.data.users || []);
        } catch (error) {
            console.error('Data fetching error:', error);
        }
    }
    const fetchCategory = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/api/allCategory`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // console.log("CategoryRepsone",response.data);
            setCategories(response.data.category || []);
        } catch (error) {
            console.error('Data Fetching Error:', error);
        }
    }
    const fetchSubCategory = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/api/allSubCategory`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // console.log("subCateresponse",response);
            setSubCategories(response.data.subCategory)
        } catch (error) {
            console.error('Data Fetching Error:', error);
        }
    }

    const handleMainCategoryChange = (event, setFieldValue) => {
        const mainCategoryId = event.target.value;
        setFieldValue('mainCategoryId', mainCategoryId);
        setFieldValue('categoryId', '');
        setFieldValue('subCategoryId', '');
        setFieldValue('sizeNameId', '');

        const relatedCategories = categories.filter(
            category => category.mainCategoryId === mainCategoryId
        );
        setFilteredCategories(relatedCategories);
        setFilteredSubCategories([]);
    };

    const handleCategoryChange = (event, setFieldValue) => {
        const categoryId = event.target.value;
        setFieldValue('categoryId', categoryId);
        setFieldValue('subCategoryId', '');
        setFieldValue('sizeNameId', '');

        const relatedSubCategories = subCategories.filter(
            subCategory => subCategory.categoryId === categoryId
        );
        setFilteredSubCategories(relatedSubCategories);
    };
    const handleSubCategoryChange = (event, setFieldValue) => {
        const subCategoryId = event.target.value;
        setFieldValue('subCategoryId', subCategoryId);
        setFieldValue('sizeNameId', '');


        const subCategorySpecificSizes = size.filter(
            sizeItem => sizeItem.subCategoryId === subCategoryId
        );
        setFilteredSizes(subCategorySpecificSizes);
    };
    const fetchSize = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/api/allSizes`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // console.log("REsponse",response.data.sizes);
            setSize(response.data.sizes);
        } catch (error) {
            console.error('Data Fetching Error:', error);
        }
    }
    useEffect(() => {
        fetchMainCategory();
        fetchCategory();
        fetchSubCategory();
        fetchSize();
          // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div>
                <div className="mv_main_heading mb-4 d-flex align-items-center justify-content-between">
                    <div>
                        <p className='mb-1'>{editSize ? 'Edit Product' : 'Add Product'}</p>
                        <div className='d-flex align-items-center'>
                            <p className='mv_dashboard_heading mb-0'>Dashboard /</p>
                            <p className='mv_category_heading mv_subcategory_heading mb-0'>
                                {editSize ? 'Edit Product' : 'Add Product'}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="mv_main_profile_change1 ">
                    {/* Tabs Content */}
                    <div className="tab-content">
                        <div className="mv_view_edit_profile">
                            <div className='mv_profile_type'>
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={handleSubmit}
                                >
                                    {({ handleSubmit, handleChange, values, setFieldValue }) => (
                                        <form onSubmit={handleSubmit}>
                                            <div className="row">
                                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                    <div className="mv_input_content mb-3">
                                                        <label className='mv_label_input'>Main Category</label>
                                                        <Form.Select
                                                            className='mv_form_select '
                                                            name='mainCategoryId'
                                                            value={values.mainCategoryId}
                                                            onChange={(e) => handleMainCategoryChange(e, setFieldValue)}>
                                                            <option>Select</option>
                                                            {mainCategories.map((mainCat) => (
                                                                <option value={mainCat._id} key={mainCat._id}>{mainCat.mainCategoryName}</option>
                                                            ))}
                                                        </Form.Select>
                                                        <ErrorMessage name="mainCategoryId" component="small" className="text-danger" />
                                                    </div>
                                                </div>
                                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                    <div className="mv_input_content mb-3">
                                                        <label className='mv_label_input'>Category</label>
                                                        <Form.Select
                                                            className='mv_form_select'
                                                            name='categoryId'
                                                            value={values.categoryId}
                                                            onChange={(e) => handleCategoryChange(e, setFieldValue)}
                                                            disabled={!values.mainCategoryId}>
                                                            <option>Select</option>
                                                            {filteredCategories.map((cat) => (
                                                                <option value={cat._id} key={cat._id}>{cat.categoryName}</option>
                                                            ))}
                                                        </Form.Select>
                                                        <ErrorMessage name="categoryId" component="small" className="text-danger" />
                                                    </div>
                                                </div>
                                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                    <div className="mv_input_content mb-3">
                                                        <label className='mv_label_input'>Sub Category</label>
                                                        <Form.Select
                                                            className='mv_form_select'
                                                            name='subCategoryId'
                                                            value={values.subCategoryId}
                                                            onChange={(e) => handleSubCategoryChange(e, setFieldValue)}
                                                            disabled={!values.categoryId}>
                                                            <option>Select</option>
                                                            {filteredSubCategories.map((subCat) => (
                                                                <option value={subCat._id} key={subCat._id}>{subCat.subCategoryName}</option>
                                                            ))}
                                                        </Form.Select>
                                                        <ErrorMessage name="subCategoryId" component="small" className="text-danger" />
                                                    </div>
                                                </div>
                                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                    <div className="mv_input_content mb-3">
                                                        <label className='mv_label_input'>Product</label>
                                                        <InputGroup className="">
                                                            <Form.Control
                                                                placeholder="Enter product name"
                                                                name='productName'
                                                                onChange={handleChange}
                                                            />
                                                        </InputGroup>
                                                        <ErrorMessage name="productName" component="small" className="text-danger" />
                                                    </div>
                                                </div>
                                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                    <div className="mv_input_content mb-3">
                                                        <label className='mv_label_input'>Size Name</label>
                                                        <Form.Select
                                                            name='sizeNameId'
                                                            className='mv_form_select'>
                                                            <option>Select</option>
                                                            {console.log("filteredSizes",filteredSizes)}
                                                            
                                                            {filteredSizes.map((item) => (
                                                                <option value={item._id} key={item._id}>{item.sizeName}</option>
                                                            ))}
                                                        </Form.Select>
                                                        <ErrorMessage name="sizeNameId" component="small" className="text-danger" />
                                                    </div>
                                                </div>
                                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                    <div className="mv_input_content mb-3">
                                                        <label className='mv_label_input'>Size</label>
                                                        <Form.Group className="" controlId="exampleForm.ControlInput1">
                                                            <Form.Control
                                                                name='size'
                                                                value={values.size}
                                                                onChange={handleChange}
                                                                placeholder="Enter size"
                                                                 />
                                                                 {filteredSizes.map((item) => (
                                                                    <option value={item._id} key={item._id}>{item.size}</option>
                                                                ))}
                                                        </Form.Group>
                                                        <ErrorMessage name="size" component="small" className="text-danger" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6  col-12">
                                                    <div className="mv_input_content mb-3">
                                                        <label className='mv_label_input'>Unit</label>
                                                        <Form.Select
                                                            name='unitId'
                                                            value={values.unitId}
                                                            onChange={handleChange}
                                                            aria-label="Default select example"
                                                            className='mv_form_select'>
                                                            <option value="">Select</option>
                                                            <option value="gm">gm</option>
                                                            <option value="ltr">ltr</option>
                                                            <option value="ml">ml</option>
                                                            <option value="GB">GB</option>
                                                        </Form.Select>
                                                        <ErrorMessage name="unitId" component="small" className="text-danger" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-12">
                                                    <div className="mv_input_content mb-3">
                                                        <label className='mv_label_input'>Short Description</label>
                                                        <Form.Group className="">
                                                            <Form.Control
                                                                type=""
                                                                name='shortDescription'
                                                                value={values.shortDescription}
                                                                onChange={handleChange}
                                                                placeholder="Enter Description" />
                                                        </Form.Group>
                                                        <ErrorMessage name="shortDescription" component="small" className="text-danger" />
                                                    </div>
                                                </div>
                                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                    <div className="mv_input_content mb-3">
                                                        <label className='mv_label_input'>Stock Status</label>
                                                        <Form.Select
                                                            aria-label="Default select example"
                                                            className='mv_form_select '
                                                            name='stockStatus'
                                                            value={values.stockStatus}
                                                            onChange={handleChange}>
                                                            <option>Select</option>
                                                            <option value="In Stock">In Stock</option>
                                                            <option value="Low Stock">Low Stock</option>
                                                            <option value="Out of Stock">Out of Stock</option>
                                                        </Form.Select>
                                                        <ErrorMessage name="stockStatus" component="small" className="text-danger" />
                                                    </div>
                                                </div>
                                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                    <div className="mv_input_content mb-3">
                                                        <label className='mv_label_input'>Price</label>
                                                        <InputGroup className="">
                                                            <Form.Control
                                                                placeholder="Enter price"
                                                                name='originalPrice'
                                                                value={values.originalPrice}
                                                                onChange={handleChange}
                                                            />
                                                        </InputGroup>
                                                        <ErrorMessage name="originalPrice" component="small" className="text-danger" />
                                                    </div>
                                                </div>
                                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                    <div className="mv_input_content mb-3">
                                                        <label className='mv_label_input'>Discount Price</label>
                                                        <Form.Group className="">
                                                            <Form.Control
                                                                name='discountPrice'
                                                                value={values.discountPrice}
                                                                onChange={handleChange}
                                                                placeholder="Enter discount price" />
                                                            <ErrorMessage name="discountPrice" component="small" className="text-danger" />
                                                        </Form.Group>
                                                    </div>
                                                </div>
                                                <div className="col-12 mb-3">
                                                    <div className="mv_input_content">
                                                        <label className='mv_label_input'>Product Offer</label>
                                                        <Select
                                                            isMulti
                                                            name="productOfferId"
                                                            options={options}
                                                            className="basic-multi-select"
                                                            classNamePrefix="select"
                                                            value={selectedOffers}
                                                            onChange={handleOfferChange}
                                                            placeholder="Select offers..."
                                                        />
                                                    </div>
                                                    <ErrorMessage name="productOfferId" component="small" className="text-danger" />
                                                </div>
                                                <div className="col-12 mb-3">
                                                    <div className="mv_input_content">
                                                        <label className='mv_label_input'>Colors</label>
                                                        <div className="color-box border rounded p-2 d-flex align-items-center flex-wrap">
                                                            {colors.map((color, index) => (
                                                                <div key={index} className="color-circle me-2">
                                                                    <div
                                                                        style={{ backgroundColor: '#EAEAEA' }}
                                                                        className='d-flex px-2 py-1 rounded align-items-center'
                                                                    >
                                                                        <span
                                                                            className="rounded-circle"
                                                                            style={{
                                                                                backgroundColor: color,
                                                                                width: "15px",
                                                                                height: "15px",
                                                                                display: "inline-block"
                                                                            }}
                                                                        />
                                                                        <IoMdClose
                                                                            className="text-danger ms-1 cursor-pointer"
                                                                            style={{ cursor: 'pointer' }}
                                                                            onClick={() => removeColor(color)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            <button
                                                                className='border-0 bg-transparent position-relative ms-auto'
                                                                onClick={handleAddColorClick}
                                                            >
                                                                <img src={require('../mv_img/colorPicker.png')} alt="" />
                                                            </button>
                                                        </div>

                                                        {displayColorPicker && (
                                                            <div
                                                                className="position-absolute"
                                                                style={{
                                                                    zIndex: 2,
                                                                    left: `${pickerPosition.x}px`,
                                                                    top: `${pickerPosition.y}px`
                                                                }}
                                                            >
                                                                <div className="p-3 bg-white rounded shadow">
                                                                    <SketchPicker
                                                                        color={currentColor}
                                                                        onChange={handleColorChange}
                                                                    />
                                                                    <button
                                                                        className="btn btn-sm w-100 mt-2"
                                                                        style={{ backgroundColor: '#2B221E', color: 'white' }}
                                                                        onClick={addColor}
                                                                    >
                                                                        Add Color
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <ErrorMessage name="colorName" component="small" className="text-danger" />
                                                </div>
                                                <div className="col-12 mb-3">
                                                    <div className="mv_input_content">
                                                        <label className='mv_label_input'>Product Image</label>
                                                        <div className="border rounded p-2 d-flex align-items-center justify-content-between">
                                                            <div className="d-flex flex-wrap gap-3">
                                                                {selectedImages.map((image, index) => (
                                                                    <div key={index} className="d-flex align-items-center justify-content-between border rounded p-1" style={{ width: '120px' }}>

                                                                        <div className="text-truncate " style={{ maxWidth: '100px' }}>
                                                                            {image.name}
                                                                        </div>
                                                                        <IoMdClose style={{ color: '#ff0000' }} onClick={() => removeImage(index)} />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <div className="d-flex align-items-center">
                                                                <input
                                                                    type="file"
                                                                    ref={fileInputRef}
                                                                    className="d-none"
                                                                    multiple
                                                                    accept="image/*"
                                                                    onChange={handleImageSelect}
                                                                />
                                                                <button
                                                                    className="btn btn-sm ms-auto"
                                                                    style={{ backgroundColor: "#2B221E", color: 'white' }}
                                                                    onClick={() => fileInputRef.current.click()}
                                                                >
                                                                    Browse
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <ErrorMessage name="images" component="small" className="text-danger" />
                                                </div>
                                                <div className="col-12 mb-3">
                                                    <div className="d-flex">
                                                        <label className='mv_label_input'>More Details</label>
                                                        <button className='border-0 bg-transparent sb_btn ms-auto' onClick={handleAddMore}>
                                                            Add More
                                                        </button>
                                                    </div>
                                                    {details.map((detail, index) => (
                                                        <>
                                                            <div className="row" key={index} >
                                                                <div className="col-md-6 col-12">
                                                                    <div className="mv_input_content mb-3">
                                                                        <label className='mv_label_input'>Key</label>
                                                                        <Form.Group className="">
                                                                            <Form.Control
                                                                                type="text"
                                                                                placeholder="Key"
                                                                                value={detail.key}
                                                                                onChange={(e) => handleDetailChange(index, 'key', e.target.value)} />
                                                                        </Form.Group>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6 col-12">
                                                                    <div className="mv_input_content mb-3">
                                                                        <label className='mv_label_input'>Value</label>
                                                                        <Form.Group className="">
                                                                            <Form.Control
                                                                                type="text"
                                                                                placeholder="Value"
                                                                                value={detail.value}
                                                                                onChange={(e) => handleDetailChange(index, 'value', e.target.value)} />
                                                                        </Form.Group>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* { index > 0 && (
                                                            <button
                                                                type="button"
                                                                onClick={() => handleRemove(index)}
                                                                className="ml-2 p-1 text-red-500 hover:text-red-700"
                                                            >
                                                                <IoMdClose />
                                                            </button>
                                                        )} */}
                                                        </>
                                                    ))}

                                                </div>
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="mv_input_content mb-3">
                                                        <label className='mv_label_input'>Description</label>
                                                        <Form.Group className="">
                                                            <Form.Control
                                                                name='description'
                                                                value={values.description}
                                                                onChange={handleChange}
                                                                placeholder="Enter Description" />
                                                        </Form.Group>
                                                        <ErrorMessage name="description" component="small" className="text-danger" />
                                                    </div>
                                                </div>

                                                <div className="col-md-6 col-sm-6">
                                                    <div className="mv_input_content mb-3">
                                                        <label className='mv_label_input'>Manufacturing Details</label>
                                                        <Form.Group className="">
                                                            <Form.Control
                                                                type=""
                                                                placeholder="Enter Manufacturing Details" />
                                                        </Form.Group>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="mv_input_content mb-3">
                                                        <label className='mv_label_input'>Shipping</label>
                                                        <Form.Group className="">
                                                            <Form.Control
                                                                name='shipping'
                                                                value={values.shipping}
                                                                onChange={handleChange}
                                                                placeholder="Enter Shipping details" />
                                                        </Form.Group>
                                                        <ErrorMessage name="shipping" component="small" className="text-danger" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="mv_input_content mb-3">
                                                        <label className='mv_label_input'>Return/ Exchange Policy</label>
                                                        <Form.Group className="">
                                                            <Form.Control
                                                                name='returnPolicy'
                                                                value={values.returnPolicy}
                                                                onChange={handleChange}
                                                                placeholder="Enter Return/ Exchange Policy" />
                                                        </Form.Group>
                                                        <ErrorMessage name="returnPolicy" component="small" className="text-danger" />
                                                    </div>
                                                </div>
                                                <div className='text-center mt-5'>
                                                    <div className="mv_edit_profile">
                                                        <button className='border-0 bg-transparent'>
                                                            Cancel
                                                        </button>
                                                        {editSize === true ? <button className='border-0 bg-transparent' onClick={change_edit}>
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
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddProduct;