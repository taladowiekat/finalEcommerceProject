import axios from "axios";
import { createContext, useState } from "react";


export const OrderContext = createContext(null);
export function OrderContextProvider({ children }) {


    const getOrders = async () => {
        try {
            const token = localStorage.getItem("userToken");
            const { data } = await axios.get(
                `${import.meta.env.VITE_API_URL}/order`,
                { headers: { Authorization: `Tariq__${token}` } }
            );
            console.log(data)
            return data;
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const createOrder = async (orderData) => {
        try {
            const token = localStorage.getItem("userToken");
            const { data } = await axios.post(
                `${import.meta.env.VITE_API_URL}/order`,
                {orderData},
                { headers: { Authorization: `Tariq__${token}` } }
            );
            return data
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };


    const cancelOrder = async (orderId) => {
        try {
            const token = localStorage.getItem("userToken");
            const { data } = await axios.patch(
                `${import.meta.env.VITE_API_URL}/cart/${orderId}`,
                null,
                { headers: { Authorization: `Tariq__${token}` } }
            );
            return data
        } catch (error) {
            console.error('Error cancelling order:', error);
        }
    };

    return <OrderContext.Provider value={{ getOrders, cancelOrder,createOrder }}>
        {children}
    </OrderContext.Provider>
}