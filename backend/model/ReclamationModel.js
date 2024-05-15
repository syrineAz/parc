const db= require('../db')
const {io} = require('../server')

const ReclamationModel = {
    addReclamation: (values) => {
      return new Promise((resolve, reject) => {
        const insertReclamationQuery = "INSERT INTO reclamationuser (nameUser, emailUser, numUser, emplacement, nameEquipement, categorie, description, priorite, DescPanne, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const selectAdminIdQuery = "SELECT id FROM sign WHERE role = 'admin' ";
  
        db.query(insertReclamationQuery, values, (err, data) => {
          if (err) {
            console.error(err);
            reject("Erreur lors de l'ajout de la réclamation.");
          }
          const reclamationId = data.insertId; // Récupération de l'ID de la réclamation insérée
          console.log("reclamationID:" , reclamationId)
          db.query(selectAdminIdQuery, (err, rows) => {
            if (err) {
              console.error(err);
              reject("Erreur lors de la sélection de l'ID de l'administrateur.");
            }
            if (rows.length > 0) {
              const adminId = rows[0].id;
              if (adminId) {
                //const reclamation = {reclamation-Id}
                const reclamationDataForAdmin = { reclamationId, ...values, type: 'reclamation' };
                console.log('Data to emit:', reclamationDataForAdmin);
                io.to(adminId).emit('nouvelle_reclamation_admin', reclamationDataForAdmin);
                console.log(" reclamation envoyer:", reclamationDataForAdmin)
                resolve("Réclamation ajoutée avec succès.");
              } else {
                console.error("ID de l'administrateur non trouvé.");
                reject("ID de l'administrateur non trouvé.");
              }
            } else {
              console.error("Aucun administrateur trouvé.");
              reject("Aucun administrateur trouvé.");
            }
          });
        });
      });
    },
  
    getReclamationDetails: (reclamationId) => {
      console.log(reclamationId)
      return new Promise((resolve, reject) => {
        const query = "SELECT * FROM reclamationuser WHERE id = ?";
        db.query(query, [reclamationId], (err, reclamation) => {
          console.log(reclamation)
          if (err) {
            console.error('Erreur lors de la récupération des détails de la réclamation :', err);
            reject("Erreur lors de la récupération des détails de la réclamation.");
          }
          if (!reclamation || reclamation.length === 0) {
            reject("Réclamation non trouvée.");
          } else {
            resolve(reclamation[0]);
          }
        });
      });
    },
    
    getAllReclamations: () => {
      return new Promise((resolve, reject) => {
        const selectReclamationsQuery = "SELECT * FROM reclamationuser";
        db.query(selectReclamationsQuery, (err, reclamations) => {
          if (err) {
            console.error('Erreur lors de la récupération des réclamations :', err);
            reject("Erreur lors de la récupération des réclamations.");
          }
          resolve(reclamations);
        });
      });
    }
};



module.exports= ReclamationModel;