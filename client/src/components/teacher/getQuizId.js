import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function GetQuizId() {
    const { user } = useSelector((state) => state.userData);
    const [userInfo, setUserInfo] = useState(user.user);
    const [quizId, setQuizId] = useState(null);
    const [showId, setShowId] = useState(false);
    useEffect(()=>{
        if(user.user){
            setUserInfo(user.user)
        }
    },[user]);

    const getQuizFun = async() => {
        if(userInfo){
            const {data} = await axios.post("/api/teacher/quizIds");
            // console.log(data);
            setQuizId(data.ids);
            setShowId(!showId)
        }
    }

  return (
    <div>
        <Link className='back' to={'/'}>Back</Link>
        {
            userInfo &&
            <div className='nameHeading'>Welcome {userInfo.username}</div>
        }
        {/* <div>
            {
                quizIDs.map((id, index)=>(
                    <h1 key={index}>{id}</h1>
                ))
            }
        </div> */}
        <div><button onClick={getQuizFun}>{showId ? 'hide ': 'show'} your quiz id</button></div>
        <div>
            {
                showId && <h1>{quizId}<p className='messg'>share this with your students so that they can access the quiz</p></h1>
                
            }
        </div>
    </div>
  )
}

export default GetQuizId