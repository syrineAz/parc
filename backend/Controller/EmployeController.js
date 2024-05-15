const EmployeModel= require('../model/EmployeModel')
const EmployeController={
    addUser: async(req,res)=>{
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
    },
    getAllUsers: async(req,res)=>{
        try {
            const users = await EmployeModel.getAllUsers(); // Get all users
            return res.json(users);
        } catch (error) {
            console.error(error);
            return res.status(500).send(error);
        }
    },
    updateUser: async(req,res)=>{
        const userid = req.params.userid;
        try {
            const result = await EmployeModel.updateUser(userid, req.body); // Update user
            return res.status(200).send(result);
        } catch (error) {
            console.error(error);
            return res.status(500).send(error);
        }
    },
    deleteUser: async(req,res)=>{
        const userid = req.params.userid;
        try {
            const result = await EmployeModel.deleteUser(userid); // Delete user
            return res.status(200).send(result);
        } catch (error) {
            console.error(error);
            return res.status(500).send(error);
        }
    }
}
module.exports=EmployeController;