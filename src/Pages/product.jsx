import React, { useEffect, useState } from 'react';
import '../CSS/product.css';
import Form from 'react-bootstrap/Form';
import { Dropdown, DropdownButton, InputGroup } from 'react-bootstrap';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';
import * as Yup from 'yup'
import { isFunction, useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
// import ReactSlider from 'react-slider';
import { Link } from 'react-router-dom';
import { FaStar } from "react-icons/fa";


const Product = (props) => {
    var data1 = [
        {   
            id: 1,
            category: "Women",
            subcategory: "Indian Wear",
            productimg: "saree.png",
            name: "Premium Saree",
            price: "$120",
            rating: "4.5",
            stock:"In Stock",
        },
        {
            id: 2,
            category: "Women",
            subcategory: "Indian Wear",
            productimg: "lehenga.png",
            name: "Premium Lehenga",
            price: "$120",
            rating: "4.5",
            stock:"Low Stock",
        },
        {
            id: 3,
            category: "Women",
            subcategory: "Indian Wear",
            productimg: "saree.png",
            name: "Premium Saree",
            price: "$120",
            rating: "4.5",
            stock:"Out of Stock",
        },
        {   
            id: 4,
            category: "Women",
            subcategory: "Indian Wear",
            productimg: "saree.png",
            name: "Premium Saree",
            price: "$120",
            rating: "4.5",
            stock:"In Stock",
        },
        {
            id: 5,
            category: "Women",
            subcategory: "Indian Wear",
            productimg: "lehenga.png",
            name: "Premium Lehenga",
            price: "$120",
            rating: "4.5",
            stock:"Low Stock",
        },
        {
            id: 6,
            category: "Women",
            subcategory: "Indian Wear",
            productimg: "saree.png",
            name: "Premium Saree",
            price: "$120",
            rating: "4.5",
            stock:"Out of Stock",
        },
        {   
            id: 7,
            category: "Women",
            subcategory: "Indian Wear",
            productimg: "saree.png",
            name: "Premium Saree",
            price: "$120",
            rating: "4.5",
            stock:"In Stock",
        },
        {
            id: 8,
            category: "Women",
            subcategory: "Indian Wear",
            productimg: "lehenga.png",
            name: "Premium Lehenga",
            price: "$120",
            rating: "4.5",
            stock:"Low Stock",
        },
        {
            id: 9,
            category: "Women",
            subcategory: "Indian Wear",
            productimg: "saree.png",
            name: "Premium Saree",
            price: "$120",
            rating: "4.5",
            stock:"Out of Stock",
        },
        {
            id: 10,
            category: "Women",
            subcategory: "Indian Wear",
            productimg: "saree.png",
            name: "Premium Saree",
            price: "$120",
            rating: "4.5",
            stock:"Out of Stock",
        },
    ];

    localStorage.setItem('data3', JSON.stringify(data1))

    const [checkboxes, setCheckboxes] = useState({
        isIDChecked: true,
        isCategoryChecked: true,
        isSubCategoryChecked: true,
        isNameChecked: true,
        isPriceChecked: true,
        isRatingChecked: true,
        isStockStatus: true,
        isActionChecked: true,
    });

    useEffect(() => {
        const savedCheckboxes = {
            isIDChecked: localStorage.getItem('isIDChecked') === 'true' || true,
            isCategoryChecked: localStorage.getItem('isCategoryChecked') === 'true' || true,
            isSubCategoryChecked: localStorage.getItem('isSubCategoryChecked') === 'true' || true,
            isNameChecked: localStorage.getItem('isNameChecked') === 'true' || true,
            isPriceChecked: localStorage.getItem('isPriceChecked') === 'true' || true,
            isRatingChecked: localStorage.getItem('isRatingChecked') === 'true' || true,
            isStockStatus: localStorage.getItem('isStockStatus') === 'true' || true,
            isActionChecked: localStorage.getItem('isActionChecked') === 'true' || true,
        };

        setCheckboxes(savedCheckboxes);
    }, []);

    const store_data = (value) => {
        let data = JSON.parse(localStorage.getItem('data2')) || [];

        let id = data.length

        value.id = id + 1;

        if (value.status == 'active') {
            value.status = true
        } else {
            value.status = false
        }


        value.image = "pencil_icon.png";

        data.push(value);

        localStorage.setItem('data2', JSON.stringify(data));

        local_data()

    };

    const itemsPerPage = 10;
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const local_data = async () => {
        const dataFromStorage = await JSON.parse(localStorage.getItem('data3'));
        if (dataFromStorage) {
            const total = Math.ceil(dataFromStorage.length / itemsPerPage);
            setTotalPages(total);

            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;

            setData(dataFromStorage.slice(startIndex, endIndex));
        }
    };

    useEffect(() => {
        local_data();
    }, [currentPage]);


    const [image, setImage] = useState(null);

    const init = {
        name: "",
        status: ""
    };

    const validation = Yup.object({
        name: Yup.string().min(2, "Enter At least 2 characters").max(15, "Too Long For Category").required("Category Must Be required"),
    });

    let { handleBlur, handleChange, handleSubmit, handleReset, touched, errors, values } = useFormik({
        initialValues: init,
        validationSchema: validation,
        onSubmit: (value) => {
            store_data(value)
            handleReset();
        }
    });

    const handleImageChange = (event) => {
        const file = event.currentTarget.files[0];
        setImage(file);
    };

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        setCurrentPage(newPage);
    };

    const getPaginationButtons = () => {
        const buttons = [];
        const maxButtonsToShow = 3;
        let startPage = Math.max(currentPage - 1, 1);
        let endPage = Math.min(startPage + maxButtonsToShow - 1, totalPages);

        if (endPage - startPage + 1 < maxButtonsToShow) {
            startPage = Math.max(endPage - maxButtonsToShow + 1, 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(i);
        }

        return buttons;
    };

    

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;

        setCheckboxes((prevCheckboxes) => {
            const updatedCheckboxes = {
                ...prevCheckboxes,
                [name]: checked,
            };

            localStorage.setItem(name, checked);

            return updatedCheckboxes;
        });
    };

    let { open, setopen } = props;

    // Sort Functions
    const [filteredData, setFilteredData] = useState(data1);

    const sortByName = () => {
        const sortedData = [...filteredData].sort((a, b) => a.name.localeCompare(b.name));
        setFilteredData(sortedData);
        setCurrentPage(1);
    };

    const sortByPriceLowToHigh = () => {
        const sortedData = [...filteredData].sort((a, b) => parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', '')));
        setFilteredData(sortedData);
        setCurrentPage(1);
    };

    const sortByPriceHighToLow = () => {
        const sortedData = [...filteredData].sort((a, b) => parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', '')));
        setFilteredData(sortedData);
        setCurrentPage(1);
    };

    const filterByLowStock = () => {
        const lowStockData = data1.filter(item => parseInt(item.qty) < 20);
        setFilteredData(lowStockData);
        setCurrentPage(1);
    };

    const filterByInStock = () => {
        const inStockData = data1.filter(item => item.status === true);
        setFilteredData(inStockData);
        setCurrentPage(1);
    };

    // Pagenation
    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const [modalShow, setModalShow] = React.useState(false);
    const [modalShow3, setModalShow3] = React.useState(false);

    // offcanvas
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // offcanvas price
    const [priceRange, setPriceRange] = useState([0, 300]);
    const handleSliderChange = (newRange) => {
        setPriceRange(newRange);
    };

    return (
        <>
            <div id='mv_container_fluid'>
                <div className="mv_main_heading mb-4 d-flex align-items-center justify-content-between">
                    <div>
                        <p className='mb-1'>Product</p>
                        <div className='d-flex align-items-center'>
                            <p className='mv_dashboard_heading mb-0'>Dashboard /</p>
                            <p className='mv_category_heading mv_subcategory_heading mb-0'>Product</p>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-12">
                        <div className="mv_product_table_content">
                            <div className='mv_table_search'>
                                <div className="mv_product_search">
                                    <InputGroup>
                                        <Form.Control
                                        placeholder="Search..."
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                        />
                                    </InputGroup>
                                </div>
                                <div>
                                    <div className='mv_category_side mv_product_page_category d-flex align-items-center'>
                                        <div className="mv_column_button mv_column_padd">
                                            <Button variant="primary" onClick={handleShow}>
                                                <img src={require('../mv_img/filter.png')} alt="" />
                                                Filters
                                            </Button>
                                            <Offcanvas show={show} onHide={handleClose} placement='end' className="mv_offcanvas_filter">
                                                <Offcanvas.Header closeButton className='mv_offcanvas_filter_heading'>
                                                    <Offcanvas.Title className='mv_offcanvas_filter_title'>Filters</Offcanvas.Title>
                                                </Offcanvas.Header>
                                                <Offcanvas.Body className=''>
                                                    <div>
                                                        <div className="mv_input_content mt-3">
                                                            <label className='mv_offcanvas_filter_category'>Category</label>
                                                            <Form.Select className="mb-4" aria-label="Default select example">
                                                                <option>Select Category</option>
                                                                <option value="1">Vegetable</option>
                                                                <option value="2">Fruit</option>
                                                            </Form.Select>
                                                        </div>
                                                        <div className="mv_input_content mt-3">
                                                            <label className='mv_offcanvas_filter_category'>Subcategory</label>
                                                            <Form.Select className="mb-4" aria-label="Default select example">
                                                                <option>Select Subcategory</option>
                                                                <option value="1">One</option>
                                                                <option value="2">Two</option>
                                                                <option value="3">Three</option>
                                                            </Form.Select>
                                                        </div>
                                                        <div className="mv_input_content">
                                                            <label className='mv_offcanvas_filter_category'>Status</label>
                                                            <Form.Select className="mb-4" aria-label="Default select example">
                                                                <option>Select Status</option>
                                                                <option value="1">One</option>
                                                                <option value="2">Two</option>
                                                                <option value="3">Three</option>
                                                            </Form.Select>
                                                        </div>
                                                        <label className='mv_offcanvas_filter_category'>Price</label>
                                                        {/* <div className="mv_price_range">
                                                            <ReactSlider
                                                                className="mv_horisilder"
                                                                thumbClassName="mv_thumb"
                                                                trackClassName="mv_track"
                                                                min={0}
                                                                max={300}
                                                                value={priceRange}
                                                                onChange={handleSliderChange}
                                                                minDistance={50}
                                                                withTracks={true}
                                                                pearling
                                                                renderTrack={(props, state) => (
                                                                    <div {...props} className={`mv_track ${state.index === 1 ? 'mv_track_active' : ''}`}></div>
                                                                )}
                                                            />
                                                            <div className="mv_price_label mv_price_min" style={{ left: `${(priceRange[0] / 300) * 100}%` }}>
                                                                ${priceRange[0]}
                                                            </div>
                                                            <div className="mv_price_label mv_price_max" style={{ left: `${(priceRange[1] / 300) * 100}%` }}>
                                                                ${priceRange[1]}
                                                            </div>
                                                        </div> */}
                                                    </div>
                                                    <div className='mv_offcanvas_bottom_button'>
                                                        <div className='mv_logout_Model_button d-flex align-items-center justify-content-center'>
                                                            <div className="mv_logout_cancel">
                                                                <button type="button">Cancel</button>
                                                            </div>
                                                            <div className="mv_logout_button">
                                                                <button type="submit">Apply</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Offcanvas.Body>
                                            </Offcanvas>
                                        </div>
                                        <div className="mv_add_category mv_add_subcategory mv_add_product">
                                            <button><Link to='/add_product'>+ Add</Link></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mv_product_table_padd">
                                <table className='mv_product_table justify-content-between'>
                                    <thead>
                                        <tr>
                                        {checkboxes.isIDChecked && <th className=''>ID</th>}
                                        {checkboxes.isCategoryChecked && <th className=''>Main Category</th>}
                                        {checkboxes.isSubCategoryChecked && <th className=''>Category</th>}
                                        {checkboxes.isNameChecked && <th className=''>Product Name</th>}
                                        {checkboxes.isPriceChecked && <th className=''>Price</th>}
                                        {checkboxes.isRatingChecked && <th className=''>Rating</th>}
                                        {checkboxes.isStockStatus && <th className=''>Stock Status</th>}
                                        {checkboxes.isActionChecked && <th className=''>Action</th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item, index) => (
                                        <tr key={index}>
                                            {checkboxes.isIDChecked && <td>{item.id}</td>}
                                            {checkboxes.isCategoryChecked && <td>{item.category}</td>}
                                            {checkboxes.isSubCategoryChecked && <td>{item.subcategory}</td>}
                                            <td>
                                                <img className='mv_product_img mv_product_radius_img' src={require(`../mv_img/${item.productimg}`)}  alt="" />
                                                {item.name}
                                            </td>
                                            {checkboxes.isPriceChecked && <td>{item.price}</td>}
                                            {checkboxes.isRatingChecked && 
                                            <td>
                                                <div className='mv_rating_img'>
                                                <FaStar className='mv_star_yellow'/>
                                                {item.rating}
                                                </div>
                                            </td>
                                            }
                                            {checkboxes.isStockStatus && (
                                                <td>
                                                    {
                                                        item.stock === 'In Stock' ? (
                                                            <p className='m-0 mv_delivered_padd'>{item.stock}</p>
                                                        ) : item.stock === 'Low Stock' ? (
                                                            <p className='m-0 mv_pending_padd'>{item.stock}</p>
                                                        ) : item.stock === 'Out of Stock' ? (
                                                            <p className='m-0 mv_cancelled_padd'>{item.stock}</p>
                                                        ) : null
                                                    }
                                                </td>
                                            )}
                                            {checkboxes.isActionChecked && (
                                                <td className='d-flex align-items-center'>
                                                    <div className="mv_pencil_icon">
                                                        <Link>
                                                            <img src={require('../mv_img/eyes_icon.png')} alt="" />
                                                        </Link>
                                                    </div>
                                                    <div className="mv_pencil_icon">
                                                        <Link>
                                                            <img src={require('../mv_img/pencil_icon.png')} alt="" />
                                                        </Link>
                                                    </div>
                                                    <div className="mv_pencil_icon" onClick={() => setModalShow(true)}>
                                                        <img src={require('../mv_img/trust_icon.png')} alt="" />
                                                    </div>
                                                </td>
                                            )}
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {totalPages > 1 && (
                                    <div className='mv_other_category d-flex align-items-center justify-content-end pb-4'>
                                        <p className='mb-0' onClick={() => handlePageChange(currentPage - 1)}>
                                            <MdOutlineKeyboardArrowLeft />
                                        </p>
                                        {getPaginationButtons().map((page, index) => (
                                            <p key={index} className={`mb-0 ${currentPage === page ? 'mv_active' : ''}`}
                                                onClick={() => handlePageChange(page)}>
                                                {page}
                                            </p>
                                        ))}
                                        <p className='mb-0' onClick={() => handlePageChange(currentPage + 1)}>
                                            <MdOutlineKeyboardArrowRight />
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Delete Product Model */}
            <Modal className='mv_logout_dialog' show={modalShow} onHide={() => setModalShow(false)} size="lg" aria- labelledby="contained-modal-title-vcenter" centered >
                <Modal.Body className='text-center mv_logout'>
                    <h5 className='mb-2'>Delete?</h5>
                    <p>Are you sure you want to delete<br /> Product?</p>
                    <div className='mv_logout_Model_button d-flex align-items-center justify-content-center'>
                        <div className="mv_logout_cancel">
                            <button onClick={() => setModalShow(false)}>Cancel</button>
                        </div>
                        <div className="mv_logout_button">
                            <button>Delete</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Delete All Product Model */}
            <Modal className='mv_logout_dialog' show={modalShow3} onHide={() => setModalShow3(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Body className='text-center mv_logout'>
                    <h5 className='mb-2'>Delete?</h5>
                    <p>Are you sure you want to delete<br />all Product?</p>
                    <div className='mv_logout_Model_button d-flex align-items-center justify-content-center'>
                        <div className="mv_logout_cancel">
                            <button onClick={() => setModalShow3(false)}>Cancel</button>
                        </div>
                        <div className="mv_logout_button">
                            <button>Delete</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Product