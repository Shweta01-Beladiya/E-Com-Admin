import React, { useEffect, useState } from 'react';
import '../CSS/product.css';
import Form from 'react-bootstrap/Form';
import { Dropdown, DropdownButton, InputGroup } from 'react-bootstrap';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';
import * as Yup from 'yup'
import { isFunction, useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';


const Size = (props) => {

    // Edit Size
    const [editsize,setEditsize] = useState(false);

    const navigate = useNavigate();

    const handleditsize = () => {
        setEditsize(true);
        // navigate('addsize')
    }

    var data1 = [
        {   
            id: 1,
            maincategory: "Women",
            category: "Jewelry",
            subcategory: "Necklace",
            sizename: "Weight",
            size: "56, 74, 70...",
            unit: "gm",
        },
        {   
            id: 2,
            maincategory: "Men",
            category: "Western Wear",
            subcategory: "Blazer",
            sizename: "Length",
            size: "30, 32, 34..",
            unit: "-",
        },
        {   
            id: 3,
            maincategory: "Baby & Kids",
            category: "Baby Care",
            subcategory: "Baby Soap",
            sizename: "Weight",
            size: "50, 75, 100...",
            unit: "gm",
        },
        {   
            id: 4,
            maincategory: "Beauty & Health",
            category: "Skin Care",
            subcategory: "Facewash",
            sizename: "Weight",
            size: "100, 500,...",
            unit: "gm",
        },
        {   
            id: 5,
            maincategory: "Baby & Kids",
            category: "Baby Care",
            subcategory: "Baby Soap",
            sizename: "Weight",
            size: "50, 75, 100...",
            unit: "gm",
        },
        {   
            id: 6,
            maincategory: "Mobile & Electronics",
            category: "Electronics",
            subcategory: "Refrigerator",
            sizename: "Weight",
            size: "265, 280...",
            unit: "ltr",
        },
        {   
            id: 7,
            maincategory: "Beauty & Health",
            category: "Fragrance",
            subcategory: "Perfume",
            sizename: "Weight",
            size: "50, 100...",
            unit: "ml",
        },
        {   
            id: 8,
            maincategory: "Home & Kitchen",
            category: "Kitchen wear",
            subcategory: "Pressure Cooker",
            sizename: "Capacity",
            size: "3, 5, 6, 7...",
            unit: "ltr",
        },
        {   
            id: 9,
            maincategory: "Baby & Kids",
            category: "Baby Care",
            subcategory: "Baby Soap",
            sizename: "Weight",
            size: "50,70,100...",
            unit: "gm",
        },
        {   
            id: 10,
            maincategory: "Mobile & Electronics",
            category: "Mobile",
            subcategory: "Smart Phone",
            sizename: "Storage",
            size: "32, 64, 128...",
            unit: "GB",
        },
        {   
            id: 11,
            maincategory: "Women",
            category: "Jewelry",
            subcategory: "Necklace",
            sizename: "Weight",
            size: "56, 74, 70...",
            unit: "gm",
        },
    ];

    localStorage.setItem('data3', JSON.stringify(data1))

    const [checkboxes, setCheckboxes] = useState({
        isIDChecked: true,
        isMaincategoryChecked: true,
        isCategoryChecked: true,
        isSubcategoryChecked: true,
        isSizenameChecked: true,
        isSizeChecked: true,
        isUnitChecked: true,
        isActionChecked: true,
    });

    useEffect(() => {
        const savedCheckboxes = {
            isIDChecked: localStorage.getItem('isIDChecked') === 'true' || true,
            isMaincategoryChecked: localStorage.getItem('isMaincategoryChecked') === 'true' || true,
            isCategoryChecked: localStorage.getItem('isCategoryChecked') === 'true' || true,
            isSubcategoryChecked: localStorage.getItem('isSubcategoryChecked') === 'true' || true,
            isSizenameChecked: localStorage.getItem('isSizenameChecked') === 'true' || true,
            isSizeChecked: localStorage.getItem('isSizeChecked') === 'true' || true,
            isUnitChecked: localStorage.getItem('isUnitChecked') === 'true' || true,
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

    // Sort Functions
    const [filteredData, setFilteredData] = useState(data1);

    // Pagenation
    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Modal
    const [modalShow, setModalShow] = React.useState(false);

    // Offcanvas
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div id='mv_container_fluid'>
                <div className="mv_main_heading mb-4 d-flex align-items-center justify-content-between">
                    <div>
                        <p className='mb-1'>Size</p>
                        <div className='d-flex align-items-center'>
                            <p className='mv_dashboard_heading mb-0'>Dashboard /</p>
                            <p className='mv_category_heading mv_subcategory_heading mb-0'>Size</p>
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
                                <div className='d-flex'>
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
                                                        <label className='mv_offcanvas_filter_category'>Main Category</label>
                                                        <Form.Select className="mb-3" aria-label="Default select example">
                                                            <option>Select</option>
                                                            <option value="Women">Women</option>
                                                            <option value="Men">Men</option>
                                                            <option value="Baby & Kids">Baby & Kids</option>
                                                            <option value="Beauty & Health">Beauty & Health</option>
                                                            <option value="Home & Kitchen">Home & Kitchen</option>
                                                            <option value="Mobile & Electronics">Mobile & Electronics</option>
                                                        </Form.Select>
                                                    </div>
                                                    <div className="mv_input_content">
                                                        <label className='mv_offcanvas_filter_category'>Category</label>
                                                        <Form.Select className="mb-3" aria-label="Default select example">
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
                                                    <div className="mv_input_content">
                                                        <label className='mv_offcanvas_filter_category'>Sub Category</label>
                                                        <Form.Select className="mb-3" aria-label="Default select example">
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
                                                    <div className="mv_input_content">
                                                        <label className='mv_offcanvas_filter_category'>Size Name</label>
                                                        <Form.Select className="mb-3" aria-label="Default select example">
                                                            <option>Select</option>
                                                            <option value="Weight">Weight</option>
                                                            <option value="Length">Length</option>
                                                            <option value="Capacity">Capacity</option>
                                                            <option value="Storage">Storage</option>
                                                        </Form.Select>
                                                    </div>
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
                                    <div className='mv_category_side mv_product_page_category d-flex align-items-center'>
                                        <div className="mv_add_category mv_add_subcategory mv_add_product">
                                            <button><Link to='/dashboard/addsize'>+ Add</Link></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mv_product_table_padd">
                                <table className='mv_product_table justify-content-between'>
                                    <thead>
                                        <tr>
                                        {checkboxes.isIDChecked && <th className=''>ID</th>}
                                        {checkboxes.isMaincategoryChecked && <th className=''>Main Category</th>}
                                        {checkboxes.isCategoryChecked && <th className=''>Category</th>}
                                        {checkboxes.isSubcategoryChecked && <th className=''>Sub Category</th>}
                                        {checkboxes.isSizenameChecked && <th className=''>Size Name</th>}
                                        {checkboxes.isSizeChecked && <th className=''>Size</th>}
                                        {checkboxes.isUnitChecked && <th className=''>Unit</th>}
                                        {checkboxes.isActionChecked && <th className='d-flex align-items-center justify-content-end'>Action</th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item, index) => (
                                        <tr key={index}>
                                            {checkboxes.isIDChecked && <td>{item.id}</td>}
                                            {checkboxes.isMaincategoryChecked && <td>{item.maincategory}</td>}
                                            {checkboxes.isCategoryChecked && <td>{item.category}</td>}
                                            {checkboxes.isSubcategoryChecked && <td>{item.subcategory}</td>}
                                            {checkboxes.isSizenameChecked && <td>{item.sizename}</td>}
                                            {checkboxes.isSizeChecked && <td>{item.size}</td>}
                                            {checkboxes.isUnitChecked && <td>{item.unit}</td>}
                                            {checkboxes.isActionChecked && (
                                                <td className='d-flex align-items-center justify-content-end'>
                                                    <div className="mv_pencil_icon" onClick={handleditsize}>
                                                        <Link to='/dashboard/addSize' state={{ editSize: true }}>
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
                                    <div className='mv_other_category d-flex align-items-center justify-content-end pb-4 mt-4'>
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
        </>
    );
};

export default Size