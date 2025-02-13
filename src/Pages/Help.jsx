import React, { useEffect, useState } from 'react';
import '../CSS/product.css';
import Form from 'react-bootstrap/Form';
import {  InputGroup } from 'react-bootstrap';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';
import * as Yup from 'yup'
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';


const Help = () => {
    var data1 = [
        {
            id: 1,
            question: "Lorem ipsum dolor sit amet.",
            answer: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse, recusandae.",
        },
        {
            id: 2,
            question: "Lorem ipsum dolor sit amet.",
            answer: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse, recusandae.",
        },
        {
            id: 3,
            question: "Lorem ipsum dolor sit amet.",
            answer: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse, recusandae.",
        },
        {
            id: 4,
            question: "Lorem ipsum dolor sit amet.",
            answer: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse, recusandae.",
        },
        {
            id: 5,
            question: "Lorem ipsum dolor sit amet.",
            answer: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse, recusandae.",
        },
        {
            id: 6,
            question: "Lorem ipsum dolor sit amet.",
            answer: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse, recusandae.",
        },
        {
            id: 7,
            question: "Lorem ipsum dolor sit amet.",
            answer: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse, recusandae.",
        },
        {
            id: 8,
            question: "Lorem ipsum dolor sit amet.",
            answer: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse, recusandae.",
        },
        {
            id: 9,
            question: "Lorem ipsum dolor sit amet.",
            answer: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse, recusandae.",
        },
        {
            id: 10,
            question: "Lorem ipsum dolor sit amet.",
            answer: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse, recusandae.",
        },
        {
            id: 11,
            question: "Lorem ipsum dolor sit amet.",
            answer: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse, recusandae.",
        },
    ];

    localStorage.setItem('data3', JSON.stringify(data1))

    const store_data = (value) => {
        let data = JSON.parse(localStorage.getItem('data2')) || [];

        let id = data.length

        value.id = id + 1;

        if (value.status === 'active') {
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
    const [searchQuery, setSearchQuery] = useState("");
    
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
           // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    const init = {
        question: '',
        answer: ''
    };

    const validation = Yup.object({
        question: Yup.string()
            .min(5, "Enter at least 5 characters")
            .max(100, "Too long for question")
            .required("Question is required"),
        answer: Yup.string()
            .min(5, "Enter at least 5 characters")
            .required("Answer is required"),
    });

    let { handleBlur, handleChange, handleSubmit, handleReset, touched, errors, values } = useFormik({
        initialValues: init,
        validationSchema: validation,
        onSubmit: (value) => {
            store_data(value)
            handleReset();
        }
    });


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


    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };
    
    // Filter data based on search query
    const filteredData = data.filter((item) =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
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
                            <div className='mv_table_search'>
                                <div className="mv_product_search">
                                    <InputGroup>
                                        <Form.Control
                                            placeholder="Search..."
                                            aria-label="Username"
                                            aria-describedby="basic-addon1"
                                            value={searchQuery}
                                            onChange={handleSearch}
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
                                                <td>{item.question}</td>
                                                <td>{item.answer}</td>
                                                <td className='d-flex align-items-center justify-content-end'>
                                                    <div className="mv_pencil_icon" onClick={() => setModalShow2(true)}>
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


            {/* Delete Unit Model */}
            <Modal className='mv_logout_dialog' show={modalShow} onHide={() => setModalShow(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
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

            {/* Add Help Model */}
            <Modal show={modalShow1} onHide={() => { setModalShow1(false); handleReset(); }} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header className='mv_edit_profile_header' closeButton>

                </Modal.Header>
                <Modal.Title className='mv_edit_profile_title' id="contained-modal-title-vcenter">
                    Add Help
                </Modal.Title>
                <Modal.Body className='mv_edit_profile_model_padd'>
                    <form onSubmit={handleSubmit}>
                        <div className="mv_input_content">
                            <label className='mv_edit_profile_label'>Help Question</label>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Enter help question"
                                    name='question'
                                    value={values.question}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </InputGroup>
                            {touched.question && errors.question && <div className="error">{errors.question}</div>}
                        </div>
                        <div className="mv_input_content mb-5">
                            <label className='mv_edit_profile_label'>Answer</label>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Enter answer"
                                    name='answer'
                                    value={values.answer}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </InputGroup>
                            {touched.answer && errors.answer && <div className="error">{errors.answer}</div>}
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

            {/* Edit  Model */}
            <Modal show={modalShow2} onHide={() => { setModalShow2(false); handleReset(); }} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header className='mv_edit_profile_header' closeButton>

                </Modal.Header>
                <Modal.Title className='mv_edit_profile_title' id="contained-modal-title-vcenter">
                    Edit Unit
                </Modal.Title>
                <Modal.Body className='mv_edit_profile_model_padd'>
                    <form onSubmit={handleSubmit}>
                        <div className="mv_input_content">
                            <label className='mv_edit_profile_label'>Help Question</label>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Enter help question"
                                    name='question'
                                    value={values.question}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </InputGroup>
                            {touched.question && errors.question && <div className="error">{errors.question}</div>}
                        </div>
                        <div className="mv_input_content mb-5">
                            <label className='mv_edit_profile_label'>Answer</label>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Enter answer"
                                    name='answer'
                                    value={values.answer}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </InputGroup>
                            {touched.answer && errors.answer && <div className="error">{errors.answer}</div>}
                        </div>
                        <div className='mv_logout_Model_button d-flex align-items-center justify-content-center mb-4'>
                            <div className="mv_logout_cancel">
                                <button type="button" onClick={() => setModalShow2(false)}>Cancel</button>
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

export default Help;