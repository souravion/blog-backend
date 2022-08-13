const mongoose = require("mongoose")
const {UserCreateSchema} = require('../../models/AdminSchema')
const adminService = require('../../services/AdminService')
const bcrypt = require('bcrypt');


const jwt = require('jsonwebtoken');

exports.CreateAdminUser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.passsword,10)
        const postParams = {
            name:req.body.name,
            passsword:hashedPassword,
            email:req.body.email,
            mobile_number:req.body.mobile_number,
            created_by:req.body.created_by,
            is_active:req.body.is_active
        }
        await adminService.UserCreate(postParams)
        return res.status(200).json({ 
            status: 200,  
            message: "User Succesfully Created" });
    } catch (e) {
        return res.status(400).json({ 
            status: 400, 
            message: e.message 
        });
    }
}

// below controller for login 

exports.LoginController = async (req, res) => {
    try {
        const user = await adminService.Login(req.body.email)
            if(user && user.length>0){
            const isValidPassword = await bcrypt.compare(req.body.password, user[0].passsword)
                if(isValidPassword){
                // Generate token
                const token = jwt.sign({
                    name:user[0].name,
                    userId: user[0]._id
                }, process.env.JWT_SECRET,{
                    expiresIn: '1h'
                })
                    res.status(200).json({
                    "access_token":token,
                    "Message":"Login successfully"
                    })
                }else{
                    res.status(401).json({
                    "error":'Authentication failed'
                    })
                }
            }else{
                res.status(401).json({
                    "error":'Authentication failed'
                })
            }
    } catch (e) {
        return res.status(400).json({ 
            status: 400, 
            message: e.message 
        });
    }
}
