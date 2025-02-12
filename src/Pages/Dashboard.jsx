import React, { useEffect, useState } from 'react';
import '../CSS/vaidik.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Chart from "react-apexcharts";
import { FaStar } from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
// import { TrendingUp, Wallet, ShoppingCart, Users } from 'lucide-react';

const Dashboard = () => {

  // Cahat Box
  const revenueData = [
    { 
      title: "Total Sales", 
      amount: "1,00,000", 
      change: "+22%", 
      img: "total_save.png",
      color: "#8b5cf6",
      data: [30, 40, 100, 10, 120, 140]
    },
    { 
      title: "Total Income", 
      amount: "12,00,000", 
      change: "-25%", 
      img: "total_income.png",
      color: "#10b981",
      data: [20, 40, 80, 100, 110, 100, 80, 40, 20, 10]
    },
    { 
      title: "Total Orders", 
      amount: "10,000", 
      change: "+49%", 
      img: "total_orders.png",
      color: "#8b5cf6",
      data: [30, 40, 100, 10, 120, 140]
    },
    { 
      title: "Total Customer", 
      amount: "8,521", 
      change: "+22%", 
      img: "total_customer.png",
      color: "#f59e0b",
      data: [30, 40, 100, 10, 120, 140]
    },
  ];

  const getChartData = (data) => {
    return data.map((value, index) => ({ value }));
  };

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
  const state = {
    series: [30, 25, 20, 15], // Values matching your image
    options: {
      chart: {
        type: "donut",
      },
      labels: ["On Delivery", "Pending", "Delivered", "Cancelled"],
      legend: {
        show: false, // Hide default legend, we create custom
      },
      dataLabels: {
        enabled: true,
        formatter: (val) => `${val.toFixed(0)}%`,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 250,
            },
          },
        },
      ],
      plotOptions: {
        pie: {
          customScale: 1,
          donut: {
            size: '60%',
          },
        },
      },
      fill: {
        type: 'gradient', // Apply gradient fill to the donut slices
        gradient: {
          type: 'linear',
          shadeIntensity: 1,
          gradientToColors: ["#4CAF50", "#0288D1", "#F50057", "#6200EA"], // Add your target colors for the gradient
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100], // Start and end points of the gradient
        },
      },
    },
  };

  const gradients = [
    "linear-gradient(135deg, #8BC34A, #4CAF50)",
    "linear-gradient(135deg, #03A9F4, #0288D1)",
    "linear-gradient(135deg, #E91E63, #F50057)",
    "linear-gradient(135deg, #9C27B0, #6200EA)",
  ];
  const labels = ["On Delivery", "Pending", "Delivered", "Cancelled"];
  const values = [30, 25, 20, 15];

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
    {
      city: "Mumbai",
      sales: "$2,500",
      change: "0%",
    },
    {
      city: "Singapore",
      sales: "$7,456",
      change: "+19%",
    },
    {
      city: "Pune",
      sales: "$24,189",
      change: "-25%",
    },
    {
      city: "Delhi",
      sales: "$15,700",
      change: "+11%",
    },
    {
      city: "Delhi",
      sales: "$15,700",
      change: "+11%",
    },
    {
      city: "Delhi",
      sales: "$15,700",
      change: "+11%",
    },
  ];

  return (
    <>
      <div id='mv_container_fluid'>
        <div className="mv_main_heading">
          <p className='mb-4'>Dashboard</p>
        </div>

        <div className="row">
          {/* Revenue Cards */}
          {revenueData.map((item, index) => (
            <div key={index} className="col-xxl-3 col-xl-6 col-md-6 col-sm-12 mv_revenue_item">
              <div className="mv_revenue d-flex justify-content-between align-items-center">
                <div className="mv_revenue_text d-flex align-items-center">
                  <div className="mv_total_save_logo">
                    <img src={require(`../mv_img/${item.img}`)} alt={item.title} />
                  </div>
                  <div>
                    <p className="mv_ts_text">{item.title}</p>
                    <p className="mb-0 mv_tsm_text">{item.amount}</p>
                  </div>
                </div>
                <div>
                  <p className={item.change.startsWith("+") ? "mv_text_plus_per" : "mv_text_mainus_per"}>
                    {item.change}
                  </p>
                  <div className="h-12 w-24" style={{ height: "50px", width: "100px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={getChartData(item.data)}>
                        <Line type="monotone" dataKey="value" stroke={item.color} strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
                    <option value='Month'>Month</option>
                    <option value="Week">Week</option>
                    <option value="Year">Year</option>
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
                <div className='mv_chart_container mt-4'>
                  <div id="chart">
                    <Chart
                      options={{
                        ...state.options,
                        colors: gradients, // Apply gradients to chart slices
                      }}
                      series={state.series}
                      type="donut"
                      width={310}
                    />
                  </div>
                  <div className="mv_chart_custom_legend">
                    {labels.map((label, index) => (
                      <div key={index} className="mv_chart_legend_item">
                        <span className="mv_chart_dot" style={{ background: gradients[index] }}></span> {/* Linear Gradient for Legend */}
                        <span className="mv_chart_label">{label}</span>
                        <div className="mv_chart_progress_bar">
                          <div
                            className="mv_chart_progress_fill"
                            style={{
                              width: `${values[index]}%`,
                              background: gradients[index], // Apply linear gradient to progress bar
                            }}
                          ></div>
                        </div>
                        <span className="mv_chart_value">{values[index]}</span>
                      </div>
                    ))}
                  </div>
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
          <div className="col-xl-9">
            <div className="mv_product_table_content">
              <div className="mv_product_heading mv_top_pro_bg">
                <div className="mv_product">
                  <p className='mb-0'>Top Product</p>
                </div>
              </div>
              <div className="mv_product_table_padd">
                <table className='mv_product_table mv_top_table_product'>
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
                            <img className='mv_product_img' src={require('../mv_img/lehenga.png')} alt="" />
                            {item.name}
                          </td>
                        )}
                        {checkboxes.isPriceChecked && <td>{item.price}</td>}
                        {checkboxes.isCategoryChecked && <td>{item.category}</td>}
                        {checkboxes.isSubCategoryChecked && <td>{item.subcategory}</td>}
                        {checkboxes.isRatingChecked &&
                          <td>
                            <div className='mv_rating_img'>
                              <FaStar className='mv_star_yellow' />
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
          <div className="col-xl-3">
            {/* Sales by Location */}
            <div className="mv_product_table_content">
              <table className='mv_sales_by_location_table mv_sales_table_con'>
                <thead>
                  <tr>
                    <th>Sales by Location</th>
                    <th>
                      <Form.Select className='mv_oreder_month mv_table_month' aria-label="Default select example">
                        <option value='Month'>Month</option>
                        <option value="Week">Week</option>
                        <option value="Year">Year</option>
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
                            <p className={item.change.startsWith('+') ? "mv_plus_sales_per mb-0" : "mv_mainus_sales_per mb-0"}>
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