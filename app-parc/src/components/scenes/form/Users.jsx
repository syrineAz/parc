import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./users.css"
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import { Edit } from '@mui/icons-material'
import { Pagination } from '@mui/material'

function Users() {
  const [data, setData] = useState([])
  const {userid}= useParams()

  useEffect (() =>{
    const fetchData = async ()=> {
        try{
            const response = await axios.get("http://localhost:8081/users")
            setData(response.data)
        }catch(error){
            console.log(error)
        }
    };
    fetchData();
  },[])  
  
  const handleDelete =  (userid) => {
    axios.delete(`http://localhost:8081/delete/${userid}`)
    .then(res => {
      setData(data.filter(user => user.id !== userid));
    })
    .catch(err => console.log(err))
  };

  const [ItemPerPage]= useState(5)
  const [currentPage, setCurrentPage]= useState(1)
  
  const indexOfLastItem= currentPage * ItemPerPage;
  const indexOfFirstItem = indexOfLastItem-ItemPerPage;
  const currentItems= data.slice(indexOfFirstItem,indexOfLastItem) 
  const handlePageChagne = (event, value)=>{
    setCurrentPage(value)
  }

  return (
    <div>
       <Link to="/AppHome/form" className="page-btnn">Ajouter un Employé</Link>
       <h1>Liste des Employés</h1>
       <div>      
        <table className='user-table'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Cin</th>
                    <th>Type</th>
                    <th>Service</th>
                    <th>Bureau</th>
                    <th>Actif</th>
                    <th>Action</th>

                </tr>
            </thead>
            <tbody>
                {Array.isArray(data) && currentItems.map((user, index) =>{
                    return <tr key={index}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.num}</td>
                        <td>{user.cin}</td>
                        <td>{user.type}</td>
                        <td>{user.service}</td>
                        <td>{user.bureau}</td>
                        <td>{user.actif}</td>
                        <td>
                          <Link to={`/AppHome/Form/Users/edit/${user.id}`} className='link'>
                            <Edit />
                          </Link> 
                        <button onClick={() => handleDelete(user.id)} className='delete'>
                          <DeleteIcon />
                        </button>
                       
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
       </div>
       <div className="paginationContainer">
        <Pagination
           count = {Math.ceil(data.length / ItemPerPage)}
           page={currentPage}
           onChange={handlePageChagne}
           className='pagination-nav'
        />
      </div>
    </div>
  )
}

export default Users
/*                            <span onClick={() => handleDelete(user.id)} className='link'>Delete</span>
                            <Link to={`/AppHome/Form/Users/edit/${user.id}`} className='link'>Edit</Link>

*/