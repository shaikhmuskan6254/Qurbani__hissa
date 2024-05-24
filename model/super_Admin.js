
let {SuperAdmin} = require("../schema/super_Admin__Schema");
let joi = require("joi");
let security = require("../helper/security")
let config = require("config");
let {validate} = require("../helper/validation")

async function register(params) {
    //admin data validation
    let schema = joi.object({
        email:joi.string().email().max(255).required(),
        username:joi.string().min(2).max(155).required(),
        name:joi.string().max(255).required(),
        password:joi.string().min(8).max(16).required(),
        phone:joi.string().required()

    }) 
    let check = await validate(schema,params).catch((error)=>{return{error}})
    if (!check || (check && check.error)) {
        return {error:check.error,status:400};
    }
    // check if admin exist 
    let admin = await SuperAdmin.findOne({where:{email:params.email}}).catch((error)=>{return{error}})
    console.log("register admin",admin);
    if (admin) {
        return {error:"admin already exist",status:409};
    }
    // save Password in db
    let password = params.password; // Store plaintext password
    if (!password) {
    return { error: "Password is required", status: 400 };
}
    // Data format 
    let data = {
        username:params.username,
        name:params.name,
        email:params.email,
        password:params.password,
        phone:params.phone,

    }
    // insert in database
    let insert = await SuperAdmin.create(data).catch((error)=>{return{error}})
    
    if (!insert || (insert && insert.error)) {
        return {error:"internal server error",status:500};
    }
    let response = {
        id:insert.id,
        username:insert.username,
        email:insert.email,
        name:insert.name,
        phone:insert.phone
    } 
    // Return response 
    return {data:response}
}
async function login(params) {
    // admin data validation
    let schema=joi.object({
    email:joi.string().email().min(2).max(155).required(),
    password:joi.string().min(8).max(16).required()

    })
    let check=await validate(schema,params).catch((error)=>{return{error}})
    if(!check || (check && check.error)){
        return {error:check.error,status:400};
    }
    // check is admin exist 
    let admin = await SuperAdmin.findOne({ where: { email: params.email } }).catch((error) => { return { error } })
    if (!admin) {
        return { error: 'admmin not found', statu: 409 }
    }
    // Check if password match
    let savedPassword=params.password
    let password=admin.password

    if (savedPassword!==password) {
        return { error: "User email and password invalid", status: 403 };
    }

    // Generate Token
    let token = await security.signAsync({id:admin.id}).catch((error)=>{return{error}})
    if (!token || (token && token.error)) {
        return {error:"Internal server error",status:500}
    }
    // Save token in db
    let update = await SuperAdmin.update({token},{where:{id:admin.id}}).catch((error)=>{return{error}})
    // ("update",update);
    if (!update || (update && update.error)) {
        return{error:"admin not login, please try again",status:500}
    }
    // Return token in json
    return{token};
}



// async function login(params) {
//     // user data validdation
//     let schema=joi.object({
//         email:joi.string().required(),
//         password:joi.string().required()
//     })
//     let check=await validate(schema,params).catch((error)=>{
//         return{error}
//     })
//     if(!check && (check || check.error)){
//         return {error:check.error, status:400}
//     }
    // check if user email already exist
    // let user = await SuperAdmin.findOne({ where: { username: params.username } }).catch((error) => { return { error } })
    
    // if (user) {
    //     return { error: 'user already exist', statu: 409 }
    // }

    //  // data format

    //  let data = {
    //     username: params.username,
    //     password: params.password
    // }

    // // insert in a database 
    // let insert = await SuperAdmin.create(data).catch((error) => { return { error } })
    // if (!insert || (insert && insert.error)) {
    //     return { error: 'internal server error', statu: 500 }

    // }

    // // return in a response
    // return { data: insert }
// }


// async function addZone(params){
//     // user data validation
//     let schema = joi.object({
//         zoneName: joi.string().required(),
//         zoneManagerName: joi.string().required(),
//         zoneManagerContact: joi.string().required(),
//         zoneManagerEmail:joi.string().required()
//     })
//     // check if super admin exist
//     let admin = await SuperAdmin.findOne({ where: { zoneManagerEmailID: params.zoneManagerEmail } }).catch((error) => { return { error } })
//     if (admin) {
//         return { error: 'admin already exist', statu: 409 }
//     }

//     let check = await validate(schema,params).catch((error) => { return { error } })
//     if (!check || (check && check.error)) {
//         return { error: check.error, statu: 400 }

//     }

//     // data format

//     let data = {
//         zoneName:params.zoneName,
//         zoneManagerName: params.zoneManagerName,
//         zoneManagerContact: params.zoneManagerContact,
//         zoneManagerEmailID: params.zoneManagerEmail
//     }

//     // insert in a database 
//     let insert = await SuperAdmin.create(data).catch((error) => { return { error } })
//     if (!insert || (insert && insert.error)) {
//         return { error: 'internal server error', statu: 500 }

//     }
//     // return in a response
//     return { data: insert }

// }

// async function addArea(params){
//     // data validation
//     let schema=joi.object({
//         zoneName:joi.string().required(),
//         areaName:joi.string().required(),
//         branchName:joi.string().required(),
//         areaManagerName:joi.string().required(),
//         areaManagerContact:joi.string().required(),
//         areaManagerEmailID:joi.string().required()

//     })
//     let check = await validate(schema,params).catch((error) => { return { error } })
//     if (!check || (check && check.error)) {
//         return { error: check.error, statu: 400 }

    
//     // data format 
//     let data = {
//         zoneName:params.zoneName,
//         areaName: params.areaName,
//         branchName: params.branchName,
//         areaManagerName: params.areaManagerName,
//         areaManagerContact: params.areaManagerContact,
//         areaManagerEmailID: params.areaManagerEmailID
//     }

//     // insert into database
//     let insert = await SuperAdmin.create(data).catch((error)=>{
//         return {error}
//     })
//     if (!insert || (insert && insert.error)) {
//         return { error: 'internal server error', statu: 500 }

//     }
//     // return in a response
//     return { data: insert }
// }
// }

// async function loginDetails(id,params) {
    
// }

module.exports={register,login}
