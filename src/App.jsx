/* eslint-disable no-unused-vars */
import { Children, useContext, useState } from 'react'
import './App.css'
import Login from './views/pages/Authen/Login';
import { BrowserRouter, createBrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './views/pages/Home/Home';
import User from './views/pages/Home/User';
import ResponsiveAppBar from './views/layouts/Topbar';
import { Box } from '@mui/material';
import Main from './views/pages/Home';
import Index from './views/pages/NotFound';
import NotFound from './views/pages/NotFound';
import Register from './views/pages/Authen/Register';

const Authencation = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token"); // Kiểm tra token đã lưu

  if (!isAuthenticated) {
    return <Navigate to="/login" />; // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
  }

  return children; // Nếu đã đăng nhập, render nội dung bên trong
};


function App() {
  return (
    <Box>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/*"
          element={
            <Authencation>
              {/* //   <Authorize> */}
              <Main />
              {/* //   </Authorize> */}
            </Authencation>
          }
          errorElement={
            <NotFound />
          }
        />
      </Routes>
    </Box>
  )
}

export default App
