const DetailEquipementModel= require('../model/DetailEquipementModel')
 
const DetailEquipementController= {
    
    addDetailsToEquipement: async (req, res) => {
        try {
          const { selectedItem, additionalFields } = req.body;
          console.log(selectedItem, additionalFields)
          if (!selectedItem || !additionalFields || !selectedItem.idEquipement || !additionalFields.name || !additionalFields.value) {
            return res.status(400).send('Les données requises sont manquantes');
          }
          await DetailEquipementModel.addDetails(selectedItem.itemId, additionalFields.fieldName, additionalFields.fieldValue);
          return res.status(200).send('Details added successfully');
        } catch (error) {
          console.error(error);
          return res.status(500).send('Error adding details');
        }
    },
    
    deleteDetailsFromEquipement: async (req, res) => {
        const itemId = req.params.itemId;
        const equipementId = req.params.idEquipement
        try {
          await DetailEquipementModel.deleteDetails(itemId, equipementId);
          return res.status(200).send('Equipement details deleted successfully');
        } catch (error) {
          console.error(error);
          return res.status(500).send('Error deleting equipement details');
        }
      },
}

module.exports= DetailEquipementController;