const db = require('../db')

const ReparationModel = {
    addReparation: (values) => {
        return new Promise((resolve, reject) => {
          const sql = "INSERT INTO reparations (idEquipement, idEmploye, description, start_date, end_date, status, nameEquipement,numSerie, categorie,nomEmploye) VALUES (?,?, ?, ?, ?, ?, ?, ?,?,?)";
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
    updateReparation : (values, id) => {
      return new Promise((resolve, reject) => {
          const sql = "UPDATE reparations SET `idEquipement` = ?, `idEmploye` = ?, `description` = ?, `start_date` = ?, `end_date` = ?, `status` = ?, `nameEquipement` = ?, `numSerie` = ?, `categorie` = ?, `nomEmploye` = ? WHERE `id` = ?";
          const updatedValues = [
              values.idEquipement,
              values.idEmploye,
              values.description,
              values.start_date,
              values.end_date,
              values.status,
              values.nameEquipement,
              values.numSerie,
              values.categorie,
              values.nomEmploye,
              id
          ];
          db.query(sql, updatedValues, (err, data) => {
              if (err) {
                  console.error(err.message);
                  reject("Error updating equipement");
              } else {
                  resolve("equipement updated successfully");
              }
          });
      });
  },
    deleteReparation: (id) => {
        return new Promise((resolve, reject) => {
          const query = "DELETE FROM reparations WHERE id = ?";
          db.query(query, [id], (error, results) => {
            if (error) {
              console.error(error);
              reject("Error deleting equipement");
            } else {
              resolve("equipement deleted successfully");
            }
          });
        });
    },
    getAllReparatiin: () => {
      return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM reparations ";
        db.query(sql, (err, reparation) => {
          if (err) {
            console.error('Erreur lors de la récupération des réclamations :', err);
            reject("Erreur lors de la récupération des réclamations.");
          }
          resolve(reparation);
        });
      });
    },

}

module.exports = ReparationModel;