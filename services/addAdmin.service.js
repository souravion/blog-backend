
const AdminUser = require('../models/adminUser.model')
const { AppError,ERROR,ERRORCODE } = require("../utils/appError.utils")
const MESSAGE = require('../utils/errorMessges.utils')
exports.AddAdmin = async (req,res)=> {
    try {
        const adminUserCreated = new AdminUser(req)
        const newAdminUserCreated = await adminUserCreated.save()
        return newAdminUserCreated;
    } catch (e) {
        throw new AppError(MESSAGE.SERVERSIDERROR,ERROR.InternalServerError,ERRORCODE.InternalServerError)

    }
}