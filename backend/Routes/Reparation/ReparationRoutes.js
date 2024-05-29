const express = require('express')
const route = express.Router();
const ReparationController = require('../../Controller/ReparationController')

route.post('/AddReparation' ,ReparationController.addReparation)
route.post('/UpdateReparation/:id' ,ReparationController.updateReparation)
route.delete('/DeleteReparation', ReparationController.deleteReparation)
route.get('/AllReparation', ReparationController.getAllReparatiin)
module.exports = route;
