import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
function Reclamation() {
  const { reclamationId } = useParams()
  const [reclamation, setReclamation]= useState(null)
  console.log(reclamationId)
  useEffect (()=>{
    const fetchReclamationDetails = async() =>{
      try{
        const response= await axios.get(`http://localhost:8081/AfficheDetailsReclamation/${reclamationId}`)
        console.log(response.data)
        setReclamation(response.data)
      }catch(error){
        console.error(error)
      }
    }
    fetchReclamationDetails();
  },[reclamationId])
  if(!reclamation){
    return <div>loading ....</div>
  }
  return (
    <div>
      <h1>Les détails de les réclamations</h1>
      <p>Nom de l'employé: {reclamation.nameUser}</p>
      <p>Email de l'employé: {reclamation.emailUser}</p>
      <p>Numéro de l'employé: {reclamation.numUser}</p>
      <p>Emplacement de l'employé: {reclamation.emplacement}</p>
      <p>Nom de l'équipement: {reclamation.nameEquipement}</p>
      <p>Catégorie de l'équipement: {reclamation.categorie}</p>
      <p>Titre du problème : {reclamation.description}</p>
      <p>Priorité du panne: {reclamation.priorite}</p>
      <p>Date du panne: {reclamation.date}</p>
      <p>Discription du problème: {reclamation.DescPanne}</p>

    </div>
  )
}

export default Reclamation

























/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client'
const socket = io('http://localhost:3000')
const Reclamation = () => {
  const [reclamation, setReclamation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { reclamationId } = useParams();

  useEffect(() => {
    const fetchReclamation = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/AfficheReclamation/${reclamationId}`);
        setReclamation(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reclamation:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchReclamation();
  }, [reclamationId]);

  const emitNewReclamation = async () => {
    try {
      const reclamationData = {
        reclamationUser: reclamation,
        id: reclamationId
      };

      // Émettre l'événement 'nouvelle_reclamation' avec les données de la réclamation et l'ID de la réclamation
      // Assurez-vous d'avoir une instance de socket.io pour émettre cet événement
       socket.emit('nouvelle_reclamation', reclamationData);
      console.log(reclamationData)
      console.log('Événement nouvelle_reclamation émis avec succès.');
    } catch (error) {
      console.error('Error emitting new reclamation event:', error);
    }
  };

  useEffect(() => {
    // Appeler la fonction emitNewReclamation lorsqu'un changement dans la réclamation se produit
    if (reclamation) {
      emitNewReclamation();
    }
  }, [reclamation]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Details de la Réclamation</h1>
      {reclamation && (
        <div>
          <p>Nom de l'utilisateur : {reclamation.nameUser}</p>
          <p>Email de l'utilisateur : {reclamation.emailUser}</p>
          <p>Description : {reclamation.description}</p>
          {/* Ajoutez d'autres champs de réclamation ici si nécessaire */
       /* </div>
      )
    </div>
  );
};

export default Reclamation;
*/