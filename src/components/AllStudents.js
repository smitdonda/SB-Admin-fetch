import React,{useState,useEffect} from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'   
let url = "https://61ee2173d593d20017dbac6e.mockapi.io/students/"
function AllStudents() {

    let [students,setStudents]=useState([]);

    useEffect(()=>{
       getData();
    },[])
    
      let getData = async()=>{
        await fetch(url)
        .then(response => response.json())
        .then(res=>{
          setStudents(res)
        })
        .catch(err=>{
          console.log(err)
        })
      }

    // DELETE 
    let handleDelete = async(i )=>{
        await fetch(url+i,{
            method:'DELETE'
        })
        .then(response=>response.json())
        .then(data=>{
            getData();      
        })
    }
    return <>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Class</th>
                </tr>
            </thead>
            <tbody>
                {
                    students.map((e)=>{
                        return <tr key={e.id}>
                                    <td>{e.id}</td>
                                    <td>{e.name}</td>
                                    <td>{e.email}</td>
                                    <td>{e.mobile}</td>
                                    <td>{e.class}</td>
                                    <td><Button variant='danger' onClick={()=>handleDelete(e.id)}>Delete</Button>
                                    <span>&nbsp; &nbsp;</span>
                                    <Link to={`/edit-student/${e.id}`}>
                                        <Button variant='primary'>Edit</Button>
                                    </Link></td>
                                </tr>
                    })
                }
            </tbody>
        </Table>
    </>
}

export default AllStudents