const express = require('express')
const route = express.Router();
const db = require('../../db')
const DashboardController = require('../../Controller/DashboardController')

route.get('/EmployeCount', (req, res)=>{
    db.query('SELECT COUNT(*) AS total FROM user', (err, result)=>{
        if(err){
            console.error('erreur lors de comptage ', err)
            res.status(500).json({ error: 'Erreur lors du comptage des employés.' })
            return;
        }
        const employeCount= result[0].total
        console.log(employeCount)
        res.json({employeCount})
    })
})


route.get('/fournisseurCount', (req, res)=>{
    db.query('SELECT COUNT(*) AS total FROM fournisseur', (err, result)=>{
        if(err){
            console.error('erreur lors de comptage ', err)
            res.status(500).json({ error: 'Erreur lors du comptage des fournisseurs.' })
            return;
        }
        const fournisseurCount= result[0].total
        console.log(fournisseurCount)
        res.json({fournisseurCount})
    })
})

module.exports = route;
