import React, { useContext } from 'react'
import { UserContext } from '../context/UUser.jsx'

function UserContact() {
    const { userData, loading } = useContext(UserContext);

    if (loading) {
        return <p>LOADING......</p>
    }
    return (
        <div>
            <h2>{userData.email}</h2>
            <p>{userData.phone}</p>
        </div>
    )
}

export default UserContact