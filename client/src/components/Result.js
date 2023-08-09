import React, { useEffect, useState } from 'react'
import '../styles/Result.css';
import { Link, useNavigate } from 'react-router-dom';

import ResultTable from './ResultTable';
import { useDispatch, useSelector } from 'react-redux';
import { attempts_Number, earnPoints_Number, flagResult } from '../helper/helper';

/** import actions  */
import { resetAllAction } from '../redux/reducers/question_reducer';
import { resetResultAction } from '../redux/reducers/result_reducer';
import { usePublishResult } from '../hooks/setResult';


export default function Result() {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { questions : { queue ,answers}, result : { result, userId}}  = useSelector(state => state)
    const { user } = useSelector((state) => state.userData);
    const { uniqueId } = useSelector((state) => state.uniqueId);
    const [userInfo, setUserInfo] = useState(user.user);

    const totalPoints = queue.length * 10; 
    const attempts = attempts_Number(result);
    const earnPoints = earnPoints_Number(result, answers, 10)
    const flag = flagResult(totalPoints, earnPoints)


    /** store user result */
    usePublishResult({ 
        result, 
        uniqueId,
        username : userInfo.username,
        userEmail: userInfo.email,
        attempts,
        points: earnPoints,
        achived : flag ? "Passed" : "Failed" });

    function onRestart(){
        navigate("/");
        dispatch(resetAllAction())
        dispatch(resetResultAction())
    }

    useEffect(()=>{
        if(user){
            setUserInfo(user.user);
        }
    },[user])

  return (
    <>
    <div className='container'>
        <h1 className='title text-light'>Mustafa Quiz</h1>

        <div className='result flex-center'>
            <div className='flex'>
                <span>Username</span>
                <span className='bold'>{userId || ""}</span>
            </div>
            <div className='flex'>
                <span>Total Quiz Points : </span>
                <span className='bold'>{totalPoints || 0}</span>
            </div>
            <div className='flex'>
                <span>Total Questions : </span>
                <span className='bold'>{ queue.length || 0}</span>
            </div>
            <div className='flex'>
                <span>Total Attempts : </span>
                <span className='bold'>{attempts || 0}</span>
            </div>
            <div className='flex'>
                <span>Total Earn Points : </span>
                <span className='bold'>{earnPoints || 0}</span>
            </div>
            <div className='flex'>
                <span>Quiz Result</span>
                <span style={{ color : `${flag ? "#2aff95" : "#ff2a66" }` }} className='bold'>{flag ? "Passed" : "Failed"}</span>
            </div>
        </div>
    </div>
    <div className="custom">
            <button className='restartbtn' onClick={onRestart}>Home</button>
        </div>
    </>
  )
}
