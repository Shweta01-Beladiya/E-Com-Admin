import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Component/Layout';
import './CSS/s_style.css';
import LoginPage from './Pages/login';

function App() {
  return (
    <div>
      <BrowserRouter>
          <Routes>
          <Route path='/' element={<LoginPage/>}></Route>
            <Route path="/dashboard" element={<Layout />}>
            {/* <Route index element={<Dashboard />} /> */}
            </Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

