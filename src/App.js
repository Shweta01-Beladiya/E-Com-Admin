
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Component/Layout';
import './CSS/s_style.css';
import Dashboard from './Pages/Dashboard';
// import LoginPage from './Pages/login';
import Forgotpassword from './Pages/Forgotpassword';
import VerifyOTP from './Pages/Veriftotp';
import ResetPassword from './Pages/Resetpassword';
import UserTable from './Pages/User';

import Maincategory from'./Pages/Maincategory';
import Category from './Pages/Category';

import Viewprofile from './Pages/Viewprofile';
import Subcategory from './Pages/Subcategory';
import Riyansee from './Pages/riyansee';


import Product from "./Pages/product";
import Unit from './Pages/unit';
import Size from './Pages/size';
import Addsize from './Pages/add_size';
import Stock from './Pages/stock';
import Addstock from './Pages/add_stock';
import Login from './Pages/Login';
import DeactivatedAccount from './Pages/DeactivatedAccount';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path='/' element={<LoginPage />}></Route> */}
          <Route path='/' element={<Login/>}></Route>
          <Route path='/verify-otp' element={<VerifyOTP />}></Route>
          <Route path='/forgot-password' element={<Forgotpassword />}></Route>
          <Route path='/reset-password' element={<ResetPassword />}></Route>

          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<UserTable/>}/>
            <Route path='/maincategory' element={<Maincategory/>}></Route>
            <Route path='/category' element={<Category/>}></Route>
            <Route path='/subcategory' element={<Subcategory/>}></Route>
            <Route path='/view_profile' element={<Viewprofile />}></Route>
            <Route path="/product" element={<Product />}></Route>
            <Route path='/unit' element={<Unit />}></Route>
            <Route path='/size' element={<Size />}></Route>
            <Route path='/addsize' element={<Addsize />}></Route>
            <Route path='/stock' element={<Stock />}></Route>
            <Route path='/addstock' element={<Addstock />}></Route>
            <Route path="/riyansee" element={<Riyansee/>}></Route>
            <Route path="/DeactivateAccount" element={<DeactivatedAccount/>}></Route>
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

