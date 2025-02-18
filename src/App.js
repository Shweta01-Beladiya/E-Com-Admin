import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Component/Layout';
import './CSS/s_style.css';
import Dashboard from './Pages/Dashboard';
// import LoginPage from './Pages/login';
import Forgotpassword from './Pages/Forgotpassword';
import VerifyOTP from './Pages/Veriftotp';
import ResetPassword from './Pages/Resetpassword';
import UserTable from './Pages/User';
import Product from "./Pages/product";
import Unit from './Pages/unit';
import Size from './Pages/size';
import Addsize from './Pages/add_size';
import Stock from './Pages/stock';
import Addstock from './Pages/add_stock';
import Coupon from './Pages/coupon';
import Addcoupon from './Pages/add_coupon';
import Productoffer from './Pages/product_offer';
import Addproductoffer from './Pages/add_product_offer';
import DeactivatedAccount from './Pages/DeactivatedAccount';
import MainCategory from './Pages/Maincategory';
import Category from './Pages/Category';
import SubCategory from './Pages/Subcategory';
import Viewprofile from './Pages/Viewprofile';

import Viewproductoffer from './Pages/view_product_offer';
import Offer from './Pages/offfer';
import Addoffer from './Pages/add_offer';
import Viewoffer from './Pages/view_offer';

import Help from './Pages/Help';
import ContactUs from './Pages/ContactUs';
import ViewContact from './Pages/ViewContact';
import Login from './Pages/login';
import ReviewManagement from './Pages/Review';
import Returnorder from './Pages/return_order';
import Viewstatus from './Pages/view_status';
import Cancelorder from './Pages/cancel_order';
import Reasonforcancellation from './Pages/reason_for_cancellation';
import Termsconditions from './Pages/termsconditions';
import Viewtermsconditions from './Pages/view_termsconditions';
import Faqs from './Pages/faqs';
import Accountpolicy from './Pages/account_policy';
import OrderManagement from './Pages/Order';
import OrderDetail from './Component/Orderdetails';
import Aboutus from './Pages/about_us';
import Viewaboutus from './Pages/view_aboutus';
import Cards from './Pages/card';
import Popularbrands from './Pages/popular_brands';
import Addpopularbrands from './Pages/add_popularbrands';
import AddProduct from './Pages/AddProduct';



function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path='/' element={<LoginPage />}></Route> */}
          <Route path='/' element={<Login />}></Route>
          <Route path='/verify-otp' element={<VerifyOTP />}></Route>
          <Route path='/forgot-password' element={<Forgotpassword />}></Route>
          <Route path='/reset-password' element={<ResetPassword />}></Route>

          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<UserTable />} />
            <Route path='/maincategory' element={<MainCategory />}></Route>
            <Route path='/category' element={<Category />}></Route>
            <Route path='/subcategory' element={<SubCategory />}></Route>
            <Route path='/view_profile' element={<Viewprofile />}></Route>
            <Route path="/product" element={<Product />}></Route>
            <Route path="/addProduct" element={<AddProduct />}></Route>
            <Route path='/unit' element={<Unit />}></Route>
            <Route path='/size' element={<Size />}></Route>
            <Route path='/addsize' element={<Addsize />}></Route>
            <Route path='/stock' element={<Stock />}></Route>
            <Route path='/addstock' element={<Addstock />}></Route>

            <Route path="/order" element={<OrderManagement/>}></Route>
            <Route path="/order/:id" element={<OrderDetail/>}></Route>
            <Route path='/review' element={<ReviewManagement />}></Route>
            <Route path="/DeactivateAccount" element={<DeactivatedAccount/>}></Route>
            <Route path='/coupon' element={<Coupon />}></Route>
            <Route path='/addcoupon' element={<Addcoupon />}></Route>
            <Route path='/Productoffer' element={<Productoffer />}></Route>
            <Route path='/addproductoffer' element={<Addproductoffer />}></Route>
            <Route path='/viewproductoffer' element={<Viewproductoffer />}></Route>
            <Route path='/offer' element={<Offer />}></Route>
            <Route path='/addoffer' element={<Addoffer />}></Route>
            <Route path='/viewoffer' element={<Viewoffer />}></Route>

            <Route path='/help' element={<Help />}></Route>
            <Route path='/ContactUs' element={<ContactUs />}></Route>
            <Route path='/ViewContact' element={<ViewContact />}></Route>

            <Route path='/returnorder' element={<Returnorder />}></Route>
            <Route path='/viewstatus' element={<Viewstatus />}></Route>
            <Route path='/cancelorder' element={<Cancelorder />}></Route>
            <Route path='/reasonforcancellation' element={<Reasonforcancellation />}></Route>
            <Route path='/termsconditions' element={<Termsconditions />}></Route>
            <Route path='/viewtermsconditions' element={<Viewtermsconditions />}></Route>
            <Route path='/faqs' element={<Faqs />}></Route>
            <Route path='/accountpolicy' element={<Accountpolicy />}></Route>
            <Route path='/aboutus' element={<Aboutus />}></Route>
            <Route path='/viewaboutus' element={<Viewaboutus />}></Route>
            <Route path='/cards' element={<Cards />}></Route>
            <Route path='/popularbrands' element={<Popularbrands />}></Route>
            <Route path='/addpopularbrands' element={<Addpopularbrands />}></Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;