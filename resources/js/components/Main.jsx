import React from 'react'
import { BrowserRouter, Route, Routes,Navigate } from 'react-router-dom';
import ReactDom from 'react-dom/client';
import Login from './auth/Login';
import ForgetPassword from './auth/ForgetPassword';
import Register from './auth/Register';
import Layout from './app/Layout';

export default function MyApp() {
  
const isAuthenticated = () => {
  // Replace with your actual authentication check (e.g., checking for a token in localStorage)
  return localStorage.getItem('token') !== null;
};

const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

const PublicRoute = ({ element }) => {
  return !isAuthenticated() ? element : <Navigate to="/" />;
};
  return (
<BrowserRouter>
 <Routes>
  <Route path="/login" element={<PublicRoute element={<Login />} />} />
  <Route path="/forgot-password" element={<PublicRoute element={<ForgetPassword />} />} />
  <Route path="/register" element={<PublicRoute element={<Register />} />} />
  <Route path="/*" element={<PrivateRoute element={<Layout />} />} />
 </Routes>
</BrowserRouter>  )
}

ReactDom.createRoot(document.getElementById("app")).render(<MyApp/>);
