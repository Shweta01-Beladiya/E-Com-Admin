import React, { useEffect, useState } from 'react';
import '../CSS/product.css';
import axios from 'axios';
import NoResultsFound from "../Component/Noresult";
import { Link } from 'react-router-dom';

const Viewaboutus = (props) => {
    const BaseUrl = process.env.REACT_APP_BASEURL;
    const token = localStorage.getItem('token');
    const [aboutUsData, setAboutUsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAboutUsData = async () => {
            try {
                const response = await axios.get(`${BaseUrl}/api/allAboutUs`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setAboutUsData(response?.data?.aboutUs || []);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching About Us data:", error);
                setLoading(false);
            }
        };

        fetchAboutUsData();
    }, [BaseUrl, token]);

    return (
        <>
            <div id='mv_container_fluid'>
                <div className="mv_main_heading mb-4">
                    <div className='d-flex justify-content-between align-items-center mv_main_view_au_heading'>
                        <div className='mv_main_view_au_subheading'>
                            <p className='mb-1'>View About Us</p>
                            <div className='d-flex align-items-center'>
                                <p className='mv_dashboard_heading mb-0'>Dashboard /</p>
                                <p className='mv_dashboard_heading mb-0 ms-1'>About Us /</p>
                                <p className='mv_category_heading mv_subcategory_heading mb-0'>View About Us</p>
                            </div>
                        </div>
                        <div className='mv_column_button'>
                            <Link to={'/aboutus'} style={{ color: '#2B221E', textDecoration: 'none' }}>
                                <button type="button" className='border-0 bg-transparent me-0'>
                                    Cancel
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                
                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : aboutUsData.length > 0 ? (
                    <div>
                        {aboutUsData.map((item, index) => (
                            <div key={item._id} className={`mv_main_view_terms_conditions ${index !== aboutUsData.length - 1 ? 'mb-3' : ''}`}>
                                <div className={`row mv_main_quickcart ${index % 2 !== 0 ? 'flex-row-reverse' : ''}`}>
                                    <div className="col-md-6 align-content-center">
                                        <p className='mv_quickcart_heading'>{item.title}</p>
                                        <p className='mv_quickcart_text mb-0'>{item.description}</p>
                                    </div>
                                    <div className="col-md-6 align-content-center">
                                        <img 
                                            className='mv_quickcart_img w-100' 
                                            src={`${BaseUrl}/${item.aboutUsImage}`} 
                                            alt={item.title} 
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <NoResultsFound />
                )}
            </div>
        </>
    );
};

export default Viewaboutus;