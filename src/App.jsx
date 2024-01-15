import React, { useContext, useEffect, useState } from 'react'
import { RouterProvider } from "react-router-dom";
import { CartContext, CartContextProvider } from './components/web/context/Cart.jsx';
import { router } from './layouts/routes.jsx';
import { UserContext } from './components/web/context/UUser.jsx';

function App() {


  let {setUserToken}=useContext(UserContext)
  let{getCartContext,setcount}=useContext(CartContext)
    useEffect(()=>{
      if(localStorage.getItem("userToken")!=null){
        setUserToken(localStorage.getItem("userToken"));
        setcount(getCartContext().count);
      }
    },[])
  return (
<RouterProvider router={router} />  )

}

export default App