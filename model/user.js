let { User } = require("../schema/user_schema");
let joi=require("joi")
let {validate}=require("../helper/validation");
let {sequelizeCon,query,QueryTypes}=require("../init/dbConfig");
const { useInflection } = require("sequelize");

async function createUser(params,adminData) {
    // user data validation
    let schema=joi.object({
        name:joi.string().required(),
        areaName :joi.string().required(),
        areaManagerName :joi.string().required(),
        appUserName :joi.string().required(),
        appUserPhone :joi.string().required(),
        appUserEmail :joi.string().email().required(),
        appLogin :joi.string().required(),
        appPassword :joi.string().required(),
        areaUserPhoto:joi.string().required(),
        appUserAadharNumber:joi.string()
    })
    let check=await validate(schema,params).catch((error)=>{return{error}})
    if(!check || (check && check.error)){
        return {error:check.error ,status:400}
    }
    // data format
    let data={
        name:params.name,
        areaName:params.areaName,
        areaManagerName:params.areaManagerName,
        appUserName:params.appUserName,
        appUserPhone:params.appUserPhone,
        appUserEmail:params.appUserEmail,
        appLogin:params.appLogin,
        appPassword:params.appPassword,
        areaUserPhoto:params.areaUserPhoto,
        appUserAadharNumber:params.appUserAadharNumber,
        createdBy: adminData.id,
    }
    let insert = await User.create(data).catch((error)=>{return{error}})
    console.log("inernal server error",insert);
    if(!insert || (insert && insert.error)){
        return {error:"internal server error",status:500}
    }
    // retturn response
    return {insert:{id:insert.id}}
}

async function getAllUsers(){
    // Retrieve all users from the database
    let users=await User.findAll().catch((error)=>{return{error}})
    console.log("inernatl server error get all users",users);
    if(!users || (users && users.error)){
        return {error:users.error,status:500}
    }
     // return response
     return{data:users}

}     

async function getDetailById(userId) {
    // User data validation
    let schema = joi.object({
        id: joi.number().required()
    });

    let check = await validate(schema, { id: userId }).catch((error) => {
        return { error };
    });

    if (!check || (check && check.error)) {
        return { error: check.error, status: 400 };
    }
     // Fetch data from table using userId
     let detail = await User.findOne({ where: { id: userId } });

     if (!detail) {
         return { error: "User details not found" };
     }

     // Return response
     return { data: detail };
}
// async function updateUser(userId, params, adminData) {
//     // User data validation
//     let schema = joi.object({
//         id: joi.number().required(),
//         name:joi.string().required(),
//         areaName :joi.string().required(),
//         areaManagerName :joi.string().required(),
//         appUserName :joi.string().required(),
//         appUserPhone :joi.string().required(),
//         appUserEmail :joi.string().email().required(),
//         appLogin :joi.string().required(),
//         appPassword :joi.string().required(),
//         areaUserPhoto:joi.string().required(),
//         appUserAadharNumber:joi.string()
//     })
//     let joiParams = { ...params };
//     joiParams["id"] = userId
//     let check = await validate(schema, joiParams).catch((error) => { return { error } })
//     if (!check || (check && check.error)) {
//         return { error: check.error, status: 400 };
//     }
//     // Check if user exists
//     let user = await User.findOne({ where: { id: userId, isDeleted: false } }).catch((error) => { return { error } });
//     if (!user || (user && user.error)) {
//         return { error: "User Not Found", error: 404 }
//     }
//     // Check if user is created by the user
//     if (adminData.id != user.createdBy) {
//         return { error: "Access Denied", status: 403 }
//     }
//     // data format
//     let data = {};
//     if (params.name) { data["name"] = params.name }
//     if (params.areaName) { data["areaName"] = params.areaName }
//     if (params.areaManagerName) { data["areaManagerName"] = params.areaManagerName }
//     if (params.appUserName) { data["appUserName"] = params.appUserName}
//     if (params.appUserPhone) { data["appUserPhone"] = params.appUserPhone }
//     if (params.appUserEmail) { data["appUserEmail"] = params.appUserEmail }
//     if (params.appLogin) { data["appLogin"] = params.appLogin }
//     if (params.appPassword) { data["appPassword"] = params.appPassword }
//     if (params.areaUserPhoto) { data["areaUserPhoto"] = params.areaUserPhoto }
//     if (params.appUserAadharNumber) { data["appUserAadharNumber"] = params.appUserAadharNumber }

    // // Update data in DB
    // let update = await User.update(data, { where: { id: userId } }).catch((error) => { return { error } });
    // if (!update || (update && update.error)) {
    //     return { error: "Task Not Updated", status: 500 }
    // }
//     // Return response 
//     return { data: update }
// }


async function updateUser(userId, params) {
    // User data validation
    let schema = joi.object({
        id: joi.number().required(),
        name: joi.string().required(),
        areaName: joi.string().required(),
        areaManagerName: joi.string().required(),
        appUserName: joi.string().required(),
        appUserPhone: joi.string().required(),
        appUserEmail: joi.string().email().required(),
        appLogin: joi.string().required(),
        appPassword: joi.string().required(),
        areaUserPhoto: joi.string().required(),
        appUserAadharNumber: joi.string().allow(null)
    });

    let check = await validate(schema, { id: userId, ...params }).catch((error) => {
        return { error };
    });

    if (!check || (check && check.error)) {
        return { error: check.error, status: 400 };
    }
        // Check if user exists
        let user = await User.findOne({ where: { id: userId, isDeleted: false } });
        console.log("user not found error",user);
        if (!user) {
            return { error: "User Not Found", status: 404 };
        }

        // Update data in DB
        let [updateCount] = await User.update(params, { where: { id: userId } });
        if (updateCount === 0) {
            return { error: "User details not updated", status: 500 };
        }
        // Return success response 
        return {data:updateCount};
    
}


async function deleteUser(userId) {
    // User data validation
    let schema = joi.object({
        id: joi.number().required()
    });

    let check = await validate(schema, { id: userId }).catch((error) => {
        return { error };
    });

    if (!check || (check && check.error)) {
        return { error: check.error, status: 400 };
    }
    // Check if user exists
    let user = await User.findOne({ where: { id: userId, isDeleted: false } });
    if (!user) {
        return { error: "User Not Found", status: 404 };
    }
    // Soft delete user by setting isDeleted flag to true
    let update=await User.update({ isDeleted: true }, { where: { id: userId } })
    .catch((error)=>{ return{error}})
    if (!update || (update && update.error)) {
        return { error: "user not deleted yet!...", status: 500 }
    }
    // Return success response 
    return {data:update};

}



module.exports={createUser,getAllUsers,getDetailById,updateUser,deleteUser}

