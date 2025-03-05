import React, { useEffect, useState } from 'react';
import '../CSS/product.css';
import Form from 'react-bootstrap/Form';
import { Dropdown, DropdownButton, InputGroup } from 'react-bootstrap';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import axios from 'axios';
import Addpopularbrands from './add_offer';

const Offer = (props) => {

    const BaseUrl = process.env.REACT_APP_BASEURL;
    const token = localStorage.getItem('token');
    const [deleteToggle, setDeleteToggle] = useState(null)
    const [toggle, seToggle] = useState(false)
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        brandname: '',
    });
    const [tempFilters, setTempFilters] = useState(filters);

    // Edit Offer
    const [editstok,setEditOffer] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(null);

    const navigate = useNavigate();

    const handleditoffer = () => {
        setEditOffer(true);
        // navigate('addsize')
    }

    // Search Data
    useEffect(() => {
        let result = data;
        
        if (filters.offerType) {
          result = result.filter(user => user.offerType === filters.offerType);
        }
        if (filters.offerName) {
          result = result.filter(user => user.offerName === filters.offerName);
        }
        if (filters.startDate) {
          result = result.filter(user => user.startDate === filters.startDate);
        }
        if (filters.endDate) {
          result = result.filter(user => user.endDate === filters.endDate);
        }
        if (filters.status) {
          result = result.filter(user => user.status === filters.status);
        }
    
        if (searchTerm) {
          result = result.filter(user =>
            user.offerType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.offerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.startDate?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.endDate?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.status?.includes(searchTerm)
          );
        }
    
        setFilteredData(result);
        setCurrentPage(1); // Reset to first page when filters change
    }, [data, filters, searchTerm]);

    // Offcanvas Filter
    const handleFilterChange = (field, value) => {
        setTempFilters(prev => ({
          ...prev,
          [field]: value
        }));
    };

    const handleApplyFilters = () => {
        setFilters(tempFilters);
        handleClose();
    };

    // ************************************** Show Data **************************************
    const [filteredData, setFilteredData] = useState([]);
    
    useEffect(()=>{
       const fetchBrandData = async () => {
           try{
              const response = await axios.get(`${BaseUrl}/api/getAllOffers`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                }
              })
              console.log("data" , response?.data);
              setFilteredData(response?.data?.offers )
              setData(response?.data?.offers)
           }catch(error){
              
           }
       }

       fetchBrandData()
    },[toggle])
    // ***************************************************************************************

    // ************************************** Delete Item **************************************
    const handleManage = (id) =>{
        setModalShow(true)
        setDeleteToggle(id)
    }

    const handleDelete = async () => {
        try{
           const response = await axios.delete(`${BaseUrl}/api/deleteOffer/${deleteToggle}`,{
               headers: {
                   Authorization: `Bearer ${token}`,
               }
           })
           console.log("delete response " , response);
           setModalShow(false)
           seToggle((count)=> count + 1)
        }catch(error){
            alert(error)
        }
    }
    // ***************************************************************************************

    // Handle View Offer
    const handleViewOffer = (offer) => {
        localStorage.setItem('viewOfferData', JSON.stringify(offer));
        navigate(`/viewoffer/${offer._id}`);
    }
    
    // ************************************** Pagination **************************************
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
 
    const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
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
 
    const paginatedData = filteredData?.slice(
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

    // Edit data
    const handleEditClick = (brand) => {
        setSelectedBrand(brand);
        setShowAddForm(true);
    };

    console.log("bran",selectedBrand)

    if (showAddForm) {
        return (
            <Addpopularbrands 
                editData={selectedBrand}
            />
        );
    }

    return (
        <>
            <div id='mv_container_fluid'>
                <div className="mv_main_heading mb-4 d-flex align-items-center justify-content-between">
                    <div>
                        <p className='mb-1'>Offer</p>
                        <div className='d-flex align-items-center'>
                            <p className='mv_dashboard_heading mb-0'>Dashboard /</p>
                            <p className='mv_category_heading mv_subcategory_heading mb-0'>Offer</p>
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
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
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
                                                        <label className='mv_offcanvas_filter_category'>Offer Type</label>
                                                        <InputGroup className="mb-3">
                                                            <Form.Control
                                                                placeholder="Enter Offer Type"
                                                                name='name'
                                                                value={tempFilters.offerType}
                                                                onChange={(e) => handleFilterChange('offerType', e.target.value)}
                                                            />
                                                        </InputGroup>
                                                    </div>
                                                    <div className="mv_input_content mb-3">
                                                        <label className='mv_offcanvas_filter_category'>Offer Name</label>
                                                        <InputGroup className="mb-3">
                                                            <Form.Control
                                                                placeholder="Enter Offer Name"
                                                                name='name1'
                                                                value={tempFilters.offerName}
                                                                onChange={(e) => handleFilterChange('offerName', e.target.value)}
                                                            />
                                                        </InputGroup>
                                                    </div>
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
                                                        <Form.Select className="mb-3" aria-label="Default select example" value={tempFilters.status}
                                                            onChange={(e) => handleFilterChange('status', e.target.value)}>
                                                            <option>Select Status</option>
                                                            <option value="True">True</option>
                                                            <option value="False">False</option>
                                                        </Form.Select>
                                                    </div>
                                                </div>
                                                <div className='mv_offcanvas_bottom_button'>
                                                    <div className='mv_logout_Model_button mv_cancel_apply_btn d-flex align-items-center justify-content-center'>
                                                        <div className="mv_logout_cancel">
                                                            <button type="button" onClick={handleClose}>Cancel</button>
                                                        </div>
                                                        <div className="mv_logout_button">
                                                            <button type="button" onClick={handleApplyFilters}>Apply</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Offcanvas.Body>
                                        </Offcanvas>
                                    </div>
                                    <div className='mv_category_side mv_product_page_category d-flex align-items-center'>
                                        <div className="mv_add_category mv_add_subcategory mv_add_product">
                                            {/* <Link to='/addoffer'><button onClick={() => setShowAddForm(true)}>+ Add</button></Link> */}
                                            <button onClick={() => setShowAddForm(true)}>+ Add</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mv_product_table_padd">
                                <table className='mv_product_table mv_help_table  justify-content-between'>
                                    <thead>
                                        <tr>
                                            <th className=''>ID</th>
                                            <th className=''>Image</th>
                                            <th className=''>Offer Type</th>
                                            <th className=''>Offer Name</th>
                                            <th className=''>Description</th>
                                            <th className=''>Button Text</th>
                                            <th className=''>Start Date</th>
                                            <th className=''>End Date</th>
                                            <th className=''>Status</th>
                                            <th className='d-flex align-items-center justify-content-end'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedData?.map((item,index)=>{
                                               const formatDate = (dateString) => {
                                                if (!dateString) return "";
                                                const date = new Date(dateString);
                                                return date.toLocaleDateString("en-GB");
                                            };
                                            return (
                                            <tr key={index}>
                                                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                                <td>
                                                    <img className='mv_product_img mv_product_radius_img' src={`${BaseUrl}/${item?.offerImage }`}  alt="" />
                                                </td>
                                                <td>{item.offerType}</td>
                                                <td>{item.offerName}</td>
                                                <td className='text-trancute'>{item.description}</td>
                                                <td>{item.buttonText}</td>
                                                <td>{formatDate(item.startDate)}</td>
                                                <td>{formatDate(item.endDate)}</td>
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
                                                    <div className="mv_pencil_icon" onClick={() => handleViewOffer(item)}>
                                                        <img src={require('../mv_img/eyes_icon.png')} alt="" />
                                                    </div>
                                                    <div className="mv_pencil_icon" onClick={() => handleEditClick(item)}>
                                                        <img src={require('../mv_img/pencil_icon.png')} alt="" />
                                                    </div>
                                                    <div className="mv_pencil_icon" onClick={() => handleManage(item?._id)}>
                                                        <img src={require('../mv_img/trust_icon.png')} alt="" />
                                                    </div>
                                                </td>
                                            </tr>
                                            )
                                        })}
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
            <Modal className='mv_logout_dialog' show={modalShow} onHide={() => setModalShow(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Body className='text-center mv_logout'>
                    <h5 className='mb-2'>Delete</h5>
                    <p>Are you sure you want to delete <br /> this offer?</p>
                    <div className='mv_logout_Model_button d-flex align-items-center justify-content-center'>
                        <div className="mv_logout_cancel">
                            <button onClick={() => setModalShow(false)}>Cancel</button>
                        </div>
                        <div className="mv_logout_button">
                            <button onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Offer