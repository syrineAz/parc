const FournisseurModel= require('../model/FournisseurModel')

const FournisseurController= {
    addFournisseur : async(req,res)=>{
        const values = [
            req.body.name,
            req.body.email,
            req.body.num,
            req.body.cin,
            req.body.adresse,
            req.body.service,
        ];
        try {
            const result = await FournisseurModel.addFournisseur(values); // Add fournisseur
            console.log(object)
            return res.status(200).send(result);
        } catch (error) {
            console.error(error);
            return res.status(500).send(error);
        }
    },
    getAllFournisseurs: async(req,res)=>{
        try {
            const fournisseurs = await FournisseurModel.getAllFournisseurs(); // Get all fournisseurs
            return res.json(fournisseurs);
        } catch (error) {
            console.error(error);
            return res.status(500).send(error);
        }
    },
    updateFournisseur: async(req,res)=>{
        const userid = req.params.userid;
        try {
            const result = await FournisseurModel.updateFournisseur(userid, req.body); // Update fournisseur
            return res.status(200).send(result);
        } catch (error) {
            console.error(error);
            return res.status(500).send(error);
        }
    },
    deleteFournisseur: async(req,res)=>{
        const userid = req.params.userid;
        try {
            const result = await FournisseurModel.deleteFournisseur(userid); // Delete fournisseur
            return res.status(200).send(result);
        } catch (error) {
            console.error(error);
            return res.status(500).send(error);
        }
    }
}

module.exports= FournisseurController;