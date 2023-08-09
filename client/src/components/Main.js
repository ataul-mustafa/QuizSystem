import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Main.css'
import { SAVE_UNIQUE_ID } from '../redux/reducers/uniqueIdReducer';
import { toast } from 'react-hot-toast';
import axios from 'axios';

export default function Main() {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [id, setId] = useState(null);

    const startQuiz = async() =>{
        if(id){
             const {data} = await axios.post("/api/uniqueId", { uniqueId: id});
             if(data.success){
                dispatch(SAVE_UNIQUE_ID(data.uniqueId))
                navigate("/quiz")
             }else if(data.msg !== ""){
                toast.error(data.msg);
             }else if(data.msg !== "" && !data.success){
                toast.error("Something went wrong");
             }
        }
    }


  return (
    <div className='mainContainer'>
        <Link className='back' to={'/'}>Back</Link>
        <div className='container'>
        <h1>Mustafa Quiz System</h1>

        <ol>
            <li>You will be asked 10 questions one after another.</li>
            <li>10 points is awarded for the correct answer.</li>
            <li>Each question has three options. You can choose only one options.</li>
            <li>You can review and change answers before the quiz finish.</li>
            <li>The result will be declared at the end of the quiz.</li>
        </ol>

        <form id="form">
            <input onChange={e=>setId(e.target.value)} className="userid" type="number" max={999999} placeholder='Enter Quiz Id provided By you teacher*' />
        </form>

        <div className='start'>
            <button className='btn' onClick={startQuiz}>Start Quiz</button>
        </div>

    </div>
    </div>
  )
}
