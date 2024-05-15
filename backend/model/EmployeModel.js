const db = require('../db')

const EmployeModel = {
    addUser: (values) => {
      return new Promise((resolve, reject) => {
        const selectQuery = "SELECT * FROM user WHERE cin = ?";
        db.query(selectQuery, [values[3]], (err, result) => {
          if (err) {
            console.error(err);
            reject("Error checking user existence");
          } else {
            if (result && result.length > 0) {
              reject("User already exists");
            } else {
              const sql = "INSERT INTO user (name, email, num, cin, type, service, bureau, actif) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
              db.query(sql, values, (err, data) => {
                if (err) {
                  console.error(err);
                  reject("Error adding user");
                } else {
                  resolve("User added successfully");
                }
              });
            }
          }
        });
      });
    },
  
    getAllUsers: () => {
      return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM user";
        db.query(sql, (err, result) => {
          if (err) {
            console.error(err);
            reject("Error getting users");
          } else {
            resolve(result);
          }
        });
      });
    },
  
    updateUser: (userid, values) => {
      return new Promise((resolve, reject) => {
        const sql = "UPDATE user SET name = ?, email = ?, num = ?, cin = ?, type = ?, service = ?, bureau = ?, actif = ? WHERE id = ?";
        const updatedValues = [
          values.name,
          values.email,
          values.num,
          values.cin,
          values.type,
          values.service,
          values.bureau,
          values.actif,
          userid
        ];
        db.query(sql, updatedValues, (err, data) => {
          if (err) {
            console.error(err.message);
            reject("Error updating user");
          } else {
            resolve("User updated successfully");
          }
        });
      });
    },
  
    deleteUser: (userid) => {
      return new Promise((resolve, reject) => {
        const query = "DELETE FROM user WHERE id = ?";
        db.query(query, [userid], (error, results) => {
          if (error) {
            console.error(error);
            reject("Error deleting user");
          } else {
            resolve("User deleted successfully");
          }
        });
      });
    }
  };


module.exports= EmployeModel;
