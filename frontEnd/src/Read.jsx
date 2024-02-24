import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function Read() {
    const {id}=useParams();
    // console.log(id);
    const [student,setStudent]=useState([]);   
    useEffect(() =>{
      console.log(id)
        axios.get('http://localhost:8081/read/'+id)
        .then(res=> {console.log(res.data)
          setStudent(res.data[0])})
        .catch(err => console.log(err))
    },[]);
  return (
    <div className='d-flex justify-content-center vh-100 bg-primary align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <div className='p-2'>
        <h2>student detail</h2>
        <h2>{student.id}</h2>
        <h2>{student.name}</h2>
        <h2>{student.email}</h2>
        <Link to='/' className='btn btn-primary me-2' >back</Link>
        <Link to={`/update/${student.id}`} className='btn btn-info'>Edit</Link>
        </div>
      </div>
    </div>
  )
}

export default Read
