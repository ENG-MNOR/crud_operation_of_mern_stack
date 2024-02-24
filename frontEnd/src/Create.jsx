import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Create() {
    
    const [value,setValue]=useState({
        name:'',
        email:''
    })
    const navigate=useNavigate();
    var  handleSubmit=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:8081/student',value)
        .then(res=>{console.log(res)
         navigate('/')})
        .catch(err=>console.log(err))
    }
  return (
    <div className='d-flex justify-content-center bg-primary vh-100 align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={handleSubmit}>
            <h2>add student</h2>
            <div className='mb-2'>
                <label htmlFor="">Name</label>
                <input type="text" placeholder='Enter name' className='form-control' 
                onChange={e=>setValue({...value,name:e.target.value})}/>
            </div>
            <div className='mb-2'>
                <label htmlFor="">Email</label>
                <input type="email" placeholder='enter email' className='form-control'
                onChange={e=>setValue({...value,email:e.target.value})}/>
            </div>
            <button className='btn btn-success '>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Create
