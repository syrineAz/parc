const express = require('express')
const route = express.Router();
const db = require('../../db')
const FournisseurModel= require('../../model/FournisseurModel');
const FournisseurController = require('../../Controller/FournisseurController');


route.post('/AjoutFournisseur',FournisseurController.addFournisseur)
route.get('/fournisseur',FournisseurController.getAllFournisseurs)
route.post('/editfournisseur/:userid',FournisseurController.updateFournisseur)
route.delete('/deleteFournisseur/:userid', FournisseurController.deleteFournisseur)

/*
route.post('/AjoutFournisseur', async (req, res) => {
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
});

route.get('/fournisseur', async (req, res) => {
    try {
        const fournisseurs = await FournisseurModel.getAllFournisseurs(); // Get all fournisseurs
        return res.json(fournisseurs);
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
});

route.post('/editfournisseur/:userid', async (req, res) => {
    const userid = req.params.userid;
    try {
        const result = await FournisseurModel.updateFournisseur(userid, req.body); // Update fournisseur
        return res.status(200).send(result);
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
});

route.delete('/deleteFournisseur/:userid', async (req, res) => {
    const userid = req.params.userid;
    try {
        const result = await FournisseurModel.deleteFournisseur(userid); // Delete fournisseur
        return res.status(200).send(result);
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
});



route.post('/AjoutFournisseur', (req, res) =>{
    const values = [
        req.body.name,
        req.body.email,
        req.body.num,
        req.body.cin,
        req.body.adresse,
        req.body.service,
       
    ];
    const selectQuery= "SELECT * FROM fournisseur WHERE cin = ? ";
    db.query(selectQuery, [values[3]], (err, result, field) => {
        if(err){
            console.log(err)
            res.status(500).send('fournisseur existed')
        }else{
            if(result && result.length >0){
                console.log(result)
                res.status(400).send("fournisseur already exists")
            }else{
                const sql= "INSERT INTO fournisseur (name, email, num, cin, adresse, service) VALUES(?,?,?,?, ?,?)  ";  
                db.query(sql,values,(err,data) => {
                if (err){
                  console.error(err)
                  res.status(500).send("error adding fournisseur")
                }else
                  {res.status(200).send("fournisseur added succesfully")}        
                })
            }
        }
    })
});

route.get('/fournisseur', (req,res) =>{
    const userid= req.params.userid
    const sql=" SELECT * FROM fournisseur "
    db.query(sql ,(err,result) =>{
        if(err) {
            console.log("error :", err)
            return res.json({message : "error inside server"})
        }
        return res.json(result);
    })
})



route.post('/editfournisseur/:userid', (req, res) =>{
    const userid= req.params.userid
    const sql= "UPDATE fournisseur SET name = ?, email=?, num=?, cin=? , adresse =?,service=? WHERE id= ?  ";
    const values = [
        req.body.name,
        req.body.email,
        req.body.num,
        req.body.cin,
        req.body.adresse,
        req.body.service,
        userid
    ];
    db.query(sql,values,(err,data) => {
        if (err){
            console.error(err.message)
            return res.json("error")
        }
        console.log("fournisseur update succesfully")
        return res.json("success")
        
    })
})

route.delete('/deleteFournisseur/:userid', (req, res) => {
    const userid = req.params.userid;
    const query = "DELETE FROM fournisseur WHERE id = ?";
    db.query(query, [userid], (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send("Error deleting fournisseur");
      } else {
        res.status(200).send("fournisseur deleted successfully");
      }
    });
});

*/
module.exports = route;
