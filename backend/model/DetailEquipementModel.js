const db = require('../db')


const DetailEquipementModel ={
    addDetails: (itemId, fieldName, fieldValue) => {
        return new Promise((resolve, reject) => {
            console.log('Trying to insert:', itemId, fieldName, fieldValue)
          const sql = "INSERT INTO modal_details (itemId, fieldName, fieldValue) VALUES (?, ?, ?)";
          db.query(sql, [itemId, fieldName, fieldValue], (err, result) => {
            console.log(itemId, fieldName,fieldValue)
            if (err) {
              console.error(err);
              reject("Error adding details");
            } else {
              resolve("Details added successfully");
            }
          });
        });
    },
    
    deleteDetails: (itemId, equipementId)=>{
        return new Promise((resolve, reject) => {
         const sql= "DELETE FROM modal_details WHERE itemId= ? AND id =?" 
         db.query(sql, [itemId, equipementId], (err, result)=>{
          if (err) {
            console.error(err);
            reject("Error delete details");
          } else {
            resolve("Details deleted successfully");
          }
         })
        })
    }
    
 }

module.exports= DetailEquipementModel;