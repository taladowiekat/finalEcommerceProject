import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRouter({children}) {
    
    if(localStorage.getItem("userToken")==null){
        return <Navigate to='/login'/>
    }
  return (
    children
  )
}

export default ProtectedRouter