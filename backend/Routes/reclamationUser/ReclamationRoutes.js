const express = require('express')
const route = express.Router();
const db = require('../../db')
const {io} = require('../../server') ;    //importation de l'instance de socket.IO
const ReclamationModel = require ('../../model/ReclamationModel') 
const ReclamationController= require('../../Controller/ReclamationController')

route.post('/reclamationUser', ReclamationController.addReclamation);
route.get('/AfficheDetailsReclamation/:reclamationId', ReclamationController.getReclamationDetails);
route.get('/Affichereclamations', ReclamationController.getAllReclamations);
route.post('/AcceptReclamation', ReclamationController.getAcceptReclamation)
route.post('/RefusReclamation',ReclamationController.getRefusReservation)
route.post('/editReclamation/:id',ReclamationController.updateReclamation)
route.delete('/deleteReclamation/:id',ReclamationController.deleteReclamation)

module.exports = route;







/*
route.post('/reclamationUser', (req, res) => {
  const values = [
    req.body.nameUser,
    req.body.emailUser,
    req.body.numUser,
    req.body.emplacement,
    req.body.nameEquipement,
    req.body.categorie,
    req.body.description,
    req.body.priorite,
    req.body.DescPanne,
    req.body.date,
  ];

  ReclamationModel.addReclamation(values)
    .then(message => {
      res.status(200).json({ message });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error });
    });
});

route.get('/AfficheDetailsReclamation/:reclamationId', (req, res) => {
  const reclamationId = req.params.reclamationId;
  ReclamationModel.getReclamationDetails(reclamationId)
    .then(reclamation => {
      res.json(reclamation);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error });
    });
});

route.get('/Affichereclamations', (req, res) => {
  ReclamationModel.getAllReclamations()
    .then(reclamations => {
      res.status(200).json(reclamations);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error });
    });
});


io.on('connection', (socket) => {
  console.log('Client connected');
  
  socket.on('nouvelle_reclamation_admin', (reclamation) => {
    console.log('Nouvelle réclamation reçue :', reclamation);
    const reclamationId = reclamation.reclamationId; 
    console.log('reclamationId', reclamationId)
    const reclamationDataForAdmin = { ...reclamation, reclamationId ,type:'reclamation'};
    io.emit('nouvelle_reclamation_admin', reclamationDataForAdmin)
    console.log(reclamationDataForAdmin)
  });  
});




route.post('/reclamationUser', (req, res)=>{
    const values=[
        req.body.nameUser,
        req.body.emailUser,
        req.body.numUser,
        req.body.emplacement,
        req.body.nameEquipement,
        req.body.categorie,
        req.body.description,
        req.body.priorite,
        req.body.DescPanne,
        req.body.date,
    ]
    const insertReclamationQuery = "INSERT INTO reclamationuser (nameUser, emailUser, numUser, emplacement,nameEquipement, categorie, description, priorite, DescPanne, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const selectAdminIdQuery = "SELECT id FROM sign WHERE role = 'admin' ";
    
    db.query(insertReclamationQuery, values, (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erreur lors de l'ajout de la réclamation." });
        }
        console.log("Données de réclamation insérées avec succès : ",data)
        const reclamationId = data.insertId; // Récupération de l'ID de la réclamation insérée
        console.log("Données de réclamation insérées avec succès. ID de réclamation :", reclamationId);
        db.query(selectAdminIdQuery, (err, rows) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: "Erreur lors de la sélection de l'ID de l'administrateur." });
            }
            if (rows.length > 0) {
                const adminId = rows[0].id;
                //console.log(adminId)
                if (adminId) { 
                  const reclamationDataForAdmin = {reclamationId, ...req.body, type:'reclamation'}     
                  console.log("id: ", reclamationId)              
                  io.to(adminId).emit('nouvelle_reclamation_admin', reclamationDataForAdmin);
                  console.log("les données envoyée:",reclamationDataForAdmin)
                  return res.status(200).json({ message: "Réclamation ajoutée avec succès." });
                } else {
                  console.error("ID de l'administrateur non trouvé.");
                  return res.status(404).json({ error: "ID de l'administrateur non trouvé." });
                }
            } else {
                console.error("Aucun administrateur trouvé.");
                return res.status(404).json({ error: "Aucun administrateur trouvé." });
            }
        });
    });
});


io.on('connection', (socket) => {
  console.log('Client connected');
  
  socket.on('nouvelle_reclamation_admin', (reclamation) => {
    console.log('Nouvelle réclamation reçue :', reclamation);
    const reclamationId = reclamation.reclamationId; 
    console.log('reclamationId', reclamationId)
    const reclamationDataForAdmin = { ...reclamation, reclamationId ,type:'reclamation'};
    io.emit('nouvelle_reclamation_admin', reclamationDataForAdmin)
    console.log(reclamationDataForAdmin)
  });  
});

route.get('/AfficheDetailsReclamation/:reclamationId', async (req,res)=>{
  try{
    const reclamationId =req.params.reclamationId;
    const query= "SELECT * FROM reclamationuser WHERE id= ?"
    console.log(reclamationId)
    const [reclamation] = await db.query(query, [reclamationId]);
    console.log(reclamation)
    console.log(reclamationId)
    if(!reclamation){
      return res.status(400).json({error: 'reclamation non trouvée'})
    }
    res.json(reclamation)
  }catch(error){
    console.error('error lors de la recuperation des détails de la reclamation', error)
    res.status(500).json({error: 'error lors de la recuperation des détails de la reclamation'})
  }
})

route.get('/Affichereclamations', (req, res) => {
  const selectReclamationsQuery = "SELECT * FROM reclamationuser"; 
  db.query(selectReclamationsQuery, (err, reclamations) => {
    if (err) {
      console.error('Erreur lors de la récupération des réclamations :', err);
      return res.status(500).json({ error: "Erreur lors de la récupération des réclamations." });
    }
    res.status(200).json(reclamations);
  });
});
*/