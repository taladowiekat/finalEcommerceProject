import axios from "axios";
import { createContext, useState } from "react";


export const CartContext = createContext(null);
export function CartContextProvider({children}){

    let[count , setcount]=useState(0);


    const addToCartContext = async (productId) => {
        try {
            const token = localStorage.getItem("userToken");
            const { data } = await axios.post(
                `${import.meta.env.VITE_API_URL}/cart`,
                { productId },
                { headers: { Authorization: `Tariq__${token}` } }
            );
            setcount((prevCount) => prevCount + 1);
            return data;
        } catch (error) {
            console.log(error);
        }
    };
    


    const getCartContext = async()=>{
        try{
            const token = localStorage.getItem("userToken")
            const {data}= await axios.get(`${import.meta.env.VITE_API_URL}/cart`,
            {headers:{Authorization:`Tariq__${token}`}})
            return data;
        }
        catch(error){
            console.log(error)
        }
    }
    

    const removeItemContext = async (productId) => {
        try {
            const token = localStorage.getItem("userToken");
            const { data } = await axios.patch(
                `${import.meta.env.VITE_API_URL}/cart/removeItem`,
                { productId },
                { headers: { Authorization: `Tariq__${token}` } }
            );
            setcount((prevCount) => prevCount - 1);
            return data;
        } catch (error) {
            console.log(error);
        }
    };



    const deleteallCartContext = async (productId) => {
        try {
            const token = localStorage.getItem("userToken");
            const { data } = await axios.patch(
                `${import.meta.env.VITE_API_URL}/cart/clear`,
                { productId },
                { headers: { Authorization: `Tariq__${token}` } }
            );
            setcount(0);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const increaseContext = async(productId)=>{
        try{
            const token = localStorage.getItem("userToken")
            const {data}= await axios.patch(`${import.meta.env.VITE_API_URL}/cart/incraseQuantity`,
            {productId},
            {headers:{Authorization:`Tariq__${token}`}})
            return data;
        }
        catch(error){
            console.log(error)
        }
    }

    const decreaseContext = async(productId)=>{
        try{
            const token = localStorage.getItem("userToken")
            const {data}= await axios.patch(`${import.meta.env.VITE_API_URL}/cart/decraseQuantity`,
            {productId},
            {headers:{Authorization:`Tariq__${token}`}})
            return data;
        }
        catch(error){
            console.log(error)
        }
    }

    return <CartContext.Provider value={{addToCartContext,getCartContext,removeItemContext,count,setcount,deleteallCartContext,increaseContext,decreaseContext}}>
        {children}
    </CartContext.Provider>
}