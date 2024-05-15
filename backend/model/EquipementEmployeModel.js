const db = require('../db');

const EquipementEmployeModel = {
    /*addEquipementEmploye: (values) => {
      return new Promise((resolve, reject) => {
        const selectQuery = "SELECT * FROM equipement_employe WHERE numSerie = ?";
        db.query(selectQuery, [values[3]], (err, result) => {
          if (err) {
            console.error(err);
            reject("Error checking equipment existence");
          } else {
            if (result && result.length > 0) {
              reject("Equipment deja affecter");
            } else {
              const sql = "INSERT INTO equipement_employe (nomEmploye, emailEmploye, equipementName, numSerie, categorie, idEmploye) VALUES (?, ?, ?, ?, ?, ?)";
              db.query(sql, values, (err, data) => {
                if (err) {
                  console.error(err);
                  reject("Error adding equipment employee");
                } else {
                  resolve("Equipment employee added successfully");
                }
              });
            }
          }
        });
      });
    },*/

    addEquipementEmploye : (values) => {
      return new Promise((resolve, reject) => {
        // Vérifier si l'équipement existe dans la table equipement
        const selectEquipementQuery = "SELECT * FROM equipement WHERE numSerie = ?";
        db.query(selectEquipementQuery, [values[3]], (err, equipementResult) => {
          if (err) {
            console.error(err);
            reject("Error checking equipment existence");
          } else {
            if (equipementResult && equipementResult.length > 0) {
              // L'équipement existe dans la table equipement, vérifier s'il est affecté
              const selectEquipementEmployeQuery = "SELECT * FROM equipement_employe WHERE numSerie = ?";
              db.query(selectEquipementEmployeQuery, [values[3]], (err, result) => {
                if (err) {
                  console.error(err);
                  reject("Error checking equipment assignment");
                } else {
                  if (result && result.length > 0) {
                    // L'équipement est déjà affecté
                    reject("Equipment already assigned");
                  } else {
                    // L'équipement n'est pas encore affecté, l'ajouter à la table equipement_employe
                    const sql = "INSERT INTO equipement_employe (nomEmploye, emailEmploye, equipementName, numSerie, categorie, idEmploye) VALUES (?, ?, ?, ?, ?, ?)";
                    db.query(sql, values, (err, data) => {
                      if (err) {
                        console.error(err);
                        reject("Error adding equipment employee");
                      } else {
                        resolve("Equipment employee added successfully");
                      }
                    });
                  }
                }
              });
            } else {
              // L'équipement n'existe pas dans la table equipement
              reject("Equipment with this serial number does not exist in the database");
            }
          }
        });
      });
    },
  
    getEquipementEmployeByUserId: (userId) => {
      return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM equipement_employe WHERE idEmploye = ?";
        db.query(sql, [userId], (err, result) => {
          if (err) {
            console.error(err);
            reject("Error getting equipment employees by user ID");
          } else {
            resolve(result);
          }
        });
      });
    },
  
    getAllEquipementEmploye: () => {
      return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM equipement_employe";
        db.query(sql, (err, result) => {
          //console.log(result)
          if (err) {
            console.error(err);
            reject("Error getting all equipment employees");
          } else {
            resolve(result);
          }
        });
      });
    },
  
    updateEquipementEmploye: (id, values) => {
      //console.log(values)
      return new Promise((resolve, reject) => {
        const sql = "UPDATE equipement_employe SET nomEmploye = ?, emailEmploye = ?, equipementName = ?, numSerie = ?, categorie = ? WHERE id = ?";
        const updatedValues = [
          values.nomEmploye,
          values.emailEmploye,
          values.equipementName,
          values.numSerie,
          values.categorie,
          id
        ];
        db.query(sql, updatedValues, (err, data) => {
          //console.log(updatedValues)
          if (err) {
            console.error(err);
            reject("Error updating equipment employee");
          } else {
            resolve({ message: "Equipment employee updated successfully" });
          }
        });
      });
    },
  
    deleteEquipementEmploye: (id) => {
      return new Promise((resolve, reject) => {
        const query = "DELETE FROM equipement_employe WHERE id = ?";
        db.query(query, [id], (err, result) => {
          if (err) {
            console.error(err);
            reject("Error deleting equipment employee");
          } else {
            resolve("Equipment employee deleted successfully");
          }
        });
      });
    }
};
  

module.exports= EquipementEmployeModel;