import React, { useEffect, useState } from 'react';
import '../CSS/product.css';
import Form from 'react-bootstrap/Form';
import { Dropdown, DropdownButton, InputGroup } from 'react-bootstrap';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';
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

    var data = [
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
                                                    <div className='mv_logout_Model_button mv_cancel_apply_btn d-flex align-items-center justify-content-center'>
                                                        <div className="mv_logout_cancel">
                                                            <button type="button" onClick={handleClose}>Cancel</button>
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
                                            <Link to='/addsize'><button>+ Add</button></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mv_product_table_padd">
                                <table className='mv_product_table justify-content-between'>
                                    <thead>
                                        <tr>
                                        <th className=''>ID</th>
                                        <th className=''>Main Category</th>
                                        <th className=''>Category</th>
                                        <th className=''>Sub Category</th>
                                        <th className=''>Size Name</th>
                                        <th className=''>Size</th>
                                        <th className=''>Unit</th>
                                        <th className='d-flex align-items-center justify-content-end'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.maincategory}</td>
                                            <td>{item.category}</td>
                                            <td>{item.subcategory}</td>
                                            <td>{item.sizename}</td>
                                            <td>{item.size}</td>
                                            <td>{item.unit}</td>
                                            <td className='d-flex align-items-center justify-content-end'>
                                                <div className="mv_pencil_icon" onClick={handleditsize}>
                                                    <Link to='/addSize' state={{ editSize: true }}>
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

            {/* Delete Product Model */}
            <Modal className='mv_logout_dialog' show={modalShow} onHide={() => setModalShow(false)} size="lg" aria- labelledby="contained-modal-title-vcenter" centered >
                <Modal.Body className='text-center mv_logout'>
                    <h5 className='mb-2'>Delete</h5>
                    <p>Are you sure you want to <br /> weight?</p>
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