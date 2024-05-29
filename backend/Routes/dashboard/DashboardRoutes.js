const express = require('express')
const route = express.Router();
const db = require('../../db')
const DashboardController = require('../../Controller/DashboardController')

route.get('/EmployeCount',DashboardController.getEmployeeCount )
route.get('/fournisseurCount',DashboardController.getSupplierCount)
route.get('/ReclamationCount' ,DashboardController.getReclamationCount)
route.get('/ReservationCount', DashboardController.getReservationCount)
route.get('/OrdinateursCount', DashboardController.getOrdinateurCount)
route.get('/ReseauxCommunicationCount', DashboardController.getReseauxCommunicationCount)
route.get('/PeripheriqueCount', DashboardController.getPeripheriqueCount)
route.get('/ImprimanteCount', DashboardController.getImprimanteCount)
route.get('/EcransCount', DashboardController.getEcransCount)
route.get('/AccesoiresCount', DashboardController.getAccesoireCount)
route.get('/AccesoiresCablageCount', DashboardController.getConnectiqueCount)
route.get('/getAccounts', DashboardController.getAccount)
route.get('/reparationCount', DashboardController.getReparation)

module.exports = route;
