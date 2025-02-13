import React, { useEffect, useState } from 'react';
import '../CSS/product.css';
import Form from 'react-bootstrap/Form';
import { Dropdown, DropdownButton, InputGroup } from 'react-bootstrap';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

const Unit = (props) => {
   
    var data = [
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
                                            <th className=''>ID</th>
                                            <th className=''>Name</th>
                                            <th className=''>Short Name</th>
                                            <th className=''>Status</th>
                                            <th className='d-flex align-items-center justify-content-end'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.shortname}</td>
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


            {/* Delete Unit Model */}
            <Modal className='mv_logout_dialog' show={modalShow} onHide={() => setModalShow(false)} size="lg" aria- labelledby="contained-modal-title-vcenter" centered >
                <Modal.Body className='text-center mv_logout'>
                    <h5 className='mb-2'>Delete</h5>
                    <p>Are you sure you want to delete <br /> Generation ?</p>
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

            {/* Add Unit Model */}
            <Modal show={modalShow1} onHide={() => { setModalShow1(false); }} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header className='mv_edit_profile_header' closeButton>
                    
                </Modal.Header>
                <Modal.Title className='mv_edit_profile_title' id="contained-modal-title-vcenter">
                    Add Unit
                </Modal.Title>
                <Modal.Body className='mv_edit_profile_model_padd'>
                    <form>
                        <div className="mv_input_content">
                            <label className='mv_label_input'>Name</label>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Enter unit name"
                                    name='name'
                                    value={values.name}
                                    onChange={handleChange}
                                />
                            </InputGroup>
                        </div>
                        <div className="mv_input_content mb-5">
                            <label className='mv_label_input'>Short Name</label>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Enter short name"
                                    name='name1'
                                    value={values.name1}
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

            {/* Edit  Model */}
            <Modal show={modalShow2} onHide={() => { setModalShow2(false);  }} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header className='mv_edit_profile_header' closeButton>
                    
                </Modal.Header>
                <Modal.Title className='mv_edit_profile_title' id="contained-modal-title-vcenter">
                    Edit Unit
                </Modal.Title>
                <Modal.Body className='mv_edit_profile_model_padd'>
                    <form>
                        <div className="mv_input_content">
                            <label className='mv_label_input'>Name</label>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Enter unit name"
                                    name='name'
                                    value={values.name}
                                    onChange={handleChange}
                                />
                            </InputGroup>
                        </div>
                        <div className="mv_input_content mb-5">
                            <label className='mv_label_input'>Short Name</label>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Enter short name"
                                    name='name1'
                                    value={values.name1}
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

export default Unit




// import React, { useEffect, useState } from 'react';
// import '../CSS/product.css';
// import Form from 'react-bootstrap/Form';
// import { InputGroup } from 'react-bootstrap';
// import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
// import Modal from 'react-bootstrap/Modal';
// import * as Yup from 'yup'
// import { useFormik } from 'formik';
// import { Link } from 'react-router-dom';

// const Unit = () => {
//     const [data, setData] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 10;

//     // Fetch data from localStorage on mount
//     useEffect(() => {
//         const storedData = JSON.parse(localStorage.getItem('units')) || [];
//         setData(storedData);
//     }, []);

//     // Save data to localStorage
//     const saveData = (newData) => {
//         localStorage.setItem('units', JSON.stringify(newData));
//         setData(newData);
//     };

//     // Handle Add Data
//     const addUnit = (unit) => {
//         unit.id = data.length ? data[data.length - 1].id + 1 : 1; // Auto-increment ID
//         const newData = [...data, unit];
//         saveData(newData);
//         setModalShow1(false);
//     };

//     // Handle Edit Data
//     const [editUnit, setEditUnit] = useState(null);

//     const updateUnit = (updatedUnit) => {
//         const updatedData = data.map((item) =>
//             item.id === updatedUnit.id ? updatedUnit : item
//         );
//         saveData(updatedData);
//         setModalShow2(false);
//     };

//     // Handle Delete Data
//     const deleteUnit = (id) => {
//         const updatedData = data.filter((item) => item.id !== id);
//         saveData(updatedData);
//         setModalShow(false);
//     };

//     // Pagination Logic
//     const totalPages = Math.ceil(data.length / itemsPerPage);
//     const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//     const handlePageChange = (newPage) => {
//         if (newPage < 1 || newPage > totalPages) return;
//         setCurrentPage(newPage);
//     };

//     const [modalShow, setModalShow] = useState(false);
//     const [modalShow1, setModalShow1] = useState(false);
//     const [modalShow2, setModalShow2] = useState(false);

//     const validationSchema = Yup.object({
//         name: Yup.string().min(2, "Minimum 2 characters").required("Required"),
//         shortname: Yup.string().min(1, "Required").required("Required"),
//     });

//     const formik = useFormik({
//         initialValues: { name: "", shortname: "", status: true },
//         validationSchema,
//         onSubmit: (values) => {
//             if (editUnit) {
//                 updateUnit({ ...editUnit, ...values });
//             } else {
//                 addUnit(values);
//             }
//             formik.resetForm();
//         },
//     });

//     return (
//         <>
//             <div id='mv_container_fluid'>
//                 <div className="mv_main_heading mb-4 d-flex align-items-center justify-content-between">
//                     <div>
//                         <p className='mb-1'>Unit</p>
//                         <p className='mv_dashboard_heading mb-0'>Dashboard / Unit</p>
//                     </div>
//                     <button className="mv_add_category" onClick={() => { setModalShow1(true); formik.resetForm(); }}>
//                         + Add Unit
//                     </button>
//                 </div>

//                 <div className="mv_product_table_content">
//                     <table className='mv_product_table'>
//                         <thead>
//                             <tr>
//                                 <th>ID</th>
//                                 <th>Name</th>
//                                 <th>Short Name</th>
//                                 <th>Status</th>
//                                 <th>Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {paginatedData.map((item, index) => (
//                                 <tr key={index}>
//                                     <td>{item.id}</td>
//                                     <td>{item.name}</td>
//                                     <td>{item.shortname}</td>
//                                     <td>
//                                         <Form.Check
//                                             type="switch"
//                                             checked={item.status}
//                                             onChange={() => {
//                                                 const updatedData = data.map((unit) =>
//                                                     unit.id === item.id ? { ...unit, status: !unit.status } : unit
//                                                 );
//                                                 saveData(updatedData);
//                                             }}
//                                         />
//                                     </td>
//                                     <td>
//                                         <button onClick={() => { setEditUnit(item); setModalShow2(true); formik.setValues(item); }}>
//                                             Edit
//                                         </button>
//                                         <button onClick={() => { setEditUnit(item); setModalShow(true); }}>
//                                             Delete
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>

//                 {totalPages > 1 && (
//                     <div className='pagination'>
//                         <button onClick={() => handlePageChange(currentPage - 1)}>
//                             <MdOutlineKeyboardArrowLeft />
//                         </button>
//                         {Array.from({ length: totalPages }, (_, i) => (
//                             <button key={i} className={currentPage === i + 1 ? 'active' : ''} onClick={() => handlePageChange(i + 1)}>
//                                 {i + 1}
//                             </button>
//                         ))}
//                         <button onClick={() => handlePageChange(currentPage + 1)}>
//                             <MdOutlineKeyboardArrowRight />
//                         </button>
//                     </div>
//                 )}
//             </div>

//             {/* Add/Edit Modal */}
//             <Modal show={modalShow1 || modalShow2} onHide={() => { setModalShow1(false); setModalShow2(false); formik.resetForm(); }} centered>
//                 <Modal.Header closeButton>
//                     <Modal.Title>{editUnit ? "Edit Unit" : "Add Unit"}</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <form onSubmit={formik.handleSubmit}>
//                         <div>
//                             <label>Name</label>
//                             <InputGroup>
//                                 <Form.Control
//                                     name="name"
//                                     value={formik.values.name}
//                                     onChange={formik.handleChange}
//                                     onBlur={formik.handleBlur}
//                                     placeholder="Enter unit name"
//                                 />
//                             </InputGroup>
//                             {formik.touched.name && formik.errors.name && <div className="error">{formik.errors.name}</div>}
//                         </div>
//                         <div>
//                             <label>Short Name</label>
//                             <InputGroup>
//                                 <Form.Control
//                                     name="shortname"
//                                     value={formik.values.shortname}
//                                     onChange={formik.handleChange}
//                                     onBlur={formik.handleBlur}
//                                     placeholder="Enter short name"
//                                 />
//                             </InputGroup>
//                             {formik.touched.shortname && formik.errors.shortname && <div className="error">{formik.errors.shortname}</div>}
//                         </div>
//                         <div className="modal-footer">
//                             <button type="button" onClick={() => { setModalShow1(false); setModalShow2(false); }}>Cancel</button>
//                             <button type="submit">{editUnit ? "Update" : "Add"}</button>
//                         </div>
//                     </form>
//                 </Modal.Body>
//             </Modal>

//             {/* Delete Confirmation Modal */}
//             <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
//                 <Modal.Body className="text-center">
//                     <h5>Delete?</h5>
//                     <p>Are you sure you want to delete this unit?</p>
//                     <button onClick={() => setModalShow(false)}>Cancel</button>
//                     <button onClick={() => { deleteUnit(editUnit.id); setModalShow(false); }}>Delete</button>
//                 </Modal.Body>
//             </Modal>
//         </>
//     );
// };

// export default Unit;
