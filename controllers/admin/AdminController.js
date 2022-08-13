
const adminService = require('../../services/AdminService')
exports.CreateAdminUser = async (req, res) => {
    try {
        const postParams = {
            name:req.body.name,
            passsword:req.body.passsword,
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
