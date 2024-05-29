const db = require('../db');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const util = require('util');

class UserModel {
    static async createUser(name, email, password) {
        try {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const sql = "INSERT INTO sign (name, email, password) VALUES (?, ?, ?)";
            const result = await db.query(sql, [name, email, hashedPassword]);
            return result;
        } catch (error) {
            console.error("Erreur lors de la création de l'utilisateur :", error);
            throw error;
        }
    }

    static async getUserByEmail(email) {
        try {
            const sql = "SELECT id, email, role, name, password FROM sign WHERE email = ?";
            const [results] = await db.query(sql, [email]);
            return results;
        } catch (error) {
            console.error("Erreur lors de la récupération de l'utilisateur par email :", error);
            throw error;
        }
    }

    static async getUserForgetPassword(Email) {
        try {
            const sql = "SELECT * FROM sign WHERE email = ?";
            const result = await db.query(sql, [Email]);
            return result;
        } catch (error) {
            console.error("Erreur lors de la récupération de l'utilisateur par email :", error);
            throw error;
        }
    }

    static async updateUserPasswordByEmail(email, newPassword) {
        try {
            const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
            const sql = "UPDATE sign SET password = ? WHERE email = ?";
            const result = await db.query(sql, [hashedPassword, email]);
            return result;
        } catch (error) {
            console.error("Erreur lors de la mise à jour du mot de passe de l'utilisateur :", error);
            throw error;
        }
    }

    static async deleteUserByEmail(email) {
        try {
            const sql = "DELETE FROM sign WHERE email = ?";
            const result = await db.query(sql, [email]);
            return result;
        } catch (error) {
            console.error("Erreur lors de la suppression de l'utilisateur par email :", error);
            throw error;
        }
    }

}



module.exports = UserModel;
db.query = util.promisify(db.query);
