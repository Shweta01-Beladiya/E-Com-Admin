import React, { useEffect, useState } from 'react';
import '../CSS/product.css';
import Form from 'react-bootstrap/Form';
import { Dropdown, DropdownButton, InputGroup } from 'react-bootstrap';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Help = (props) => {
   
    var data = [
        {   
            id: 1,
            faqquestion: "Lorem ipsum dolor sit amet consectetur",
            answer: "Lorem ipsum dolor sit amet consectetu Lorem ipsum dolor sit amet",
        },
        {   
            id: 2,
            faqquestion: "Lorem ipsum dolor sit amet consectetur",
            answer: "Lorem ipsum dolor sit amet consectetu Lorem ipsum dolor sit amet",
        },
        {   
            id: 3,
            faqquestion: "Lorem ipsum dolor sit amet consectetur",
            answer: "Lorem ipsum dolor sit amet consectetu Lorem ipsum dolor sit amet",
        },
        {   
            id: 4,
            faqquestion: "Lorem ipsum dolor sit amet consectetur",
            answer: "Lorem ipsum dolor sit amet consectetu Lorem ipsum dolor sit amet",
        },
        {   
            id: 5,
            faqquestion: "Lorem ipsum dolor sit amet consectetur",
            answer: "Lorem ipsum dolor sit amet consectetu Lorem ipsum dolor sit amet",
        },
        {   
            id: 6,
            faqquestion: "Lorem ipsum dolor sit amet consectetur",
            answer: "Lorem ipsum dolor sit amet consectetu Lorem ipsum dolor sit amet",
        },
        {   
            id: 7,
            faqquestion: "Lorem ipsum dolor sit amet consectetur",
            answer: "Lorem ipsum dolor sit amet consectetu Lorem ipsum dolor sit amet",
        },
        {   
            id: 8,
            faqquestion: "Lorem ipsum dolor sit amet consectetur",
            answer: "Lorem ipsum dolor sit amet consectetu Lorem ipsum dolor sit amet",
        },
        {   
            id: 9,
            faqquestion: "Lorem ipsum dolor sit amet consectetur",
            answer: "Lorem ipsum dolor sit amet consectetu Lorem ipsum dolor sit amet",
        },
        {   
            id: 10,
            faqquestion: "Lorem ipsum dolor sit amet consectetur",
            answer: "Lorem ipsum dolor sit amet consectetu Lorem ipsum dolor sit amet",
        },
        {   
            id: 11,
            faqquestion: "Lorem ipsum dolor sit amet consectetur",
            answer: "Lorem ipsum dolor sit amet consectetu Lorem ipsum dolor sit amet",
        },
    ];

    // ************************************** Pagination **************************************
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredData, setFilteredData] = useState(data);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    console.log("totalpage",totalPages)

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const getPaginationButtons = () => {
        const buttons = [];
        const maxButtonsToShow = 5;
        
        let startPage = Math.max(1, currentPage - Math.floor(maxButtonsToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);
        
        // Adjust startPage if we're near the end
        if (endPage - startPage + 1 < maxButtonsToShow) {
            startPage = Math.max(1, endPage - maxButtonsToShow + 1);
        }

        // Add first page if not included
        if (startPage > 1) {
            buttons.push(1);
            if (startPage > 2) buttons.push('...');
        }

        // Add main page numbers
        for (let i = startPage; i <= endPage; i++) {
            buttons.push(i);
        }

        // Add last page if not included
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) buttons.push('...');
            buttons.push(totalPages);
        }
        return buttons;
    };

    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    // *******************************************************************************
    
    // Modal
    const [modalShow, setModalShow] = React.useState(false);
    const [modalShow1, setModalShow1] = React.useState(false);

    // const [values, setValues] = useState({
    //     name: "",
    //     name1: ""
    // });

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setValues({ ...values, [name]: value });
    // };

    // ******************************* Validation *******************************
    const [id, setId] = useState(null);

    const init = {
        helpquestion: "",
        answer: "",
    };
    
    const validate = Yup.object().shape({
        helpquestion: Yup.string().required("Help question is required"),
        answer: Yup.string().required("Answer is required")
    });
    
    const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: init,
        validationSchema: validate,
        onSubmit: (values) => {
            console.log(values);
            // help(values)
        }
    });
    // *******************************************************************************
    
    // State variables
    let [description, setDescription] = useState("");

    return (
        <>
            <div id='mv_container_fluid'>
                <div className="mv_main_heading mb-4 d-flex align-items-center justify-content-between">
                    <div>
                        <p className='mb-1'>Help</p>
                        <div className='d-flex align-items-center'>
                            <p className='mv_dashboard_heading mb-0'>Dashboard /</p>
                            <p className='mv_category_heading mv_subcategory_heading mb-0'>Help</p>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-12">
                        <div className="mv_product_table_content">
                            <div className='mv_table_search mv_table_no_flex'>
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
                                            <th className=''>ID</th>
                                            <th className=''>Help Question</th>
                                            <th className=''>Answer</th>
                                            <th className='d-flex align-items-center justify-content-end'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.faqquestion}</td>
                                            <td>{item.answer}</td>
                                            <td className='d-flex align-items-center justify-content-end'>
                                                <div className="mv_pencil_icon" onClick={() => setModalShow1(true)}>
                                                    <Link>
                                                        <img src={require('../mv_img/pencil_icon.png')} alt="" />
                                                    </Link>
                                                </div>
                                                <div className="mv_pencil_icon" onClick={() => setModalShow(true)}>
                                                    <img src={require('../mv_img/trust_icon.png')} alt="" />
                                                </div>
                                            </td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
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


            {/* Delete Help Modal */}
            <Modal className='mv_logout_dialog' show={modalShow} onHide={() => setModalShow(false)} size="lg" aria- labelledby="contained-modal-title-vcenter" centered >
                <Modal.Body className='text-center mv_logout'>
                    <h5 className='mb-2'>Delete</h5>
                    <p>Are you sure you want to delete Help?</p>
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

            {/* Add Edit Help Modal */}
            <Modal show={modalShow1} onHide={() => { setModalShow1(false); setId(null); }} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header className='mv_edit_profile_header' closeButton>
                    
                </Modal.Header>
                <Modal.Title className='mv_edit_profile_title' id="contained-modal-title-vcenter">
                    {id ? 'Edit Help' : 'Add Help'}
                </Modal.Title>
                <Modal.Body className='mv_edit_profile_model_padd'>
                    <form onSubmit={handleSubmit}>
                        <div className="mv_input_content mb-3">
                            <label className='mv_label_input'>Help Question</label>
                            <InputGroup className="">
                                <Form.Control
                                    placeholder="Enter help question"
                                    name="helpquestion"
                                    value={values.helpquestion}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </InputGroup>
                            {errors.helpquestion && touched.helpquestion && <div className="text-danger small">{errors.helpquestion}</div>}
                        </div>
                        <div className="mv_input_content mb-5">
                            <label className='mv_label_input'>Answer</label>
                            <InputGroup className="">
                                <Form.Control
                                    placeholder="Enter answer"
                                    name="answer"
                                    value={values.answer}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    as="textarea" 
                                    aria-label="With textarea"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                            {errors.answer && touched.answer && <div className="text-danger small">{errors.answer}</div>}
                        </div>
                        <div className='mv_logout_Model_button d-flex align-items-center justify-content-center mb-4'>
                            <div className="mv_logout_cancel">
                                <button type="button" onClick={() => setModalShow1(false)}>Cancel</button>
                            </div>
                            <div className="mv_logout_button">
                                <button type="submit">
                                    {id ? 'Update' : 'Add'}
                                </button>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

        </>
    );
};

export default Help