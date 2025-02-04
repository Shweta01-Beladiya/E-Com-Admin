import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Component/Layout';
import './CSS/s_style.css';
import Dashboard from './Pages/Dashboard';
// import LoginPage from './Pages/login';
import Forgotpassword from './Pages/Forgotpassword';
import VerifyOTP from './Pages/Veriftotp';
import ResetPassword from './Pages/Resetpassword';
import UserTable from './Pages/User';
import Login from './Pages/Login';
import Viewprofile from './Pages/Viewprofile';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path='/' element={<LoginPage />}></Route> */}
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/verify-otp' element={<VerifyOTP />}></Route>
          <Route path='/forgot-password' element={<Forgotpassword />}></Route>
          <Route path='/reset-password' element={<ResetPassword />}></Route>
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<UserTable/>}/>
            <Route path='view_profile' element={<Viewprofile />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

