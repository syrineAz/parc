import React, { useState } from 'react';
import './categories.css';
import { Link } from 'react-router-dom';

function Categorie() {
  const [card, setCard] = useState([
    {
      id:1,
      title : 'Les Ordinateurs',
      text :'Cette catégorie comprend les ordinateurs de bureau, les ordinateurs portables, les serveurs et les stations de travail.',
    },
    {
      id:2,
      title : 'Réseaux et communication',
      text :"Cela inclut les routeurs, les commutateurs Ethernet, les points d'accès Wi-Fi, les modems et les cartes réseau.",
    },
   
    {
      id:3,
      title : 'Périphériques de stockage',
      text :'Comprend les disques durs internes et externes, les disques SSD, les clés USB et les cartes mémoire.',
    },
    {
      id:4,
      title : 'Imprimantes et scanners',
      text :"Comprend les imprimantes jet d'encre, les imprimantes laser, les scanners et les imprimantes multifonctions."
    },
    {
      id:5,
      title : 'Écrans et moniteurs',
      text :"Cette catégorie comprend les moniteurs LCD, LED et OLED, ainsi que les écrans tactiles et les écrans incurvés."
    },
    {
      id:6,
      title : 'Accessoires informatiques',
      text :"Comprend les claviers, les souris, les haut-parleurs, les webcams, les casques et les supports d'ordinateur."
    },
    {
      id:7,
      title : 'Accessoires de câblage et connectique',
      text :" Cela inclut les câbles Ethernet, les câbles USB, les adaptateurs, les connecteurs et les accessoires de gestion des câbles."
    },
   
  ]);

  const itemsPerPage = 3;

  const [current, setCurrent] = useState(1);

  const totalPages = Math.ceil(card.length / itemsPerPage);

  const startIndex = (current - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const dataPerPage = card.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrent(pageNumber);
  };
   
  const handleLinkClick = (title, id) => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if(userData && userData.role === 'admin') {
      return `/AppHome/Categorie/${encodeURIComponent(title)}/${id}`;
    } else if(userData && userData.role === 'employer') {
      return `/User/Categorie/${encodeURIComponent(title)}/${id}`;
    } else {
      // Lien par défaut si le rôle n'est pas admin ou employee
      return '/defaultPage';
    }
  };
  
  return (
    <div>
      <h1 >Les catégories des équipements informatiques</h1>
      <section>
        <div className="container">
          <div className="cards">
            {dataPerPage.map((item, index) => (
              <div key={index} className="card">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <Link to={handleLinkClick(item.title, item.id)} className="btn-card">Afficher</Link>
                </div>
            ))}
          </div>
         </div> 
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`page-btn ${current === index + 1 ? 'active' : ''}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
         
      </section>
      
    </div>
  );
}

export default Categorie;
