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
              const insertedId= result.insertdId;
              console.log(insertedId)
              resolve(insertedId);
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
    },
    updateDetail: async (id, idEquipement, newValue) => {
      console.log(id, idEquipement, newValue)

      try {
        await db.query('UPDATE modal_details SET fieldValue = ? WHERE itemId = ? AND id = ?', [newValue, id, idEquipement]);
      } catch (error) {
        console.error(error);
        throw new Error('Erreur lors de la mise à jour du détail de l\'équipement');
      }
    }
 }

module.exports= DetailEquipementModel;