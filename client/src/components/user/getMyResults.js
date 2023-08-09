import React, { useEffect, useState } from 'react'
import { fetchWithData } from '../../helper/helper'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function MyResultTable() {
    const { user } = useSelector((state) => state.userData);
    const [userInfo, setUserInfo] = useState(user.user);
    const [data, setData] = useState([])


    useEffect(()=>{
        setUserInfo(user.user);
    },[user]);

    useEffect(() => {
        if(userInfo){
            fetchWithData('/api/student/getResults', {data: userInfo}, (res) => {
                setData(res)
            })
        }
    },[userInfo])

  return (
    <div>
        <h1>My All Results</h1>
        <Link className='back' to={'/'}>Back</Link>
        <table>
            <thead className='table-header'>
                <tr className='table-row'>
                    <td>Name</td>
                    <td>Attemps</td>
                    <td>Earn Points</td>
                    <td>Result</td>
                </tr>
            </thead>
            <tbody>
                { !data ?? <div>No Data Found </div>}
                {
                    data.map((v, i) => (
                        <tr className='table-body' key={i}>
                            <td>{v?.username || ''}</td>
                            <td>{v?.attempts || 0}</td>
                            <td>{v?.points || 0}</td>
                            <td>{v?.achived || ""}</td>
                        </tr>
                    ))
                }
                
            </tbody>
        </table>
    </div>
  )
}
