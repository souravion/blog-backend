
const adminService = require('../../services/Admin.service')
const bcrypt = require('bcrypt');
const { generateTokens } = require("../../utils/generateTokens.utils");
const { createCookies } = require("../../utils/createCookies.utils");


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
        if(user && Object.keys(user).length > 0){
            const isValidPassword = await bcrypt.compare(req.body.password, user.passsword)
            if(isValidPassword){
                // Generate token
                const payload = {
                    name:user.name,
                    userId:user._id
                }
                // after nenerateToken
                const tokens = await generateTokens(payload);
                // here we just send token and res to createCookies function as a parameters 
                await createCookies(tokens,res)

                res.status(200).json({
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

exports.CategoryController = async(req, res)=>{
    res.send("Category Created")
}