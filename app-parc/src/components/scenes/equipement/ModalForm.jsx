import React, { useEffect, useState } from 'react';
import './categories.css'
import axios from "axios";
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function ModalForm({ selectedItem, title,closeModal, additionalFields, setAdditionalFields, handleRemoveField, initialFields }) {
  const [customFieldName, setCustomFieldName] = useState('');
  const [customFieldValue, setCustomFieldValue] = useState('');

  const handleChangeCustomFieldName = (e) => {
    setCustomFieldName(e.target.value);
  };

  const handleChangeCustomFieldValue = (e) => {
    setCustomFieldValue(e.target.value);
  };

  useEffect(()=>{
    const savedFields =JSON.parse(localStorage.getItem(`equipement_${selectedItem.id}`))
    console.log(savedFields)
    if(savedFields){
      setAdditionalFields(savedFields)
    }
  },[selectedItem.id])

  const handleAddCustomField = () => {
    if (customFieldName.trim() !== '') {
      const isFieldExists= additionalFields.some(field=> field.name===customFieldName)
      console.log(isFieldExists)
      if(!isFieldExists){
        const updatedFields= [...additionalFields]
        updatedFields.push({name : customFieldName , value : customFieldValue})
        setAdditionalFields(updatedFields);
        setCustomFieldName('');
        setCustomFieldValue('');
        localStorage.setItem(`equipement_${selectedItem.id}`, JSON.stringify(updatedFields))
      }else{
        toast.error('Ce champ existe déjà  ')
      }
    }
  };

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      if(!Array.isArray(additionalFields)){
        throw new Error ('additonalFields n\'est pas un tableau ')
      }
      console.log('Données à envoyer au backend :', additionalFields); // Vérifier les données avant de les envoyer
      console.log("selectedItem :",selectedItem)
      console.log("additonalFields:", additionalFields)
      const response= await axios.post('http://localhost:8081/DetailsEquipement', {data: {
        selectedItem: { ...selectedItem },
        additionalFields: [...additionalFields]
        }
      })
      console.log(response)
      if(response.status==200){
        toast.success('Données enregistrées avec succées')
        
      }
    }catch(error){
      console.error(error)
    }
  };

  const handleInput = (event, index) => {
    if (index !== undefined) {
      const updatedFields = [...additionalFields];
      updatedFields[index].value = event.target.value;
      setAdditionalFields(updatedFields);
      console.log(setAdditionalFields)
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [event.target.name]: event.target.value
      }));
    }
  };
  
  const [user, setUser] = useState("");
   useEffect(()=>{
    const userData = JSON.parse(localStorage.getItem('userData'));
    setUser(userData);
  },[])
  
  

  return (
    <div className="modal-overlay">
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <div className="modal-header">
            <h2 >{title.NameEquipement} : </h2>
            <button onClick={closeModal} className="close-button">×</button>
          </div>
          <div className="modal-content">
            {/* Afficher les champs de formulaire spécifiques */}
            <div>
              <label htmlFor="id">ID :  </label>
              <input type="text" id="id" value={selectedItem.idEquipement} onChange={handleInput} />
            </div>
            <div>
              <label htmlFor="nom">Nom :  </label>
              <input type="text" id="nom" value={selectedItem.NameEquipement} onChange={handleInput} />
            </div>
            {/* Afficher les champs de formulaire supplémentaires */}
            {additionalFields && additionalFields.map((field, index) => (
              <div key={index}>
                <label htmlFor={`additionalField-${index}`}>{field.name}</label>
                <input type="text" id={`additionalField-${index}`} name={`additionalField-${index}`} value={field.value} onChange={(e) => handleInput(e, index)} />
                {user.role === 'admin' &&(
                <button type="button" className='champs' onClick={() => handleRemoveField(index)}>Supprimer</button>)}
              </div>
            ))}
            {/* Afficher le champ personnalisé */}
            
            {customFieldName && user.role==='admin'&& (
              <div>
                <label htmlFor="customField">{customFieldName}</label>
                <input type="text" id="customField" name="customField" value={customFieldValue} onChange={handleChangeCustomFieldValue} />
              </div>
            )}
            {user.role==='admin'&&(
            <div>
              <label htmlFor="customFieldName">Nom du champ : </label>
              <input type="text" id="customFieldName" value={customFieldName} onChange={handleChangeCustomFieldName} />
              <button type="button" className='champs' onClick={handleAddCustomField}>Ajouter un champ</button>
            </div>)}
          </div>{user.role==='admin'&&(
          <div className="modal-footer">
            <button type="submit" className="submit-button">Enregistrer</button>
          </div>)}
        </form>
      </div>
    </div>
  );
}

export default ModalForm;
