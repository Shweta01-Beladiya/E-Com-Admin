import React, { useEffect, useState } from 'react'
import '../CSS/vaidik.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Viewoffer = () => {
    const [offerData, setOfferData] = useState(null);
    const BaseUrl = process.env.REACT_APP_BASEURL;
    const token = localStorage.getItem('token');
    const {id} = useParams();
    const navigate = useNavigate();
  
    useEffect(() => {
        try {
            axios.get(`${BaseUrl}/api/getOffer/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            }).then((res)=>{
                console.log('res',res.data.offer);
                setOfferData(res.data.offer[0]);
            });
        } catch (error) {
            console.error("Error:", error);
            alert("Error submitting form. Please try again.");
        }
        
        
    }, [navigate]);

    // Format date function
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB");
    };

    // Loading state
    if (!offerData) {
        return <div>Loading...</div>;
    }

    return (
    <>
        <div id='mv_container_fluid'>
            <div className="mv_main_heading mb-4 d-flex align-items-center justify-content-between">
                <div>
                    <p className='mb-1'>View Product Offer</p>
                    <div className='d-flex align-items-center'>
                        <p className='mv_dashboard_heading mb-0'>Dashboard /</p>
                        <p className='mv_category_heading mv_subcategory_heading mb-0'>View Product Offer</p>
                    </div>
                </div>
            </div>
            <div className=''>
                <div className="row mv_main_view_product_con">
                    <div className="col-xxl-5 col-xl-6 col-lg-8 mv_main_product">
                        <div className="mv_product_info">
                            <div className="row">
                                <div className="col-sm-4 col-5">
                                    {/* Use the actual offer image */}
                                    <img 
                                        className='mv_view_product_img' 
                                        src={`${process.env.REACT_APP_BASEURL}/${offerData.offerImage}`} 
                                        alt={offerData.offerName}
                                    />
                                </div>
                                <div className="col-sm-8 col-12 align-content-center">
                                    <div className="row">
                                        <div className="col-5">
                                            <p className='mv_view_product_heading'>Main Category</p>
                                        </div>
                                        <div className="col-1">
                                            <p className='mv_view_product_heading'>:</p>
                                        </div>  
                                        <div className="col-4">
                                            <p className='mv_view_product_sub_heading'>{offerData.mainCategoriesData?.[0]?.mainCategoryName}</p>
                                        </div>
                                        
                                        <div className="col-5">
                                            <p className='mv_view_product_heading'>Category</p>
                                        </div>
                                        <div className="col-1">
                                            <p className='mv_view_product_heading'>:</p>
                                        </div>
                                        <div className="col-4">
                                            <p className='mv_view_product_sub_heading'>{offerData.categoriesData?.[0]?.categoryName}</p>
                                        </div>

                                        <div className="col-5">
                                            <p className='mv_view_product_heading'>Sub Category</p>
                                        </div>
                                        <div className="col-1">
                                            <p className='mv_view_product_heading'>:</p>
                                        </div>
                                        <div className="col-4">
                                            <p className='mv_view_product_sub_heading'>{offerData.subCategoriesData?.[0]?.subCategoryName}</p>
                                        </div>

                                        <div className="col-5">
                                            <p className='mv_view_product_heading'>Offer ID</p>
                                        </div>
                                        <div className="col-1">
                                            <p className='mv_view_product_heading'>:</p>
                                        </div>
                                        <div className="col-4">
                                            <p className='mv_view_product_sub_heading'>#{offerData._id?.substring(0, 8)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Offer Details */}
                <div className='mv_main_offerdetails_con'>
                    <div className="">
                        <p className='mv_offer_details_heading mb-0'>Offer Details</p>
                    </div>
                    <div className="row mv_main_view_product_con mv_main_offerdetails">
                        <div className="col-xxl-5 mb-2">
                            <div className="row">
                                <div className="col-xxl-6 col-xl-3 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_view_product_heading'>Offer Type :</p>
                                </div>
                                <div className="col-xxl-6 col-xl-9 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_offer_details_sub_heading'>{offerData.offerType}</p>
                                </div>
                                <div className="col-xxl-6 col-xl-3 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_view_product_heading'>Offer Name :</p>
                                </div>
                                <div className="col-xxl-6 col-xl-9 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_offer_details_sub_heading'>{offerData.offerName}</p>
                                </div>
                                <div className="col-xxl-6 col-xl-3 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_view_product_heading'>Button Text :</p>
                                </div>
                                <div className="col-xxl-6 col-xl-9 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_offer_details_sub_heading'>{offerData.buttonText}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-7">
                            <div className="row">
                                <div className="col-xxl-3 col-xl-3 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_view_product_heading'>Start Date :</p>
                                </div>
                                <div className="col-xxl-9 col-xl-9 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_offer_details_sub_heading'>{formatDate(offerData.startDate)}</p>
                                </div>
                                <div className="col-xxl-3 col-xl-3 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_view_product_heading'>End Date :</p>
                                </div>
                                <div className="col-xxl-9 col-xl-9 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_offer_details_sub_heading'>{formatDate(offerData.endDate)}</p>
                                </div>
                                <div className="col-xxl-3 col-xl-3 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_view_product_heading'>Description :</p>
                                </div>
                                <div className="col-xxl-9 col-xl-9 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_offer_details_sub_heading'>{offerData.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Viewoffer