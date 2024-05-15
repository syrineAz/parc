const express = require('express')
const route = express.Router();
const db = require('../../db')
const EquipementController = require('../../Controller/EquipementController')
const EquipementModel= require('../../model/EquipementModel')

route.post('/equipement',EquipementController.addEquipement);
route.get('/ListeEquipement/:id/:title',EquipementController.getAllEquipements);
route.delete('/delete/:id', EquipementController.deleteEquipement)
route.post('/EditEquipement/:item_idEquipement',EquipementController.updateEquipement)
route.get('/AfficheEditEquipement/:title', EquipementController.getEquipementsByCategory)
route.post('/DetailsEquipement',EquipementController.addDetailsToEquipement)
route.delete('/DeleteDetailsEquipement/:idEquipement',EquipementController.deleteDetailsFromEquipement)


module.exports = route;
/*
route.post('/equipement', (req, res) =>{
    const values = [
        req.body.NameEquipement,
        req.body.NameFournisseur,
        req.body.prix,
        req.body.Disponibilite,
        req.body.garantie, 
        req.body.categorie,
        req.body.numSerie
    ];    
    const selectQuery= "SELECT * FROM equipement WHERE numSerie = ? ";
    db.query(selectQuery, [values[7]], (err, result, field) => {
        console.log(result)
        if(err){
            console.log(err)
            res.status(500).send('equipement existed')
        }else{
            if(result && result.length >0){
                console.log(result)
                res.status(400).send("equipement already exists")
            }else{
                const sql= "INSERT INTO equipement (NameEquipement, NameFournisseur, prix, Disponibilite, garantie, categorie, numSerie) VALUES(?,?,?,?, ?,?,?)  ";  
                db.query(sql,values,(err,data) => {
                    console.log(values)
                if (err){
                  console.error(err)
                  res.status(500).send("error adding user")
                }else
                  {res.status(200).send("equipement added succesfully")
                    console.log(values)
                  }        
                })
            }
        }
    })
});

route.get('/ListeEquipement/:id/:title', (req,res) =>{
    const id= req.params.id
    const title=req.params.title
    const sql=" SELECT * FROM equipement "
    db.query(sql, [ id, title] ,(err,result) =>{
        if(err) {
            console.log("error :", err)
            return res.json({message : "error inside server"})
        }
        return res.json(result);
    })
})


route.delete('/delete/:id', (req, res) => {
    const id = req.params.userid;
    const query = "DELETE FROM equipement WHERE idEquipement = ?";
    db.query(query, [userid], (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send("Error deleting user");
      } else {
        res.status(200).send("User deleted successfully");
      }
    });
});

route.post('/EditEquipement/:item_idEquipement', (req, res) =>{
    const id= req.params.item_idEquipement
    const sql= "UPDATE equipement SET NameEquipement = ?, NameFournisseur=?, prix=?, Disponibilite=?, garantie=?,  categorie=?, numSerie=? WHERE idEquipement= ?  ";
    const values = [
        req.body.NameEquipement,
        req.body.NameFournisseur,
        req.body.prix,
        req.body.Disponibilite,
        req.body.garantie,
        req.body.categorie,
        req.body.numSerie,
        id
    ];
    console.log('received data', req.body)
    db.query(sql,values,(err,data) => {
        console.log("values :",values)
        if (err){
            console.error(err.message)
            return res.json("error" + err.message)
        }
        console.log("equipement update succesfully")
        return res.json("Success")
        
    })
})

route.get('/AfficheEditEquipement/:title', (req,res)=>{
    const title = req.params.title
    const sql=" SELECT * FROM equipement WHERE categorie= ? "
    db.query(sql,[title],(err,result) =>{
        console.log(result)
        if(err) {
            console.log("error :", err)
            return res.json({message : "error inside server"})
        }
        return res.json(result);
    })
})


/*
route.post('/DetailsEquipement', async (req, res)=>{
    try{
        const {selectedItem , additionalFields} =req.body.data 
        const itemId= selectedItem.id
        if(!Array.isArray(additionalFields)){
            throw new Error ('additonalFields n\'est pas un tableau ')
        }
      //  console.log(additionalFields)
        await Promise.all(additionalFields.map(async (field)=>{
            try{
                const response = await db.query('INSERT INTO modal_details (itemId, fieldName, fieldValue) VALUES (?, ?, ?)', [selectedItem.id, field.name, field.value]);
               // console.log(response)
            }
            catch(error){
                console.error(error)
                throw new Error('Erreur lors de l\'insertion')
            }
        }));
        res.status(200).send('détails ajouter avec succès')
    }catch(error){
        console.error(error)
        res.status(500).send('error dans l\'insertion des details' )
    }
})

route.post('/DetailsEquipement', async (req, res) => {
    try {
      const { selectedItem, additionalFields } = req.body.data;
      if (!Array.isArray(additionalFields)) {
        throw new Error('additionalFields n\'est pas un tableau ');
      }
  
      // Utilisation d'une transaction pour garantir l'intégrité des données
      await db.beginTransaction();
  
      // Boucle sur les champs supplémentaires pour les insérer dans la table
      for (const field of additionalFields) {
        try {
          // Insérer le champ supplémentaire avec l'ID de l'équipement associé
          await db.query(
            'INSERT INTO modal_details (itemId, fieldName, fieldValue) VALUES (?, ?, ?)',
            [selectedItem.id, field.name, field.value]
          );
        } catch (error) {
          console.error(error);
          throw new Error('Erreur lors de l\'insertion du champ supplémentaire');
        }
      }
  
      // Valider la transaction une fois toutes les insertions effectuées avec succès
      await db.commit();
  
      res.status(200).send('Détails ajoutés avec succès');
    } catch (error) {
      console.error(error);
      // Annuler la transaction en cas d'erreur
      await db.rollback();
      res.status(500).send('Erreur dans l\'insertion des détails');
    }
  });
  

route.delete('/DeleteDetailsEquipement/:idEquipement', (req, res)=>{
    const equipementID= req.params.idEquipement
    const sql = 'DELETE FROM equipement WHERE idEquipement=? '
    db.query(sql ,[equipementID] , (err, result)=>{
        if(err){
            console.error(err)
            res.status(500).send('erreur lors de la suppression de l\'equipement')
            return;
        }
        console.log('equipement supprimé avec succés')
    })
})



route.post('/equipement', async (req, res) =>{
  const values = [
      req.body.NameEquipement,
      req.body.NameFournisseur,
      req.body.prix,
      req.body.Disponibilite,
      req.body.garantie, 
      req.body.categorie,
      req.body.numSerie
  ];    
  try {
      const equipementExist = await EquipementModel.checkEquipementExistence(values[6]); // Check if equipement already exists
      if (equipementExist) {
          return res.status(400).send("Equipement already exists");
      } else {
          const result = await EquipementModel.addEquipement(values); // Add equipement
          return res.status(200).send(result);
      }
  } catch (error) {
      console.error(error);
      return res.status(500).send("Error adding equipement");
  }
});

// Implementing the '/ListeEquipement' route
route.get('/ListeEquipement/:id/:title', async (req, res) =>{
  const id= req.params.id;
  const title=req.params.title;
  try {
      const equipements = await EquipementModel.getAllEquipements(); // Get all equipements
      return res.json(equipements);
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error getting equipements" });
  }
});

// Implementing the '/delete' route
route.delete('/delete/:id', async (req, res) => {
  const id = req.params.userid;
  try {
      const result = await EquipementModel.deleteEquipement(id); // Delete equipement
      return res.status(200).send(result);
  } catch (error) {
      console.error(error);
      return res.status(500).send("Error deleting equipement");
  }
});

// Implementing the '/EditEquipement' route
route.post('/EditEquipement/:item_idEquipement', async (req, res) =>{
  const id = req.params.item_idEquipement;
  const values = [
      req.body.NameEquipement,
      req.body.NameFournisseur,
      req.body.prix,
      req.body.Disponibilite,
      req.body.garantie,
      req.body.categorie,
      req.body.numSerie,
      id
  ];
  try {
      const result = await EquipementModel.updateEquipement(values); // Update equipement
      return res.status(200).send(result);
  } catch (error) {
      console.error(error);
      return res.status(500).send("Error updating equipement");
  }
});

// Implementing the '/AfficheEditEquipement' route
route.get('/AfficheEditEquipement/:title', async (req,res)=>{
  const title = req.params.title;
  try {
      const equipements = await EquipementModel.getEquipementsByCategory(title); // Get equipements by category
      return res.json(equipements);
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error getting equipements by category" });
  }
});

// Implementing the '/DetailsEquipement' route
route.post('/DetailsEquipement', async (req, res) => {
  try {
      const { selectedItem, additionalFields } = req.body.data;
      await EquipementModel.addDetails(selectedItem.id, additionalFields.name, additionalFields.value); // Add details
      return res.status(200).send('Details added successfully');
  } catch (error) {
      console.error(error);
      return res.status(500).send('Error adding details');
  }
});

// Implementing the '/DeleteDetailsEquipement' route
route.delete('/DeleteDetailsEquipement/:idEquipement', async (req, res)=>{
  const equipementID = req.params.idEquipement;
  try {
      await EquipementModel.deleteEquipement(equipementID); // Delete equipement
      return res.status(200).send('Equipement deleted successfully');
  } catch (error) {
      console.error(error);
      return res.status(500).send('Error deleting equipement');
  }
});
*/
