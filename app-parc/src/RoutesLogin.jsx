import React from 'react'
import { Router, Routes, Route } from 'react-router-dom';
import Login from './components/SignUp/Login';
import SignUp from './components/SignUp/SignUp';
import Forgot from './components/SignUp/Forgot';
import ResetPassword from './components/SignUp/ResetPassword';

function RoutesLogin() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Forgot" element={<Forgot />} />
        <Route path="/ResetPassword/:id/:resetToken" element={<ResetPassword />} />
      </Routes>
    </div>
  )
}

export default RoutesLogin

