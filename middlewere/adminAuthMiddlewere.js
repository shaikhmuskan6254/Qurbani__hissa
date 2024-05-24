let {verifyAsync} = require("../helper/security");
const {  SuperAdmin} = require("../schema/super_Admin__Schema");
async function auth(req,res,next) {
    // check if token exist in DB
    let token = req.header('token');
    if (typeof(token)!='string') {
        return res.status(400).send({error:"token is required"})
    }
    // Decrypt token
    let decryptedToken = await verifyAsync(token).catch((error)=>{return{error}})
    if (!decryptedToken || (decryptedToken && decryptedToken.error)) {
        return res.status(403).send({error:"token not valid"})
    } 
    // Check if user id and token are present in DB
    let admin = await SuperAdmin.findOne({where:{token:token,id:decryptedToken.id}}).catch((error)=>{return{error}})
    if (!admin || (admin && admin.error)) {
        return res.status(403).send({error:"Access Denied"})
    } 
    // Check if admin is not deleted
    if (admin.isDeleted) {
        return res.status(403).send({error:"admin Deleted"})
    }
    req["adminData"] = {
        id:admin.id,
        email:admin.email,
        adminname:admin.adminname,
        isActive:admin.isActive
    }
    // pass request to next function
    next();
}

module.exports = auth;