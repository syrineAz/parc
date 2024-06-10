import React , {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'
import '../form/users.css'
import axios from 'axios';
import ModalForm from './ModalForm';
import DeleteIcon from '@mui/icons-material/Delete'
import { Edit, WavingHand } from '@mui/icons-material'
import {BiBookAdd} from 'react-icons/bi'
import { toast } from 'react-toastify';
import { Pagination ,TextField} from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../../theme';
import Header from '../../components/Header';
import { useTheme } from '@mui/material';
function CardDetails() {
  const { title, id } = useParams();
  const [data, setData] = useState([])
  const [categoryData, setCategoryData] = useState({})
  const [selectedItem, setSelectedItem] = useState(null); 
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [initialFields, setInitialFields] = useState({});
  const [additionalFields, setAdditionalFields] = useState(initialFields || []);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const filteredData = data.filter((item) => item.categorie === title);
 
  useEffect (() =>{
    const fetchData = async ()=> {
        try{
            const response = await axios.get(`http://localhost:8081/ListeEquipement/${id}/${title}`)
            setData(response.data)
            const initialFields = response.data.reduce((acc, item) => {
              acc[item.id] = [];
              return acc;
            }, {});
            setAdditionalFields(initialFields);
        }catch(error){
            console.log(error)
        }
    };
    fetchData();
  },[])  

  const openModal = (item) => {
    setSelectedItem(item);
    setSelectedCategory(item.categorie);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
   
  useEffect(() => {
    const categorizedData = {};
    data.forEach(item => {
      if (!categorizedData[item.categorie]) {
        categorizedData[item.categorie] = [item];
      } else {
        categorizedData[item.categorie].push(item);
      }
    });
    setCategoryData(categorizedData);

  }, [data]);

  const [user, setUser] = useState("");
   useEffect(()=>{
    const userData = JSON.parse(localStorage.getItem('userData'));
    setUser(userData);
  },[])

  const handleAddField = () => {
    setAdditionalFields(prevFields => [...prevFields, `Field${prevFields.length + 1}`]);
  };


  const handleDelete = async (idEquipement) => {
    try {
      // Envoyer la requête DELETE vers le backend
      const response = await axios.delete(`http://localhost:8081/DeleteEquipement/${idEquipement}`);
  
      // Vérifier la réponse du backend
      if (response.status === 200) {
        setData(prevData => prevData.filter(item => item.id !== idEquipement));
        toast.success('Équipement supprimé avec succès');
      } else {
        // Si le backend retourne une autre réponse que 200, gérer l'erreur
        console.error('Erreur lors de la suppression de l\'équipement:', response);
        toast.error('Cette équipement est déjà affecter , ne peut pas supprimer');
      }
    } catch (error) {
      // Gérer les erreurs de requête ou réseau
      console.error('Erreur lors de la suppression de l\'équipement:', error);
      toast.error('Cette équipement est déjà affecter , ne peut pas supprimer');
    }
  };
  
  const [ItemPerPage]= useState(5)
  const [currentPage, setCurrentPage]= useState(1)
  
  const indexOfLastItem= currentPage * ItemPerPage;
  const indexOfFirstItem = indexOfLastItem-ItemPerPage;
  const currentItems= filteredData.slice(indexOfFirstItem,indexOfLastItem) 
  const handlePageChagne = (event, value)=>{
    setCurrentPage(value)
  }
  

  return (
    <div>
      {user.role ==="admin" &&( 
        <Link to={`/AppHome/Categorie/${title}/${id}/Equipement`} className="page-btnn">Ajouter équipement</Link>
      )}
      {user.role ==="employer" &&( 
        <Link to={`/User/Categorie/${title}/${id}/Reservation`} className="page-btnn">Réserver équipement</Link>
      )}

      <h1 className='titre'>
        Liste des équipements : {title}
      </h1>
     
      <div>
      <table className='user-table'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nom de l'équipement</th>
                <th>Numéro de Série</th>
                <th>Nom de la fournisseur</th>
                {user.role==='admin'&&(
                <th>Prix</th>)}
                <th>Garantie</th>
                <th>Disponibilité</th>
                <th>Catégorie</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className='body'>
              {Array.isArray(filteredData) &&currentItems.map((item) => (
                <tr key={item.idEquipement}>
                  <td>{item.idEquipement}</td>
                  <td>{item.NameEquipement}</td>
                  <td>{item.numSerie}</td>
                  <td>{item.NameFournisseur}</td>
                  {user.role==='admin'&&(
                  <td>{item.prix}</td>)}
                  <td>{item.garantie}</td>
                  <td>{item.Disponibilite}</td>
                  <td>{item.categorie}</td>            
                  <td>
                    <Link onClick={() => openModal(item)} className='link'>Afficher</Link><br />
                  
                  {user.role ==="admin" && (
                    <>
                      <Link to={`/AppHome/Categorie/${title}/${id}/EditEquipement/${item.idEquipement}`} className='link'>
                        <Edit />
                      </Link>
                      <button onClick={() => handleDelete(item.idEquipement)} className='delete'>
                        <DeleteIcon />
                      </button>
                    </>
                  )}
                   </td>
                  
                </tr>
              ))}
            </tbody>
        </table>
      </div>
      {showModal && (
        <ModalForm
          selectedItem={selectedItem}
          closeModal={closeModal}
          //handleSubmit={handleSubmit}
          //handleInput={handleInput}
          additionalFields={additionalFields[selectedItem.id]}
          setAdditionalFields={(fields) => setAdditionalFields({ ...additionalFields, [selectedItem.id]: fields })} handleAddField={handleAddField}
        ///  handleRemoveField={handleRemoveField}
          title={selectedItem}
          initialFields={initialFields}
        />
      )}
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

export default CardDetails