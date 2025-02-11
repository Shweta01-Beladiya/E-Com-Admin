import React, { useEffect, useState } from 'react';
import '../CSS/product.css';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import * as Yup from 'yup'
import { useFormik } from 'formik';

const DeactivatedAccount = () => {

    var data1 = [
        {
            id: 1,
            customerName: "Mitesh Shah",
            contactNo: "+91 85555 85555",
            email: "mitesh@gmail.com",
        },
        {
            id: 2,
            customerName: "Riya Patel",
            contactNo: "+91 85555 85555",
            email: "riya@gmail.com",
        },
        {
            id: 3,
            customerName: "Mitesh Shah",
            contactNo: "+91 85555 85555",
            email: "mitesh@gmail.com",
        },
        {
            id: 4,
            customerName: "Riya Patel",
            contactNo: "+91 85555 85555",
            email: "riya@gmail.com",
        },
        {
            id: 5,
            customerName: "Abc Shah",
            contactNo: "+91 85555 85555",
            email: "abc@gmail.com",
        },
        {
            id: 6,
            customerName: "Admin Shah",
            contactNo: "+91 85555 80000",
            email: "admin@gmail.com",
        },
        {
            id: 7,
            customerName: "Om Patel",
            contactNo: "+91 85555 85555",
            email: "om@gmail.com",
        },
        {
            id: 8,
            customerName: "Mitesh Shah",
            contactNo: "+91 85555 85555",
            email: "mitesh@gmail.com",
        },
        {
            id: 9,
            customerName: "Om Patel",
            contactNo: "+91 85555 85555",
            email: "om@gmail.com",
        },
        {
            id: 10,
            customerName: "Riya Patel",
            contactNo: "+91 85555 85555",
            email: "riya@gmail.com",
        },
        {
            id: 11,
            customerName: "Om Patel",
            contactNo: "+91 85555 85555",
            email: "om@gmail.com",
        },
    ];

    localStorage.setItem('data3', JSON.stringify(data1))

    const store_data = (value) => {
        let data = JSON.parse(localStorage.getItem('data2')) || [];

        let id = data.length

        value.id = id + 1;

        value.image = "pencil_icon.png";

        data.push(value);

        localStorage.setItem('data2', JSON.stringify(data));

        local_data()

    };

    const itemsPerPage = 10;
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);


    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        setCurrentPage(1); // Reset to first page when searching

        const dataFromStorage = JSON.parse(localStorage.getItem('data3'));
        if (dataFromStorage) {
            const filtered = dataFromStorage.filter(item =>
                item.customerName.toLowerCase().includes(query) ||
                item.email.toLowerCase().includes(query) ||
                item.contactNo.toLowerCase().includes(query)
            );
            
            setFilteredData(filtered);
            const total = Math.ceil(filtered.length / itemsPerPage);
            setTotalPages(total);

            // Update displayed data for first page
            setData(filtered.slice(0, itemsPerPage));
        }
    };

    const local_data = async () => {
        const dataFromStorage = await JSON.parse(localStorage.getItem('data3'));
        if (dataFromStorage) {
            let dataToUse = searchQuery ? filteredData : dataFromStorage;
            
            const total = Math.ceil(dataToUse.length / itemsPerPage);
            setTotalPages(total);

            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;

            setData(dataToUse.slice(startIndex, endIndex));
        }
    };

    useEffect(() => {
        local_data();
    }, [currentPage, filteredData]);

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

    return (
        <>
            <div id='mv_container_fluid'>
                <div className="mv_main_heading mb-4 d-flex align-items-center justify-content-between">
                    <div>
                        <p className='mb-1'>Deactivated Account</p>
                        <div className='d-flex align-items-center'>
                            <p className='mv_dashboard_heading mb-0'>Dashboard /</p>
                            <p className='mv_category_heading mv_subcategory_heading mb-0'>Deactivated Account</p>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-12 ">
                        <div className="mv_product_table_content">
                            <div className='mv_table_search py-4'>
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
                            </div>
                            <div className="mv_product_table_padd">
                                <table className='mv_product_table justify-content-between'>
                                    <thead>
                                        <tr>
                                            <th className=''>ID</th>
                                            <th className=''>Customer Name</th>
                                            <th className=''>Contact No</th>
                                            <th className=''>Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item, index) => (
                                            <tr key={index}>
                                                <td className='py-3'>{item.id}</td>
                                                <td className='py-3'>{item.customerName}</td>
                                                <td className='py-3'>{item.contactNo}</td>
                                                <td className='py-3'>{item.email}</td>
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
        </>
    );
};

export default DeactivatedAccount;