const DetailEquipementEmployeModel = require('../model/DetailEquipementEmployeModel')

const DetailEquipementEmployeController ={
    AddDetailsEmploye : async (req, res) => {
        try {
            const { selectedItem, customFields } = req.body.data;
            const idEmploye = selectedItem.idEmploye;

            if (!Array.isArray(customFields)) {
                throw new Error('customFields n\'est pas un tableau');
            }

            await Promise.all(customFields.map(async (field) => {
                try {
                    await DetailEquipementEmployeModel.insertCustomField(field.name, field.value, idEmploye);
                } catch (error) {
                    console.error(error);
                    throw new Error('Erreur lors de l\'insertion');
                }
            }));
    
            res.status(200).send('Détails ajoutés avec succès');
        } catch (error) {
            console.error(error);
            res.status(500).send('Erreur dans l\'insertion des détails');
        }
    },
    updateDetailInEquipement: async (req, res) => {
        const { idEquipement, itemId } = req.params;
        const { newValue } = req.body;
        console.log(itemId, idEquipement,newValue)
  
        try {
            await DetailEquipementModel.updateDetail(itemId, idEquipement, newValue);
            res.status(200).send('Champ mis à jour avec succès');
        } catch (error) {
            console.error(error);
            res.status(500).send('Erreur lors de la mise à jour du champ de l\'équipement');
        }
      }    
}

module.exports= DetailEquipementEmployeController;