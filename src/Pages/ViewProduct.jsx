import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ViewProduct = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const productVariantId = searchParams.get('productVariantId');

    const BaseUrl = process.env.REACT_APP_BASEURL;
    const token = localStorage.getItem('token');

    const [product, setProduct] = useState([]);
    const [productVariant, setProductVariant] = useState([]);

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/api/getProduct/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // console.log("resposne@@@@@@@@@", response);

            setProduct(response.data.product[0])
        } catch (error) {
            console.error('Data Fetching Error:', error);
        }
    }
    const fetchProductVariant = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/api/getProductVariant/${productVariantId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // console.log("response@@@@@@@@@@@@@@", response.data.productVariant);
            if (Array.isArray(response.data.productVariant) && response.data.productVariant.length > 0) {
                setProductVariant(response.data.productVariant[0]);
            }
        } catch (error) {
            console.error('Data Fetching Error:', error);
        }
    }

    useEffect(() => {
        fetchProduct();
        fetchProductVariant();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="container-fluid p-4">
            {/* Header */}
            <div className="mb-4">
                <h5 className="mb-0 fw-bold">View Product</h5>
                <div className="d-flex">
                    <p className="text-muted mb-0">Dashboard /</p>
                    <p className="ms-1 mb-0">View Product</p>
                </div>
            </div>

            <div className="row">
                {/* Image Gallery */}
                <div className="col-12 col-lg-8 col-xl-4 mb-4 mb-lg-0 p-0">
                    <div className="bg-white ">
                        <h6 className="p-3 m-0" style={{ fontWeight: 'bold' }}>Product Image</h6>
                        <hr className='m-0' />
                        <div className="row d-flex g-4 p-4">
                            {/* {console.log("productVariant.images", productVariant.images)} */}
                            {productVariant.images && productVariant.images.length > 0 ? (
                                productVariant.images.map((image, index) => (
                                    <div key={index} className="col-3">
                                        <img
                                            src={`${BaseUrl}/${image.replace('\\', '/')}`}
                                            alt={`Product view ${index + 1}`}
                                            className="img-fluid rounded"
                                        />
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted">No images available</p>
                            )}


                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className='mv_main_offerdetails_con mt-4'>
                    <div className="">
                        <p className='mv_offer_details_heading mb-0'>Product Information</p>
                    </div>
                    <div className="row mv_main_view_product_con mv_main_offerdetails">
                        <div className="col-xxl-5 mb-2">
                            <div className="row">
                                <div className="col-xxl-6 col-xl-3 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_view_product_heading'>Main Category :</p>
                                </div>
                                <div className="col-xxl-6 col-xl-9 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_offer_details_sub_heading'>{product.mainCategoriesData?.[0].mainCategoryName}</p>
                                </div>
                                <div className="col-xxl-6 col-xl-3 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_view_product_heading'>Category :</p>
                                </div>
                                <div className="col-xxl-6 col-xl-9 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_offer_details_sub_heading'>{product.categoriesData?.[0].categoryName}</p>
                                </div>
                                <div className="col-xxl-6 col-xl-3 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_view_product_heading'>Sub Category :</p>
                                </div>
                                <div className="col-xxl-6 col-xl-9 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_offer_details_sub_heading'>{product.subCategoriesData?.[0].subCategoryName}</p>
                                </div>
                                <div className="col-xxl-6 col-xl-3 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_view_product_heading'>Product :</p>
                                </div>
                                <div className="col-xxl-6 col-xl-9 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_offer_details_sub_heading'>{product.productName}</p>
                                </div>

                                <div className="col-xxl-6 col-xl-3 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_view_product_heading'>Short Description :</p>
                                </div>
                                <div className="col-xxl-6 col-xl-9 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_offer_details_sub_heading'>{productVariant.shortDescription}</p>
                                </div>
                                <div className="col-xxl-6 col-xl-3 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_view_product_heading'>Size :</p>
                                </div>
                                <div className="col-xxl-6 col-xl-9 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_offer_details_sub_heading'>{productVariant.size}</p>
                                </div>
                                <div className="col-xxl-6 col-xl-3 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_view_product_heading'>Stock status :</p>
                                </div>
                                <div className="col-xxl-6 col-xl-9 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_offer_details_sub_heading'>{product.stockStatus}</p>
                                </div>
                                <div className="col-xxl-6 col-xl-3 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_view_product_heading'>QTY :</p>
                                </div>
                                <div className="col-xxl-6 col-xl-9 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_offer_details_sub_heading'>{product.quantity}</p>
                                </div>
                                <div className="col-xxl-6 col-xl-3 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_view_product_heading'>Description :</p>
                                </div>
                                <div className="col-xxl-6 col-xl-9 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_offer_details_sub_heading'>{productVariant.description}</p>
                                </div>
                                <div className="col-xxl-6 col-xl-3 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_view_product_heading'>Price :</p>
                                </div>
                                <div className="col-xxl-6 col-xl-9 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_offer_details_sub_heading'>{productVariant.originalPrice || '-'}</p>
                                </div>
                                <div className="col-xxl-6 col-xl-3 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_view_product_heading'>Discount Price :</p>
                                </div>
                                <div className="col-xxl-6 col-xl-9 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_offer_details_sub_heading'>{productVariant.discountPrice || '-'}</p>
                                </div>
                                <div className="col-xxl-6 col-xl-3 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_view_product_heading'>Offer code :</p>
                                </div>
                                <div className="col-xxl-6 col-xl-9 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_offer_details_sub_heading'>{productVariant.offerCode || '-'}</p>
                                </div>
                                <div className="col-xxl-6 col-xl-3 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_view_product_heading'>Color :</p>
                                </div>
                                <div className="col-xxl-6 col-xl-9 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <div className='d-flex align-items-center gap-2'>
                                        {productVariant.colorName &&
                                            productVariant.colorName.split(',').map((color, index) => (
                                                <div
                                                    key={index}
                                                    style={{ backgroundColor: color, width: '20px', height: '20px', borderRadius: '50%' }}
                                                ></div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-7">
                            <div className="row">
                                <div className="col-xxl-3 col-xl-3 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_view_product_heading'>Rating :</p>
                                </div>
                                <div className="col-xxl-9 col-xl-9 col-lg-5 col-md-6 col-sm-6 col-6">
                                    {product.ratingData?.[0]?.rating ? (
                                        <p className="mv_offer_details_sub_heading">
                                            {`⭐ ${product.ratingData[0].rating || 0}`}
                                        </p>
                                    ) : null}
                                </div>
                                <div className="col-xxl-3 col-xl-3 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_view_product_heading'>Unit :</p>
                                </div>
                                <div className="col-xxl-9 col-xl-9 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_offer_details_sub_heading'>{product.unitData?.[0].name}</p>
                                </div>
                                <div className="col-xxl-3 col-xl-3 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_view_product_heading'>Brand :</p>
                                </div>
                                <div className="col-xxl-9 col-xl-9 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_offer_details_sub_heading'>{productVariant.specifications?.Brand || '-'}</p>
                                </div>
                                <div className="col-xxl-3 col-xl-3 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_view_product_heading'>Fabric :</p>
                                </div>
                                <div className="col-xxl-9 col-xl-9 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_offer_details_sub_heading'>{productVariant.specifications?.Fabric || '-'}</p>
                                </div>
                                <div className="col-xxl-3 col-xl-3 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_view_product_heading'>Pattern :</p>
                                </div>
                                <div className="col-xxl-9 col-xl-9 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_offer_details_sub_heading'>{productVariant.specifications?.Pattern || '-'}</p>
                                </div>
                                <div className="col-xxl-3 col-xl-3 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_view_product_heading'>Sleeve Type :</p>
                                </div>
                                <div className="col-xxl-9 col-xl-9 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_offer_details_sub_heading'>{productVariant.specifications?.SleeveType || '-'}</p>
                                </div>
                                <div className="col-xxl-3 col-xl-3 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_view_product_heading'>Wash case :</p>
                                </div>
                                <div className="col-xxl-9 col-xl-9 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_offer_details_sub_heading'>{productVariant.specifications?.washCase || '-'}</p>
                                </div>
                                <div className="col-xxl-3 col-xl-3 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_view_product_heading'>Work :</p>
                                </div>
                                <div className="col-xxl-9 col-xl-9 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_offer_details_sub_heading'>{productVariant.specifications?.Work || '-'}</p>
                                </div>
                                <div className="col-xxl-3 col-xl-3 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_view_product_heading'>Occasion :</p>
                                </div>
                                <div className="col-xxl-9 col-xl-9 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_offer_details_sub_heading'>{productVariant.specifications?.Occasion || '-'}</p>
                                </div>
                                <div className="col-xxl-3 col-xl-3 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_view_product_heading'>Country Origin :</p>
                                </div>
                                <div className="col-xxl-9 col-xl-9 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_offer_details_sub_heading'>{productVariant.specifications?.CountryOrigin || '-'}</p>
                                </div>
                                <div className="col-xxl-3 col-xl-3 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_view_product_heading'>Warning :</p>
                                </div>
                                <div className="col-xxl-9 col-xl-9 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_offer_details_sub_heading'>{productVariant.specifications?.Warning || '-'}</p>
                                </div>
                                <div className="col-xxl-3 col-xl-3 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_view_product_heading'>Manufacturing Details :</p>
                                </div>
                                <div className="col-xxl-9 col-xl-9 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_offer_details_sub_heading'>{productVariant.manufacturingDetails || '-'}</p>
                                </div>
                                <div className="col-xxl-3 col-xl-3 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_view_product_heading'>Shipping :</p>
                                </div>
                                <div className="col-xxl-9 col-xl-9 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_offer_details_sub_heading'>{productVariant.shiping || '-'}</p>
                                </div>
                                <div className="col-xxl-3 col-xl-3 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_view_product_heading'>Return/exchange Policy :</p>
                                </div>
                                <div className="col-xxl-9 col-xl-9 col-lg-5 col-md-6 col-sm-6 col-6">
                                    <p className='mv_offer_details_sub_heading'>{productVariant.returnPolicy || '-'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewProduct;