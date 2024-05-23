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
       // console.log(values)
        ReclamationModel.addReclamation(values )
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
    },

    getAcceptReclamation: (req, res) => {
      const { id } = req.body;
      ReclamationModel.getReclamationById(id, (err, reclamation) => {
        if (err) {
          console.error('Erreur lors de la récupération de la réservation :', err);
          return res.status(500).json({ error: 'Erreur serveur lors de la récupération de la réservation.' });
        }
    
        if (!reclamation) {
          return res.status(404).json({ error: 'Réservation non trouvée.' });
        }
    
        if (reclamation.etat !== 'En attente') {
          return res.status(400).json({ error: 'La réservation a déjà été traitée.' });
        }
    
        ReclamationModel.acceptReclamation(id, 'acceptée', (err, result) => {
          if (err) {
            console.error('Erreur lors de l\'acceptation de la réclamation :', err);
            return res.status(500).json({ error: 'Erreur serveur lors de l\'acceptation de la réclamation.' });
          }
    
          if (result && result.affectedRows > 0) {
            res.json({ message: 'Réclamation acceptée avec succès.' });
          } else {
            res.status(404).json({ error: 'Réclamation non trouvée.' });
          }
        });
      });
    },
    
    getRefusReservation: (req, res) => {
      const { id } = req.body;
      ReclamationModel.getReclamationById(id, (err, reclamation) => {
        if (err) {
          console.error('Erreur lors de la récupération de la réclamation :', err);
          return res.status(500).json({ error: 'Erreur serveur lors de la récupération de la réservation.' });
        }
    
        if (!reclamation) {
          return res.status(404).json({ error: 'Réclamation non trouvée.' });
        }
    
        if (reclamation.etat !== 'En attente') {
          return res.status(400).json({ error: 'La réclamation a déjà été traitée.' });
        }
    
        ReclamationModel.refuseReclamation(id, 'refusée', (err, result) => {
          if (err) {
            console.error('Erreur lors du refus de la réclamation :', err);
            return res.status(500).json({ error: 'Erreur serveur lors du refus de la réclamation.' });
          }
    
          if (result && result.affectedRows > 0) {
            res.json({ message: 'Réclamation refusée avec succès.' });
          } else {
            res.status(404).json({ error: 'réclamation non trouvée.' });
          }
        });
      });
    },
    updateReclamation: async(req,res)=>{
      const id = req.params.id;
      try {
          const result = await ReclamationModel.updateReclamation(id, req.body); 
          return res.status(200).send(result);
      } catch (error) {
          console.error(error);
          return res.status(500).send(error);
      }
    },
    deleteReclamation: async(req,res)=>{
      const id = req.params.id;
      try {
        const result = await ReclamationModel.deleteReclamation(id); 
        return res.status(200).send(result);
      } catch (error) {
        console.error(error);
        return res.status(500).send(error);
      }
    }
}


io.on('connection', (socket) => {
  
  console.log('Client connected');
  
  socket.on('nouvelle_reclamation_admin', (reclamation ) => {//mta3 hedhi 
    console.log('Nouvelle réclamation admin :', reclamation);
    const reclamationId = reclamation.reclamationId

    console.log('reclamationId', reclamationId)
    const reclamationDataForAdmin = { ...reclamation,reclamationId ,type:'reclamation'};

    io.emit('nouvelle_reclamation_admin', reclamationDataForAdmin)
    console.log(reclamationDataForAdmin)
  });
  
});

module.exports= ReclamationController;