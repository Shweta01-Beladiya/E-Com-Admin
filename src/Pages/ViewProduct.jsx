import React from 'react';
import { Col, Row, Tab } from 'react-bootstrap';

const ViewProduct = () => {

    const productData = {
        mainCategory: "Women",
        category: "Indian Wear",
        subCategory: "Chaniya Choli",
        productName: "Traditional Chaniya choli",
        shortDescription: "Lorem ipsum dolor sit amet consectetur. Massa facilisis scelerisque iaculis habitant congue est blandit amet.",
        gender: "Female",
        size: "34, 36, 38, 40, 42, 44",
        stockStatus: "In stock",
        colors: ["#FF6B6B", "#4169E1", "#000000"],
        qty: 60,
        description: "Lorem ipsum dolor sit amet consectetur. Massa facilisis scelerisque iaculis habitant congue est blandit amet. Tortor in vulputate nulla vitae quam.Lorem ipsum dol amet consectetur. Massa",
        price: "$12000",
        discountPrice: "$120",
        offerCode: "NEW201",
        rating: 4.5,
        brand: "Louis Vitton",
        fabric: "Cotton Silk",
        pattern: "Leheriya Print",
        sleeveType: "Full Sleeve",
        washCase: "Dry Clean Only",
        work: "Cutdana, Sequence",
        occasion: "Navratri",
        countryOrigin: "India"
    };

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
                            {/* {productImages.map((image, index) => (
                <div key={index} className="col-3 col-lg-6">
                  <img
                    src="/api/placeholder/100/100"
                    alt={`Product view ${index + 1}`}
                    className="img-fluid rounded"
                  />
                </div>
              ))} */}
                            <div className="col-3">
                                <img
                                    src={require('../s_img/image1.png')}
                                    alt=""
                                    className="img-fluid rounded"
                                />
                            </div>
                            <div className="col-3">
                                <img
                                    src={require('../s_img/image2.png')}
                                    alt=""
                                    className="img-fluid rounded"
                                />
                            </div>
                            <div className="col-3 ">
                                <img
                                    src={require('../s_img/image3.png')}
                                    alt=""
                                    className="img-fluid rounded"
                                />
                            </div>
                            <div className="col-3">
                                <img
                                    src={require('../s_img/image4.png')}
                                    alt=""
                                    className="img-fluid rounded"
                                />
                            </div>
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
                    <InfoField label="Main Category" value={productData.mainCategory} />
                    <InfoField label="Category" value={productData.category} />
                    <InfoField label="Sub Category" value={productData.subCategory} />
                    <InfoField label="Product Name" value={productData.productName} />
                    <InfoField label="Gender" value={productData.gender} />
                    <InfoField label="Size" value={productData.size} />
                    <InfoField label="Stock status" value={productData.stockStatus} />
                    <InfoField label="Short Description" value={productData.shortDescription} />
                    <InfoField label="Description" value={productData.description} />
                    <div className="flex items-center gap-2">
                        <span className="font-medium">Color:</span>
                        {productData.colors.map((color, index) => (
                            <div
                                key={index}
                                className="w-6 h-6 rounded-full"
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                </div>

                <div className="col-md-6 col-12 p-4">
                    <InfoField label="Rating" value={`⭐ ${productData.rating}`} />
                    <InfoField label="Brand" value={productData.brand} />
                    <InfoField label="Fabric" value={productData.fabric} />
                    <InfoField label="Pattern" value={productData.pattern} />
                    <InfoField label="Sleeve Type" value={productData.sleeveType} />
                    <InfoField label="Wash case" value={productData.washCase} />
                    <InfoField label="Work" value={productData.work} />
                    <InfoField label="Occasion" value={productData.occasion} />
                    <InfoField label="Country Origin" value={productData.countryOrigin} />
                    <InfoField label="QTY" value={productData.qty} />
                    <InfoField label="Price" value={productData.price} />
                    <InfoField label="Discount Price" value={productData.discountPrice} />
                    <InfoField label="Offer code" value={productData.offerCode} />
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