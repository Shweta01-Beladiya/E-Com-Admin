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

    const [product, setProduct] = useState({});
    const [productVariant, setProductVariant] = useState({});


    const fetchProduct = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/api/getProduct/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // console.log("resposnse",response.data);
            setProduct(response.data.product)
        } catch (error) {
            console.error('Data Fetching Error:', error);
        }
    }
    const fetchProductVariant = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/api/getProductVariant/${productVariantId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // console.log("response", response.data.productVariant); 
            setProductVariant(response.data.productVariant);
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
                        <div className="row d-flex p-4">
                            {/* {console.log("productVariant.images", productVariant.images)} */}
                            {productVariant.images && productVariant.images.length > 0 ? (
                                productVariant.images.map((image, index) => (
                                    <div key={index} className="col-3">
                                        <img
                                            src={`${BaseUrl}/${image}`}
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

            <div className="row rounded-lg shadow mt-4" style={{ backgroundColor: '#ffffff' }}>
                <div className="col-12 p-0">
                    <h6 className="p-3 mb-0" style={{ fontWeight: 'bold' }}>Product Information</h6>
                    <hr className='m-0' />
                </div>
                {/* Left Column */}
                <div className="col-md-6 col-12 p-4">
                    <InfoField label="Main Category" value={product.mainCategory} />
                    <InfoField label="Category" value={product.category} />
                    <InfoField label="Sub Category" value={product.subCategory} />
                    <InfoField label="Product Name" value={product.productName} />
                    <InfoField label="Short Description" value={productVariant.shortDescription} />
                    <InfoField label="Gender" value={product.gender || '-'} />
                    <InfoField label="Size" value={productVariant.size} />
                    <InfoField label="Stock status" value={product.stockStatus} />
                    <InfoField label="QTY" value={productVariant.specifications?.find(spec => spec.key === 'QTY')?.value || '-'} />
                    <InfoField label="Description" value={productVariant.description} />
                    <InfoField label="Price" value={productVariant.originalPrice || '-'} />
                    <InfoField label="Discount Price" value={productVariant.discountPrice || '-'} />
                    <InfoField label="Offer code" value={productVariant.offerCode || '-'} />
                    <div className="d-flex items-center gap-2">
                        <span style={{ color: '#808080', fontWeight: 'bold' }}>Color:</span>
                        {productVariant.colorName &&
                            productVariant.colorName.split(',').map((color, index) => (
                                <div
                                    key={index}
                                    style={{ backgroundColor: color, width: '24px', height: '24px', borderRadius: '50%' }}
                                ></div>
                            ))}
                    </div>

                </div>

                <div className="col-md-6 col-12 p-4">
                    <InfoField label="Rating" value={`⭐ ${product.rating}` || '-'} />
                    <InfoField label="Unit" value={productVariant.unitId} />
                    <InfoField label="Brand" value={productVariant.specifications?.find(spec => spec.key === 'Brand')?.value || '-'} />
                    <InfoField label="Fabric" value={productVariant.specifications?.find(spec => spec.key === 'Fabric')?.value || '-'} />
                    <InfoField label="Pattern" value={productVariant.specifications?.find(spec => spec.key === 'Pattern')?.value || '-'} />
                    <InfoField label="Sleeve Type" value={productVariant.specifications?.find(spec => spec.key === 'Sleeve Type')?.value || '-'} />
                    <InfoField label="Wash case" value={productVariant.specifications?.find(spec => spec.key === 'washCase')?.value || '-'} />
                    <InfoField label="Work" value={productVariant.specifications?.find(spec => spec.key === 'Work')?.value || '-'} />
                    <InfoField label="Occasion" value={productVariant.specifications?.find(spec => spec.key === 'Occasion')?.value || '-'} />
                    <InfoField label="Country Origin" value={productVariant.specifications?.find(spec => spec.key === 'Country Origin')?.value || '-'} />
                    <InfoField label="Warning" value={productVariant.specifications?.find(spec => spec.key === 'Warning')?.value || '-'} />
                    <InfoField label="Manufacturing Details" value={productVariant.manufacturingDetails || '-'} />
                    <InfoField label="Shipping" value={productVariant.shiping || '-'} />
                    <InfoField label="Return / exchange Policy" value={productVariant.returnPolicy || '-'} />
                </div>
            </div>
        </div>
    );
};
const InfoField = ({ label, value }) => (
    <table style={{ width: '100%' }}>
        <tr style={{ width: '50%' }}>
            <td style={{ width: '50%', padding: '5px 0', color: 'gray', fontWeight: 'bold' }}>{label}: </td>
            <td className="text-gray-600" style={{ width: '50%', padding: '5px 0', fontWeight: "bold" }}>{value}</td>
        </tr>
    </table>
);
export default ViewProduct;