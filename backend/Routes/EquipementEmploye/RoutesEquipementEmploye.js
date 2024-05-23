const express = require('express')
const route = express.Router();
const db = require('../../db')
const EquipementEmployeModel= require('../../model/EquipementEmployeModel')
const EquipementEmployeContoller= require('../../Controller/EquipementEmployeContoller');
const DetailEquipementEmployeController = require('../../Controller/DetailEquipementEmployeController');

route.post('/Ajouter', EquipementEmployeContoller.addEquipementEmploye)
route.get('/AfficherEmploye/:userId',EquipementEmployeContoller.getEquipementEmployeByUserId)
route.get('/AfficherAll',EquipementEmployeContoller.getAllEquipementEmploye)
route.post('/EditEmploye/:id', EquipementEmployeContoller.updateEquipementEmploye)
route.delete('/delete/:id', EquipementEmployeContoller.deleteEquipementEmploye)
route.get('/employe', EquipementEmployeContoller.getAllEquipementEmploye)
route.post('/DetailsEquipementEmploye',DetailEquipementEmployeController.AddDetailsEmploye)
module.exports = route;
//route.post('/equipement/:idEquipement/Updatedetail/:itemId', DetailEquipementController.updateDetailInEquipement);







/*

route.post('/DetailsEquipementEmploye', async (req, res)=>{
    try{
        const {selectedItem , customFields} =req.body.data 
        const idEmploye= selectedItem.idEmploye
        if(!Array.isArray(customFields)){
            throw new Error ('additonalFields n\'est pas un tableau ')
        }
      //  console.log(additionalFields)
    
        await Promise.all(customFields.map(async (field)=>{
            try{
                const response = await db.query('INSERT INTO modal_employe ( fieldName, fieldValue, idEmploye) VALUES (?, ?, ?)', [ field.name,field.value,idEmploye]);
               // console.log(response)
            }
            catch(error){
                console.error(error)
                throw new Error('Erreur lors de l\'insertion')
            }
        }));
        res.status(200).send('détails ajouter avec succès')
    }catch(error){
        console.error(error)
        res.status(500).send('error dans l\'insertion des details' )
    }
})



route.post('/Ajouter', async (req, res) => {
    const values = [
        req.body.nomEmploye,
        req.body.emailEmploye,
        req.body.equipementName,
        req.body.numSerie,
        req.body.categorie,
        req.body.idEmploye
    ];
    try {
        const result = await EquipementEmployeModel.addEquipementEmploye(values);
        return res.status(200).send(result);
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
});

route.get('/AfficherEmploye/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const equipements = await EquipementEmployeModel.getEquipementEmployeByUserId(userId);
        return res.json(equipements);
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
});

route.get('/AfficherAll', async (req, res) => {
    try {
        const equipements = await EquipementEmployeModel.getAllEquipementEmploye();
        return res.json(equipements);
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
});

route.post('/EditEmploye/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await EquipementEmployeModel.updateEquipementEmploye(id, req.body);
        return res.status(200).send(result);
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
});

route.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await EquipementEmployeModel.deleteEquipementEmploye(id);
        return res.status(200).send(result);
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
});
















route.post('/Ajouter', (req, res)=>{
   const values = [
    req.body.nomEmploye,
    req.body.emailEmploye,
    req.body.equipementName,
    req.body.numSerie,
    req.body.categorie,
    req.body.idEmploye ]
    const selectQuery= "SELECT * FROM equipement_employe WHERE numSerie = ? ";
    db.query(selectQuery, [values[4]], (err, result, field) => {
        console.log(result)
        if(err){
            console.log(err)
            res.status(500).send('equipement existed')
        }else{
            if(result && result.length >0){
                console.log(result)
                res.status(400).send("equipement already exists")
            }else{
                const sql= "INSERT INTO equipement_employe (nomEmploye, emailEmploye, equipementName, numSerie, categorie, idEmploye) VALUES(?,?,?,?, ?,?)  ";  
                db.query(sql,values,(err,data) => {
                if (err){
                  console.error(err)
                  res.status(500).send("error adding user")
                }else
                  {res.status(200).send("equipement added succesfully")}        
                })
            }
        }
    })
   
})



route.get('/AfficherEmploye/:userId', (req,res) =>{
    const userId = req.params.userId
    const sql=" SELECT * FROM equipement_employe WHERE idEmploye= ? "
    db.query(sql, [userId] ,(err,result) =>{
       //console.log(result)
        if(err) {
            console.log("error :", err)
            return res.json({message : "error inside server"})
        }
        return res.json(result);
    })
})



route.get('/AfficherAll', (req,res) =>{
    const sql=" SELECT * FROM equipement_employe "
    db.query(sql ,(err,result) =>{
        if(err) {
            console.log("error :", err)
            return res.json({message : "error inside server"})
        }
        return res.json(result);
    })
})



route.get('/employe', (req,res) =>{
    const sql=" SELECT * FROM equipement_employe  "
    db.query(sql,(err,result) =>{
        if(err) {
            console.log("error :", err)
            return res.json({message : "error inside server"})
        }
        return res.json(result);
    })
})



route.post('/EditEmploye/:id', (req, res) =>{
    const id= req.params.id
    const sql= "UPDATE equipement_employe SET nomEmploye = ?, emailEmploye=?, equipementName=?, numSerie=? , categorie =? WHERE id= ?  ";
    const values = [
        req.body.nomEmploye,
        req.body.emailEmploye,
        req.body.equipementName,
        req.body.numSerie,
        req.body.categorie,
        id
    ];
    db.query(sql,values,(err,data) => {
        if (err){
            console.error(err.message)
            return res.json("error")
        }
        console.log("user update succesfully")
        return res.json("Success")
        
    })
})


route.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const query = "DELETE FROM equipement_employe WHERE id = ?";
    db.query(query, [id], (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send("Error deleting user");
      } else {
        res.status(200).send("User deleted successfully");
      }
    });
});*/

