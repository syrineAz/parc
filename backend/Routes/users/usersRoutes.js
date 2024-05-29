const express = require('express')
const route = express.Router();
const db = require('../../db')
const EmployeModel= require('../../model/EmployeModel')
const EmployeController = require('../../Controller/EmployeController');

route.post('/form', EmployeController.addUser )
route.get('/users',EmployeController.getAllUsers)
route.post('/edit/:userid',EmployeController.updateUser)
route.delete('/delete/:userid', EmployeController.deleteUser)

module.exports = route;
