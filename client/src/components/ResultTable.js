import React, { useEffect, useState } from 'react'
import { getServerData } from '../helper/helper'
import { Link } from 'react-router-dom'

export default function ResultTable() {

    const [data, setData] = useState([])
    useEffect(() => {
        getServerData('/api/result', (res) => {
            setData(res)
        })
    },[])

  return (
    <div>
        <h1>All Students who given the Quiz</h1>
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
