import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {
  const isAuthenticated = document.cookie.includes("token=")
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace/>
}

export default ProtectedRoutes