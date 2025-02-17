import React, { useEffect, useState, useRef } from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import '../CSS/vaidik.css';
import { useLocation } from 'react-router-dom';
import Select from 'react-select';
import { SketchPicker } from 'react-color';
import { IoMdClose } from "react-icons/io";

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

    const options = [
        { value: 'New100', label: 'NEW100' },
        { value: 'New200', label: 'NEW200' },
        { value: 'New300', label: 'NEW300' }
    ]

    let change_edit = () => {
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
        // Get button position
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

    const handleImageSelect = (event) => {
        const files = Array.from(event.target.files);

        // Create new image entries with both file and name
        const newImages = files.map(file => ({
            file: file,
            name: file.name,
            preview: URL.createObjectURL(file)
        }));

        setSelectedImages(prevImages => [...prevImages, ...newImages]);
    };

    // Remove image
    const removeImage = (index) => {
        setSelectedImages(prevImages => {
            // Revoke the URL to avoid memory leaks
            URL.revokeObjectURL(prevImages[index].preview);
            return prevImages.filter((_, i) => i !== index);
        });
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
                                <form onSubmit={handlesubmit}>
                                    <div className="row">
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content">
                                                <label className='mv_label_input'>Main Category</label>
                                                <Form.Select
                                                    aria-label="Default select example"
                                                    className='mv_form_select mb-3'
                                                    value={mainCategory}
                                                    onChange={handleMainCategoryChange}>
                                                    <option>Select</option>
                                                    <option value="Women">Women</option>
                                                    <option value="Men">Men</option>
                                                    <option value="Baby & Kids">Baby & Kids</option>
                                                    <option value="Beauty & Health">Beauty & Health</option>
                                                    <option value="Home & Kitchen">Home & Kitchen</option>
                                                    <option value="Mobile & Electronics">Mobile & Electronics</option>
                                                </Form.Select>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content">
                                                <label className='mv_label_input'>Category</label>
                                                <Form.Select
                                                    aria-label="Default select example"
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
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content">
                                                <label className='mv_label_input'>Sub Category</label>
                                                <Form.Select
                                                    aria-label="Default select example"
                                                    className='mv_form_select mb-3'>
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
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content">
                                                <label className='mv_label_input'>Product</label>
                                                <InputGroup className="mb-3">
                                                    <Form.Control
                                                        placeholder="Enter product name"
                                                        aria-label="name"
                                                        aria-describedby="basic-addon1"
                                                    />
                                                </InputGroup>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content">
                                                <label className='mv_label_input'>Size Name</label>
                                                <Form.Select
                                                    aria-label="Default select example"
                                                    className='mv_form_select mb-3'>
                                                    <option>Select</option>
                                                    <option value="Women">Women</option>
                                                    <option value="Men">Men</option>
                                                    <option value="Baby & Kids">Baby & Kids</option>
                                                    <option value="Beauty & Health">Beauty & Health</option>
                                                    <option value="Home & Kitchen">Home & Kitchen</option>
                                                    <option value="Mobile & Electronics">Mobile & Electronics</option>
                                                </Form.Select>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content">
                                                <label className='mv_label_input'>Size</label>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Control
                                                        type=""
                                                        placeholder="Enter size" />
                                                </Form.Group>
                                            </div>
                                        </div>
                                        <div className="col-md-6  col-12">
                                            <div className="mv_input_content">
                                                <label className='mv_label_input'>Unit</label>
                                                <Form.Select
                                                    aria-label="Default select example"
                                                    className='mv_form_select mb-3'>
                                                    <option value="">Select</option>
                                                    <option value="gm">gm</option>
                                                    <option value="ltr">ltr</option>
                                                    <option value="ml">ml</option>
                                                    <option value="GB">GB</option>
                                                </Form.Select>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <div className="mv_input_content">
                                                <label className='mv_label_input'>Short Description</label>
                                                <Form.Group className="mb-3">
                                                    <Form.Control
                                                        type=""
                                                        placeholder="Enter Description" />
                                                </Form.Group>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content">
                                                <label className='mv_label_input'>Stock Status</label>
                                                <Form.Select
                                                    aria-label="Default select example"
                                                    className='mv_form_select mb-3'>
                                                    <option>Select</option>
                                                    <option value="In Stock">In Stock</option>
                                                    <option value="Low Stock">Low Stock</option>
                                                    <option value="Out of Stock">Out of Stock</option>
                                                </Form.Select>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content">
                                                <label className='mv_label_input'>Price</label>
                                                <InputGroup className="mb-3">
                                                    <Form.Control
                                                        placeholder="Enter price"
                                                        aria-label="name"
                                                        aria-describedby="basic-addon1"
                                                    />
                                                </InputGroup>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="mv_input_content">
                                                <label className='mv_label_input'>Discount Price</label>
                                                <Form.Group className="mb-3">
                                                    <Form.Control
                                                        type=""
                                                        placeholder="Enter discount price" />
                                                </Form.Group>
                                            </div>
                                        </div>
                                        <div className="col-12 mb-3">
                                            <div className="mv_input_content">
                                                <label className='mv_label_input'>Product Offer</label>
                                                <Select options={options} />
                                            </div>
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
                                        </div>
                                        {mainCategory !== 'Mobile & Electronics' ? (
                                            <>
                                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                    <div className="mv_input_content">
                                                        <label className='mv_label_input'>Pattern</label>
                                                        <Form.Group className="mb-3">
                                                            <Form.Control
                                                                type=""
                                                                placeholder="Enter pattern" />
                                                        </Form.Group>
                                                    </div>
                                                </div>
                                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                    <div className="mv_input_content">
                                                        <label className='mv_label_input'>Style</label>
                                                        <Form.Group className="mb-3">
                                                            <Form.Control
                                                                type=""
                                                                placeholder="Enter style" />
                                                        </Form.Group>
                                                    </div>
                                                </div>
                                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                    <div className="mv_input_content">
                                                        <label className='mv_label_input'>Quanity</label>
                                                        <Form.Group className="mb-3">
                                                            <Form.Control
                                                                type=""
                                                                placeholder="Enter quantity" />
                                                        </Form.Group>
                                                    </div>
                                                </div>
                                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                    <div className="mv_input_content">
                                                        <label className='mv_label_input'>Brand</label>
                                                        <Form.Select
                                                            aria-label="Default select example"
                                                            className='mv_form_select mb-3'>
                                                            <option>Select</option>
                                                            <option value="Zara">Zara</option>
                                                            <option value="Levi's">Levi's</option>
                                                            <option value="Van Heusen">Van Heusen</option>
                                                        </Form.Select>
                                                    </div>
                                                </div>
                                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                    <div className="mv_input_content">
                                                        <label className='mv_label_input'>Warning</label>
                                                        <Form.Group className="mb-3">
                                                            <Form.Control
                                                                type=""
                                                                placeholder="Enter warning" />
                                                        </Form.Group>
                                                    </div>
                                                </div>
                                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                    <div className="mv_input_content">
                                                        <label className='mv_label_input'>Febric</label>
                                                        <Form.Group className="mb-3">
                                                            <Form.Control
                                                                type=""
                                                                placeholder="Enter Febric" />
                                                        </Form.Group>
                                                    </div>
                                                </div>
                                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                    <div className="mv_input_content">
                                                        <label className='mv_label_input'>Wash case</label>
                                                        <Form.Group className="mb-3">
                                                            <Form.Control
                                                                type=""
                                                                placeholder="Enter wash case" />
                                                        </Form.Group>
                                                    </div>
                                                </div>
                                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                    <div className="mv_input_content">
                                                        <label className='mv_label_input'>Work</label>
                                                        <Form.Group className="mb-3">
                                                            <Form.Control
                                                                type=""
                                                                placeholder="Enter work details" />
                                                        </Form.Group>
                                                    </div>
                                                </div>
                                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                    <div className="mv_input_content">
                                                        <label className='mv_label_input'>Occasion</label>
                                                        <Form.Group className="mb-3">
                                                            <Form.Control
                                                                type=""
                                                                placeholder="Enter occasion" />
                                                        </Form.Group>
                                                    </div>
                                                </div>
                                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                    <div className="mv_input_content">
                                                        <label className='mv_label_input'>Country Origin</label>
                                                        <Form.Select
                                                            aria-label="Default select example"
                                                            className='mv_form_select mb-3'>
                                                            <option>Select</option>
                                                            <option value="India">India</option>
                                                            <option value="China">China</option>
                                                            <option value="Nepal">Nepal</option>
                                                        </Form.Select>
                                                    </div>
                                                </div>
                                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                    <div className="mv_input_content">
                                                        <label className='mv_label_input'>Gender</label>
                                                        <Form.Select
                                                            aria-label="Default select example"
                                                            className='mv_form_select mb-3'>
                                                            <option>Select</option>
                                                            <option value="Female">Female</option>
                                                            <option value="Male">Male</option>
                                                            <option value="Others">Others</option>
                                                        </Form.Select>
                                                    </div>
                                                </div>
                                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                    <div className="mv_input_content">
                                                        <label className='mv_label_input'>Sleeve Type</label>
                                                        <Form.Group className="mb-3">
                                                            <Form.Control
                                                                type=""
                                                                placeholder="Enter sleeve type" />
                                                        </Form.Group>
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
                                                                type=""
                                                                placeholder="Enter style" />
                                                        </Form.Group>
                                                    </div>
                                                </div>
                                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                    <div className="mv_input_content">
                                                        <label className='mv_label_input'>Browse Type</label>
                                                        <Form.Group className="mb-3">
                                                            <Form.Control
                                                                type=""
                                                                placeholder="Enter browse type" />
                                                        </Form.Group>
                                                    </div>
                                                </div>
                                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                    <div className="mv_input_content">
                                                        <label className='mv_label_input'>Quantity</label>
                                                        <Form.Group className="mb-3">
                                                            <Form.Control
                                                                type=""
                                                                placeholder="Enter quantity" />
                                                        </Form.Group>
                                                    </div>
                                                </div>
                                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                    <div className="mv_input_content">
                                                        <label className='mv_label_input'>Brand</label>
                                                        <Form.Select
                                                            aria-label="Default select example"
                                                            className='mv_form_select mb-3'>
                                                            <option>Select</option>
                                                            <option value="Dell">Dell</option>
                                                            <option value="HP">HP</option>
                                                            <option value="Godrej">Godrej</option>
                                                        </Form.Select>
                                                    </div>
                                                </div>
                                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                    <div className="mv_input_content">
                                                        <label className='mv_label_input'>Warning</label>
                                                        <Form.Group className="mb-3">
                                                            <Form.Control
                                                                type=""
                                                                placeholder="Enter warning" />
                                                        </Form.Group>
                                                    </div>
                                                </div>
                                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                    <div className="mv_input_content">
                                                        <label className='mv_label_input'>Modal Name</label>
                                                        <Form.Group className="mb-3">
                                                            <Form.Control
                                                                type=""
                                                                placeholder="Enter modal name" />
                                                        </Form.Group>
                                                    </div>
                                                </div>
                                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                    <div className="mv_input_content">
                                                        <label className='mv_label_input'>Operating System</label>
                                                        <Form.Group className="mb-3">
                                                            <Form.Control
                                                                type=""
                                                                placeholder="Enter Operating System" />
                                                        </Form.Group>
                                                    </div>
                                                </div>
                                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                    <div className="mv_input_content">
                                                        <label className='mv_label_input'>Camera & Video</label>
                                                        <Form.Group className="mb-3">
                                                            <Form.Control
                                                                type=""
                                                                placeholder="Enter Camera & Video details" />
                                                        </Form.Group>
                                                    </div>
                                                </div>
                                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                    <div className="mv_input_content">
                                                        <label className='mv_label_input'>Screen Size</label>
                                                        <Form.Group className="mb-3">
                                                            <Form.Control
                                                                type=""
                                                                placeholder="Enter screen size" />
                                                        </Form.Group>
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
                                                                <IoMdClose size={16} style={{ color: '#ff0000' }} onClick={() => removeImage(index)} />
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
                                        </div>
                                        <div className="col-md-6 col-sm-6">
                                            <div className="mv_input_content">
                                                <label className='mv_label_input'>Description</label>
                                                <Form.Group className="mb-3">
                                                    <Form.Control
                                                        type=""
                                                        placeholder="Enter Description" />
                                                </Form.Group>
                                            </div>
                                        </div>
                                        {!mainCategory === 'Mobile & Electronics' ? (
                                        <div className="col-md-6 col-sm-6">
                                            <div className="mv_input_content">
                                                <label className='mv_label_input'>Manufacturing Details</label>
                                                <Form.Group className="mb-3">
                                                    <Form.Control
                                                        type=""
                                                        placeholder="Enter Manufacturing Details" />
                                                </Form.Group>
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
                                                        type=""
                                                        placeholder="Enter Shipping details" />
                                                </Form.Group>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-6">
                                            <div className="mv_input_content">
                                                <label className='mv_label_input'>Return/ Exchange Policy</label>
                                                <Form.Group className="mb-3">
                                                    <Form.Control
                                                        type=""
                                                        placeholder="Enter Return/ Exchange Policy" />
                                                </Form.Group>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddProduct;
