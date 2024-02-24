import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Update() {
    // const [student,setStudent]=useState([]);   
    let navigate=useNavigate();
    let [value,setValue]=useState({
        name:'',
        email:''
    })
    let {id}=useParams();
    useEffect(()=>{
        console.log(id)
        axios.get('http://localhost:8081/read/'+id)
        .then(res=> {console.log(res.data)
          setValue({name:res.data[0].name,email:res.data[0].email})})
        //   console.log(res.data)
        .catch(err => console.log(err))
    },[])
    var  handleSubmit=(e)=>{
        e.preventDefault();
        axios.put('http://localhost:8081/update/'+id,value)
        .then(res=>{console.log(res)
            navigate('/')})
        .catch(err=>console.log(err))
    }
  return (
    <div className='d-flex justify-content-center align-items-center vh-100 bg-primary'>
      <div className='w-50 bg-white rounded p-3'>
      <form onSubmit={handleSubmit}>
            <h2>add student</h2>
            <div className='mb-2'>
                <label htmlFor="">Name</label>
                <input type="text" placeholder='Enter name' className='form-control' value={value.name}
                onChange={e=>setValue({...value,name:e.target.value})}/>
            </div>
            <div className='mb-2'>
                <label htmlFor="">Email</label>
                <input type="email" placeholder='enter email' value={value.email} className='form-control'
                onChange={e=>setValue({...value,email:e.target.value})}/>
            </div>
            <button className='btn btn-success '>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Update
