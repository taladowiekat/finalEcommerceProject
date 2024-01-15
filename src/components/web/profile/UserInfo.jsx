import React, { useContext } from 'react'
import { UserContext } from '../context/UUser.jsx';

function UserInfo() {
    const { userData, loading } = useContext(UserContext);

    if (loading) {
        return <p>LOADING......</p>
    }
  return (
    <div>
        <h2>{userData.userName}</h2>
        <img src={userData.image.secure_url} alt="" />
    </div>
  )
}

export default UserInfo