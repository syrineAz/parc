const UserModel= require('../model/UserModel')
const secretKey = 'aaabbbb1234';
const nodemailer=require('nodemailer');
const path = require('path');
const jwt=require('jsonwebtoken');
const bcrypt = require('bcrypt');
const salt = 10;

const UserContoller= {
    signup: async(req,res)=>{
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
    },
    forgetPassword : async(req,res)=>{
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
    },
    resetPassword : async (req,res)=>{
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
    }, 
    logout : async(req,res)=>{
        try {
            res.clearCookie('token');
            res.json({ success: true, message: 'Déconnexion réussie' });
        } catch (error) {
            console.error('Erreur lors de la déconnexion :', error);
            res.status(500).json({ success: false, message: 'Erreur lors de la déconnexion' });
        }
    },
    showResetPasswordPage: async(req,res)=>{
        res.type('text/html');
        res.sendFile(path.join(__dirname, '../app-parc/src/components/SignUp/ResetPassword.jsx'));
    }
}


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

module.exports=UserContoller;