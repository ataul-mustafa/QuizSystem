import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import '../../styles/userInfo.css'
import { Link } from 'react-router-dom';
import UserOptions from './UserOptions';
import { toast } from 'react-hot-toast';

function Profile() {
    const { loading, message, error, isAuthenticated, user } = useSelector((state) => state.userData);
    
    const [userInfo, setUserInfo] = useState(user.user);
    useEffect(()=>{
        setUserInfo(user.user)
       
    },[user]);
  return (
    <div>
        <Link className='back' to={'/'}>Back</Link>
        <div className='dashBoard'>
        <div className='profile'>
        {
            userInfo &&
            <div>
                <div className='userInfo'>
                <h2><p>Name:</p>{userInfo.username}</h2>
                <h2><p>Email:</p>{userInfo.email}</h2>
                <h2><p>Class: </p>{userInfo.class}</h2>
                <h2><p>Creating Date:</p>{userInfo.createdAt}</h2>
                <h2><p>User-Type:</p>{userInfo.role}</h2>
            </div>
            <div>
                <UserOptions role={userInfo.role} />
            </div>
            </div>
        }
        </div>
        </div>
    </div>
  )
}

export default Profile