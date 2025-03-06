import React, { useEffect, useState } from "react";
import "../CSS/product.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const Order = () => {
  const BaseUrl = process.env.REACT_APP_BASEURL;
  const token = localStorage.getItem("token");

  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/api/getOrder/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // console.log("response", response.data.order);
        setData(response.data.order);
      } catch (error) {
        console.error("Data Fetching Error:", error);
      }
    };
    fetchData();
  }, [id]);

  if (!data) return <p>Loading...</p>;

  return (
    <div id="mv_container_fluid">
      {/* Order Header */}
      <div className="mv_main_heading mb-4 d-sm-flex d-block align-items-center justify-content-between">
        <div>
          <p className="mb-1">Order</p>
          <div className="d-flex align-items-center">
            <p className="mv_dashboard_heading mb-0">Dashboard /</p>
            <p className="mv_dashboard_heading mb-0">Order /</p>
            <p className="mv_category_heading mv_subcategory_heading mb-0">
              View Order
            </p>
          </div>
        </div>
        <div>
          <p
            className={`mb-0 fs-6 mt-md-0 mt-3 ${
              data.orderStatus === "Delivered"
                ? "mv_delivered_padd"
                : data.orderStatus === "Confirmed"
                ? "mv_pending_padd"
                : "mv_cancelled_padd"
            }`}
          >
            {data[0].orderStatus}
          </p>
        </div>
      </div>

      {/* Product Table */}
      <div className="row">
        <div className="col-12">
          <div className="bg-white p-3 rounded">
            <b>Product Detail</b>
            <div className="mv_product_table_padd">
              <table className="mv_product_table">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Size</th>
                    <th>Color</th>
                  </tr>
                </thead>
                <tbody>
                  {data[0].productVariantData?.map((product) => (
                    <tr key={product._id}>
                      <td>
                        <img
                          src={`${BaseUrl}/${product.images[0]}`}
                          alt={product.description}
                          style={{ width: "40px", height: "40px" }}
                        />
                        {product.description}
                      </td>
                      <td>${product.discountPrice}</td>
                      <td>{product.size}</td>
                      <td>
                        {product.colorName.split(",").map((color, index) => (
                          <span
                            key={index}
                            style={{
                              backgroundColor: color,
                              width: "15px",
                              height: "15px",
                              display: "inline-block",
                              margin: "2px",
                              borderRadius: "50%",
                            }}
                          ></span>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Order, Payment, and Customer Details */}
      <div className="row g-3 mt-3">
        {/* Order Details */}
        <div className="col-lg-6 col-12">
          <div className="bg-white rounded">
            <div className="p-3">
              <b>Order Details</b>
            </div>
            <hr className="m-0" />
            <div className="p-3">
              <table width="100%" className="sb_table1">
                <tbody>
                  <tr>
                    <td>Order ID:</td>
                    <td>{data.id || '-'}</td>
                  </tr>
                  <tr>
                    <td>Order Date:</td>
                    <td>{new Date(data[0].createdAt).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <td>Total Amount:</td>
                    <td>${data[0].totalAmount}</td>
                  </tr>
                  <tr>
                    <td>Address:</td>
                    <td>
                      {data[0].addressData?.[0].address}, {data[0].addressData?.[0].city},{" "}
                      {data[0].addressData?.[0].state} - {data[0].addressData?.[0].pincode}
                    </td>
                  </tr>
                  <tr>
                    <td>Contact No:</td>
                    <td>{data.addressData?.[0].contactNo}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="col-lg-6 col-12">
          <div className="bg-white rounded">
            <div className="p-3">
              <b>Payment Details</b>
            </div>
            <hr className="m-0" />
            <div className="p-3">
              <table width="100%" className="sb_table1">
                <tbody>
                  <tr>
                    <td>Payment Method:</td>
                    <td>{data[0].paymentMethod}</td>
                  </tr>
                  <tr>
                    <td>Status:</td>
                    <td style={{ color: "green" }}>
                      {data.paymentMethod === "received" ? "Completed" : "Pending"}
                    </td>
                  </tr>
                  <tr>
                    <td>Total Pay Amount:</td>
                    <td>${data[0].totalAmount}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Details */}
      <div className="row my-3">
        <div className="col-lg-6 col-12">
          <div className="bg-white rounded">
            <div className="p-3">
              <b>Customer Details</b>
            </div>
            <hr className="m-0" />
            <div className="p-3">
              <table width="100%" className="sb_table1">
                <tbody>
                  <tr>
                    <td>Name:</td>
                    <td>{data[0].userData?.[0]?.name}</td>
                  </tr>
                  <tr>
                    <td>Mobile No:</td>
                    <td>{data[0].userData?.[0]?.mobileNo}</td>
                  </tr>
                  <tr>
                    <td>Account Status:</td>
                    <td>{data[0].userData?.[0]?.active ? "Active" : "Inactive"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
