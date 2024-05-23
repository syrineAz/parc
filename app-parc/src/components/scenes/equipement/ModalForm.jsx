import React, { useEffect, useState } from 'react';
import './categories.css'
import axios from "axios";
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function ModalForm({ selectedItem, title,closeModal, additionalFields, setAdditionalFields, initialFields }) {
  const [customFieldName, setCustomFieldName] = useState('');
  const [customFieldValue, setCustomFieldValue] = useState('');

  const handleChangeCustomFieldName = (e) => {
    setCustomFieldName(e.target.value);
  };

  const handleChangeCustomFieldValue = (e) => {
    setCustomFieldValue(e.target.value);
  };

  useEffect(()=>{
    const savedFields =JSON.parse(localStorage.getItem(`equipement_${selectedItem.idEquipement}`))
    //console.log(savedFields)
    if(savedFields){
      setAdditionalFields(savedFields)
    }
  },[selectedItem.idEquipement])

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
        localStorage.setItem(`equipement_${selectedItem.idEquipement}`, JSON.stringify(updatedFields))
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
      //console.log('Données à envoyer au backend :', additionalFields); // Vérifier les données avant de les envoyer
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
  const updateFieldInDatabase = async (index, newValue) => {
    try {
      const fieldToUpdate = additionalFields[index];
      const response = await axios.post(`http://localhost:8081/equipement/${selectedItem.idEquipement}/Updatedetail/${selectedItem}`, {
        newValue
      });
      if (response.status === 200) {
        toast.success('Champ mis à jour avec succès');
        console.log('Params:', selectedItem.idEquipement, index);
        const updatedFields = [...additionalFields];
        updatedFields[index].value = newValue;
        setAdditionalFields(updatedFields);
        // Mettre à jour le localStorage après la modification
        localStorage.setItem(`equipement_${selectedItem.idEquipement}`, JSON.stringify(updatedFields));
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du champ :', error);
      toast.error('Erreur lors de la mise à jour du champ');
    }
  };


  const handleInput = (event, index) => {
    if (index !== undefined) {
      const updatedFields = [...additionalFields];
      updatedFields[index].value = event.target.value;
      setAdditionalFields(updatedFields);
      //console.log(setAdditionalFields)
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [event.target.name]: event.target.value
      }));
    }
  };


  const {idEquipement, itemId}= useParams()
  const handleRemoveField = async (index)=>{
    try {
      const response = await axios.delete(`http://localhost:8081/equipement/${selectedItem.idEquipement}/Deletedetail/${selectedItem.itemId}`);
      if (response.status === 200) {
       toast.success('Le champ supprimé avec succès');
      // Supprimer du state additionalFields
      const updatedFields = [...additionalFields];
      updatedFields.splice(index, 1);
      setAdditionalFields(updatedFields);
      // Mettre à jour le localStorage après la suppression
      localStorage.setItem(`equipement_${selectedItem.idEquipement}`, JSON.stringify(updatedFields));
      // Effacer la clé spécifique du localStorage
      localStorage.removeItem(`equipement_${selectedItem.idEquipement}`);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du détail :', error);
      
    }
  
  }

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
                  <>
                 <button type="button" className='champs' onClick={() => handleRemoveField(index)}>Supprimer</button>
                 <button type="button" className='champs' onClick={() => updateFieldInDatabase(index, field.value)}>Modifier</button>
                </>
                )}

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
