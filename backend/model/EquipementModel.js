const db = require('../db');
const DetailEquipementModel = require('./DetailEquipementModel');

const EquipementModel = {

  addEquipement: (values) => {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO equipement (NameEquipement, NameFournisseur, prix, Disponibilite, garantie, categorie, numSerie) VALUES (?, ?, ?, ?, ?, ?, ?)";
      db.query(sql, values, (err, result) => {
        if (err) {
          console.error(err);
          reject("Error adding equipement");
        } else {
          resolve("Equipement added successfully");
        }
      });
    });
  },

  checkEquipementExistence: (numSerie) => {
    return new Promise((resolve, reject) => {
      const selectQuery = "SELECT * FROM equipement WHERE numSerie = ?";
      db.query(selectQuery, [numSerie], (err, result) => {
        if (err) {
          console.error(err);
          reject("Error checking equipement existence");
        } else {
          resolve(result.length > 0);
        }
      });
    });
  },

  getAllEquipements: () => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM equipement";
      db.query(sql, (err, result) => {
        if (err) {
          console.error(err);
          reject("Error getting equipements");
        } else {
          resolve(result);
        }
      });
    });
  },

  deleteEquipement: (equipementId) => {
    return new Promise((resolve, reject) => {
      // Vérifier d'abord si l'équipement est affecté à un employé
      const checkQuery = 'SELECT id FROM equipement_employe WHERE idEquipement = ? LIMIT 1';
      db.query(checkQuery, [equipementId], async (checkErr, checkResult) => {
        if (checkErr) {
          console.error(checkErr);
          reject("Error checking equipment assignment");
          return;
        }
  
        if (checkResult.length > 0) {
          // L'équipement est affecté à un employé, ne peut pas être supprimé
          reject("Cannot delete equipment assigned to an employee");
          return;
        }
  
        // Si l'équipement n'est pas affecté à un employé, procéder à la suppression
        const deleteQuery = 'DELETE FROM equipement WHERE idEquipement = ?';
        db.query(deleteQuery, [equipementId], async (err, result) => {
          if (err) {
            console.error(err);
            reject("Error deleting equipement");
          } else {
            // Supprimer les détails associés dans modal_detail
            try {
              await DetailEquipementModel.deleteDetailsByEquipementId(equipementId);
              resolve("Equipement and details deleted successfully");
            } catch (error) {
              console.error(error);
              reject("Error deleting equipement details");
            }
          }
        });
      });
    });
  },
  

  updateEquipement: (values) => {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE equipement SET NameEquipement = ?, NameFournisseur = ?, prix = ?, Disponibilite = ?, garantie = ?, categorie = ?, numSerie = ? WHERE idEquipement = ?";
      db.query(sql, values, (err, result) => {
        if (err) {
          console.error(err);
          reject("Error updating equipement");
        } else {
          resolve("Equipement updated successfully");
        }
      });
    });
  },

  getEquipementsByCategory: (category) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM equipement WHERE categorie = ?";
      db.query(sql, [category], (err, result) => {
        if (err) {
          console.error(err);
          reject("Error getting equipements by category");
        } else {
          resolve(result);
        }
      });
    });
  }

 
};

module.exports = EquipementModel;
