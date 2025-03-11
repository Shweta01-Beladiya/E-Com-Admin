import React, { useEffect, useState } from 'react';
import '../CSS/product.css';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import NoResultsFound from '../Component/Noresult';

const Unit = () => {

    const BaseUrl = process.env.REACT_APP_BASEURL;
    const token = localStorage.getItem('token');

    const itemsPerPage = 10;
    const [data, setData] = useState([]);
    const [id, setId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredData, setFilteredData] = useState([]);
    const [deleteUnit, setDeleteUnit] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    // Modal
    const [modalShow, setModalShow] = React.useState(false);
    const [modalShow1, setModalShow1] = React.useState(false);
    const [selectedUnit, setSelectedUnit] = useState({ name: '', shortName: '' });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const resposne = await axios.get(`${BaseUrl}/api/allUnits`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // console.log("resposne",resposne.data.unit);
                setData(resposne.data.unit);
            } catch (error) {
                console.error('Data Fetching Error:', error);
            }
        }
        fetchData();
    }, [BaseUrl, token]);

    const handleEdit = (unit) => {
        setId(unit._id);
        setSelectedUnit({ name: unit.name, shortName: unit.shortName });
        setModalShow1(true);
    };

    // ************************************** Pagination **************************************

    const totalPages = Math.ceil(data.length / itemsPerPage);
    // console.log("totalpage",totalPages)

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const getPaginationButtons = () => {
        if (totalPages <= 4) {
          return Array.from({ length: totalPages }, (_, i) => i + 1);
        }
      
        const buttons = [];
      
        if (currentPage <= 2) {
          buttons.push(1, 2, 3, "...");
        } else if (currentPage >= totalPages - 1) {
          buttons.push("...", totalPages - 2, totalPages - 1, totalPages);
        } else {
          buttons.push(currentPage - 1, currentPage, currentPage + 1, "...");
        }
      
        return buttons;
    };

    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        setFilteredData(data);
    }, [data]);
    // *******************************************************************************

    // ******************************* Validation *******************************

    const validate = Yup.object().shape({
        name: Yup.string().required("Unit Name is required"),
        shortName: Yup.string().required("Short Name is required")
    })

    const { values, handleBlur, handleChange, handleSubmit, errors, touched, resetForm, setFieldError } = useFormik({
        initialValues: { name: selectedUnit.name, shortName: selectedUnit.shortName },
        validationSchema: validate,
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                if (id) {
                    const response = await axios.put(`${BaseUrl}/api/updateUnit/${id}`, {
                        name: values.name,
                        shortName: values.shortName
                    }, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    if (response.data.status === 200) {
                        setData(prevData =>
                            prevData.map(unit =>
                                unit._id === id ? { ...unit, name: values.name, shortName: values.shortName } : unit
                            )
                        );
                        setSelectedUnit({ name: '', shortName: '' });
                        setModalShow1(false);
                        resetForm();
                        setId(null);
                    }
                    // console.log("Repasonse", response.data);
                } else {
                    const response = await axios.post(`${BaseUrl}/api/createUnit`, {
                        name: values.name,
                        shortName: values.shortName
                    }, {
                        headers: { Authorization: `Bearer ${token}` }
                    });

                    if (response.data.status === 201) {
                        setData(prevData => [...prevData, response.data.unit]);
                        setModalShow1(false);
                        resetForm();
                    }
                }
            } catch (error) {
                console.error('Data Add and Upadte Error:', error);
                if (error.response && error.response.status === 409) {
                    setFieldError('name', 'Unit name already exists');
                }
            }
        }
    })
    // *******************************************************************************
    const handleDelete = async (id, name) => {
        setModalShow(true);
        setId(id);
        setDeleteUnit(name)
    }

    const handleConfirmDelete = async () => {
        try {
            const response = await axios.delete(`${BaseUrl}/api/deleteUnit/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // console.log("resposnse",response.data);
            if (response.data.status === 200) {
                setId(null);
                setModalShow(false);
                
                const newData = data.filter(unit => unit._id !== id);
                const newTotalPages = Math.ceil(newData.length / itemsPerPage);
                
                if (currentPage > newTotalPages && newTotalPages > 0) {
                    setCurrentPage(newTotalPages);
                }
                
                setData(newData);
                setId(null);
            }
        } catch (error) {
            console.error('Data Delete Error:', error);
        }
    }

    const handleStatusChange = async (id, status) => {
        try {

            const updatedStatus = !status

            const response = await axios.put(`${BaseUrl}/api/updateUnit/${id}`, { status: updatedStatus }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.status === 200) {
                setData((prevData) =>
                    prevData.map((unit) =>
                        unit._id === id ? { ...unit, status: updatedStatus } : unit
                    )
                );
            }
        } catch (error) {
            console.error('Status Upadte error', error);
        }
    }

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        if (query === '') {
            setFilteredData(data);
        } else {
            const filtered = data.filter(item =>
                item.name.toLowerCase().includes(query) ||
                item.shortName.toLowerCase().includes(query)
            );
            setFilteredData(filtered);
        }
    };

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
                            <div className='mv_table_search mv_table_no_flex'>
                                <div className="mv_product_search">
                                    <InputGroup>
                                        <Form.Control
                                            placeholder="Search..."
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
                            {paginatedData.length > 0 ? (
                                <>
                                    <div className="mv_product_table_padd">
                                        <table className='mv_product_table justify-content-between'>
                                            <thead>
                                                <tr>
                                                    <th className=''>ID</th>
                                                    <th className=''>Name</th>
                                                    <th className=''>Short Name</th>
                                                    <th className=''>Status</th>
                                                    <th className='d-flex align-items-center justify-content-end'>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {paginatedData?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.shortName}</td>
                                                        <td>
                                                            <Form.Check
                                                                type="switch"
                                                                label=""
                                                                checked={item.status}
                                                                onChange={() => handleStatusChange(item._id, item.status)}
                                                            />
                                                        </td>
                                                        <td className='d-flex align-items-center justify-content-end'>
                                                            <div className="mv_pencil_icon" onClick={() => handleEdit(item)}>
                                                                <img src={require('../mv_img/pencil_icon.png')} alt="" />
                                                            </div>
                                                            <div className="mv_pencil_icon" onClick={() => handleDelete(item._id, item.name)}>
                                                                <img src={require('../mv_img/trust_icon.png')} alt="" />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    {totalPages > 1 && (
                                        <div className="mv_other_category d-flex align-items-center justify-content-end pb-4 mt-4">
                                            {/* Previous Button */}
                                            <p className={`mb-0 ${currentPage === 1 ? 'disabled' : ''}`} 
                                                onClick={() => handlePageChange(currentPage - 1)}>
                                                <MdOutlineKeyboardArrowLeft />
                                            </p>
                                            {/* Pagination Buttons */}
                                            {getPaginationButtons().map((page, index) => (
                                                <p key={index}
                                                className={`mb-0 ${currentPage === page ? "mv_active" : ""}`}
                                                onClick={() => typeof page === "number" && handlePageChange(page)}
                                                style={{ cursor: page === "..." ? "default" : "pointer" }}>
                                                {page}
                                                </p>
                                            ))}
                                            {/* Next Button */}
                                            <p className={`mb-0 ${currentPage === totalPages ? 'disabled' : ''}`} 
                                                onClick={() => handlePageChange(currentPage + 1)} >
                                                <MdOutlineKeyboardArrowRight />
                                            </p>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <NoResultsFound />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Unit Model */}
            <Modal className='mv_logout_dialog' show={modalShow} onHide={() => setModalShow(false)} size="lg" centered >
                <Modal.Body className='text-center mv_logout'>
                    <h5 className='mb-2'>Delete</h5>
                    <p>Are you sure you want to delete <br /> {deleteUnit} ?</p>
                    <div className='mv_logout_Model_button d-flex align-items-center justify-content-center'>
                        <div className="mv_logout_cancel">
                            <button onClick={() => setModalShow(false)}>Cancel</button>
                        </div>
                        <div className="mv_logout_button">
                            <button onClick={handleConfirmDelete}>Delete</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Add Edit Unit Model */}
            <Modal show={modalShow1} onHide={() => { setModalShow1(false); setId(null); }} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header className='mv_edit_profile_header' closeButton>

                </Modal.Header>
                <Modal.Title className='mv_edit_profile_title' id="contained-modal-title-vcenter">
                    {id ? 'Edit Unit' : 'Add Unit'}
                </Modal.Title>
                <Modal.Body className='mv_edit_profile_model_padd'>
                    <form onSubmit={handleSubmit}>
                        <div className="mv_input_content mb-3">
                            <label className='mv_label_input'>Name</label>
                            <InputGroup className="">
                                <Form.Control
                                    placeholder="Enter unit name"
                                    name='name'
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </InputGroup>
                            {errors.name && touched.name && <div className="text-danger small">{errors.name}</div>}
                        </div>
                        <div className="mv_input_content mb-5">
                            <label className='mv_label_input'>Short Name</label>
                            <InputGroup className="">
                                <Form.Control
                                    placeholder="Enter short name"
                                    name='shortName'
                                    value={values.shortName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </InputGroup>
                            {errors.shortName && touched.shortName && <div className="text-danger small">{errors.shortName}</div>}
                        </div>
                            <div className='mv_logout_Model_button d-flex align-items-center justify-content-center mb-4'>
                                <div className="mv_logout_cancel">
                                    <button type="button" onClick={() => { setModalShow1(false); setSelectedUnit({ name: '', shortName: '' }); }}>
                                        Cancel</button>
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

export default Unit
