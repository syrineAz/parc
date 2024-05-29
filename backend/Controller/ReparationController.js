const ReparationModel= require('../model/ReparationModel')

const ReparationController ={
    addReparation: (req, res) => {
        const values = [
          req.body.idEquipement,
          req.body.idEmploye,
          req.body.description,
          req.body.start_date,
          req.body.end_date	,
          req.body.status,
          req.body.nameEquipement,
          req.body.numSerie,
          req.body.categorie,
          req.body.nomEmploye
        ];
       // console.log(values)
        ReparationModel.addReparation(values )
          .then(message => { 
            res.status(200).json({ message });
          })
          .catch(error => {
            console.error(error);
            res.status(500).json({ error });
        });
    },
    updateReparation : async (req, res) => {
      const id = req.params.id;
      try {
          const result = await ReparationModel.updateReparation(req.body, id); 
          return res.status(200).send(result);
      } catch (error) {
          console.error(error);
          return res.status(500).send(error);
      }
    },
    deleteReparation: async(req,res)=>{
        const id = req.params.id;
        try {
          const result = await ReparationModel.deleteReparation(id); 
          return res.status(200).send(result);
        } catch (error) {
          console.error(error);
          return res.status(500).send(error);
        }
    },
    getAllReparatiin: async(req,res)=>{
      try {
          const reparation = await ReparationModel.getAllReparatiin(); // Get all fournisseurs
          return res.json(reparation);
      } catch (error) {
          console.error(error);
          return res.status(500).send(error);
      }
  },
}

module.exports= ReparationController;