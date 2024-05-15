import { useState, useEffect } from "react"
import React from 'react'
import "./Login.css"
import axios from 'axios';
import { Link, useNavigate  } from 'react-router-dom';

function Forgot() {
    const[Email, setEmail]=useState('')
    axios.defaults.withCredentials = true;
    const navigate = useNavigate();

      
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/forgot', { Email }, { withCredentials: true });
            console.log(response.data)
            if (response.data.Status === "Success") {
                navigate('/');
                console.log(response.data)
                alert('Lien envoyé avec succès sur votre e-mail.');
            } else if (response.data.Status === 'User not existed') {
                alert('Aucun utilisateur n\'est associé à cet e-mail.');
            }else{
                alert('Une erreur s\'est produite lors de l\'envoi du lien.');
            }
        } catch (err) {
            console.error(err); 
        }
    }
  return (
    <div className="containerLog">
        <div className="box from-box">
        <header>Forget Password</header>
            <form onSubmit={handleSubmit}>
                <div className="field input">
                    <label htmlFor="email">Email</label>
                    <input type="email"  className="btn" placeholder='Email' onChange={(e) => setEmail(e.target.value)} name='Email'/>   
                </div>
                <div className="field " style={{ textAlign: 'center' }}>
                    <button  type="submit" className='btn'>Envoyer</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Forgot


