import React from 'react'
import {  Routes,Route } from 'react-router-dom'
import Login_Page from '../Pages/CommonPages/Login_Page'
import Signup_Page from '../Pages/CommonPages/SignUp_Page'

const CommonRoutes = () => {
  return (
      <Routes>
        <Route path="/login" element={<Login_Page />} />
        <Route path="/create-account" element={<Signup_Page />} />
      </Routes>
  )
}

export default CommonRoutes
