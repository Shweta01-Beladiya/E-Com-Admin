import React, { useEffect, useState, useRef } from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import '../CSS/vaidik.css';
import { useLocation } from 'react-router-dom';
import Select from 'react-select';
import { SketchPicker } from 'react-color';
import { IoMdClose } from "react-icons/io";
import { Formik, ErrorMessage } from "formik";
import * as Yup from 'yup';

const AddProduct = () => {
    // State variables
    let [isedit, setisedit] = useState(false);
    const [colors, setColors] = useState([]);
    const [currentColor, setCurrentColor] = useState("#000");
    const [pickerPosition, setPickerPosition] = useState({ x: 0, y: 0 });
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [mainCategory, setMainCategory] = useState('');
    const fileInputRef = useRef(null);
    const getValidationSchema = (mainCategory) => {
        // Base validation schema that applies to all categories
        const baseSchema = {
            mainCategoryId: Yup.string()
                .required('Main category is required'),
            categoryId: Yup.string()
                .required('Category is required'),
            subCategoryId: Yup.string()
                .required('Sub category is required'),
            product: Yup.string()
                .required('Product name is required'),
            sizeName: Yup.string()
                .required('Size name is required'),
            size: Yup.string()
                .required('Size is required'),
            unit: Yup.string()
                .required('Unit is required'),
            shortDescription: Yup.string()
                .required('Short description is required'),
            stockStatus: Yup.string()
                .required('Stock status is required'),
            price: Yup.number()
                .required('Price is required'),
            discountPrice: Yup.number()
                .min(0, 'Discount price must be greater than or equal to 0'),
            productOffer: Yup.string()
                .required('Product offer is required'),
            colors: Yup.array()
                .min(1, "At least one color is required"),
            quantity: Yup.number()
                .required('Quantity is required')
                .min(0, 'Quantity must be greater than or equal to 0'),
            brand: Yup.string()
                .required('Brand is required'),
            description: Yup.string()
                .required('Description is required'),
            warning: Yup.string()
                .required('Warning is required'),
            productImage: Yup.array()
                .min(1, "At least one image is required")
                .test("fileType", "Only image files are allowed", (value) => {
                    return value.every(file => file.type.startsWith("image/"));
                }),
            shipping: Yup.string().required('Shipping is required'),
            returnExchangePolicy: Yup.string().required('Return/ Exchange Policy is required'),
        };

        // Additional fields for Mobile & Electronics category
        const mobileElectronicsSchema = {
            ...baseSchema,
            frontCamera: Yup.string()
                .required('Front Camera is required'),
            browseType: Yup.string()
                .required('Browse Type is required'),
            modalName: Yup.string()
                .required('Modal Name is required'),
            operatingSystem: Yup.string()
                .required('Operating System is required'),
            cameraVideo: Yup.string()
                .required('Camera Video is required'),
            screenSize: Yup.string()
                .required('Screen Size is required')
        };

        // Additional fields for other categories
        const otherCategoriesSchema = {
            ...baseSchema,
            pattern: Yup.string()
                .required('Pattern is required'),
            style: Yup.string()
                .required('Style is required'),
            febric: Yup.string()
                .required('Febric is required'),
            washCase: Yup.string()
                .required('Wash case is required'),
            work: Yup.string()
                .required('Work is required'),
            occasion: Yup.string()
                .required('Occasion is required'),
            countryOrigin: Yup.string()
                .required('Country Origin is required'),
            gender: Yup.string()
                .required('Gender is required'),
            sleeveType: Yup.string()
                .required('Sleeve Type is required'),
            manufacturingDetails: Yup.string()
                .required('Manufaturing Details is required'),
        };

        return mainCategory === 'Mobile & Electronics'
            ? Yup.object().shape(mobileElectronicsSchema)
            : Yup.object().shape(otherCategoriesSchema);
    };
    // Use the validation schema based on mainCategory
    const [validationSchema, setValidationSchema] = useState(getValidationSchema(mainCategory));

    // Update validation schema when mainCategory changes
    useEffect(() => {
        setValidationSchema(getValidationSchema(mainCategory));
    }, [mainCategory]);

    const [initialValues, setInitialValues] = useState({
        mainCategoryId: '',
        categoryId: '',
        subCategoryId: '',
        product: '',
        sizeName: '',
        size: '',
        unit: '',
        shortDescription: '',
        stockStatus: '',
        price: '',
        discountPrice: '',
        productOffer: '',
        colors: [],
        quantity: '',
        brand: '',
        pattern: '',
        style: '',
        warning: '',
        febric: '',
        description: '',
        washCase: '',
        work: '',
        occasion: '',
        countryOrigin: '',
        gender: '',
        sleeveType: '',
        frontCamera: '',
        browseType: '',
        modalName: '',
        operatingSystem: '',
        cameraVideo: '',
        screenSize: '',
        productImage: [],
        manufacturingDetails: '',
        shipping:'',
        returnExchangePolicy:''
    });
    const handleSubmit = (values, { setSubmitting }) => {
        console.log('Form values:', values);
        // Add your form submission logic here
        setSubmitting(false);
    };
    const options = [
        { value: 'New100', label: 'NEW100' },
        { value: 'New200', label: 'NEW200' },
        { value: 'New300', label: 'NEW300' }
    ]

    let change_edit = (e) => {
        e.preventDefault();
        setisedit(!isedit);
    };

    let handlesubmit = (event) => {
        event.preventDefault();
        setisedit(false);
    };

    // Edit Size
    const location = useLocation();
    const editSize = location.state?.editSize;
    // console.log(editSize)

    // Function to handle color selection
    const handleColorChange = (color) => {
        setCurrentColor(color.hex);
    };

    // Function to handle click on Add Color button
    const handleAddColorClick = (event) => {
        const buttonRect = event.currentTarget.getBoundingClientRect();
        setPickerPosition({
            x: buttonRect.left - 240,
            y: buttonRect.bottom + window.scrollY
        });
        setDisplayColorPicker(!displayColorPicker);
    };

    // Function to add color
    const addColor = () => {
        if (!colors.includes(currentColor)) {
            setColors([...colors, currentColor]);
        }
        setDisplayColorPicker(false);
    };

    // Function to remove color
    const removeColor = (colorToRemove) => {
        setColors(colors.filter(color => color !== colorToRemove));
    };

    // Handle Image Selection
    const handleImageSelect = (event, setFieldValue) => {
        const files = Array.from(event.target.files);
        setSelectedImages(files);
        setFieldValue("images", files);
    };

    // Remove Image
    const removeImage = (index, setFieldValue) => {
        const updatedImages = [...selectedImages];
        updatedImages.splice(index, 1);
        setSelectedImages(updatedImages);
        setFieldValue("images", updatedImages);
    };

    // Cleanup preview URLs when component unmounts
    useEffect(() => {
        return () => {
            selectedImages.forEach(image => URL.revokeObjectURL(image.preview));
        };
    }, []);
    const handleMainCategoryChange = (e) => {
        setMainCategory(e.target.value);
    };

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
                                    enableReinitialize={true}
                                >
                                    {({ handleChange, handleSubmit, values, errors, touched, setFieldValue }) => (
                                        <Form onSubmit={handleSubmit}>
                                            <div className="row">
                                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                    <div className="mv_input_content">
                                                        <label className='mv_label_input'>Main Category</label>
                                                        <Form.Select
                                                            className='mv_form_select mb-3'
                                                            name="mainCategoryId"
                                                            value={values.mainCategoryId}
                                                            onChange={(e) => {
                                                                setFieldValue("mainCategoryId", e.target.value);
                                                                handleMainCategoryChange(e);
                                                            }}>
                                                            <option>Select</option>
                                                            <option value="Women">Women</option>
                                                            <option value="Men">Men</option>
                                                            <option value="Baby & Kids">Baby & Kids</option>
                                                            <option value="Beauty & Health">Beauty & Health</option>
                                                            <option value="Home & Kitchen">Home & Kitchen</option>
                                                            <option value="Mobile & Electronics">Mobile & Electronics</option>
                                                        </Form.Select>
                                                        <ErrorMessage name="mainCategoryId" component="small" className="text-danger" />
                                                    </div>
                                                </div>
                                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                    <div className="mv_input_content">
                                                        <label className='mv_label_input'>Category</label>
                                                        <Form.Select
                                                            name='categoryId'
                                                            value={values.categoryId}
                                                            onChange={handleChange}
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
                                                        <ErrorMessage name="categoryId" component="small" className="text-danger" />
                                                    </div>
                                                </div>
                                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                    <div className="mv_input_content">
                                                        <label className='mv_label_input'>Sub Category</label>
                                                        <Form.Select
                                                            name='subCategoryId'
                                                            value={values.subCategoryId}
                                                            onChange={handleChange}
                                                            className='mv_form_select mb-3'
                                                        >
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
                                                        <ErrorMessage name="subCategoryId" component="small" className="text-danger" />
                                                    </div>
                                                </div>
                                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                    <div className="mv_input_content">
                                                        <label className='mv_label_input'>Product</label>
                                                        <InputGroup className="mb-3">
                                                            <Form.Control
                                                                type="text"
                                                                name="product"
                                                                value={values.product}
                                                                onChange={handleChange}
                                                                placeholder="Enter product name"
                                                            />
                                                        </InputGroup>
                                                        <ErrorMessage name="product" component="small" className="text-danger" />
                                                    </div>
                                                </div>
                                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                    <div className="mv_input_content">
                                                        <label className='mv_label_input'>Size Name</label>
                                                        <Form.Select
                                                            className='mv_form_select mb-3'
                                                            name='sizeName'
                                                            value={values.sizeName}
                                                            onChange={handleChange}>
                                                            <option>Select</option>
                                                            <option value="Women">Women</option>
                                                            <option value="Men">Men</option>
                                                            <option value="Baby & Kids">Baby & Kids</option>
                                                            <option value="Beauty & Health">Beauty & Health</option>
                                                            <option value="Home & Kitchen">Home & Kitchen</option>
                                                            <option value="Mobile & Electronics">Mobile & Electronics</option>
                                                        </Form.Select>
                                                        <ErrorMessage name="sizeName" component="small" className="text-danger" />
                                                    </div>
                                                </div>
                                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                    <div className="mv_input_content">
                                                        <label className='mv_label_input'>Size</label>
                                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                            <Form.Control
                                                                name='size'
                                                                value={values.size}
                                                                onChange={handleChange}
                                                                placeholder="Enter size" />
                                                        </Form.Group>
                                                        <ErrorMessage name="size" component="small" className="text-danger" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6  col-12">
                                                    <div className="mv_input_content">
                                                        <label className='mv_label_input'>Unit</label>
                                                        <Form.Select
                                                            name='unit'
                                                            value={values.unit}
                                                            onChange={handleChange}
                                                            className='mv_form_select mb-3'>
                                                            <option value="">Select</option>
                                                            <option value="gm">gm</option>
                                                            <option value="ltr">ltr</option>
                                                            <option value="ml">ml</option>
                                                            <option value="GB">GB</option>
                                                        </Form.Select>
                                                        <ErrorMessage name="unit" component="small" className="text-danger" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-12">
                                                    <div className="mv_input_content">
                                                        <label className='mv_label_input'>Short Description</label>
                                                        <Form.Group className="mb-3">
                                                            <Form.Control
                                                                type="text"
                                                                name='shortDescription'
                                                                value={values.shortDescription}
                                                                onChange={handleChange}
                                                                placeholder="Enter Description" />
                                                        </Form.Group>
                                                        <ErrorMessage name="shortDescription" component="small" className="text-danger" />
                                                    </div>
                                                </div>
                                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                    <div className="mv_input_content">
                                                        <label className='mv_label_input'>Stock Status</label>
                                                        <Form.Select
                                                            name='stockStatus'
                                                            value={values.stockStatus}
                                                            onChange={handleChange}
                                                            className='mv_form_select mb-3'>
                                                            <option>Select</option>
                                                            <option value="In Stock">In Stock</option>
                                                            <option value="Low Stock">Low Stock</option>
                                                            <option value="Out of Stock">Out of Stock</option>
                                                        </Form.Select>
                                                        <ErrorMessage name="stockStatus" component="small" className="text-danger" />
                                                    </div>
                                                </div>
                                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                    <div className="mv_input_content">
                                                        <label className='mv_label_input'>Price</label>
                                                        <InputGroup className="mb-3">
                                                            <Form.Control
                                                                name='price'
                                                                value={values.price}
                                                                onChange={handleChange}
                                                                placeholder="Enter price"
                                                            />
                                                        </InputGroup>
                                                        <ErrorMessage name="price" component="small" className="text-danger" />
                                                    </div>
                                                </div>
                                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                    <div className="mv_input_content">
                                                        <label className='mv_label_input'>Discount Price</label>
                                                        <Form.Group className="mb-3">
                                                            <Form.Control
                                                                name='discountPrice'
                                                                value={values.discountPrice}
                                                                onChange={handleChange}
                                                                placeholder="Enter discount price" />
                                                        </Form.Group>
                                                        <ErrorMessage name="discountPrice" component="small" className="text-danger" />
                                                    </div>
                                                </div>
                                                <div className="col-12 mb-3">
                                                    <div className="mv_input_content">
                                                        <label className='mv_label_input'>Product Offer</label>
                                                        <Select options={options} value={values.productOffer} onChange={(option) => setFieldValue('productOffer', option)} />
                                                    </div>
                                                    <ErrorMessage name="productOffer" component="small" className="text-danger" />
                                                </div>
                                                <div className="col-12 mb-3">
                                                    <div className="mv_input_content">
                                                        <label className='mv_label_input'>Colors</label>
                                                        <div className="color-box border rounded p-2 d-flex align-items-center flex-wrap">
                                                            {values.colors.map((color, index) => (
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
                                                        <ErrorMessage name="colors" component="small" className="text-danger" />
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
                                                </div>
                                                {mainCategory !== 'Mobile & Electronics' ? (
                                                    <>
                                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                            <div className="mv_input_content">
                                                                <label className='mv_label_input'>Pattern</label>
                                                                <Form.Group className="mb-3">
                                                                    <Form.Control
                                                                        type="text"
                                                                        name='pattern'
                                                                        value={values.pattern}
                                                                        onChange={handleChange}
                                                                        placeholder="Enter pattern" />
                                                                </Form.Group>
                                                                <ErrorMessage name="pattern" component="small" className="text-danger" />
                                                            </div>
                                                        </div>
                                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                            <div className="mv_input_content">
                                                                <label className='mv_label_input'>Style</label>
                                                                <Form.Group className="mb-3">
                                                                    <Form.Control
                                                                        type="text"
                                                                        name='style'
                                                                        value={values.style}
                                                                        onChange={handleChange}
                                                                        placeholder="Enter style" />
                                                                </Form.Group>
                                                                <ErrorMessage name="style" component="small" className="text-danger" />
                                                            </div>
                                                        </div>
                                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                            <div className="mv_input_content">
                                                                <label className='mv_label_input'>Quanity</label>
                                                                <Form.Group className="mb-3">
                                                                    <Form.Control
                                                                        name='quantity'
                                                                        value={values.quantity}
                                                                        onChange={handleChange}
                                                                        placeholder="Enter quantity" />
                                                                </Form.Group>
                                                                <ErrorMessage name="quantity" component="small" className="text-danger" />
                                                            </div>
                                                        </div>
                                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                            <div className="mv_input_content">
                                                                <label className='mv_label_input'>Brand</label>
                                                                <Form.Select
                                                                    name='brand'
                                                                    value={values.brand}
                                                                    onChange={handleChange}
                                                                    className='mv_form_select mb-3'>
                                                                    <option>Select</option>
                                                                    <option value="Zara">Zara</option>
                                                                    <option value="Levi's">Levi's</option>
                                                                    <option value="Van Heusen">Van Heusen</option>
                                                                </Form.Select>
                                                                <ErrorMessage name="brand" component="small" className="text-danger" />
                                                            </div>
                                                        </div>
                                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                            <div className="mv_input_content">
                                                                <label className='mv_label_input'>Warning</label>
                                                                <Form.Group className="mb-3">
                                                                    <Form.Control
                                                                        type="text"
                                                                        name='warning'
                                                                        value={values.warning}
                                                                        onChange={handleChange}
                                                                        placeholder="Enter warning" />
                                                                </Form.Group>
                                                                <ErrorMessage name="warning" component="small" className="text-danger" />
                                                            </div>
                                                        </div>
                                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                            <div className="mv_input_content">
                                                                <label className='mv_label_input'>Febric</label>
                                                                <Form.Group className="mb-3">
                                                                    <Form.Control
                                                                        type="text"
                                                                        name='febric'
                                                                        value={values.febric}
                                                                        onChange={handleChange}
                                                                        placeholder="Enter Febric" />
                                                                </Form.Group>
                                                                <ErrorMessage name="febric" component="small" className="text-danger" />
                                                            </div>
                                                        </div>
                                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                            <div className="mv_input_content">
                                                                <label className='mv_label_input'>Wash case</label>
                                                                <Form.Group className="mb-3">
                                                                    <Form.Control
                                                                        type="text"
                                                                        name='washCase'
                                                                        value={values.washCase}
                                                                        onChange={handleChange}
                                                                        placeholder="Enter wash case" />
                                                                </Form.Group>
                                                                <ErrorMessage name="washCase" component="small" className="text-danger" />
                                                            </div>
                                                        </div>
                                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                            <div className="mv_input_content">
                                                                <label className='mv_label_input'>Work</label>
                                                                <Form.Group className="mb-3">
                                                                    <Form.Control
                                                                        type="text"
                                                                        name='work'
                                                                        value={values.work}
                                                                        onChange={handleChange}
                                                                        placeholder="Enter work details" />
                                                                </Form.Group>
                                                                <ErrorMessage name="work" component="small" className="text-danger" />
                                                            </div>
                                                        </div>
                                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                            <div className="mv_input_content">
                                                                <label className='mv_label_input'>Occasion</label>
                                                                <Form.Group className="mb-3">
                                                                    <Form.Control
                                                                        type="text"
                                                                        name='occasion'
                                                                        value={values.occasion}
                                                                        onChange={handleChange}
                                                                        placeholder="Enter occasion" />
                                                                </Form.Group>
                                                                <ErrorMessage name="occasion" component="small" className="text-danger" />
                                                            </div>
                                                        </div>
                                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                            <div className="mv_input_content">
                                                                <label className='mv_label_input'>Country Origin</label>
                                                                <Form.Select
                                                                    name='countryOrigin'
                                                                    value={values.countryOrigin}
                                                                    onChange={handleChange}
                                                                    className='mv_form_select mb-3'>
                                                                    <option>Select</option>
                                                                    <option value="India">India</option>
                                                                    <option value="China">China</option>
                                                                    <option value="Nepal">Nepal</option>
                                                                </Form.Select>
                                                                <ErrorMessage name="countryOrigin" component="small" className="text-danger" />
                                                            </div>
                                                        </div>
                                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                            <div className="mv_input_content">
                                                                <label className='mv_label_input'>Gender</label>
                                                                <Form.Select
                                                                    name='gender'
                                                                    value={values.gender}
                                                                    onChange={handleChange}
                                                                    className='mv_form_select mb-3'>
                                                                    <option>Select</option>
                                                                    <option value="Female">Female</option>
                                                                    <option value="Male">Male</option>
                                                                    <option value="Others">Others</option>
                                                                </Form.Select>
                                                                <ErrorMessage name="gender" component="small" className="text-danger" />
                                                            </div>
                                                        </div>
                                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                            <div className="mv_input_content">
                                                                <label className='mv_label_input'>Sleeve Type</label>
                                                                <Form.Group className="mb-3">
                                                                    <Form.Control
                                                                        type="text"
                                                                        name='sleeveType'
                                                                        value={values.sleeveType}
                                                                        onChange={handleChange}
                                                                        placeholder="Enter sleeve type" />
                                                                </Form.Group>
                                                                <ErrorMessage name="sleeveType" component="small" className="text-danger" />
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                            <div className="mv_input_content">
                                                                <label className='mv_label_input'>Front camera</label>
                                                                <Form.Group className="mb-3">
                                                                    <Form.Control
                                                                        type="text"
                                                                        name='frontCamera'
                                                                        value={values.frontCamera}
                                                                        onChange={handleChange}
                                                                        placeholder="Enter style" />
                                                                </Form.Group>
                                                                <ErrorMessage name="frontCamera" component="small" className="text-danger" />
                                                            </div>
                                                        </div>
                                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                            <div className="mv_input_content">
                                                                <label className='mv_label_input'>Browse Type</label>
                                                                <Form.Group className="mb-3">
                                                                    <Form.Control
                                                                        type="text"
                                                                        name='browseType'
                                                                        value={values.browseType}
                                                                        onChange={handleChange}
                                                                        placeholder="Enter browse type" />
                                                                </Form.Group>
                                                                <ErrorMessage name="browseType" component="small" className="text-danger" />
                                                            </div>
                                                        </div>
                                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                            <div className="mv_input_content">
                                                                <label className='mv_label_input'>Quantity</label>
                                                                <Form.Group className="mb-3">
                                                                    <Form.Control
                                                                        name='quantity'
                                                                        value={values.quantity}
                                                                        onChange={handleChange}
                                                                        placeholder="Enter quantity" />
                                                                </Form.Group>
                                                                <ErrorMessage name="quantity" component="small" className="text-danger" />
                                                            </div>
                                                        </div>
                                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                            <div className="mv_input_content">
                                                                <label className='mv_label_input'>Brand</label>
                                                                <Form.Select
                                                                    name='brand'
                                                                    value={values.brand}
                                                                    onChange={handleChange}
                                                                    className='mv_form_select mb-3'>
                                                                    <option>Select</option>
                                                                    <option value="Dell">Dell</option>
                                                                    <option value="HP">HP</option>
                                                                    <option value="Godrej">Godrej</option>
                                                                </Form.Select>
                                                                <ErrorMessage name="brand" component="small" className="text-danger" />
                                                            </div>
                                                        </div>
                                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                            <div className="mv_input_content">
                                                                <label className='mv_label_input'>Warning</label>
                                                                <Form.Group className="mb-3">
                                                                    <Form.Control
                                                                        type="text"
                                                                        name='warning'
                                                                        value={values.warning}
                                                                        onChange={handleChange}
                                                                        placeholder="Enter warning" />
                                                                </Form.Group>
                                                                <ErrorMessage name="warning" component="small" className="text-danger" />
                                                            </div>
                                                        </div>
                                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                            <div className="mv_input_content">
                                                                <label className='mv_label_input'>Modal Name</label>
                                                                <Form.Group className="mb-3">
                                                                    <Form.Control name='modalName' value={values.modalName} onChange={handleChange} placeholder="Enter modal name" />
                                                                </Form.Group>
                                                                <ErrorMessage name="modalName" component="small" className="text-danger" />
                                                            </div>
                                                        </div>
                                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                            <div className="mv_input_content">
                                                                <label className='mv_label_input'>Operating System</label>
                                                                <Form.Group className="mb-3">
                                                                    <Form.Control
                                                                        name='operatingSystem'
                                                                        value={values.operatingSystem}
                                                                        onChange={handleChange}
                                                                        placeholder="Enter Operating System" />
                                                                </Form.Group>
                                                                <ErrorMessage name="operatingSystem" component="small" className="text-danger" />
                                                            </div>
                                                        </div>
                                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                            <div className="mv_input_content">
                                                                <label className='mv_label_input'>Camera & Video</label>
                                                                <Form.Group className="mb-3">
                                                                    <Form.Control
                                                                        type="text"
                                                                        name='cameraVideo'
                                                                        value={values.cameraVideo}
                                                                        onChange={handleChange}
                                                                        placeholder="Enter Camera & Video details" />
                                                                </Form.Group>
                                                                <ErrorMessage name="cameraVideo" component="small" className="text-danger" />
                                                            </div>
                                                        </div>
                                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                            <div className="mv_input_content">
                                                                <label className='mv_label_input'>Screen Size</label>
                                                                <Form.Group className="mb-3">
                                                                    <Form.Control
                                                                        type="text"
                                                                        name='screenSize'
                                                                        value={values.screenSize}
                                                                        onChange={handleChange}
                                                                        placeholder="Enter screen size" />
                                                                </Form.Group>
                                                                <ErrorMessage name="screenSize" component="small" className="text-danger" />
                                                            </div>
                                                        </div>
                                                    </>
                                                )}


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
                                                                        <IoMdClose size={16} style={{ color: '#ff0000' }} onClick={() => removeImage(index, setFieldValue)} />
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
                                                                    onChange={(event) => handleImageSelect(event, setFieldValue)}
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
                                                        <ErrorMessage name="images" component="small" className="text-danger mt-1" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="mv_input_content">
                                                        <label className='mv_label_input'>Description</label>
                                                        <Form.Group className="mb-3">
                                                            <Form.Control
                                                                type="text"
                                                                name="description"
                                                                value={values.description}
                                                                onChange={handleChange}
                                                                placeholder="Enter Description" />
                                                        </Form.Group>
                                                        <ErrorMessage name="description" component="small" className="text-danger mt-1" />
                                                    </div>
                                                </div>
                                                {mainCategory !== 'Mobile & Electronics' ? (
                                                    <div className="col-md-6 col-sm-6">
                                                        <div className="mv_input_content">
                                                            <label className='mv_label_input'>Manufacturing Details</label>
                                                            <Form.Group className="mb-3">
                                                                <Form.Control
                                                                    name='manufacturingDetails'
                                                                    value={values.manufacturingDetails}
                                                                    onChange={handleChange}
                                                                    placeholder="Enter Manufacturing Details" />
                                                            </Form.Group>
                                                            <ErrorMessage name="manufacturingDetails" component="small" className="text-danger mt-1" />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <></>
                                                )}
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="mv_input_content">
                                                        <label className='mv_label_input'>Shipping</label>
                                                        <Form.Group className="mb-3">
                                                            <Form.Control
                                                                name='shipping'
                                                                value={values.shipping}
                                                                onChange={handleChange}
                                                                placeholder="Enter Shipping details" />
                                                        </Form.Group>
                                                        <ErrorMessage name="shipping" component="small" className="text-danger mt-1" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="mv_input_content">
                                                        <label className='mv_label_input'>Return/ Exchange Policy</label>
                                                        <Form.Group className="mb-3">
                                                            <Form.Control
                                                                name='returnExchangePolicy'
                                                                value={values.returnExchangePolicy}
                                                                onChange={handleChange}
                                                                placeholder="Enter Return/ Exchange Policy" />
                                                        </Form.Group>
                                                        <ErrorMessage name="returnExchangePolicy" component="small" className="text-danger mt-1" />
                                                    </div>
                                                </div>
                                                <div className='text-center mt-5'>
                                                    <div className="mv_edit_profile">
                                                        <button className='border-0 bg-transparent'>
                                                            Cancel
                                                        </button>
                                                        {editSize === true ? <button className='border-0 bg-transparent'>
                                                            Update
                                                        </button> :
                                                            <button className='border-0 bg-transparent'>
                                                                Add
                                                            </button>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </Form>
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
