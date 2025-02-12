import React, { useEffect, useState } from 'react';
import '../CSS/product.css';
import Form from 'react-bootstrap/Form';
import { Dropdown, DropdownButton, InputGroup } from 'react-bootstrap';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ReactSlider from 'react-slider';

const Productoffer = (props) => {

    // Edit Product Offer
    const [editstok,setEditproductoffer] = useState(false);

    const navigate = useNavigate();

    const handleditproductoffer = () => {
        setEditproductoffer(true);
        // navigate('addsize')
    }

    var data = [
        {   
            id: 1,
            subcategory: "Saree",
            productname: "Premium Saree",
            code: "NEW301",
            discount: "20%",
            price: "2000",
            startdate: "02/09/1994",
            enddate: "02/09/1994",
            status: true,
        },
        {   
            id: 2,
            subcategory: "Dresses",
            productname: "Lehenga Choli",
            code: "WINTER5",
            discount: "36%",
            price: "2000",
            startdate: "02/09/1994",
            enddate: "02/09/1994",
            status: false,
        },
        {   
            id: 3,
            subcategory: "Jeans",
            productname: "Lehenga Choli",
            code: "NEW301",
            discount: "10%",
            price: "2000",
            startdate: "02/09/1994",
            enddate: "02/09/1994",
            status: true,
        },
        {   
            id: 4,
            subcategory: "Dresses",
            productname: "Lehenga Choli",
            code: "NEW301",
            discount: "36%",
            price: "2000",
            startdate: "02/09/1994",
            enddate: "02/09/1994",
            status: true,
        },
        {   
            id: 5,
            subcategory: "Dresses",
            productname: "Lehenga Choli",
            code: "WINTER5",
            discount: "36%",
            price: "2000",
            startdate: "02/09/1994",
            enddate: "02/09/1994",
            status: true,
        },
        {   
            id: 6,
            subcategory: "Dresses",
            productname: "Premium Saree",
            code: "WINTER5",
            discount: "20%",
            price: "2000",
            startdate: "02/09/1994",
            enddate: "02/09/1994",
            status: true,
        },
        {   
            id: 7,
            subcategory: "Jeans",
            productname: "Premium Saree",
            code: "NEW301",
            discount: "20%",
            price: "2000",
            startdate: "02/09/1994",
            enddate: "02/09/1994",
            status: true,
        },
        {   
            id: 8,
            subcategory: "Jeans",
            productname: "Premium Saree",
            code: "NEW301",
            discount: "10%",
            price: "2000",
            startdate: "02/09/1994",
            enddate: "02/09/1994",
            status: true,
        },
        {   
            id: 9,
            subcategory: "Jeans",
            productname: "Lehenga Choli",
            code: "NEW301",
            discount: "10%",
            price: "2000",
            startdate: "02/09/1994",
            enddate: "02/09/1994",
            status: true,
        },
        {   
            id: 10,
            subcategory: "Dresses",
            productname: "Lehenga Choli",
            code: "NEW301",
            discount: "10%",
            price: "2000",
            startdate: "02/09/1994",
            enddate: "02/09/1994",
            status: true,
        },
        {   
            id: 11,
            subcategory: "Saree",
            productname: "Premium Saree",
            code: "NEW301",
            discount: "20%",
            price: "2000",
            startdate: "02/09/1994",
            enddate: "02/09/1994",
            status: true,
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

    // offcanvas price
    const [priceRange, setPriceRange] = useState([0, 300]);
    const handleSliderChange = (newRange) => {
        setPriceRange(newRange);
    };

    // Date function
    let [date, setDate] = useState('Select Date');
    let [date1, setDate1] = useState('Select Date');

    const handleDateChange = (e, dateType) => {
        const [year, month, day] = e.target.value.split("-");
        const formattedDate = `${day}-${month}-${year}`;
        
        if (dateType === 'start') {
            setDate(formattedDate);
        } else if (dateType === 'end') {
            setDate1(formattedDate);
        }
    };

    return (
        <>
            <div id='mv_container_fluid'>
                <div className="mv_main_heading mb-4 d-flex align-items-center justify-content-between">
                    <div>
                        <p className='mb-1'>Product Offer</p>
                        <div className='d-flex align-items-center'>
                            <p className='mv_dashboard_heading mb-0'>Dashboard /</p>
                            <p className='mv_category_heading mv_subcategory_heading mb-0'>Product Offer</p>
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
                                                    <div className="mv_input_content">
                                                        <label className='mv_offcanvas_filter_category'>Sub Category</label>
                                                        <Form.Select className="mb-3" aria-label="Default select example">
                                                            <option>Select Sub Category</option>
                                                            <option value="Saree">Saree</option>
                                                            <option value="Dresses">Dresses</option>
                                                            <option value="Jeans">Jeans</option>
                                                        </Form.Select>
                                                    </div>
                                                    <div>
                                                        <label className='mv_offcanvas_filter_category'>Main Category</label>
                                                        <div className="mv_input_content mv_add_product_date_scheduled">
                                                            <label className='mv_label_input mv_add_product_date mv_filter_start_date'>{date}</label>
                                                            <Form.Control className='mb-3' type="date" onChange={(e) => handleDateChange(e, 'start')} />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className='mv_offcanvas_filter_category'>End Date</label>
                                                        <div className="mv_input_content mv_add_product_date_scheduled">
                                                            <label className='mv_label_input mv_add_product_date mv_filter_start_date'>{date1}</label>
                                                            <Form.Control className='mb-3' type="date" onChange={(e) => handleDateChange(e, 'end')} />
                                                        </div>
                                                    </div>
                                                    <div className="mv_input_content">
                                                        <label className='mv_offcanvas_filter_category'>Status</label>
                                                        <Form.Select className="mb-3" aria-label="Default select example">
                                                            <option>Select Status</option>
                                                            <option value="True">True</option>
                                                            <option value="False">False</option>
                                                        </Form.Select>
                                                    </div>
                                                    <label className='mv_offcanvas_filter_category'>Price</label>
                                                    <div className="mv_price_range">
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
                                            <Link to='/addproductoffer'><button>+ Add</button></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mv_product_table_padd">
                                <table className='mv_product_table justify-content-between'>
                                    <thead>
                                        <tr>
                                            <th className=''>ID</th>
                                            <th className=''>Code</th>
                                            <th className=''>Coupon Name</th>
                                            <th className=''>Description</th>
                                            <th className=''>Coupon Type</th>
                                            <th className=''>Price</th>
                                            <th className=''>Start Date</th>
                                            <th className=''>End Date</th>
                                            <th className=''>Status</th>
                                            <th className='d-flex align-items-center justify-content-end'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                       {paginatedData.map((item, index) => (
                                            <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.subcategory}</td>
                                            <td>{item.productname}</td>
                                            <td>{item.code}</td>
                                            <td>{item.discount}</td>
                                            <td>${item.price}</td>
                                            <td>{item.startdate}</td>
                                            <td>{item.enddate}</td>
                                            <td>
                                                <Form.Check
                                                    type="switch"
                                                    id={`custom-switch-${item.id}`}
                                                    label=""
                                                    checked={item.status}
                                                    className=''
                                                />
                                            </td>
                                            <td className='d-flex align-items-center justify-content-end'>
                                                <div className="mv_pencil_icon">
                                                    <Link to='/viewproductoffer'>
                                                        <img src={require('../mv_img/eyes_icon.png')} alt="" />
                                                    </Link>
                                                </div>
                                                <div className="mv_pencil_icon" onClick={handleditproductoffer}>
                                                    <Link to='/addproductoffer' state={{ editProductoffer: true }}>
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

            {/* Delete Product Model */}
            <Modal className='mv_logout_dialog' show={modalShow} onHide={() => setModalShow(false)} size="lg" aria- labelledby="contained-modal-title-vcenter" centered >
                <Modal.Body className='text-center mv_logout'>
                    <h5 className='mb-2'>Delete</h5>
                    <p>Are you sure you want to delete <br /> coupon?</p>
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

export default Productoffer