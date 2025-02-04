import React, { useEffect, useState } from 'react';
import '../CSS/vaidik.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ReactApexChart from "react-apexcharts";
import { FaStar } from "react-icons/fa";

const Dashboard = () => {

  // Order Summary
  var orderSummary = [
    {
      label: "On Delivery",
      percentage: 30, 
      color: "bg-green-400" 
    },
    {
      label: "Pending", 
      percentage: 25, 
      color: "bg-pink-400" 
    },
    {
      label: "Delivered", 
      percentage: 20, 
      color: "bg-blue-400" 
    },
    {
      label: "Cancelled", 
      percentage: 15, 
      color: "bg-gray-400" 
    },
  ];

  // Chart
  const [state, setState] = React.useState({
          
    series: [20, 30, 15, 25],
    options: {
      chart: {
        type: 'donut',
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
  });

  // Review
  var review = [
    {
      id: 1,
      name: 'Johan Patel',
      date: 'April 10, 2024',
      imgSrc: require('../mv_img/review_img_one.jpg'),
      rating: 4,
      reviewText: 'Lorem ipsum dolor sit amet consectetur. Consequat tortor sit id tincid nec euism lectus in diam. Lorem ipsum dolor sit amet consectetur'
    },
    {
      id: 2,
      name: 'Sophia Lee',
      date: 'April 12, 2024',
      imgSrc: require('../mv_img/review_img_two.jpg'),
      rating: 5,
      reviewText: 'Lorem ipsum dolor sit amet consectetur. Consequat tortor sit id tincid nec euism lectus in diam. Lorem ipsum dolor sit amet consectetur'
    },
    {
      id: 3,
      name: 'Michael Smith',
      date: 'April 15, 2024',
      imgSrc: require('../mv_img/review_img_one.jpg'),
      rating: 3,
      reviewText: 'Lorem ipsum dolor sit amet consectetur. Consequat tortor sit id tincid nec euism lectus in diam. Lorem ipsum dolor sit amet consectetur'
    }
  ];

  // Top Product
  var data1 = [
    {
      name: "Premium L...",
      price: "$120",
      category: "Women",
      subcategory: "Indian Wear",
      rating: "4.5",
    },
    {
      name: "Premium L...",
      price: "$120",
      category: "Women",
      subcategory: "Indian Wear",
      rating: "4.5",
    },
    {
      name: "Premium L...",
      price: "$120",
      category: "Women",
      subcategory: "Indian Wear",
      rating: "4.5",
    },
    {
      name: "Premium L...",
      price: "$120",
      category: "Women",
      subcategory: "Indian Wear",
      rating: "4.5",
    },
  ];

  localStorage.setItem('data6', JSON.stringify(data1));

  const [checkboxes, setCheckboxes] = useState({
    isNameChecked: true,
    isPriceChecked: true,
    isCategoryChecked: true,
    isSubCategoryChecked: true,
    isRatingChecked: true,
  });

  useEffect(() => {
    const savedCheckboxes = {
      isNameChecked: localStorage.getItem('isNameChecked') === 'true' || true,
      isPriceChecked: localStorage.getItem('isPriceChecked') === 'true' || true,
      isCategoryChecked: localStorage.getItem('isCategoryChecked') === 'true' || true,
      isSubCategoryChecked: localStorage.getItem('isSubCategoryChecked') === 'true' || true,
      isRatingChecked: localStorage.getItem('isRatingChecked') === 'true' || true,
    };

    setCheckboxes(savedCheckboxes);
  }, []);

  const [data, setData] = useState([]);

  const store_data = (value) => {
    let data = JSON.parse(localStorage.getItem('data6')) || [];

    let id = data.length

    value.id = id + 1;

    if (value.status == 'active') {
      value.status = true
    } else {
      value.status = false
    }

    value.image = "pencil_icon.png";

    data.push(value);

    // localStorage.setItem('data6', JSON.stringify(data));

    local_data()

  };

  const local_data = async () => {
    const dataFromStorage = await JSON.parse(localStorage.getItem('data6'));
    setData(dataFromStorage)
  };

  useEffect(() => {
    local_data();
  }, []);

  // Sales by Location
  var salesData = [
    { 
      city: "Surat", 
      sales: "$17,678", 
      change: "+12%", 
    },
    { 
      city: "Ahmedabad", 
      sales: "$5,500", 
      change: "-5%",
    },
    { city: "Mumbai", 
      sales: "$2,500", 
      change: "0%", 
    },
    { city: "Singapore", 
      sales: "$7,456", 
      change: "+19%", 
    },
    { city: "Pune", 
      sales: "$24,189", 
      change: "-25%",
    },
    { city: "Delhi", 
      sales: "$15,700", 
      change: "+11%", 
    },
  ];

  return (
    <>
      <div id='mv_container_fluid'>
        <div className="mv_main_heading">
          <p className='mb-5'>Dashboard</p>
        </div>

        <div className="row">
          {/* Revenue Cards */}
          <div className="col-xxl-3 col-xl-6 col-md-6 col-6 mv_revenue_item">
            <div className="mv_revenue d-flex justify-content-between align-items-center">
              <div className="mv_revenue_text">
                  <div className='d-flex align-items-center'>
                    <div className='mv_total_save_logo'>  
                      <img src={require('../mv_img/total_save.png')} alt="" />
                    </div>
                    <div>
                      <p className='mv_ts_text'>Total Sales</p>
                      <p className='mb-0 mv_tsm_text'>1,00,000</p>
                    </div>
                  </div>
              </div>
              <div>
                <p className='mv_text_plus_per'>+ 22%</p>
                <p></p>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-xl-6 col-md-6 col-6 mv_revenue_item">
          <div className="mv_revenue d-flex justify-content-between align-items-center">
              <div className="mv_revenue_text">
                  <div className='d-flex align-items-center'>
                    <div className='mv_total_save_logo'>  
                      <img src={require('../mv_img/total_income.png')} alt="" />
                    </div>
                    <div>
                      <p className='mv_ts_text'>Total Income</p>
                      <p className='mb-0 mv_tsm_text'>12,00,000</p>
                    </div>
                  </div>
              </div>
              <div>
                <p className='mv_text_mainus_per'>- 25%</p>
                <p></p>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-xl-6 col-md-6 col-6 mv_revenue_item">
          <div className="mv_revenue d-flex justify-content-between align-items-center">
              <div className="mv_revenue_text">
                  <div className='d-flex align-items-center'>
                    <div className='mv_total_save_logo'>  
                      <img src={require('../mv_img/total_orders.png')} alt="" />
                    </div>
                    <div>
                      <p className='mv_ts_text'>Total Orders</p>
                      <p className='mb-0 mv_tsm_text'>10,000</p>
                    </div>
                  </div>
              </div>
              <div>
                <p className='mv_text_plus_per'>+49%</p>
                <p></p>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-xl-6 col-md-6 col-6 mv_revenue_item">
          <div className="mv_revenue d-flex justify-content-between align-items-center">
              <div className="mv_revenue_text">
                  <div className='d-flex align-items-center'>
                    <div className='mv_total_save_logo'>  
                      <img src={require('../mv_img/total_customer.png')} alt="" />
                    </div>
                    <div>
                      <p className='mv_ts_text'>Total Customer</p>
                      <p className='mb-0 mv_tsm_text'>8,521</p>
                    </div>
                  </div>
              </div>
              <div>
                <p className='mv_text_plus_per'>+ 22%</p>
                <p></p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="row">
          <div className="col-lg-6">
            <div className='mv_order_summary'>
              <div className='mv_main_order_summary d-flex justify-content-between align-items-center'>
                <div>
                    <p className='mb-0 mv_heading_order_sum'>Order Summary</p>
                </div>
                <div>
                  <Form.Select className='mv_oreder_month' aria-label="Default select example">
                    <option className='mv_oprtion_month'>Month</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </div>
              </div>
              <div className='mv_sub_order_summary'>
                <div className="row">
                  {orderSummary.map((itrm, index) => (
                    <div className="col-xl-3 col-lg-6 col-md-3 col-sm-6 mb-3" key={index}>
                      <div className="mv_on_deli_con">
                        <p className="mv_on_deli_per mb-2">{itrm.percentage}%</p>
                        <p className="mv_on_deli_text mb-0">{itrm.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className='mt-4'>
                  <div id="chart">
                      <ReactApexChart options={state.options} series={state.series} type="donut" width={380} />
                  </div>
                  <div id="html-dist"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className='mv_review_height'>
              <div className='mv_order_summary'>
                <div className='mv_main_order_summary d-flex justify-content-between align-items-center'>
                  <div>
                    <p className='mb-0 mv_heading_order_sum'>Review</p>
                  </div>
                  <div>
                    <p className='mb-0 mv_review_view_all'>View all</p>  
                  </div>
                </div>
              </div>
              <div className='mv_main_padd'>
                {review.map((item) => (
                  <div key={item.id}>
                    <div className='mv_main_review d-flex justify-content-between'>
                        <div className='d-flex'>
                        <div className='mv_review_user_img'>
                          <img src={item.imgSrc} alt={item.name} />
                        </div>
                        <div>
                          <p className='mv_review_user_name mb-2'>{item.name}</p>
                          <p className='mv_review_date mb-0'>{item.date}</p>
                        </div>
                      </div>
                      <div>
                        <p className='mb-0'>
                          {[...Array(5)].map((_, index) => (
                            <FaStar key={index} className={index < item.rating ? 'mv_star_yellow' : 'mv_star_gray'} />
                          ))}
                        </p>
                      </div>
                    </div>
                    <p className='mv_review_text mb-0'>{item.reviewText}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Top Product */}
        <div className="row mt-4">
          <div className="col-lg-9">
            <div className="mv_product_table_content">
              <div className="mv_product_heading d-flex justify-content-between align-items-center">
                <div className="mv_product">
                  <p className='mb-0'>Top Product</p>
                </div>
                {/* <div className="mv_product_search">
                  <InputGroup>
                    <Form.Control
                      placeholder="Search..."
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                </div> */}
              </div>
              <div className="mv_product_table_padd">
                <table className='mv_product_table justify-content-between'>
                  <thead>
                    <tr>
                      {checkboxes.isNameChecked && <th className=''>Product</th>}
                      {checkboxes.isPriceChecked && <th className=''>Price</th>}
                      {checkboxes.isCategoryChecked && <th className=''>Category</th>}
                      {checkboxes.isSubCategoryChecked && <th className=''>Sub Category</th>}
                      {checkboxes.isRatingChecked && <th className=''>Rating</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index}>
                        {checkboxes.isNameChecked && (
                          <td>
                            <img src={require('../mv_img/product.png')} alt="" />
                            {item.name}
                          </td>
                        )}
                        {checkboxes.isPriceChecked && <td>{item.price}</td>}
                        {checkboxes.isCategoryChecked && <td>{item.category}</td>}
                        {checkboxes.isSubCategoryChecked && <td>{item.subcategory}</td>}
                        {checkboxes.isRatingChecked && 
                          <td>
                            <div className='mv_rating_img'>
                              <FaStar className='mv_star_yellow'/>
                              {item.rating}
                            </div>
                          </td>
                        }
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            {/* Sales by Location */}
            <div className="mv_product_table_content">
              <table className='mv_sales_by_location_table'>
                <thead>
                  <tr>
                    <th>Sales by Location</th>
                    <th>
                      <Form.Select className='mv_oreder_month mv_table_month' aria-label="Default select example">
                        <option className='mv_oprtion_month'>Month</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </Form.Select>
                    </th>
                  </tr>
                </thead>
                <tbody>
                {salesData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.city}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div>
                          <p className="mb-0">{item.sales}</p>
                        </div>
                        <div>
                          <p className={item.isPositive ? "mv_plus_sales_per mb-0" : "mv_mainus_sales_per mb-0"}>
                            {item.change}
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
      </div>
    </>
  )
}

export default Dashboard