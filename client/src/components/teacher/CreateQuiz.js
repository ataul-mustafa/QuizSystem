import React, { useEffect, useState } from 'react'
import '../../styles/createQuiz.css'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function CreateQuiz() {
    const Questions = [
        {
            id: 1,
            question : "",
            options : [
                '',
                '',
                '',
                '',
            ]
        },
        {
            id: 2,
            question : "",
            options : [
                '',
                '',
                '',
                '',
            ]
        },
        {
            id: 3,
            question : "",
            options : [
                '',
                '',
                '',
                '',
            ]
        },
        {
            id: 4,
            question : "",
            options : [
                '',
                '',
                '',
                '',
            ]
        },
        {
            id: 5,
            question : "",
            options : [
                '',
                '',
                '',
                '',
            ]
        },
        {
            id: 6,
            question : "",
            options : [
                '',
                '',
                '',
                '',
            ]
        },
        {
            id: 7,
            question : "",
            options : [
                '',
                '',
                '',
                '',
            ]
        },
        {
            id: 8,
            question : "",
            options : [
                '',
                '',
                '',
                '',
            ]
        },
        {
            id: 9,
            question : "",
            options : [
                '',
                '',
                '',
                '',
            ]
        },
        {
            id: 10,
            question : "",
            options : [
                '',
                '',
                '',
                '',
            ]
        },
    ]

    const answers = [];
    const [uniqueId, setUniqueId] = useState(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        if(message !== ""){
            toast.success(message);
        }
        if(error !== ""){
            toast.error(error);
        }
        if(loading){
            toast.success("Loading...");
        }
    }, [message, error, loading])

    const submitQues = async(e) => {
        e.preventDefault();

        const info = {
            questions: Questions,
            answers,
            uniqueId,
        }
        setLoading(true);
        const {data} = await axios.post("/api/questions", info);
        setLoading(false);
        // toast.promise(data, {
        //     loading: 'Loading...',
        //     success: 'Loaded',
        //     error: 'Error while login',
        //   });

          if(data.msg){
            setMessage(data.msg);
          } else if(data.error){
            setError(data.error);
          }

          if(data.success){
            navigate("/profile");
          }

    }

    // const [Questions, setQuestions]  = useState(Ques);
  return (
    <div className='QContainer'>
        <h1>Create Quiz</h1>
        <form className='QBox' onSubmit={submitQues}>
        <input type='number' max={999999} onChange={(e)=>{setUniqueId(Number(e.target.value))}} className='quesInput uniqueId' required placeholder='Enter the quiz unique Id' />
            <div className='ques'>
                <div className='quesHeading'><h3>Question 1</h3></div>
            
                <input type='text' onChange={(e)=>{Questions[0].question = e.target.value}} className='quesInput' required placeholder='Write Question 1' />
                <input type='number' min={1} max={4} onChange={(e)=>{answers[0] = Number(e.target.value)-1}} className='ansInput' required placeholder='Enter correct option no.' />
                <div className='options'>
                <input type='text' onChange={(e)=>{Questions[0].options[0] = e.target.value}} required placeholder='Write Option 1' />
                <input type='text' onChange={(e)=>{Questions[0].options[1] = e.target.value}} required placeholder='Write Option 2' />
                <input type='text' onChange={(e)=>{Questions[0].options[2] = e.target.value}} required placeholder='Write Option 3' />
                <input type='text' onChange={(e)=>{Questions[0].options[3] = e.target.value}} required placeholder='Write Option 4' />
                </div>
            </div>
            <div className='ques'>
            <div className='quesHeading'><h3>Question 2</h3></div>
                <input type='text' onChange={(e)=>{Questions[1].question = e.target.value}} className='quesInput' required placeholder='Write Question 2' />
                <input type='number'  min={1} max={4} onChange={(e)=>{answers[1] = Number(e.target.value)-1}} className='ansInput' required placeholder='Enter correct option no.' />
                <div className='options'>
                <input type='text' onChange={(e)=>{Questions[1].options[0] = e.target.value}} required placeholder='Write Option 1' />
                <input type='text' onChange={(e)=>{Questions[1].options[1] = e.target.value}} required placeholder='Write Option 2' />
                <input type='text' onChange={(e)=>{Questions[1].options[2] = e.target.value}} required placeholder='Write Option 3' />
                <input type='text' onChange={(e)=>{Questions[1].options[3] = e.target.value}} required placeholder='Write Option 4' />
                </div>
            </div>
            <div className='ques'>
            <div className='quesHeading'><h3>Question 3</h3></div>
                <input type='text' onChange={(e)=>{Questions[2].question = e.target.value}} className='quesInput' required placeholder='Write Question 3' />
                <input type='number'  min={1} max={4} onChange={(e)=>{answers[2] = Number(e.target.value)-1}} className='ansInput' required placeholder='Enter correct option no.' />
                <div className='options'>
                <input type='text' onChange={(e)=>{Questions[2].options[0] = e.target.value}} required placeholder='Write Option 1' />
                <input type='text' onChange={(e)=>{Questions[2].options[1] = e.target.value}} required placeholder='Write Option 2' />
                <input type='text' onChange={(e)=>{Questions[2].options[2] = e.target.value}} required placeholder='Write Option 3' />
                <input type='text' onChange={(e)=>{Questions[2].options[3] = e.target.value}} required placeholder='Write Option 4' />
                </div>
            </div>
            <div className='ques'>
            <div className='quesHeading'><h3>Question 4</h3></div>
                <input type='text' onChange={(e)=>{Questions[3].question = e.target.value}} className='quesInput' required placeholder='Write Question 4' />
                <input type='number'  min={1} max={4} onChange={(e)=>{answers[3] = Number(e.target.value)-1}} className='ansInput' required placeholder='Enter correct option no.' />
                <div className='options'>
                <input type='text' onChange={(e)=>{Questions[3].options[0] = e.target.value}} required placeholder='Write Option 1' />
                <input type='text' onChange={(e)=>{Questions[3].options[1] = e.target.value}} required placeholder='Write Option 2' />
                <input type='text' onChange={(e)=>{Questions[3].options[2] = e.target.value}} required placeholder='Write Option 3' />
                <input type='text' onChange={(e)=>{Questions[3].options[3] = e.target.value}} required placeholder='Write Option 4' />
                </div>
            </div>
            <div className='ques'>
            <div className='quesHeading'><h3>Question 5</h3></div>
                <input type='text' onChange={(e)=>{Questions[4].question = e.target.value}} className='quesInput' required placeholder='Write Question 5' />
                <input type='number' min={1} max={4} onChange={(e)=>{answers[4] = Number(e.target.value)-1}} className='ansInput' required placeholder='Enter correct option no.' />
                <div className='options'>
                <input type='text' onChange={(e)=>{Questions[4].options[0] = e.target.value}} required placeholder='Write Option 1' />
                <input type='text' onChange={(e)=>{Questions[4].options[1] = e.target.value}} required placeholder='Write Option 2' />
                <input type='text' onChange={(e)=>{Questions[4].options[2] = e.target.value}} required placeholder='Write Option 3' />
                <input type='text' onChange={(e)=>{Questions[4].options[3] = e.target.value}} required placeholder='Write Option 4' />
                </div>
            </div>
            <div className='ques'>
            <div className='quesHeading'><h3>Question 6</h3></div>
                <input type='text' onChange={(e)=>{Questions[5].question = e.target.value}} className='quesInput' required placeholder='Write Question 6' />
                <input type='number' min={1} max={4} onChange={(e)=>{answers[5] = Number(e.target.value)-1}} className='ansInput' required placeholder='Enter correct option no.' />
                <div className='options'>
                <input type='text' onChange={(e)=>{Questions[5].options[0] = e.target.value}} required placeholder='Write Option 1' />
                <input type='text' onChange={(e)=>{Questions[5].options[1] = e.target.value}} required placeholder='Write Option 2' />
                <input type='text' onChange={(e)=>{Questions[5].options[2] = e.target.value}} required placeholder='Write Option 3' />
                <input type='text' onChange={(e)=>{Questions[5].options[3] = e.target.value}} required placeholder='Write Option 4' />
                </div>
            </div>
            <div className='ques'>
            <div className='quesHeading'><h3>Question 7</h3></div>
                <input type='text' onChange={(e)=>{Questions[6].question = e.target.value}} className='quesInput' required placeholder='Write Question 7' />
                <input type='number' min={1} max={4} onChange={(e)=>{answers[6] = Number(e.target.value)-1}} className='ansInput' required placeholder='Enter correct option no.' />
                <div className='options'>
                <input type='text' onChange={(e)=>{Questions[6].options[0] = e.target.value}} required placeholder='Write Option 1' />
                <input type='text' onChange={(e)=>{Questions[6].options[1] = e.target.value}} required placeholder='Write Option 2' />
                <input type='text' onChange={(e)=>{Questions[6].options[2] = e.target.value}} required placeholder='Write Option 3' />
                <input type='text' onChange={(e)=>{Questions[6].options[3] = e.target.value}} required placeholder='Write Option 4' />
                </div>
            </div>
            <div className='ques'>
            <div className='quesHeading'><h3>Question 8</h3></div>
                <input type='text' onChange={(e)=>{Questions[7].question = e.target.value}} className='quesInput' required placeholder='Write Question 8' />
                <input type='number' min={1} max={4} onChange={(e)=>{answers[7] = Number(e.target.value)-1}} className='ansInput' required placeholder='Enter correct option no.' />
                <div className='options'>
                <input type='text' onChange={(e)=>{Questions[7].options[0] = e.target.value}} required placeholder='Write Option 1' />
                <input type='text' onChange={(e)=>{Questions[7].options[1] = e.target.value}} required placeholder='Write Option 2' />
                <input type='text' onChange={(e)=>{Questions[7].options[2] = e.target.value}} required placeholder='Write Option 3' />
                <input type='text' onChange={(e)=>{Questions[7].options[3] = e.target.value}} required placeholder='Write Option 4' />
                </div>
            </div>
            <div className='ques'>
            <div className='quesHeading'><h3>Question 9</h3></div>
                <input type='text' onChange={(e)=>{Questions[8].question = e.target.value}} className='quesInput' required placeholder='Write Question 9' />
                <input type='number' min={1} max={4} onChange={(e)=>{answers[8] = Number(e.target.value)-1}} className='ansInput' required placeholder='Enter correct option no.' />
                <div className='options'>
                <input type='text' onChange={(e)=>{Questions[8].options[0] = e.target.value}} required placeholder='Write Option 1' />
                <input type='text' onChange={(e)=>{Questions[8].options[1] = e.target.value}} required placeholder='Write Option 2' />
                <input type='text' onChange={(e)=>{Questions[8].options[2] = e.target.value}} required placeholder='Write Option 3' />
                <input type='text' onChange={(e)=>{Questions[8].options[3] = e.target.value}} required placeholder='Write Option 4' />
                </div>
            </div>
            <div className='ques'>
            <div className='quesHeading'><h3>Question 10</h3></div>
                <input type='text' onChange={(e)=>{Questions[9].question = e.target.value}} className='quesInput' required placeholder='Write Question 10' />
                <input type='number' min={1} max={4} onChange={(e)=>{answers[9] = Number(e.target.value)-1}} className='ansInput' required placeholder='Enter correct option no.' />
                <div className='options'>
                <input type='text' onChange={(e)=>{Questions[9].options[0] = e.target.value}} required placeholder='Write Option 1' />
                <input type='text' onChange={(e)=>{Questions[9].options[1] = e.target.value}} required placeholder='Write Option 2' />
                <input type='text' onChange={(e)=>{Questions[9].options[2] = e.target.value}} required placeholder='Write Option 3' />
                <input type='text' onChange={(e)=>{Questions[9].options[3] = e.target.value}} required placeholder='Write Option 4' />
                </div>
            </div>
            <input type='submit' value={loading ? 'Loading...': 'Create'} />
        </form>
    </div>
  )
}

export default CreateQuiz
