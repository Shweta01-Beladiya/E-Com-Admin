import React, { useEffect, useState } from 'react';
import '../CSS/vaidik.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const Dashboard = () => {

  var data1 = [
    {
      id: 1,
      name: "Tomato",
      category: "Vegetable",
      unit: "KG",
      price: "$100",
      qty: "10",
    },
    {
      id: 2,
      name: "Coriander",
      category: "Vegetable",
      unit: "Gram",
      price: "$100",
      qty: "03",
    },
    {
      id: 3,
      name: "Mango",
      category: "Vegetable",
      unit: "Pcs",
      price: "$100",
      qty: "20",
    },
    {
      id: 4,
      name: "Banana",
      category: "Vegetable",
      unit: "KG",
      price: "$100",
      qty: "03",
    },
  ];

  localStorage.setItem('data6', JSON.stringify(data1));

  const [checkboxes, setCheckboxes] = useState({
    isIDChecked: true,
    isNameChecked: true,
    isCategoryChecked: true,
    isUnitChecked: true,
    isPriceChecked: true,
    isQtyChecked: true,
  });

  useEffect(() => {
    const savedCheckboxes = {
      isIDChecked: localStorage.getItem('isIDChecked') === 'true' || true,
      isNameChecked: localStorage.getItem('isNameChecked') === 'true' || true,
      isCategoryChecked: localStorage.getItem('isCategoryChecked') === 'true' || true,
      isUnitChecked: localStorage.getItem('isUnitChecked') === 'true' || true,
      isPriceChecked: localStorage.getItem('isPriceChecked') === 'true' || true,
      isQtyChecked: localStorage.getItem('isQtyChecked') === 'true' || true,
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
                <p className='mb-2 mv_revenue_heading'>Revenue</p>
                <p className='mb-4 mv_revenue_dollar'>$34360.33</p>
                <p className='mb-0 mv_revenue_percan'>
                  <img src={require('../mv_img/arrow_top_right.png')} alt="" />10%
                </p>
              </div>
              <div className="mv_revenue_logo">
                <p className='mb-0'>
                  <img src={require('../mv_img/revenue.png')} alt="" />
                </p>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-xl-6 col-md-6 col-6 mv_revenue_item">
            <div className="mv_revenue d-flex justify-content-between align-items-center">
              <div className="mv_revenue_text">
                <p className='mb-2 mv_revenue_heading'>Daily Order</p>
                <p className='mb-4 mv_revenue_dollar'>2.2K</p>
                <p className='mb-0 mv_daily_order_percan'>
                  <img src={require('../mv_img/arrow_down_left.png')} alt="" />23%
                </p>
              </div>
              <div className="mv_revenue_logo">
                <p className='mb-0'>
                  <img src={require('../mv_img/daily_order.png')} alt="" />
                </p>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-xl-6 col-md-6 col-6 mv_revenue_item">
            <div className="mv_revenue d-flex justify-content-between align-items-center">
              <div className="mv_revenue_text">
                <p className='mb-2 mv_revenue_heading'>Daily Sales</p>
                <p className='mb-4 mv_revenue_dollar'>$34360.33</p>
                <p className='mb-0 mv_daily_sale'>
                  <img src={require('../mv_img/arrow_top_right.png')} alt="" />10%
                </p>
              </div>
              <div className="mv_revenue_logo">
                <p className='mb-0'>
                  <img src={require('../mv_img/daily_sales.png')} alt="" />
                </p>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-xl-6 col-md-6 col-6 mv_revenue_item">
            <div className="mv_revenue d-flex justify-content-between align-items-center">
              <div className="mv_revenue_text">
                <p className='mb-2 mv_revenue_heading'>Products</p>
                <p className='mb-4 mv_revenue_dollar'>226</p>
                <p className='mb-0 mv_product_percan'>
                  <img src={require('../mv_img/arrow_top_right_green.png')} alt="" />10%
                </p>
              </div>
              <div className="mv_revenue_logo">
                <p className='mb-0'>
                  <img src={require('../mv_img/product_revenue.png')} alt="" />
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* product list table */}
        <div className="row mt-4">
          <div className="col-12">
            <div className="mv_product_table_content">
              <div className="mv_product_heading d-flex justify-content-between align-items-center">
                <div className="mv_product">
                  <p className='mb-0'>Product List</p>
                </div>
                <div className="mv_product_search">
                  <InputGroup>
                    <Form.Control
                      placeholder="Search..."
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                </div>
              </div>
              <div className="mv_product_table_padd">
                <table className='mv_product_table justify-content-between'>
                  <thead>
                    <tr>
                      {checkboxes.isIDChecked && <th className=''>ID</th>}
                      {checkboxes.isNameChecked && <th className=''>Name</th>}
                      {checkboxes.isCategoryChecked && <th className=''>Category</th>}
                      {checkboxes.isUnitChecked && <th className=''>Unit</th>}
                      {checkboxes.isPriceChecked && <th className=''>Price</th>}
                      {checkboxes.isQtyChecked && <th className=''>Qty.</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index}>
                        {checkboxes.isIDChecked && <td>{item.id}</td>}
                        {checkboxes.isNameChecked && (
                          <td>
                            <img src={require('../mv_img/vegetable.png')} alt="" />
                            {item.name}
                          </td>
                        )}
                        {checkboxes.isCategoryChecked && <td>{item.category}</td>}
                        {checkboxes.isUnitChecked && <td>{item.unit}</td>}
                        {checkboxes.isPriceChecked && <td>{item.price}</td>}
                        {checkboxes.isQtyChecked && <td className=''>{item.qty}</td>}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard