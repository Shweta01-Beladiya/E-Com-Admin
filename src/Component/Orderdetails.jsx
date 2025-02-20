import React, { useState } from 'react';
import '../CSS/product.css';

const Order = () => {
  // Sample Data (Replace with API response)
  const [order, setOrder] = useState({
    orderId: '0125',
    orderDate: '10-10-23',
    invoiceNo: '#58454121',
    address: '1st Flr, 13 Chewoolwadi, Kalbadevi Rd, Mumbai 400002, Maharashtra.',
    paymentMethod: 'Debit Card',
    paymentStatus: 'Paid',
    transactionId: '#7654121210',
    totalAmount: '$5000',
    customer: {
      name: 'John Patel',
      email: 'example@gmail.com',
      mobile: '+91 9876543210'
    },
    products: [
      { id: 1, name: 'Premium Saree', price: 10, qty: 10, total: 100, img: require('../mv_img/saree.png') },
      { id: 2, name: 'Premium Lehenga', price: 10, qty: 10, total: 100, img: require('../mv_img/saree.png') }
    ],
    orderStatus: 'Delivered' // Example: Pending, Cancelled, Delivered
  });

  return (
    <div id='mv_container_fluid'>
      {/* Order Header */}
      <div className="mv_main_heading mb-4 d-sm-flex d-block align-items-center justify-content-between">
        <div>
          <p className='mb-1'>Order</p>
          <div className='d-flex align-items-center'>
            <p className='mv_dashboard_heading mb-0'>Dashboard /</p>
            <p className='mv_dashboard_heading mb-0'>Order /</p>
            <p className='mv_category_heading mv_subcategory_heading mb-0'>View Order</p>
          </div>
        </div>
        <div>
          <p className={`mb-0 fs-6 mt-md-0 mt-3 ${
            order.orderStatus === 'Delivered' ? 'mv_delivered_padd' :
            order.orderStatus === 'Pending' ? 'mv_pending_padd' :
            'mv_cancelled_padd'
          }`}>{order.orderStatus}</p>
        </div>
      </div>

      {/* Product Table */}
      <div className="row">
        <div className="col-12">
          <div className="bg-white p-3 rounded">
            <b>Product Detail</b>
            <div className="mv_product_table_padd">
              <table className='mv_product_table '>
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <img src={product.img} alt={product.name} style={{ width: '40px', height: '40px' }} />
                        {product.name}
                      </td>
                      <td>${product.price}</td>
                      <td>{product.qty}</td>
                      <td>${product.total}</td>
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
            <div className='p-3'><b>Order Details</b></div>
            <hr className='m-0' />
            <div className='p-3'>
              <table width="100%" className='sb_table1'>
                <tbody>
                  <tr><td>Order ID:</td><td>{order.orderId}</td></tr>
                  <tr><td>Order Date:</td><td>{order.orderDate}</td></tr>
                  <tr><td>Invoice No:</td><td>{order.invoiceNo}</td></tr>
                  <tr><td>Address:</td><td>{order.address}</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="col-lg-6 col-12">
          <div className="bg-white rounded">
            <div className='p-3'><b>Payment Details</b></div>
            <hr className='m-0' />
            <div className='p-3'>
              <table width="100%"  className='sb_table1'>
                <tbody>
                  <tr><td>Payment Method:</td><td>{order.paymentMethod}</td></tr>
                  <tr><td>Status:</td><td style={{ color: 'green' }}>{order.paymentStatus}</td></tr>
                  <tr><td>Transaction ID:</td><td>{order.transactionId}</td></tr>
                  <tr><td>Total Pay Amount:</td><td>{order.totalAmount}</td></tr>
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
            <div className='p-3'><b>Customer Details</b></div>
            <hr className='m-0' />
            <div className='p-3'>
              <table width="100%"  className='sb_table1'>
                <tbody>
                  <tr><td>Name:</td><td>{order.customer.name}</td></tr>
                  <tr><td>Email:</td><td>{order.customer.email}</td></tr>
                  <tr><td>Mobile No:</td><td>{order.customer.mobile}</td></tr>
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
