import React, { useEffect, useState } from 'react';
import '../CSS/product.css';
import Form from 'react-bootstrap/Form';
import { Dropdown, DropdownButton, InputGroup } from 'react-bootstrap';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';
import * as Yup from 'yup'
import { isFunction, useFormik } from 'formik';
import { Link } from 'react-router-dom';


const Unit = (props) => {
    var data1 = [
        {   
            id: 1,
            name: "Gram",
            shortname: "Gm",
            status: true,
        },
        {   
            id: 2,
            name: "Liter",
            shortname: "Ltr",
            status: false,
        },
        {   
            id: 3,
            name: "Mili Liter",
            shortname: "ml",
            status: true,
        },
        {   
            id: 4,
            name: "Giga Byte",
            shortname: "GB",
            status: true,
        },
        {   
            id: 5,
            name: "Inch",
            shortname: "In",
            status: true,
        },
        {   
            id: 6,
            name: "Genration",
            shortname: "Gen",
            status: true,
        },
        {   
            id: 7,
            name: "Ton",
            shortname: "Ton",
            status: true,
        },
        {   
            id: 8,
            name: "Centi Meter",
            shortname: "cm",
            status: true,
        },
        {   
            id: 9,
            name: "Meter",
            shortname: "mtr",
            status: true,
        },
        {   
            id: 10,
            name: "Gram",
            shortname: "Gm",
            status: true,
        },
        {   
            id: 11,
            name: "Liter",
            shortname: "Ltr",
            status: true,
        },
    ];

    localStorage.setItem('data3', JSON.stringify(data1))

    const [checkboxes, setCheckboxes] = useState({
        isIDChecked: true,
        isNameChecked: true,
        isShortnameChecked: true,
        isStatusChecked: true,
        isActionChecked: true,
    });

    useEffect(() => {
        const savedCheckboxes = {
            isIDChecked: localStorage.getItem('isIDChecked') === 'true' || true,
            isNameChecked: localStorage.getItem('isNameChecked') === 'true' || true,
            isShortnameChecked: localStorage.getItem('isShortnameChecked') === 'true' || true,
            isStatusChecked: localStorage.getItem('isStatusChecked') === 'true' || true,
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
    const [modalShow1, setModalShow1] = React.useState(false);
    const [modalShow2, setModalShow2] = React.useState(false);

    return (
        <>
            <div id='mv_container_fluid'>
                <div className="mv_main_heading mb-4 d-flex align-items-center justify-content-between">
                    <div>
                        <p className='mb-1'>Unit</p>
                        <div className='d-flex align-items-center'>
                            <p className='mv_dashboard_heading mb-0'>Dashboard /</p>
                            <p className='mv_category_heading mv_subcategory_heading mb-0'>Unit</p>
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
                                        <div className="mv_add_category mv_add_subcategory mv_add_product" onClick={() => setModalShow1(true)}>
                                            <button><Link>+ Add</Link></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mv_product_table_padd">
                                <table className='mv_product_table justify-content-between'>
                                    <thead>
                                        <tr>
                                        {checkboxes.isIDChecked && <th className=''>ID</th>}
                                        {checkboxes.isNameChecked && <th className=''>Name</th>}
                                        {checkboxes.isShortnameChecked && <th className=''>Short Name</th>}
                                        {checkboxes.isStatusChecked && <th className=''>Status</th>}
                                        {checkboxes.isActionChecked && <th className='d-flex align-items-center justify-content-end'>Action</th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item, index) => (
                                        <tr key={index}>
                                            {checkboxes.isIDChecked && <td>{item.id}</td>}
                                            {checkboxes.isNameChecked && <td>{item.name}</td>}
                                            {checkboxes.isShortnameChecked && <td>{item.shortname}</td>}
                                            {checkboxes.isStatusChecked && (
                                                <td>
                                                    <Form.Check
                                                        type="switch"
                                                        id={`custom-switch-${item.id}`}
                                                        label=""
                                                        checked={item.status}
                                                        className=''
                                                    />
                                                </td>
                                                )}
                                            {checkboxes.isActionChecked && (
                                                <td className='d-flex align-items-center justify-content-end'>
                                                    {/* <div className="mv_pencil_icon">
                                                        <Link>
                                                            <img src={require('../mv_img/eyes_icon.png')} alt="" />
                                                        </Link>
                                                    </div> */}
                                                    <div className="mv_pencil_icon" onClick={() => setModalShow2(true)}>
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

            {/* Add Category Model */}
            <Modal show={modalShow1} onHide={() => { setModalShow1(false); handleReset(); }} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header className='mv_edit_profile_header' closeButton>
                    
                </Modal.Header>
                <Modal.Title className='mv_edit_profile_title' id="contained-modal-title-vcenter">
                    Add Unit
                </Modal.Title>
                <Modal.Body className='mv_edit_profile_model_padd'>
                    <form onSubmit={handleSubmit}>
                        <div className="mv_input_content">
                            <label className='mv_edit_profile_label'>Name</label>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Enter unit name"
                                    name='name'
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </InputGroup>
                            {touched.category && errors.category && <div className="error">{errors.category}</div>}
                        </div>
                        <div className="mv_input_content mb-5">
                            <label className='mv_edit_profile_label'>Short Name</label>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Enter short name"
                                    name='name1'
                                    value={values.name1}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </InputGroup>
                            {touched.category && errors.category && <div className="error">{errors.category}</div>}
                        </div>
                        <div className='mv_logout_Model_button d-flex align-items-center justify-content-center mb-4'>
                            <div className="mv_logout_cancel">
                                <button type="button" onClick={() => setModalShow1(false)}>Cancel</button>
                            </div>
                            <div className="mv_logout_button">
                                <button type="submit">Add</button>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            {/* Edit Category Model */}
            <Modal show={modalShow2} onHide={() => { setModalShow2(false); handleReset(); }} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header className='mv_edit_profile_header' closeButton>
                    
                </Modal.Header>
                <Modal.Title className='mv_edit_profile_title' id="contained-modal-title-vcenter">
                    Edit Unit
                </Modal.Title>
                <Modal.Body className='mv_edit_profile_model_padd'>
                    <form onSubmit={handleSubmit}>
                        <div className="mv_input_content">
                            <label className='mv_edit_profile_label'>Name</label>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Enter unit name"
                                    name='name'
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </InputGroup>
                            {touched.category && errors.category && <div className="error">{errors.category}</div>}
                        </div>
                        <div className="mv_input_content mb-5">
                            <label className='mv_edit_profile_label'>Short Name</label>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Enter short name"
                                    name='name1'
                                    value={values.name1}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </InputGroup>
                            {touched.category && errors.category && <div className="error">{errors.category}</div>}
                        </div>
                        <div className='mv_logout_Model_button d-flex align-items-center justify-content-center mb-4'>
                            <div className="mv_logout_cancel">
                                <button type="button" onClick={() => setModalShow1(false)}>Cancel</button>
                            </div>
                            <div className="mv_logout_button">
                                <button type="submit">Update</button>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Unit