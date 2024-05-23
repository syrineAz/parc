const EquipementEmployeModel= require('../model/EquipementEmployeModel')

const EquipementEmployeContoller ={
    addEquipementEmploye: async(req,res)=>{
        const values = [
            req.body.nomEmploye,
            req.body.emailEmploye,
            req.body.equipementName,
            req.body.numSerie,
            req.body.categorie,
            req.body.idEmploye,
            req.body.idEquipement,
            req.body.date
        ];
        try {
            const result = await EquipementEmployeModel.addEquipementEmploye(values);
            return res.status(200).send(result);
        } catch (error) {
            console.error(error);
            return res.status(500).send(error);
        }
    },
    getEquipementEmployeByUserId : async(req,res)=>{
        const userId = req.params.userId;
        try {
            const equipements = await EquipementEmployeModel.getEquipementEmployeByUserId(userId);
            return res.json(equipements);
        } catch (error) {
            console.error(error);
            return res.status(500).send(error);
        }
    },
    getAllEquipementEmploye: async(req,res)=>{
        try {
            const equipements = await EquipementEmployeModel.getAllEquipementEmploye();
            return res.json(equipements);
        } catch (error) {
            console.error(error);
            return res.status(500).send(error);
        }
    },
    updateEquipementEmploye: async(req,res) => {
        const id = req.params.id;
        try {
            const result = await EquipementEmployeModel.updateEquipementEmploye(id, req.body);
           // console.log(id,req.body)
         //   console.log(result)
            return res.status(200).send(result);
        } catch (error) {
            console.error(error);
            return res.status(500).send(error);
        }
    },
    deleteEquipementEmploye: async(req,res)=>{
        const id = req.params.id;
        console.log(id)
    try {
        const result = await EquipementEmployeModel.deleteEquipementEmploye(id);
        console.log(result)
        return res.status(200).send(result);
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
    }
}

module.exports= EquipementEmployeContoller