const db = require('../db')

const FournisseurModel = {
    addFournisseur: (values) => {
      return new Promise((resolve, reject) => {
        const selectQuery = "SELECT * FROM fournisseur WHERE cin = ?";
        db.query(selectQuery, [values[3]], (err, result) => {
          if (err) {
            console.error(err);
            reject("Error checking fournisseur existence");
          } else {
            if (result && result.length > 0) {
              reject("Fournisseur already exists");
            } else {
              const sql = "INSERT INTO fournisseur (name, email, num, cin, adresse, service) VALUES (?, ?, ?, ?, ?, ?)";
              db.query(sql, values, (err, data) => {
                if (err) {
                  console.error(err);
                  reject("Error adding fournisseur");
                } else {
                  resolve("Fournisseur added successfully");
                }
              });
            }
          }
        });
      });
    },
  
    getAllFournisseurs: () => {
      return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM fournisseur";
        db.query(sql, (err, result) => {
          if (err) {
            console.error(err);
            reject("Error getting fournisseurs");
          } else {
            resolve(result);
          }
        });
      });
    },
  
    updateFournisseur: (userid, values) => {
      return new Promise((resolve, reject) => {
        const sql = "UPDATE fournisseur SET name = ?, email = ?, num = ?, cin = ?, adresse = ?, service = ? WHERE id = ?";
        const updatedValues = [
          values.name,
          values.email,
          values.num,
          values.cin,
          values.adresse,
          values.service,
          userid
        ];
        db.query(sql, updatedValues, (err, data) => {
          if (err) {
            console.error(err.message);
            reject("Error updating fournisseur");
          } else {
            resolve("Fournisseur updated successfully");
          }
        });
      });
    },
  
    deleteFournisseur: (userid) => {
      return new Promise((resolve, reject) => {
        const query = "DELETE FROM fournisseur WHERE id = ?";
        db.query(query, [userid], (error, results) => {
          if (error) {
            console.error(error);
            reject("Error deleting fournisseur");
          } else {
            resolve("Fournisseur deleted successfully");
          }
        });
      });
    }
  };

module.exports= FournisseurModel ;