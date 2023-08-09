import React, { useEffect } from 'react'
import '../../styles/userInfo.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/userActions';

function UserOptions({role}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { message } = useSelector((state) => state.userData);
    
    useEffect(()=>{
        if(message !== ""){
            toast.success(message);
        }  
    },[message])

    const logoutFun = () => {
        dispatch(logout());
        navigate("/");
    }
  return (
    <div className='optionsBox'>
        {
            role === 'teacher' &&
            <div className='optionsContainer'>
                <Link to={'/createQuiz'}>Create Quiz</Link>
                <Link to={'/createdQuiz'}>Your Quiz Id</Link>
                <Link to={'/studentResult'}>Test Given Stu</Link>
                <button onClick={logoutFun}>Logout</button>
            </div>
        }
        {
            role === 'student' &&
            <div className='optionsContainer'>
                <Link to={'/myResults'}>My Results</Link>
                <Link to={'/main'}>Give a Quiz</Link>
                <button onClick={logoutFun} >Logout</button>
         </div>
        }
        {
            role === 'admin' &&
            <div className='optionsContainer'>
                <Link to={'/allUsers'}>All Users</Link>
                <Link to={'/allStudentResult'}>Test Given Stu</Link>
                <button onClick={logoutFun} >Logout</button>
         </div>
        }
    </div>
  )
}

export default UserOptions