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

/*
route.post('/form', async (req, res) => {
    const values = [
        req.body.name,
        req.body.email,
        req.body.num,
        req.body.cin,
        req.body.type,
        req.body.service,
        req.body.bureau,
        req.body.actif
    ];
    try {
        const result = await EmployeModel.addUser(values); // Add user
        return res.status(200).send(result);
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
});

route.get('/users', async (req, res) => {
    try {
        const users = await EmployeModel.getAllUsers(); // Get all users
        return res.json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
});

route.post('/edit/:userid', async (req, res) => {
    const userid = req.params.userid;
    try {
        const result = await EmployeModel.updateUser(userid, req.body); // Update user
        return res.status(200).send(result);
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
});

route.delete('/delete/:userid', async (req, res) => {
    const userid = req.params.userid;
    try {
        const result = await EmployeModel.deleteUser(userid); // Delete user
        return res.status(200).send(result);
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
});







route.post('/form', (req, res) =>{
    const values = [
        req.body.name,
        req.body.email,
        req.body.num,
        req.body.cin,
        req.body.type,
        req.body.service,
        req.body.bureau,
        req.body.actif
    ];
    const selectQuery= "SELECT * FROM user WHERE cin = ? ";
    db.query(selectQuery, [values[3]], (err, result, field) => {
        if(err){
            console.log(err)
            res.status(500).send('user existed')
        }else{
            if(result && result.length >0){
                console.log(result)
                res.status(400).send("User already exists")
            }else{
                const sql= "INSERT INTO user (name, email, num, cin, type, service, bureau, actif) VALUES(?,?,?,?, ?,?,?,?)  ";  
                db.query(sql,values,(err,data) => {
                if (err){
                  console.error(err)
                  res.status(500).send("error adding user")
                }else
                  {res.status(200).send("user added succesfully")}        
                })
            }
        }
    })
   
});

route.get('/users', (req,res) =>{
    const userid= req.params.userid
    const sql=" SELECT * FROM user "
    db.query(sql ,(err,result) =>{
        if(err) {
            console.log("error :", err)
            return res.json({message : "error inside server"})
        }
        return res.json(result);
    })
})


route.post('/edit/:userid', (req, res) =>{
    const userid= req.params.userid
    const sql= "UPDATE user SET name = ?, email=?, num=?, cin=? , type =?,service=?,bureau=?,actif=? WHERE id= ?  ";
    const values = [
        req.body.name,
        req.body.email,
        req.body.num,
        req.body.cin,
        req.body.type,
        req.body.service,
        req.body.bureau,
        req.body.actif,
        userid
    ];
    db.query(sql,values,(err,data) => {
        if (err){
            console.error(err.message)
            return res.json("error")
        }
        console.log("user update succesfully")
        return res.json("success")
        
    })
})


route.delete('/delete/:userid', (req, res) => {
    const userid = req.params.userid;
    const query = "DELETE FROM user WHERE id = ?";
    db.query(query, [userid], (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send("Error deleting user");
      } else {
        res.status(200).send("User deleted successfully");
      }
    });
});
*/
