const db = require('../db')

const DetailEquipementEmployeModel= {
    insertCustomField : async (fieldName, fieldValue, idEmploye) => {
        const query = 'INSERT INTO modal_employe (fieldName, fieldValue, idEmploye) VALUES (?, ?, ?)';
        await db.query(query, [fieldName, fieldValue, idEmploye]);
      //  console.log(fieldName, fieldValue, idEmploye)
    },
    updateDetail: async (id, idEmploye , newValue) => {
      try {
        await db.query('UPDATE modal_employe SET fieldValue = ? WHERE idEmploye = ? AND id = ?', [newValue, id, idEmploye]);
      } catch (error) {
        console.error(error);
        throw new Error('Erreur lors de la mise à jour du détail de l\'équipement');
      }
    }
}

module.exports= DetailEquipementEmployeModel;