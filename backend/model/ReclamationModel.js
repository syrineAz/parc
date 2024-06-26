const { validate } = require('uuid');
const db= require('../db')
const {io} = require('../server');
const { Socket } = require('socket.io');

const ReclamationModel = {
    addReclamation: (values  ) => {
      return new Promise((resolve, reject) => {
        const insertReclamationQuery = "INSERT INTO reclamationuser ( nameUser, emailUser, numUser, emplacement, nameEquipement, categorie, description, priorite, DescPanne, date, etat) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,'En attente')";
        const selectAdminIdQuery = "SELECT id FROM sign WHERE role = 'admin' ";
  
        db.query(insertReclamationQuery, values, (err, data) => {
          if (err) {
            console.error(err);
            reject("Erreur lors de l'ajout de la réclamation.");
          }
          const reclamationId = data.insertId; // Récupération de l'ID de la réclamation insérée
         // console.log("reclamationID:" , reclamationId)
          db.query(selectAdminIdQuery, (err, rows) => {
            if (err) {
              console.error(err);
              reject("Erreur lors de la sélection de l'ID de l'administrateur.");
            }
            if (rows.length > 0) {
              const adminId = rows[0].id;
              if (adminId) {
                const reclamationToEmit = {
                  nameUser: values[0],
                  emailUser: values[1],
                  numUser: values[2],
                  emplacement: values[3],
                  nameEquipement: values[4],
                  categorie: values[5],
                  description: values[6],
                  priorite: values[7],
                  DescPanne:values[8],
                  date: values[9],
                  reclamationId,
                  type: 'reclamation'
                };
                //console.log(" data to emit:", reclamation)
                  io.to(adminId).emit('nouvelle_reclamation_admin', reclamationToEmit);
                  console.log(" data to emit:", reclamationToEmit)
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
        const selectReclamationsQuery = "SELECT * FROM reclamationuser ORDER BY id DESC ";
        db.query(selectReclamationsQuery, (err, reclamations) => {
          if (err) {
            console.error('Erreur lors de la récupération des réclamations :', err);
            reject("Erreur lors de la récupération des réclamations.");
          }
          resolve(reclamations);
        });
      });
    },
    acceptReclamation: (id, status,callback) => {
      db.query('UPDATE reclamationuser SET etat = ? WHERE id = ?', [status, id], (err, result) => {
        if (err) {
          console.error('Erreur lors de l\'acceptation de la réclamation :', err);
          callback(err, null);
        } else {
          callback(null, result);
        }
      });    
    },

    refuseReclamation: (id, status,callback) => {
      db.query('UPDATE reclamationuser SET etat = ? WHERE id = ?', [status, id], (err, result) => {
        if (err) {
          console.error('Erreur lors de la refus de la réclamation :', err);
          callback(err, null);
        } else {
          callback(null, result);
        }
      });       
    },
    getReclamationById: (id, callback)=>{
      db.query("SELECT * FROM reclamationuser WHERE id= ?", [id],(err, result)=>{
        if (err) {
          console.error('Erreur lors de la recuperetion de id :', err);
          callback(err, null);
        } 
        if (result.length===0) {
          callback(null, null);
        }
        callback(null, result[0])
      })
    },
    updateReclamation: (id, values) => {
      return new Promise((resolve, reject) => {
        const sql = "UPDATE reclamationuser SET nameUser = ?, emailUser = ?, numUser = ?, emplacement = ?, nameEquipement = ?, categorie = ?,description=?, priorite=?,DescPanne=?,date=? WHERE id = ?";
        const updatedValues = [
          values.nameUser,
          values.emailUser,
          values.numUser,
          values.emplacement,
          values.nameEquipement,
          values.categorie,
          values.description,
          values.priorite,
          values.DescPanne,
          values.date,
          id
        ];
        db.query(sql, updatedValues, (err, data) => {
          console.log(updatedValues)
          if (err) {
            console.error(err.message);
            reject("Error updating reclamation");
          } else {
            resolve("Reclamation updated successfully");
          }
        });
      });
    },
    deleteReclamation: (id) => {
      return new Promise((resolve, reject) => {
        const query = "DELETE FROM reclamationuser WHERE id = ?";
        db.query(query, [id], (error, results) => {
          if (error) {
            console.error(error);
            reject("Error deleting reclamation");
          } else {
            resolve("reclamation deleted successfully");
          }
        });
      });
    }
    
};



module.exports= ReclamationModel;