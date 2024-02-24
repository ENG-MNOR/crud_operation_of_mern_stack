import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
    let handleDelete=(id)=>{
        axios.delete('http://localhost:8081/delete/'+id)
        .then(res=> location.reload())
        .catch(err=> console.log(err));
    }
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/')
            .then(res => {
                // Convert the object into an array
                const dataArray = Array.isArray(res.data) ? res.data : Object.values(res.data);
                console.log(dataArray);
                setData(dataArray[0]);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
              <h2>Students list</h2>
              <div className='d-flex justify-content-end'>
                <Link to="/create" className='btn btn-success'>create +</Link>
              </div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(data) && data.map((student, index) => (
                            <tr key={index}>
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>
                                    <Link to={`/Read/${student.id}`} className='btn btn-sm btn-info '>Read</Link>
                                    <Link to={`/update/${student.id}`}className='btn btn-sm btn-primary btn mx-2'>Edit</Link>
                                    <button onClick={()=>handleDelete(student.id)} className='btn btn-sm btn-danger btn-sm '>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;
