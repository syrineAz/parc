import React from 'react'
import { Link } from 'react-router-dom'
import './Unauthorized.css'; 
function Unauthorized() {
  return (
    <div className='unauthorized-container'>
      <h2>Erreur 404 - Accès non autorisé</h2>
      <p>Vous n'avez pas les autorisations nécessaires pour accéder à cette page.</p> 
      <p>Retournez à la <Link to="/">page de connexion</Link>.</p>

    </div>
  )
}

export default Unauthorized
