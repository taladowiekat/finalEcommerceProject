import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider ({ children }) {
    const [userToken, setUserToken] = useState(null);
    const [userData, setUserData] = useState(null);
    const[loading, setLoading] = useState(true);
    const getUserData = async () => {
        if (userToken) {
            try {
                const { data } = await axios.get(
                    `${import.meta.env.VITE_API_URL}/user/profile`,
                    { headers: { authorization: `Tariq__${userToken}` } }
                );
                setUserData(data.user);
                setLoading(false)
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
    };

    useEffect(() => {
        getUserData();
    }, [userToken]);

    return (
        <UserContext.Provider value={{ userToken, setUserToken , userData , setUserData ,loading}}>
            {children}
        </UserContext.Provider>
    );
}
