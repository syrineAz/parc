import React, { useState , useEffect} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
function DetailsEquipementEmploye({isOpen, closeModal, selectedItem, handleSave}) {

    const [customFields, setCustomFields]= useState(selectedItem.customFields ||[])
    const [newFieldName, setNewFieldName] = useState('')
    const [newFieldValue, setNewFieldValue]= useState('')
    const [user, setUser] = useState("");
    useEffect(()=>{
      const userData = JSON.parse(localStorage.getItem('userData'));
      setUser(userData);
    },[])

    if(!isOpen){
      return null;
    }

    useEffect(()=>{
      const savedFields =JSON.parse(localStorage.getItem(`employe_${selectedItem.idEmploye}`))
      console.log(savedFields)
      if(savedFields){
        setCustomFields(savedFields)
      }
    },[selectedItem.id])

    const handleAddField=()=>{
      if (newFieldName.trim() !== '') {
        const isFieldExists= customFields.some(field=> field.name===newFieldName)
        console.log(isFieldExists)
        if(!isFieldExists){
          const updatedFields= [...customFields]
          updatedFields.push({name : newFieldName , value : newFieldValue})
          setCustomFields(updatedFields);
          setNewFieldName('');
          setNewFieldValue('');
          localStorage.setItem(`employe_${selectedItem.idEmploye}`, JSON.stringify(updatedFields))
        }else{
          toast.error('Ce champ existe déjà  ')
        }
      }
    }

    const handleRemoveField = async (index)=>{
    try {
      const response = await axios.delete(`http://localhost:8081/equipement/${selectedItem.idEquipement}/Deletedetail/${selectedItem.itemId}`);
      if (response.status === 200) {
       toast.success('Le champ supprimé avec succès');
      // Supprimer du state additionalFields
      const updatedFields = [...customFields];
      updatedFields.splice(index, 1);
      setCustomFields(updatedFields);
      // Mettre à jour le localStorage après la suppression
      localStorage.setItem(`employe_${selectedItem.idEmploye}`, JSON.stringify(updatedFields));
      // Effacer la clé spécifique du localStorage
      localStorage.removeItem(`employe_${selectedItem.idEmploye}`);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du détail :', error);
    }
  
  }

  const updateFieldInDatabase = async (index, newValue)=>{
    try {
      const fieldToUpdate = customFields[index];
      const response = await axios.post(`http://localhost:8081/employe/${selectedItem.idEquipement}/Updatedetailemploye/${selectedItem.index}`, {
        newValue
      });
      if (response.status === 200) {
        toast.success('Champ mis à jour avec succès');
        console.log('Params:', selectedItem.idEquipement, selectedItem.id);
        const updatedFields = [...customFields];
        updatedFields[index].value = newValue;
        setCustomFields(updatedFields);
        // Mettre à jour le localStorage après la modification
        localStorage.setItem(`employe_${selectedItem.idEmploye}`, JSON.stringify(updatedFields));
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du champ :', error);
      toast.error('Erreur lors de la mise à jour du champ');
    }
  }

  handleSave= ()=>{
    onSave(customFields);
    closeModal();
  }

    const handleSubmit= async (event)=>{
      event.preventDefault();
      try{
      if(!Array.isArray(customFields)){
        throw new Error ('customFields n\'est pas un tableau ')
      }
      console.log('Données à envoyer au backend :', customFields); // Vérifier les données avant de les envoyer
      console.log("selectedItem :",selectedItem)
      console.log("customFields:", customFields)
      const response= await axios.post('http://localhost:8081/DetailsEquipementEmploye', {data: {
        selectedItem: { ...selectedItem },
        customFields: [...customFields]
        }
      })
      console.log(response.data)
      if(response.status==200){
        toast.success('Données enregistrées avec succées')
        
      }
      }catch(error){
      console.error(error)
      }
    }
    const handleInput= (event, index)=>{
      const {name, value}= event.target;
      if (index !== undefined) {
        const updatedFields = [...customFields];
        updatedFields[index].value = value;
        setCustomFields(updatedFields);
        console.log(setCustomFields)
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [event.target.name]: event.target.value
        }));
      }
    }
  
    const handleChangeCustomFieldName =(e)=>{
      setNewFieldName(e.target.value)
    }
    const handleChangeCustomFieldValue =(e)=>{
      setNewFieldValue(e.target.value)
    }
    
   
  return (
    <div className="modal-overlay">
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <div className="modal-header">
            <h2 >{selectedItem.nomEmploye} : </h2>
            <button onClick={closeModal} className="close-button">×</button>
          </div>
          <div className="modal-content">
            {/* Afficher les champs de formulaire spécifiques */}
            <div>
              <label htmlFor="id">Nom de l'équipement :  </label>
              <input type="text" id="id" value={selectedItem.equipementName} onChange={handleInput} />
            </div>
            <div>
              <label htmlFor="num">Numéro de série :  </label>
              <input type="text" id="num" value={selectedItem.numSerie} onChange={handleInput} />
            </div>
            {/* Afficher les champs de formulaire supplémentaires */}
            {customFields && customFields.map((field, index) => (
              <div key={index}>
                <label htmlFor={`customFields-${index}`}>{field.name}</label>
                <input type="text" id={`customFields-${index}`} name={`customFields-${index}`} value={field.value} onChange={(e) => handleInput(e, index)} />
                {user.role === 'admin' &&(
                  <>
                <button type="button" className='champs' onClick={() => handleRemoveField(index)}>Supprimer</button>
                <button type="button" className='champs' onClick={() => updateFieldInDatabase(index, field.value)}>Modifier</button>
                  </>
                )}
              </div>
            ))}
            {/* Afficher le champ personnalisé */}
            
            {customFields && user.role==='admin'&& (
              <div>
                <label htmlFor="newFieldValue">{newFieldName}</label>
                <input type="text" id="newFieldValue" name="newFieldValue" value={newFieldValue} onChange={handleChangeCustomFieldValue} />

              </div>
            )}
            {user.role==='admin'&&(
            <div>
              <label htmlFor="newFieldName">Nom du champ : </label>
              <input type="text" id="newFieldName" value={newFieldName} onChange={handleChangeCustomFieldName} />
              <button type="button" className='champs' onClick={handleAddField}>Ajouter un champ</button>
            </div>)}
          </div>{user.role==='admin'&&(
          <div className="modal-footer">
            <button type="submit" className="submit-button">Enregistrer</button>
          </div>)}
        </form>
      </div>
    </div>
  )
}

export default DetailsEquipementEmploye
