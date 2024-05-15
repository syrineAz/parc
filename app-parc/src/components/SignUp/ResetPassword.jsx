import React from 'react'
import { useState, useEffect } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import "./Login.css"

function ResetPassword() {

    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const {id, resetToken} = useParams()
    
    axios.defaults.withCredentials = true;
    const handleSubmit = async (e) => {
        if (e) {
            e.preventDefault(); 
          }
        try {
            const response = await axios.post(`http://localhost:8081/ResetPassword/${id}/${resetToken}`, {password});
            console.log('Réponse du serveur :', response.data);
            if (response.data.Status === 'Success') {
                navigate('/');
                alert('La réinitialisation du mot de passe a effectue');
            }else if (response.data.Status === 'User not existed') {
                alert('Aucun utilisateur n\'est associé à cet e-mail.'); 
            }else {
                alert('La réinitialisation du mot de passe a échoué.');
                console.log(response)
            }
        } catch (err) {
            console.error('Une erreur s\'est produite lors de la réinitialisation du mot de passe :', err);
        }
    }
  return (
    <div className="containerLog">
        <div className="box from-box">
        <header>Reset Password</header>
            <form onSubmit={handleSubmit}>
                <div className="field input">
                    <label htmlFor="Password">New Password</label>
                    <input type="password"  className="btn" placeholder='Password' onChange={(e) => setPassword(e.target.value)} name='password'/>   
                </div>
                <div className="field " style={{ textAlign: 'center' }}>
                  <button type="submit" className='btn-link'>Modifier</button>
                </div>
            </form>
        </div>
    </div>
    )
}

export default ResetPassword;

