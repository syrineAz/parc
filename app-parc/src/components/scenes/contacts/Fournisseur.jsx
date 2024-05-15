import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "../form/users.css"
import { Link } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import { Edit } from '@mui/icons-material'
import { useParams } from 'react-router-dom'
function Fournisseur() {
  const [data, setData] = useState([])
  const {userid}= useParams()

  useEffect (() =>{
    const fetchData = async ()=> {
        try{
            const response = await axios.get("http://localhost:8081/fournisseur")
            setData(response.data)
        }catch(error){
            console.log(error)
        }
    };
    fetchData();
  },[])  
  const handleDelete =  (userid) => {
    axios.delete(`http://localhost:8081/deleteFournisseur/${userid}`)
    .then(res => {
      setData(data.filter(user => user.id !== userid));
    })
    .catch(err => console.log(err))
  };

  return (
    <div>
    <div>    
    <Link to="/AppHome/Fournisseur/contacts" className="page-btnn">Ajouter un fournisseur</Link>
    <h1>Liste des fournisseurs</h1>
     <table className='user-table'>
         <thead>
             <tr>
                 <th>Name</th>
                 <th>Email</th>
                 <th>Contact</th>
                 <th>Cin</th>
                 <th>Adresse</th>
                 <th>Service</th>
                 <th>Action</th>

             </tr>
         </thead>
         <tbody>
             {Array.isArray(data) && data.map((user, index) =>{
                 return <tr key={index}>
                     <td>{user.name}</td>
                     <td>{user.email}</td>
                     <td>{user.num}</td>
                     <td>{user.cin}</td>
                     <td>{user.adresse}</td>
                     <td>{user.service}</td>
                     <td>
                      <Link to={`/AppHome/contacts/Fournisseur/EditFournisseur/${user.id}`} className='link'>
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
 </div>
)
}

export default Fournisseur
/*<Link to={`/AppHome/contacts/Fournisseur/EditFournisseur/${user.id}`} className='link'>Edit</Link>
                         <span onClick={() => handleDelete(user.id)} className='link'>Delete</span>
*/