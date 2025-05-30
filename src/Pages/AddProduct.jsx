import React, { useEffect, useState, useRef } from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import '../CSS/vaidik.css';
// import Select from 'react-select';
import { SketchPicker } from 'react-color';
import { IoMdClose } from "react-icons/io";
import { Formik, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

const AddProduct = () => {
    const formikRef = useRef(null);

    const BaseUrl = process.env.REACT_APP_BASEURL;
    const token = localStorage.getItem('token');

    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();

    const query = new URLSearchParams(location.search);
    const variantId = query.get("productVariantId");

    // State variables
    const [colors, setColors] = useState('');
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
    const [size, setSize] = useState([]);
    const [filteredSizes, setFilteredSizes] = useState([]);
    const [unit, setUnit] = useState([]);
    const [availableSizes, setAvailableSizes] = useState([]);
    const [currentVariantId, setCurrentVariantId] = useState(null);

    // Initial form values
    const [initialValues, setInitialValues] = useState({
        mainCategoryId: '',
        categoryId: '',
        subCategoryId: '',
        productName: '',
        sizeNameId: '',
        size: '',
        unitId: '',
        shortDescription: '',
        originalPrice: '',
        discountPrice: '',
        colorName: '',
        images: [],
        // productOfferId: [],
        description: '',
        manufacturingDetails: '',
        shiping: '',
        returnPolicy: '',
        specifications: [{ key: '', value: '' }]
    });
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
        sizeNameId: Yup.string()
            .required('Size name is required'),
        size: Yup.string()
            .required('Size is required'),
        unitId: Yup.string()
            .required('Unit is required'),
        shortDescription: Yup.string()
            .required('Short description is required')
            .max(200, 'Short description must not exceed 200 characters'),
        originalPrice: Yup.number()
            .required('Price is required')
            .positive('Price must be positive')
            .min(0, 'Price must be greater than or equal to 0'),
        // startDate: Yup.date().required("Start Date is required"),
        discountPrice: Yup.number()
            .typeError("Discount Price must be a number")
            .required("Discount Price is required")
            .min(1, "Discount must be at least 1%")
            .max(100, "Discount cannot exceed 100%"),
        // productOfferId: Yup.array()
        //     .nullable()
        //     .min(0, 'Select at least one offer'),
        description: Yup.string()
            .required('Description is required')
            .min(20, 'Description must be at least 20 characters'),
        manufacturingDetails: Yup.string()
            .required('Manufacturing details are required'),
        shiping: Yup.string()
            .required('Shipping details are required'),
        returnPolicy: Yup.string()
            .required('Return/Exchange policy is required'),
        colorName: Yup.mixed().required('Color is required'),
        images: Yup.array()
            .min(1, 'At least one image must be uploaded')
            .max(5, 'Maximum 5 images allowed'),
        specifications: Yup.array().of(
            Yup.object().shape({
                key: Yup.string().required('Key is required'),
                value: Yup.string().required('Value is required')
            })
        )
    });

    const fetchProductData = async () => {
        if (!id) return;
        try {
            // Fetch product data
            const response = await axios.get(`${BaseUrl}/api/getProduct/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data && response.data.product) {
                const product = response.data.product[0];

                // const variant = preResponse.data.productVariant[0];

                if (product) {
                    // Setup filtered categories based on main category
                    const relatedCategories = categories.filter(
                        category => category.mainCategoryId === product.mainCategoryId
                    );

                    setFilteredCategories(relatedCategories);

                    // Setup filtered subcategories based on category
                    const relatedSubCategories = subCategories.filter(
                        subCategory => subCategory.categoryId === product.categoryId
                    );
                    setFilteredSubCategories(relatedSubCategories);

                    // Setup filtered sizes based on subcategory
                    const subCategorySpecificSizes = size.filter(
                        sizeItem => sizeItem.subCategoryId === product.subCategoryId
                    );
                    setFilteredSizes(subCategorySpecificSizes);
              
                    const initialData = {
                        mainCategoryId: product.mainCategoryId || '',
                        categoryId: product.categoryId || '',
                        subCategoryId: product.subCategoryId || '',
                        productName: product.productName,
                        images: selectedImages,
                    };
                    setInitialValues(initialData);
                }
            }
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };

    // Form submission handler
    const handleSubmit = async (values) => {
        console.log("Form submitted with values:", values);

        try {
            if (id) {
                await axios.put(`${BaseUrl}/api/updateProduct/${id}`, {
                    mainCategoryId: values.mainCategoryId,
                    categoryId: values.categoryId,
                    subCategoryId: values.subCategoryId,
                    productName: values.productName
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                await createOrUpdateVariant(id, currentVariantId, values);
            } else {
                // Create product only if it doesn't exist
                const response = await axios.post(`${BaseUrl}/api/createProduct`, {
                    mainCategoryId: values.mainCategoryId,
                    categoryId: values.categoryId,
                    subCategoryId: values.subCategoryId,
                    productName: values.productName
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const newProductId = response.data.product._id;
                await createOrUpdateVariant(newProductId, null, values);
            }

        } catch (error) {
            console.error('Data Fetching Error:', error);
            // console.log("error",error.response.data.productId);           
            if (error.response && error.response.status === 409) {
                const newProductId = error.response.data.productId;
                await createOrUpdateVariant(newProductId, null, values);
            }
        }
        // setSubmitting(false);
    };
    const createOrUpdateVariant = async (productId, variantId, values) => {
        
        const formData = new FormData();

        const existingImages = values.images
            .filter(img => !img.file && img.existingPath)
            .map(img => img.existingPath);
        formData.append("existingImages", JSON.stringify(existingImages));

        values.images.forEach((img) => {
            if (img.file) {
                formData.append("images", img.file);
            }
        });

        const specObject = {};
        values.specifications.forEach(spec => {
            if (spec.key && spec.value) {
                specObject[spec.key] = spec.value;
            }
        });

        formData.append("productId", productId);
        formData.append("sizeNameId", values.sizeNameId);
        formData.append("size", values.size);
        formData.append("unitId", values.unitId);
        formData.append("shortDescription", values.shortDescription);
        formData.append("originalPrice", values.originalPrice);
        formData.append("discountPrice", values.discountPrice || '');
        formData.append("colorName", values.colorName || '');
        formData.append("description", values.description);
        formData.append("shiping", values.shiping);
        formData.append("returnPolicy", values.returnPolicy);
        formData.append("manufacturingDetails", values.manufacturingDetails);
        formData.append("specifications", JSON.stringify(specObject));

        const variantUrl = variantId
            ? `${BaseUrl}/api/updateProductVariant/${variantId}`
            : `${BaseUrl}/api/createProductVariant`;

        const method = variantId ? axios.put : axios.post;

        const response = await method(variantUrl, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.data.status === 200) {
            const pageToNavigate = query.get("page") || localStorage.getItem('currentProductPage') || '1';
            navigate(`/product?page=${pageToNavigate}`);
        }
    };

    // Color picker handlers
    const handleColorChange = (color) => {
        setCurrentColor(color.hex);
    };

    const handleAddColorClick = (event) => {
        event.preventDefault();
        const buttonRect = event.currentTarget.getBoundingClientRect();
        setPickerPosition({
            x: Math.max(0, buttonRect.left - 240),
            y: buttonRect.bottom + window.scrollY
        });
        setDisplayColorPicker(!displayColorPicker);
    };

    const addColor = (setFieldValue) => {
        if (currentColor && !colors.includes(currentColor)) {
            const updatedColors = colors ? `${colors},${currentColor}` : currentColor;
            setColors(updatedColors);
            setFieldValue('colorName', updatedColors);
        }
        setDisplayColorPicker(false);
    };

    const removeColor = (colorToRemove, setFieldValue) => {
        if (!colors) return;
        const colorArray = colors.split(',');
        const updatedColors = colorArray.filter(color => color !== colorToRemove).join(',');
        setColors(updatedColors);
        setFieldValue('colorName', updatedColors);
    };

    // Image handlers
    const handleImageSelect = (event, setFieldValue) => {
        const files = Array.from(event.target.files);

        const newImages = files.map(file => ({
            file: file,
            name: file.name,
            preview: URL.createObjectURL(file)
        }));

        const updatedImages = [...selectedImages, ...newImages];

        setSelectedImages(updatedImages);
        setFieldValue('images', updatedImages);
    };


    const removeImage = (index, setFieldValue) => {
        setSelectedImages(prevImages => {
            const updatedImages = prevImages.filter((_, i) => i !== index);

            if (prevImages[index].preview && !prevImages[index].existingPath) {
                URL.revokeObjectURL(prevImages[index].preview);
            }

            // This call must happen to update Formik's internal state
            setFieldValue('images', updatedImages);
            return updatedImages;
        });
    };

    useEffect(() => {
        return () => {
            selectedImages.forEach(image => URL.revokeObjectURL(image.preview));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
    const fetchUnit = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/api/allUnits`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // console.log("response",response.data.unit);
            setUnit(response.data.unit);
        } catch (error) {
            console.error('Data Fetching Error:', error);
        }
    }
    useEffect(() => {
        const fetchAllData = async () => {
            await fetchMainCategory();
            await fetchCategory();
            await fetchSubCategory();
            await fetchSize();
            await fetchUnit();

            if (id) {
                await fetchProductData();
            }
        };

        fetchAllData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // This will ensure filters are updated when product data or category data changes
    useEffect(() => {
        if (initialValues.mainCategoryId && categories.length > 0) {
            const relatedCategories = categories.filter(
                category => category.mainCategoryId === initialValues.mainCategoryId
            );
            setFilteredCategories(relatedCategories);
        }

        if (initialValues.categoryId && subCategories.length > 0) {
            const relatedSubCategories = subCategories.filter(
                subCategory => subCategory.categoryId === initialValues.categoryId
            );
            setFilteredSubCategories(relatedSubCategories);
        }

        if (initialValues.subCategoryId && size.length > 0) {
            const subCategorySpecificSizes = size.filter(
                sizeItem => sizeItem.subCategoryId === initialValues.subCategoryId
            );
            setFilteredSizes(subCategorySpecificSizes);
        }
    }, [initialValues, categories, subCategories, size]);

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

    const handleSizeNameChange = async (event, setFieldValue) => {
        const sizeNameId = event.target.value;
        setFieldValue('sizeNameId', sizeNameId);

        const selectedSizeItem = filteredSizes.find(item => item._id === sizeNameId);

        if (selectedSizeItem) {
            // Check if the size is a comma-separated string and convert it to an array
            if (selectedSizeItem.size && typeof selectedSizeItem.size === 'string') {
                const sizeArray = selectedSizeItem.size.split(',').map(size => size.trim());
                setAvailableSizes(sizeArray);

                // Set the default value to the first size in the array if available
                if (sizeArray.length > 0) {
                    setFieldValue('size', sizeArray[0]);

                    // Fetch variant data for this product and size if product ID exists
                    if (id) {
                        await fetchVariantBySize(id, sizeNameId, sizeArray[0], setFieldValue);
                    }
                } else {
                    setFieldValue('size', '');
                }
            } else {
                // If it's not a string or is empty, set an empty array
                setAvailableSizes([]);
                setFieldValue('size', '');
            }
        } else {
            setAvailableSizes([]);
            setFieldValue('size', '');
        }
    };
    const handleSizeChange = async (event, setFieldValue, values = {}) => {
        const selectedSize = event.target.value;
        setFieldValue('size', selectedSize);
    
        // Add defensive check to ensure values and values.sizeNameId exist
        if (id && values && values.sizeNameId) {
            await fetchVariantBySize(id, values.sizeNameId, selectedSize, setFieldValue);
        }
    };
    const fetchVariantBySize = async (productId, sizeNameId, size, setFieldValue) => {
        try {
            const response = await axios.get(`${BaseUrl}/api/allProductVariant`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // console.log("response.data.productVariant", response.data.productVariant);

            if (response.data && response.data.productVariant) {
                // Find the variant matching the product ID, size name ID, and size
                const matchingVariant = response.data.productVariant.find(variant =>
                    variant.productId === productId &&
                    variant.sizeNameId === sizeNameId &&
                    variant.size === size
                );
                console.log("matchingVariant>>>>>>>>>>>",matchingVariant);
                
                if (matchingVariant) {
                    setCurrentVariantId(matchingVariant._id);
                    // Update colors
                    if (matchingVariant.colorName) {
                        setColors(matchingVariant.colorName);
                        setFieldValue('colorName', matchingVariant.colorName);
                    }

                    // Update images
                    if (matchingVariant.images && matchingVariant.images.length > 0) {
                        const imageObjects = matchingVariant.images.map(img => ({
                            file: null,
                            name: img.split('/').pop() || 'image.jpg',
                            preview: `${BaseUrl}/${img}`,
                            existingPath: img
                        }));
                        setSelectedImages(imageObjects);
                        setFieldValue('images', imageObjects);
                    } else {
                        setSelectedImages([]);
                        setFieldValue('images', []);
                    }

                    // Update other fields
                    setFieldValue('unitId', matchingVariant.unitId || '');
                    setFieldValue('shortDescription', matchingVariant.shortDescription || '');
                    setFieldValue('originalPrice', matchingVariant.originalPrice || '');
                    setFieldValue('discountPrice', matchingVariant.discountPrice || '');
                    setFieldValue('description', matchingVariant.description || '');
                    setFieldValue('manufacturingDetails', matchingVariant.manufacturingDetails || '');
                    setFieldValue('shiping', matchingVariant.shiping || '');
                    setFieldValue('returnPolicy', matchingVariant.returnPolicy || '');

                    // Update specifications
                    if (matchingVariant.specifications) {
                        const specs = Object.entries(matchingVariant.specifications).map(([key, value]) => ({ key, value }));
                        setFieldValue('specifications', specs.length > 0 ? specs : [{ key: '', value: '' }]);
                    }
                } else {
                    setCurrentVariantId(null);
                    resetVariantFields(setFieldValue);
                }
            }
        } catch (error) {
            console.error('Error fetching variant data by size:', error);
        }
    };
    const resetVariantFields = (setFieldValue) => {
        // Keep mainCategoryId, categoryId, subCategoryId, productName, sizeNameId, and size
        // Reset all other fields
        setColors('');
        setFieldValue('colorName', '');
        setSelectedImages([]);
        setFieldValue('images', []);
        setFieldValue('unitId', '');
        setFieldValue('shortDescription', '');
        setFieldValue('originalPrice', '');
        setFieldValue('discountPrice', '');
        setFieldValue('description', '');
        setFieldValue('manufacturingDetails', '');
        setFieldValue('shiping', '');
        setFieldValue('returnPolicy', '');
        setFieldValue('specifications', [{ key: '', value: '' }]);
    };
    useEffect(() => {
        if (selectedImages.length > 0 && formikRef.current) {
            formikRef.current.setFieldValue('images', selectedImages);
        }
    }, [selectedImages]);

    return (
        <>
            <div>
                <div className="mv_main_heading mb-4 d-flex align-items-center justify-content-between">
                    <div>
                        <p className='mb-1'>{id ? 'Edit Product' : 'Add Product'}</p>
                        <div className='d-flex align-items-center'>
                            <p className='mv_dashboard_heading mb-0'>Dashboard /</p>
                            <p className='mv_category_heading mv_subcategory_heading mb-0'>
                                {id ? 'Edit Product' : 'Add Product'}
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
                                    innerRef={formikRef}
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={(values, formikBag) => handleSubmit(values, formikBag, null)}
                                    enableReinitialize={true}
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
                                                            disabled={!values.mainCategoryId}
                                                        >
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
                                                                value={values.productName}
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
                                                            value={values.sizeNameId}
                                                            onChange={(e) => handleSizeNameChange(e, setFieldValue)}
                                                            disabled={!values.subCategoryId}
                                                            className='mv_form_select'>
                                                            <option>Select</option>
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
                                                        <Form.Select
                                                            name='size'
                                                            value={values.size}
                                                            onChange={(e) => handleSizeChange(e, setFieldValue, values)}
                                                            disabled={availableSizes.length === 0}
                                                            className='mv_form_select'>
                                                            <option value="">Select</option>
                                                            {availableSizes.map((sizeValue, index) => (
                                                                <option value={sizeValue} key={index}>{sizeValue}</option>
                                                            ))}
                                                        </Form.Select>
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
                                                            className='mv_form_select'>
                                                            <option value="">Select</option>
                                                            {unit.map((unit) => (
                                                                <option value={unit._id} key={unit._id}>{unit.name}</option>
                                                            ))}
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
                                                <div className="col-md-6 col-sm-6">
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
                                                <div className=" col-md-6 col-sm-6">
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
                                                {/* <div className="col-12 mb-3">
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
                                                </div> */}
                                                <div className="col-12 mb-3">
                                                    <div className="mv_input_content">
                                                        <label className='mv_label_input'>Colors</label>
                                                        <div className="color-box mv_img_border p-2 d-flex align-items-center flex-wrap">
                                                            {(colors ? colors.split(',') : []).map((color, index) => (
                                                                <div key={index} className="color-circle me-2">
                                                                    <div style={{ backgroundColor: '#EAEAEA' }}
                                                                        className='d-flex px-2 py-1 rounded align-items-center'>
                                                                        <span className="rounded-circle"
                                                                            style={{ backgroundColor: color, width: "15px", height: "15px", display: "inline-block" }} />
                                                                        <IoMdClose className="text-danger ms-1 cursor-pointer"
                                                                            style={{ cursor: 'pointer' }}
                                                                            onClick={() => removeColor(color, setFieldValue)} />
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
                                                                        onClick={() => addColor(setFieldValue)}
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
                                                        <div className="mv_img_border p-2 d-flex align-items-center justify-content-between">
                                                            <div className="d-flex flex-wrap gap-3">
                                                                {selectedImages.map((image, index) => (
                                                                    <div key={index} className="d-flex align-items-center justify-content-between  rounded-1 p-1" style={{ width: '120px', backgroundColor: '#EAEAEA' }}>

                                                                        <div className="text-truncate " style={{ maxWidth: '100px' }}>
                                                                            {image.name}
                                                                        </div>
                                                                        <IoMdClose style={{ color: '#ff0000', fontSize: '25px', cursor: 'pointer' }} onClick={() => removeImage(index, setFieldValue)} />
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
                                                                    name='images'
                                                                    onChange={(e) => handleImageSelect(e, setFieldValue)}
                                                                />
                                                                <button
                                                                    className="btn btn-sm ms-auto"
                                                                    style={{ backgroundColor: "#2B221E", color: 'white', fontSize: '12px' }}
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        fileInputRef.current.click();
                                                                    }}
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
                                                        <FieldArray name="specifications">
                                                            {({ push }) => (
                                                                <button
                                                                    type="button"
                                                                    className='border-0 bg-transparent sb_btn ms-auto'
                                                                    onClick={() => push({ key: '', value: '' })}
                                                                >
                                                                    Add More
                                                                </button>
                                                            )}
                                                        </FieldArray>
                                                    </div>
                                                    <FieldArray name="specifications">
                                                        <>
                                                            {values?.specifications?.map((specification, index) => (
                                                                <div className="row" key={index}>
                                                                    <div className="col-md-6 col-12">
                                                                        <div className="mv_input_content mb-3">
                                                                            <label className='mv_label_input'>Key</label>
                                                                            <Form.Group className="">
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    placeholder="Key"
                                                                                    name={`specifications.${index}.key`}
                                                                                    value={values.specifications[index].key}
                                                                                    onChange={handleChange}
                                                                                />
                                                                            </Form.Group>
                                                                            <ErrorMessage name={`specifications.${index}.key`} component="small" className="text-danger" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6 col-12">
                                                                        <div className="mv_input_content mb-3">
                                                                            <label className='mv_label_input'>Value</label>
                                                                            <div className="d-flex">
                                                                                <Form.Group className="flex-grow-1">
                                                                                    <Form.Control
                                                                                        type="text"
                                                                                        placeholder="Value"
                                                                                        name={`specifications.${index}.value`}
                                                                                        value={values.specifications[index].value}
                                                                                        onChange={handleChange}
                                                                                    />
                                                                                </Form.Group>
                                                                            </div>
                                                                            <ErrorMessage name={`specifications.${index}.value`} component="small" className="text-danger" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </>
                                                    </FieldArray>
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
                                                                name='manufacturingDetails'
                                                                value={values.manufacturingDetails}
                                                                onChange={handleChange}
                                                                placeholder="Enter Manufacturing Details" />
                                                        </Form.Group>
                                                        <ErrorMessage name="manufacturingDetails" component="small" className="text-danger" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="mv_input_content mb-3">
                                                        <label className='mv_label_input'>Shipping</label>
                                                        <Form.Group className="">
                                                            <Form.Control
                                                                name='shiping'
                                                                value={values.shiping}
                                                                onChange={handleChange}
                                                                placeholder="Enter Shipping details" />
                                                        </Form.Group>
                                                        <ErrorMessage name="shiping" component="small" className="text-danger" />
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
                                                        <Link to={'/product'} style={{ color: '#2B221E', textDecoration: 'none' }}>
                                                            <button className='border-0 bg-transparent'>
                                                                Cancel
                                                            </button>
                                                        </Link>
                                                        <button type="submit" className='border-0 bg-transparent'>
                                                            {id ? "Update" : "Add"}
                                                        </button>
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