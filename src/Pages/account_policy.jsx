import React, { useEffect, useState } from 'react';
import '../CSS/product.css';
import Form from 'react-bootstrap/Form';
import { Dropdown, DropdownButton, InputGroup } from 'react-bootstrap';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

const Accountpolicy = (props) => {
   
    var data = [
        {   
            id: 1,
            accountpolicy: "Lorem ipsum dolor sit amet consectetur",
        },
        {   
            id: 2,
            accountpolicy: "Lorem ipsum dolor sit amet consectetur",
        },
        {   
            id: 3,
            accountpolicy: "Lorem ipsum dolor sit amet consectetur",
        },
        {   
            id: 4,
            accountpolicy: "Lorem ipsum dolor sit amet consectetur",
        },
        {   
            id: 5,
            accountpolicy: "Lorem ipsum dolor sit amet consectetur",
        },
        {   
            id: 6,
            accountpolicy: "Lorem ipsum dolor sit amet consectetur",
        },
        {   
            id: 7,
            accountpolicy: "Lorem ipsum dolor sit amet consectetur",
        },
        {   
            id: 8,
            accountpolicy: "Lorem ipsum dolor sit amet consectetur",
        },
        {   
            id: 9,
            accountpolicy: "Lorem ipsum dolor sit amet consectetur",
        },
        {   
            id: 10,
            accountpolicy: "Lorem ipsum dolor sit amet consectetur",
        },
        {   
            id: 11,
            accountpolicy: "Lorem ipsum dolor sit amet consectetur",
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
    const [modalShow2, setModalShow2] = React.useState(false);

    const [values, setValues] = useState({
        name: "",
        name1: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };
    
    // State variables
    let [description, setDescription] = useState("");

    return (
        <>
            <div id='mv_container_fluid'>
                <div className="mv_main_heading mb-4 d-flex align-items-center justify-content-between">
                    <div>
                        <p className='mb-1'>Account Policy</p>
                        <div className='d-flex align-items-center'>
                            <p className='mv_dashboard_heading mb-0'>Dashboard /</p>
                            <p className='mv_category_heading mv_subcategory_heading mb-0'>Account Policy</p>
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
                                            <th width="33.33%" className=''>ID</th>
                                            <th width="33.33%" className=''>Account Policy</th>
                                            <th className='d-flex align-items-center justify-content-end'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.accountpolicy}</td>
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

            {/* Delete Account Policy Model */}
            <Modal className='mv_logout_dialog' show={modalShow} onHide={() => setModalShow(false)} size="lg" aria- labelledby="contained-modal-title-vcenter" centered >
                <Modal.Body className='text-center mv_logout'>
                    <h5 className='mb-2'>Delete</h5>
                    <p>Are you sure you want to delete Account Policy?</p>
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

            {/* Add Account Policy Model */}
            <Modal show={modalShow1} onHide={() => { setModalShow1(false); }} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header className='mv_edit_profile_header' closeButton>
                    
                </Modal.Header>
                <Modal.Title className='mv_edit_profile_title' id="contained-modal-title-vcenter">
                    Add Account Policy
                </Modal.Title>
                <Modal.Body className='mv_edit_profile_model_padd'>
                    <form>
                        <div className="mv_input_content mt-3">
                            <label className='mv_label_input'>Account Policy</label>
                            <InputGroup className="mb-5">
                                <Form.Control
                                    placeholder="Enter account policy"
                                    name='name'
                                    value={values.name}
                                    onChange={handleChange}
                                />
                            </InputGroup>
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

            {/* Edit Account Policy Model */}
            <Modal show={modalShow2} onHide={() => { setModalShow2(false);  }} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header className='mv_edit_profile_header' closeButton>
                    
                </Modal.Header>
                <Modal.Title className='mv_edit_profile_title' id="contained-modal-title-vcenter">
                    Edit Account Policy
                </Modal.Title>
                <Modal.Body className='mv_edit_profile_model_padd'>
                    <form>
                        <div className="mv_input_content mt-3">
                            <label className='mv_label_input'>Account Policy</label>
                            <InputGroup className="mb-5">
                                <Form.Control
                                    placeholder="Enter account policy"
                                    name='name'
                                    value={values.name}
                                    onChange={handleChange}
                                />
                            </InputGroup>
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

export default Accountpolicy