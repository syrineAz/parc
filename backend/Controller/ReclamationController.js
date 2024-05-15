const db= require('../db')
const {io} = require('../server')
const ReclamationModel  = require('../model/ReclamationModel')

const ReclamationController ={
    addReclamation: (req, res) => {
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
        console.log(values)
        ReclamationModel.addReclamation(values)
          .then(message => {
            res.status(200).json({ message });
          })
          .catch(error => {
            console.error(error);
            res.status(500).json({ error });
          });
    },
    
    getReclamationDetails: (req, res) => {
        const reclamationId = req.params.reclamationId;
        console.log(reclamationId)
        ReclamationModel.getReclamationDetails(reclamationId)
          .then(reclamation => {
            console.log(reclamation)
            res.json(reclamation);
          })
          .catch(error => {
            console.error(error);
            res.status(500).json({ error });
        });
    },
    
    getAllReclamations: (req, res) => {
      ReclamationModel.getAllReclamations()
          .then(reclamations => {
          res.status(200).json(reclamations);
        })
        .catch(error => {
          console.error(error);
          res.status(500).json({ error });
      });
    }
}

io.on('connection', (socket) => {
  console.log('Client connected');
  
  socket.on('nouvelle_reclamation_admin', (reclamation) => {//mta3 hedhi 
    console.log('Nouvelle réclamation reçue :', reclamation);
    const reclamationId = reclamation.reclamationId

    console.log('reclamationId', reclamationId)
    const reclamationDataForAdmin = { ...reclamation, reclamationId ,type:'reclamation'};
    
    io.emit('nouvelle_reclamation_admin', reclamationDataForAdmin)
    console.log(reclamationDataForAdmin)
  });  

});

module.exports= ReclamationController;