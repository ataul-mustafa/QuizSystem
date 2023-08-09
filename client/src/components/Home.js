import React, { useEffect, useState } from 'react'
import '../styles/Home.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { CLEAR_SIGN_MSGS_ERR } from '../redux/reducers/userReducers';

function Home() {
    const dispatch = useDispatch();
    const { message, error, user, isAuthenticated } = useSelector((state) => state.userData);
    const [userInfo, setUserInfo] = useState(user.user);
    useEffect(()=>{
        setUserInfo(user.user);
    },[user]);

    useEffect(()=>{
        if(message !== ""){
            toast.error(message);
            dispatch(CLEAR_SIGN_MSGS_ERR());
        }
        if(error !== ""){
            toast.error(error);
            dispatch(CLEAR_SIGN_MSGS_ERR());
        }
    },[message, error])

    return (
        <>
        {
            userInfo && <h1 className='username'>{userInfo.username}</h1>
        }
        <div className='HomeContainer'>
            <div className='contentBox'>
                <h1>Welcome to Mustafa Quiz</h1>
                {
                    isAuthenticated ? <div className='authEle'> <Link to={'/main'} >Give Quiz</Link> <Link to={'/profile'} >Dashboard</Link> </div> :
                        <div className='authEle login'><Link  to={'/login'}>Login</Link></div>
                }
            </div>
        </div>
        </>
    )
}

export default Home;