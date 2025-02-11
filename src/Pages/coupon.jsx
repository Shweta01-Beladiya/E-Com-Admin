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

const Coupon = (props) => {

    // Edit Coupon
    const [editstok,setEditcoupon] = useState(false);

    const navigate = useNavigate();

    const handleditcoupon = () => {
        setEditcoupon(true);
        // navigate('addsize')
    }

    var data1 = [
        {   
            id: 1,
            code: "NEW100",
            coupenname: "Lorem ipsum",
            description: "Lorem ipsum idb..",
            coupontype: "Fixed",
            price: "2000",
            startdate: "02/09/1994",
            enddate: "02/09/1994",
            status: true,
        },
        {   
            id: 2,
            code: "WINTER30",
            coupenname: "Lorem ipsum",
            description: "Lorem ipsum idb..",
            coupontype: "Percentage",
            price: "2000",
            startdate: "02/09/1994",
            enddate: "02/09/1994",
            status: false,
        },
        {   
            id: 3,
            code: "WINTER30",
            coupenname: "Lorem ipsum",
            description: "Lorem ipsum idb..",
            coupontype: "Percentage",
            price: "2000",
            startdate: "02/09/1994",
            enddate: "02/09/1994",
            status: true,
        },
        {   
            id: 4,
            code: "WINTER30",
            coupenname: "Lorem ipsum",
            description: "Lorem ipsum idb..",
            coupontype: "Percentage",
            price: "2000",
            startdate: "02/09/1994",
            enddate: "02/09/1994",
            status: true,
        },
        {   
            id: 5,
            code: "WINTER30",
            coupenname: "Lorem ipsum",
            description: "Lorem ipsum idb..",
            coupontype: "Percentage",
            price: "2000",
            startdate: "02/09/1994",
            enddate: "02/09/1994",
            status: true,
        },
        {   
            id: 6,
            code: "WINTER30",
            coupenname: "Lorem ipsum",
            description: "Lorem ipsum idb..",
            coupontype: "Percentage",
            price: "2000",
            startdate: "02/09/1994",
            enddate: "02/09/1994",
            status: true,
        },
        {   
            id: 7,
            code: "NEW100",
            coupenname: "Lorem ipsum",
            description: "Lorem ipsum idb..",
            coupontype: "Fixed",
            price: "2000",
            startdate: "02/09/1994",
            enddate: "02/09/1994",
            status: true,
        },
        {   
            id: 8,
            code: "NEW100",
            coupenname: "Lorem ipsum",
            description: "Lorem ipsum idb..",
            coupontype: "Fixed",
            price: "2000",
            startdate: "02/09/1994",
            enddate: "02/09/1994",
            status: true,
        },
        {   
            id: 9,
            code: "NEW100",
            coupenname: "Lorem ipsum",
            description: "Lorem ipsum idb..",
            coupontype: "Fixed",
            price: "2000",
            startdate: "02/09/1994",
            enddate: "02/09/1994",
            status: true,
        },
        {   
            id: 10,
            code: "NEW100",
            coupenname: "Lorem ipsum",
            description: "Lorem ipsum idb..",
            coupontype: "Fixed",
            price: "2000",
            startdate: "02/09/1994",
            enddate: "02/09/1994",
            status: true,
        },
        {   
            id: 11,
            code: "NEW100",
            coupenname: "Lorem ipsum",
            description: "Lorem ipsum idb..",
            coupontype: "Fixed",
            price: "2000",
            startdate: "02/09/1994",
            enddate: "02/09/1994",
            status: true,
        },
    ];

    localStorage.setItem('data3', JSON.stringify(data1))

    const [checkboxes, setCheckboxes] = useState({
        isIDChecked: true,
        isCodeChecked: true,
        isCouponnameChecked: true,
        isDescriptionChecked: true,
        isCoupontypeChecked: true,
        isPriceChecked: true,
        isStartdateChecked: true,
        isEnddateChecked: true,
        isStatusChecked: true,
        isActionChecked: true,
    });

    useEffect(() => {
        const savedCheckboxes = {
            isIDChecked: localStorage.getItem('isIDChecked') === 'true' || true,
            isCodeChecked: localStorage.getItem('isCodeChecked') === 'true' || true,
            isCouponnameChecked: localStorage.getItem('isCouponnameChecked') === 'true' || true,
            isDescriptionChecked: localStorage.getItem('isDescriptionChecked') === 'true' || true,
            isCoupontypeChecked: localStorage.getItem('isCoupontypeChecked') === 'true' || true,
            isPriceChecked: localStorage.getItem('isPriceChecked') === 'true' || true,
            isStartdateChecked: localStorage.getItem('isStartdateChecked') === 'true' || true,
            isEnddateChecked: localStorage.getItem('isEnddateChecked') === 'true' || true,
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

    // Offcanvas
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                        <p className='mb-1'>Coupon</p>
                        <div className='d-flex align-items-center'>
                            <p className='mv_dashboard_heading mb-0'>Dashboard /</p>
                            <p className='mv_category_heading mv_subcategory_heading mb-0'>Coupon</p>
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
                                                    <div>
                                                        <label className='mv_offcanvas_filter_category'>Start Date</label>
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
                                            <button><Link to='/dashboard/addcoupon'>+ Add</Link></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mv_product_table_padd">
                                <table className='mv_product_table justify-content-between'>
                                    <thead>
                                        <tr>
                                        {checkboxes.isIDChecked && <th className=''>ID</th>}
                                        {checkboxes.isCodeChecked && <th className=''>Code</th>}
                                        {checkboxes.isCouponnameChecked && <th className=''>Coupon Name</th>}
                                        {checkboxes.isDescriptionChecked && <th className=''>Description</th>}
                                        {checkboxes.isCoupontypeChecked && <th className=''>Coupon Type</th>}
                                        {checkboxes.isPriceChecked && <th className=''>Price</th>}
                                        {checkboxes.isStartdateChecked && <th className=''>Start Date</th>}
                                        {checkboxes.isEnddateChecked && <th className=''>End Date</th>}
                                        {checkboxes.isStatusChecked && <th className=''>Status</th>}
                                        {checkboxes.isActionChecked && <th className='d-flex align-items-center justify-content-end'>Action</th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item, index) => (
                                        <tr key={index}>
                                            {checkboxes.isIDChecked && <td>{item.id}</td>}
                                            {checkboxes.isCodeChecked && <td>{item.code}</td>}
                                            {checkboxes.isCouponnameChecked && <td>{item.coupenname}</td>}
                                            {checkboxes.isDescriptionChecked && <td>{item.description}</td>}
                                            {checkboxes.isCoupontypeChecked && <td>{item.coupontype}</td>}
                                            {checkboxes.isPriceChecked && <td>${item.price}</td>}
                                            {checkboxes.isStartdateChecked && <td>{item.startdate}</td>}
                                            {checkboxes.isEnddateChecked && <td>{item.enddate}</td>}
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
                                                    <div className="mv_pencil_icon" onClick={handleditcoupon}>
                                                        <Link to='/dashboard/addcoupon' state={{ editCoupon: true }}>
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

export default Coupon