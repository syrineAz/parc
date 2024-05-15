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


/*
route.post('/signup', (req , res) =>{
    const sql = "INSERT INTO sign (name, email, password) VALUES ( ?, ?, ? )";
    const password = req.body.password;
    const hashedPassword = bcrypt.hashSync(password, salt);
    
    const values =[
        req.body.name,
        req.body.email,
        hashedPassword
    ];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error("Erreur lors de la requête SQL :", err);
            return res.status(500).json({ error: "Erreur interne du serveur" });
        }
        return res.json(data);
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
*/
/*
route.get('/logout', async (req, res) => {
    try {
        res.clearCookie('token');
        res.json({ success: true, message: 'Déconnexion réussie' });
    } catch (error) {
        console.error('Erreur lors de la déconnexion :', error);
        res.status(500).json({ success: false, message: 'Erreur lors de la déconnexion' });
    }
});  

route.post('/forgot', async (req, res) => {
    const {Email} = req.body;    
    try {
        const resetToken = await CreateToken(req, res);
      //  console.log(resetToken);
        const sql = "SELECT * FROM sign WHERE email = ? ";
        db.query(sql, Email, (err, result) => {
            console.log(Email)
            if (err) {     
                console.error(err);
                return res.status(500).json({ error: "Erreur interne du serveur" });
            }
            if (result.length === 0) {
                console.log(result)
                return res.send({ Status: "User not existed" });
            }
            const user = result[0];
            if (!user.id) {
                return res.status(500).json({ error: "ID not available for user" });
            }
            
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'sirineazouz648@gmail.com',
                    pass: 'dosl bjwc qbyh gilo'
                }
            });
            var mailOptions = {
                from: 'sirineazouz648@gmail.com',
                to: Email,
                subject: 'Reset your Password ',
                html: 
                    `<h1>forgot Your Password ?</h1>
                    <p>To reset your password, click the following link:</p>
                    <a href="http://localhost:5173/ResetPassword/${user.id}/${resetToken}">Reset Password</a>`
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ error: "Erreur lors de l'envoi de l'email" });
                } else {
                    return res.send({ Status: "Success" });
                }
            });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erreur interne du serveur" });
    }
});

route.post('/ResetPassword/:id/:resetToken', async (req, res) => {
    const { id, resetToken } = req.params;
    const { password } = req.body;
    if (!password || password.trim() === '') {
        return res.json({ Status: "Le champ du nouveau mot de passe ne peut pas être vide" });
    }
    try {
        const decoded = jwt.verify(resetToken, secretKey);
        console.log("decoded : ", decoded);
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.query('UPDATE sign SET password = ? WHERE id = ?', [hashedPassword, id]);
        if (result.length === 0) {
            return res.send({ Status: "User not existed" });
        } else {
            console.log('Nombre de lignes mises à jour :', result.affectedRows);
            res.json({ Status: 'Success' });
        }
    } catch (error) {
        console.error('Erreur lors de la vérification du token :', error.message);
        return res.json({ Status: 'Error with token or password update' });
    }
});


route.get('/reset-password/:id/:resetToken', (req , res) => {
    res.type('text/html');
    res.sendFile(path.join(__dirname, '../app-parc/src/components/SignUp/ResetPassword.jsx'));
});*/



module.exports = route;
/*
route.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, salt);
        const result = await UserModel.createUser(name, email, hashedPassword);
        
        // Vérifiez si l'utilisateur a été créé avec succès
        if (result && result.insertId) {
            return res.json({ userId: result.insertId , message: "Utilisateur ajouté avec succès" });
        } else {
            return res.status(500).json({ error: "Erreur lors de la création de l'utilisateur" });
        }
    } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur :", error);
        return res.status(500).json({ error: "Erreur interne du serveur" });
    }
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

route.post('/login', async (req, res) => {
    try {
        const { email,password } = req.body;
       console.log(email)
        const user = await UserModel.getUserByEmail(email);
        console.log(user)
        if (user.length > 0) {
            console.log(user)
            const hashedPassword = user[0].password;
            console.log(hashedPassword)
            const match = await bcrypt.compare(password, hashedPassword);
            if (match) {
                console.log(match)
                const resetToken = await CreateToken(req, res);
                res.cookie('token', resetToken); 
                return res.json({ success: true, userData: user });
            } else {
                return res.json({ success: false, message: 'Identifiants incorrects' });
            }
        } else {
            return res.json({ success: false, message: 'Identifiants incorrects' });
        }
    } catch (error) {
        console.error("Erreur lors de l'authentification de l'utilisateur :", error);
        return res.status(500).json({ error: "Erreur interne du serveur" });
    }
});


route.post('/forgot', async (req, res) => {
    try {
        const { Email } = req.body;    
        const user = await UserModel.getUserForgetPassword(Email);
        if (user.length === 0) {
            return res.send({ Status: "User not existed" });
        }
        const resetToken = await CreateToken(req, res);
      //  console.log(resetToken)
        // Envoyer l'e-mail avec le token de réinitialisation
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'sirineazouz648@gmail.com',
                pass: 'dosl bjwc qbyh gilo'
            }
        });
       // console.log(Email)
        var mailOptions = {
            from: 'sirineazouz648@gmail.com',
            to: Email, // Utilisez la variable email ici
            subject: 'Reset your Password ',
            html: 
                `<h1>forgot Your Password ?</h1>
                <p>To reset your password, click the following link:</p>
                <a href="http://localhost:5173/ResetPassword/${user.id}/${resetToken}">Reset Password</a>`
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return res.status(500).json({ error: "Erreur lors de l'envoi de l'email" });
            } else {
                return res.send({ Status: "Success" });
            }
        });
    } catch (error) {
        console.error("Erreur lors de la demande de réinitialisation de mot de passe :", error);
        return res.status(500).json({ error: "Erreur interne du serveur" });
    }
});

route.post('/ResetPassword/:id/:resetToken', async (req, res) => {
    try {
        const { id, resetToken } = req.params;
        const { password } = req.body;
        if (!password || password.trim() === '') {
            return res.json({ Status: "Le champ du nouveau mot de passe ne peut pas être vide" });
        }
        const decoded = jwt.verify(resetToken, secretKey);
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await UserModel.updateUserPasswordByEmail(id, hashedPassword);
        if (result.length === 0) {
            return res.send({ Status: "User not existed" });
        } else {
            console.log('Nombre de lignes mises à jour :', result.affectedRows);
            return res.json({ Status: 'Success' });
        }
    } catch (error) {
        console.error("Erreur lors de la réinitialisation du mot de passe :", error);
        return res.status(500).json({ error: "Erreur interne du serveur" });
    }
});


route.get('/logout', async (req, res) => {
    try {
        res.clearCookie('token');
        res.json({ success: true, message: 'Déconnexion réussie' });
    } catch (error) {
        console.error('Erreur lors de la déconnexion :', error);
        res.status(500).json({ success: false, message: 'Erreur lors de la déconnexion' });
    }
}); 

route.get('/reset-password/:id/:resetToken', (req, res) => {
    res.type('text/html');
    res.sendFile(path.join(__dirname, '../app-parc/src/components/SignUp/ResetPassword.jsx'));
});
*/


