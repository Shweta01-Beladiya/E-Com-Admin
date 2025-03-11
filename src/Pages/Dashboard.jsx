import React, { useEffect, useState } from 'react';
import '../CSS/vaidik.css';
import Form from 'react-bootstrap/Form';
import Chart from "react-apexcharts";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import axios from 'axios';

const Dashboard = () => {

  const BaseUrl = process.env.REACT_APP_BASEURL;
  const token = localStorage.getItem('token');

  const [review, setReview] = useState([]);
  const [topProduct, setTopProduct] = useState([]);
  const [summaryCards, setSummaryCards] = useState([]);
  const [locationData, setLocationData] = useState(null);
  const [locationPeriod, setLocationPeriod] = useState('Month');
  const [salesData, setSalesData] = useState([]);
  const [order, setOrder] = useState({
    onDelivery: 0,
    pending: 0,
    delivered: 0,
    cancelled: 0
  });
  const [orderSummary, setOrderSummary] = useState([
    {
      label: "On Delivery",
      percentage: 0,
      color: "bg-green-400"
    },
    {
      label: "Pending",
      percentage: 0,
      color: "bg-pink-400"
    },
    {
      label: "Delivered",
      percentage: 0,
      color: "bg-blue-400"
    },
    {
      label: "Cancelled",
      percentage: 0,
      color: "bg-gray-400"
    },
  ]);
  const [values, setValues] = useState([0, 0, 0, 0]);
  const [orderPeriod, setOrderPeriod] = useState('Year');

  const getChartData = (data) => {
    return data.map((value, index) => ({ value }));
  };

  // Chart
  const [state, setState] = useState({
    series: [0, 0, 0, 0], // Will be updated with real data
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
              width: 220,
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
  });

  const gradients = [
    "linear-gradient(135deg, #8BC34A, #4CAF50)",
    "linear-gradient(135deg, #03A9F4, #0288D1)",
    "linear-gradient(135deg, #E91E63, #F50057)",
    "linear-gradient(135deg, #9C27B0, #6200EA)",
  ];
  const labels = ["On Delivery", "Pending", "Delivered", "Cancelled"];

    const renderStars = (rating) => {
      const stars = [];
      const roundedRating = Math.round(rating * 2) / 2; // Round to nearest 0.5
  
      for (let i = 1; i <= 5; i++) {
        if (i <= roundedRating) {
          stars.push(<FaStar key={i} color="#FDC040" />); // Full Star
        } else if (i - 0.5 === roundedRating) {
          stars.push(<FaStarHalfAlt key={i} color="#FDC040" />); // Half Star
        } else {
          stars.push(<FaRegStar key={i} color="#FDC040" />); // Empty Star
        }
      }
      return stars;
    };

  const fetchAllReviews = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/api/allReviews`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // console.log("response", response.data.data);
      setReview(response.data.data);
    } catch (error) {
      console.error('Data Fetching Error:', error);
    }
  }

  const fetchTopProduct = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/api/topProducts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      // console.log("resposne",response.data.data);
      setTopProduct(response.data.data);
    } catch (error) {
      console.error('Data Fetching Error:', error);
    }
  }

  const fetchAllRevenue = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/api/dashboardSummury`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // console.log("response.data",response.data);

      if (response.data.status === 200 && response.data.data) {
        const currentYearData = response.data.data.currentYear?.monthlyData || [];
        const previousYearData = response.data.data.previousYear?.monthlyData || [];

        // Extract data points for charts
        const salesData = currentYearData.map(item => item.sales || 0);
        const incomeData = currentYearData.map(item => item.income || 0);
        const ordersData = currentYearData.map(item => item.orders || 0);
        const customersData = currentYearData.map(item => item.customers || 0);

        // Calculate year-over-year changes
        const calculateChange = (currentTotal, metricName) => {
          const currentSum = currentYearData.reduce((sum, month) => sum + (month[metricName] || 0), 0);

          // Sum previous year values for the same months
          const previousSum = previousYearData
            .filter(month => currentYearData.some(cm => cm.monthNumber === month.monthNumber))
            .reduce((sum, month) => sum + (month[metricName] || 0), 0);

          // console.log("previousSum",previousSum);

          // Calculate percentage change
          if (previousSum === 0) return '+100%'; // Handle case where previous year was zero

          const changePercent = ((currentSum - previousSum) / previousSum) * 100;
          // console.log("changePercent",changePercent);
          return (changePercent >= 0 ? '+' : '') + changePercent.toFixed(0) + '%';

        };

        setSummaryCards([
          {
            id: 'totalSales',
            title: 'Total Sales',
            amount: response.data.data.totalSales,
            change: calculateChange(response.data.data.totalSales, 'sales'),
            img: "total_save.png",
            color: "#8b5cf6",
            data: salesData
          },
          {
            id: 'totalIncome',
            title: 'Total Income',
            amount: `₹${response.data.data.totalIncome.toLocaleString()}`,
            change: calculateChange(response.data.data.totalIncome, 'income'),
            img: "total_income.png",
            color: "#10b981",
            data: incomeData
          },
          {
            id: 'totalOrders',
            title: 'Total Orders',
            amount: response.data.data.totalOrders,
            change: calculateChange(response.data.data.totalOrders, 'orders'),
            img: "total_orders.png",
            color: "#A0629B",
            data: ordersData
          },
          {
            id: 'totalCustomers',
            title: 'Total Customers',
            amount: response.data.data.totalCustomers,
            change: calculateChange(response.data.data.totalCustomers, 'customers'),
            img: "total_customer.png",
            color: "#f59e0b",
            data: customersData
          }
        ]);
      }
    } catch (error) {
      console.error('Data Fetching Error:', error);
    }
  };

  const fetchOrderSummary = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/api/orderSummary`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // console.log("response", response.data.data);
      setOrder(response.data.data);
    } catch (error) {
      console.error('Data Fetching Error:', error);
    }
  }

  const fetchSalesLocation = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/api/salesByLocation`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // console.log("Sales location data:", response.data.data);

      // Store the full response data for later filtering
      setLocationData(response.data.data);
      processSalesLocationData(response.data.data, 'Month');
    } catch (error) {
      console.error('Data Fetching Error:', error);
    }
  }

  // Process data based on selected period (Month, Year)
  const processSalesLocationData = (data, period) => {
    if (!data) return;

    setLocationPeriod(period);
    let processedData = [];

    if (period === 'Month') {
      // Use currentPeriod data for the current month view
      processedData = data.currentPeriod.map(item => ({
        city: item.city,
        sales: `$${item.totalSales.toLocaleString()}`,
        change: calculateLocationChange(item, data, 'Month'),
      }));
    } else if (period === 'Year') {
      // Process yearly data
      const cities = Object.keys(data.currentYear.monthlyDataByCity || {});

      processedData = cities.map(city => {
        // Calculate total sales for this city across all months in current year
        const currentYearSales = data.currentYear.monthlyDataByCity[city].reduce(
          (sum, month) => sum + (month.totalSales || 0), 0
        );

        // Calculate change compared to previous year if data exists
        let change = '+0%';
        if (data.previousYear?.monthlyDataByCity?.[city]) {
          const prevYearSales = data.previousYear.monthlyDataByCity[city].reduce(
            (sum, month) => sum + (month.totalSales || 0), 0
          );
          // console.log("prevYearSales",prevYearSales);

          const changePercent = prevYearSales > 0
            ? ((currentYearSales - prevYearSales) / prevYearSales) * 100
            : 100;
          // console.log("changePercent",changePercent);

          change = (changePercent >= 0 ? '+' : '') + changePercent.toFixed(0) + '%';
        }
        // console.log("processedData",processedData);

        return {
          city: city,
          sales: `$${currentYearSales.toLocaleString()}`,
          change: change
        };
      });
    } else if (period === 'Week') {
      // Simplified weekly data (you may need to implement proper weekly calculations)
      processedData = data.currentPeriod.map(item => ({
        city: item.city,
        sales: `$${Math.round(item.totalSales / 4).toLocaleString()}`, // Simplified weekly estimate
        change: '+0%',
      }));
    }

    // Update the salesData state
    setSalesData(processedData);
  }

  const calculateLocationChange = (item, data, period) => {
    const city = item.city;
    
    if (!data.currentYear?.monthlyDataByCity?.[city]) {
      // If no data exists for this city, return null instead of a default value
      return null;
    }
    
    const currentMonth = new Date().getMonth();
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1; // Handle January
    
    // Find this month's data
    const currentMonthData = data.currentYear.monthlyDataByCity[city].find(
      m => m.monthNumber === currentMonth
    );
    
    // Find previous month's data (either from current year or previous year)
    let prevMonthData;
    
    if (previousMonth === 11 && currentMonth === 0) {
      // December of previous year
      prevMonthData = data.previousYear?.monthlyDataByCity?.[city]?.find(
        m => m.monthNumber === previousMonth
      );
    } else {
      // Previous month in current year
      prevMonthData = data.currentYear.monthlyDataByCity[city].find(
        m => m.monthNumber === previousMonth
      );
    }
    
    // If no current month data, try to use the most recent available month
    if (!currentMonthData) {
      const availableMonths = data.currentYear.monthlyDataByCity[city]
        .filter(m => m.monthNumber <= currentMonth)
        .sort((a, b) => b.monthNumber - a.monthNumber);
      
      if (availableMonths.length > 0) {
        const mostRecentMonth = availableMonths[0];
        
        // Find the previous month data relative to this most recent data
        const relPrevMonth = mostRecentMonth.monthNumber === 0 ? 11 : mostRecentMonth.monthNumber - 1;
        
        if (relPrevMonth === 11 && mostRecentMonth.monthNumber === 0) {
          prevMonthData = data.previousYear?.monthlyDataByCity?.[city]?.find(
            m => m.monthNumber === relPrevMonth
          );
        } else {
          prevMonthData = data.currentYear.monthlyDataByCity[city].find(
            m => m.monthNumber === relPrevMonth
          );
        }
        
        const current = mostRecentMonth.totalSales || 0;
        const previous = prevMonthData?.totalSales || 0;
        
        if (previous > 0) {
          const percentChange = ((current - previous) / previous) * 100;
          return (percentChange >= 0 ? '+' : '') + percentChange.toFixed(0) + '%';
        } else if (current > 0) {
          return '+100%';
        }
      }
    } else if (currentMonthData) {
      const current = currentMonthData.totalSales || 0;
      const previous = prevMonthData?.totalSales || 0;
      
      if (previous > 0) {
        const percentChange = ((current - previous) / previous) * 100;
        return (percentChange >= 0 ? '+' : '') + percentChange.toFixed(0) + '%';
      } else if (current > 0) {
        return '+100%';
      }
    }
    return '+0%';
  }
  const handleOrderPeriodChange = (period) => {
    setOrderPeriod(period);

  }

  // Update orderSummary and chart data when order data changes
  useEffect(() => {
    if (order && (order.onDelivery !== undefined || order.pending !== undefined ||
      order.delivered !== undefined || order.cancelled !== undefined)) {
      // Calculate total for percentages
      const total = order.onDelivery + order.pending + order.delivered + order.cancelled;

      if (total > 0) {
        // Calculate percentages
        const onDeliveryPercentage = Math.round((order.onDelivery / total) * 100);
        const pendingPercentage = Math.round((order.pending / total) * 100);
        const deliveredPercentage = Math.round((order.delivered / total) * 100);
        const cancelledPercentage = Math.round((order.cancelled / total) * 100);

        // Update orderSummary with calculated percentages
        const updatedOrderSummary = [
          {
            label: "On Delivery",
            percentage: onDeliveryPercentage,
            color: "bg-green-400"
          },
          {
            label: "Pending",
            percentage: pendingPercentage,
            color: "bg-pink-400"
          },
          {
            label: "Delivered",
            percentage: deliveredPercentage,
            color: "bg-blue-400"
          },
          {
            label: "Cancelled",
            percentage: cancelledPercentage,
            color: "bg-gray-400"
          },
        ];

        setOrderSummary(updatedOrderSummary);
        setValues([onDeliveryPercentage, pendingPercentage, deliveredPercentage, cancelledPercentage]);

        setState(prevState => ({
          ...prevState,
          series: [onDeliveryPercentage, pendingPercentage, deliveredPercentage, cancelledPercentage]
        }));
      }
    }
  }, [order]);

  useEffect(() => {
    if (locationData) {
      processSalesLocationData(locationData, locationPeriod);
    }
  }, [locationPeriod, locationData]);

  useEffect(() => {
    fetchAllReviews();
    fetchTopProduct();
    fetchAllRevenue();
    fetchOrderSummary();
    fetchSalesLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <>
      <div id='mv_container_fluid'>
        <div className="mv_main_heading">
          <p className='mb-4'>Dashboard</p>
        </div>

        <div className="row">
          {/* Revenue Cards */}
          {summaryCards.map((item, index) => (
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
                <div className='mv_chart_per'>
                  <div>
                    <p className={item.change.startsWith("+") ? "mv_text_plus_per" : "mv_text_mainus_per"}>
                      {item.change}
                    </p>
                  </div>
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
                  <Form.Select
                    className='mv_oreder_month'
                    value={orderPeriod}
                    onChange={(e) => handleOrderPeriodChange(e.target.value)}
                  >
                    <option value="Year">Year</option>
                    <option value='Month'>Month</option>
                    <option value="Week">Week</option>
                  </Form.Select>
                </div>
              </div>
              <div className='mv_sub_order_summary'>
                <div className="row">
                  {orderSummary.map((item, index) => (
                    <div className="col-xxl-3 col-md-6 col-sm-3 col-6  mb-3" key={index}>
                      <div className="mv_on_deli_con">
                        <p className="mv_on_deli_per mb-2">{item.percentage}%</p>
                        <p className="mv_on_deli_text mb-0">{item.label}</p>
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
                      <div className='d-flex mv_review_name_img'>
                        <div className='mv_review_user_img'>
                          <img src={`${BaseUrl}/${item?.userData[0]?.image}`} alt={item.name} />
                        </div>
                        <div>
                          <p className='mv_review_user_name mb-2'>{item.userData[0]?.name}</p>
                          <p className='mv_review_date mb-0'>
                            {new Date(item.createdAt).toLocaleDateString('en-US', {
                              month: 'long', day: 'numeric', year: 'numeric'
                            })}
                          </p>

                        </div>
                      </div>
                      <div>
                        <p className='mb-0'>{renderStars(item.rating)}</p>
                      </div>
                    </div>
                    <p className='mv_review_text mb-0'>{item.review}</p>
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
                      <th className=''>Product</th>
                      <th className=''>Price</th>
                      <th className=''>Category</th>
                      <th className=''>Sub Category</th>
                      <th className=''>Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topProduct.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <img className='mv_product_img' src={`${BaseUrl}/${item.images[0]}`} alt="" />
                          {item.productName}
                        </td>
                        <td>{item.price}</td>
                        <td>{item.categoryName}</td>
                        <td>{item.subCategoryName}</td>
                        <td>
                          <div className='mv_rating_img'>
                            <FaStar className='mv_star_yellow' />
                            {item.rating}
                          </div>
                        </td>
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
                      <Form.Select
                        className='mv_oreder_month mv_table_month'
                        value={locationPeriod}
                        onChange={(e) => setLocationPeriod(e.target.value)}
                      >
                        <option value="Month">Month</option>
                        <option value="Year">Year</option>
                        <option value="Week">Week</option>
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
                            <p className={String(item.change).startsWith('+') ? "mv_plus_sales_per mb-0" : "mv_mainus_sales_per mb-0"}>
                              {item.change}
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                  }
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