const express = require('express');
const UserModel = require('../../model/UserModel')
const route = express.Router();
const secretKey = 'aaabbbb1234';
const nodemailer=require('nodemailer');
const path = require('path');
const jwt=require('jsonwebtoken');
const db = require('../../db');
const bcrypt = require('bcrypt');
const salt = 10;
const UserContoller= require('../../Controller/UserController')

route.post('/signup', UserContoller.signup)
//route.post('/login', UserContoller.login)
route.post('/forgot', UserContoller.forgetPassword)
route.post('/ResetPassword/:id/:resetToken',UserContoller.resetPassword)
route.get('/logout', UserContoller.logout);
route.get('/reset-password/:id/:resetToken',UserContoller.showResetPasswordPage)

route.post('/login', async (req, res) => {
    const sql = "SELECT id, email, role, name, password FROM sign WHERE email = ?";
    const email = req.body.email;
    const password = req.body.password;
    db.query(sql, [email], async (err, data) => {
        if (err) {
            console.error("Erreur lors de la requête SQL :", err);
            return res.status(500).json({ error: "Erreur interne du serveur" });
        }
        if (data.length > 0) {
            const user = data[0];
            const hashedPassword = user.password;
            const match = await bcrypt.compare(password, hashedPassword);
            if (match) {
                const resetToken = await CreateToken(req, res);
                //console.log(resetToken)
                res.cookie('token', resetToken); 
                return res.json({ success: true, userData: user });
            } else {
                return res.json({ success: false, message: 'Identifiants incorrects' });
            }
        } else {
            return res.json({ success: false, message: 'Identifiants incorrects' });
        }
    });
});

let resetToken
function CreateToken(req, res) {
    const user = { Email: req.body.Email };
    return new Promise((resolve, reject) => {
        jwt.sign(user, secretKey, (err, resultat) => {
            if (err) {
                reject(err);
            } else {
              //console.log('Token créé avec succès :', resultat);
                resolve(resultat);
            }
        });
    });
}




module.exports = route;