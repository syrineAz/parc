//const db= require('../db')
const EquipementModel= require('../model/EquipementModel')

const EquipementController = {
    addEquipement: async (req, res) => {
      const values = [
        req.body.NameEquipement,
        req.body.NameFournisseur,
        req.body.prix,
        req.body.Disponibilite,
        req.body.garantie,
        req.body.categorie,
        req.body.numSerie
      ];
  
      try {
        const equipementExist = await EquipementModel.checkEquipementExistence(values[6]);
        if (equipementExist) {
          return res.status(400).send("Equipement already exists");
        } else {
          const result = await EquipementModel.addEquipement(values);
          console.log(result)
          return res.status(200).send(result);
        }
      } catch (error) {
        console.error(error);
        return res.status(500).send("Error adding equipement");
      }
    },
  
    getAllEquipements: async (req, res) => {
      try {
        const equipements = await EquipementModel.getAllEquipements();
        return res.json(equipements);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error getting equipements" });
      }
    },
  
    deleteEquipement: async (req, res) => {
      const id = req.params.id;
      try {
        const result = await EquipementModel.deleteEquipement(id);
        return res.status(200).send(result);
      } catch (error) {
        console.error(error);
        return res.status(500).send("Error deleting equipement");
      }
    },
  
    updateEquipement: async (req, res) => {
      const id = req.params.item_idEquipement;
      const values = [
        req.body.NameEquipement,
        req.body.NameFournisseur,
        req.body.prix,
        req.body.Disponibilite,
        req.body.garantie,
        req.body.categorie,
        req.body.numSerie,
        id
      ];
  
      try {
        const result = await EquipementModel.updateEquipement(values);
        return res.status(200).send(result);
      } catch (error) {
        console.error(error);
        return res.status(500).send("Error updating equipement");
      }
    },
  
    getEquipementsByCategory: async (req, res) => {
      const title = req.params.title;
      try {
        const equipements = await EquipementModel.getEquipementsByCategory(title);
        return res.json(equipements);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error getting equipements by category" });
      }
    },
  
   

    
};

module.exports= EquipementController