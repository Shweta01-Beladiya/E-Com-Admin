import React, { useEffect, useState } from 'react'
import '../CSS/vaidik.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Viewproductoffer = () => {

    const {id} = useParams();
    const [data,setData] = useState({});

    const BaseUrl = process.env.REACT_APP_BASEURL;
    const token = localStorage.getItem('token');
    
    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.get(`${BaseUrl}/api/getProductOffer/${id}`, {
                    headers:{ Authorization: `Bearer ${token}`}
                });
                // console.log("response",response.data.productOffer);
                setData(response.data.productOffer[0]);
                
            } catch (error) {
                console.error('Data Fetching Error:', error);
            }
        }
        fetchData();
    },[id, BaseUrl, token]);
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
                                    <img className='mv_view_product_img' alt='' src={`${BaseUrl}/${data.productVariantData?.[0].images?.[0]}`}/>
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
                                            <p className='mv_view_product_sub_heading'>{data.mainCategoriesData?.[0]?.mainCategoryName}</p>
                                        </div>
                                        <div className="col-5">
                                            <p className='mv_view_product_heading'>Category:</p>
                                        </div>
                                        <div className="col-1">
                                            <p className='mv_view_product_heading'>:</p>
                                        </div>
                                        <div className="col-4">
                                            <p className='mv_view_product_sub_heading'>{data.categoriesData?.[0].categoryName}</p>
                                        </div>
                                        <div className="col-5">
                                            <p className='mv_view_product_heading'>Sub Category:</p>
                                        </div>
                                        <div className="col-1">
                                            <p className='mv_view_product_heading'>:</p>
                                        </div>
                                        <div className="col-4">
                                            <p className='mv_view_product_sub_heading'>{data.subCategoriesData?.[0].subCategoryName}</p>
                                        </div>
                                        <div className="col-5">
                                            <p className='mv_view_product_heading mb-0'>Product ID:</p>
                                        </div>
                                        <div className="col-1">
                                            <p className='mv_view_product_heading mb-0'>:</p>
                                        </div>
                                        <div className="col-4">
                                            <p className='mv_view_product_sub_heading mb-0'>#654782014</p>
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
                        <div className="col-xxl-4 mb-2">
                            <div className="row">
                                <div className="col-xxl-6 col-xl-3 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_view_product_heading'>Offer Name :</p>
                                </div>
                                <div className="col-xxl-6 col-xl-9 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_offer_details_sub_heading'>{data.offerName}</p>
                                </div>
                                <div className="col-xxl-6 col-xl-3 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_view_product_heading'>Offer Code :</p>
                                </div>
                                <div className="col-xxl-6 col-xl-9 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_offer_details_sub_heading'>{data.code}</p>
                                </div>
                                <div className="col-xxl-6 col-xl-3 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_view_product_heading'>Offer Discount :</p>
                                </div>
                                <div className="col-xxl-6 col-xl-9 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_offer_details_sub_heading'>{data.discountPrice}</p>
                                </div>
                                <div className="col-xxl-6 col-xl-3 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_view_product_heading'>Offer Price :</p>
                                </div>
                                <div className="col-xxl-6 col-xl-9 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_offer_details_sub_heading'>{data.price}</p>
                                </div>
                                <div className="col-xxl-6 col-xl-3 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_view_product_heading mb-0'>Start Date :</p>
                                </div>
                                <div className="col-xxl-6 col-xl-9 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_offer_details_sub_heading mb-0'>{data.startDate}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-8">
                            <div className="row">
                                <div className="col-xxl-3 col-xl-3 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_view_product_heading'>End Date :</p>
                                </div>
                                <div className="col-xxl-9 col-xl-9 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_offer_details_sub_heading'>{data.endDate}</p>
                                </div>
                                <div className="col-xxl-3 col-xl-3 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_view_product_heading'>Minimum Purchase :</p>
                                </div>
                                <div className="col-xxl-9 col-xl-9 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_offer_details_sub_heading'>{data.minimumPurchase}</p>
                                </div>
                                <div className="col-xxl-3 col-xl-3 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_view_product_heading'>Maximum Purchase :</p>
                                </div>
                                <div className="col-xxl-9 col-xl-9 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_offer_details_sub_heading'>{data.maximumPurchase}</p>
                                </div>
                                <div className="col-xxl-3 col-xl-3 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_view_product_heading'>Description :</p>
                                </div>
                                <div className="col-xxl-9 col-xl-9 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_offer_details_sub_heading'>{data.description}</p>
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

export default Viewproductoffer
