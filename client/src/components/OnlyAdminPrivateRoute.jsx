import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate,Outlet } from 'react-router-dom'

function OnlyAdminPrivateRoute() {
  
    const {currentuser} = useSelector((state) => state.user)
    return currentuser && currentuser.isAdmin ? <Outlet/>: <Navigate to={"sign-in"}/>
  
}

export default OnlyAdminPrivateRoute