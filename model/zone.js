let { Zone }=require("../schema/zone__schema");
let joi=require("joi");
let {validate}=require("../helper/validation");


async function createZone(params,adminData) {
   // zone data validation 
   let schema=joi.object({
    zoneName:joi.string().required(),
    zoneManagerUsername:joi.string().required(),
    zoneManagerName:joi.string().required(),
    zoneManagerEmail:joi.string().email().required(),
    zoneManagerPhone:joi.string().required(),
    zoneManagerPassword:joi.string().required(),
    zoneManagerPhoto:joi.string(),
    zoneManagerAadharNumber:joi.string()
})
let check=await validate(schema,params).catch((error)=>{return{error}})
if(!check || (check && check.error)){
    return {error:check.error ,status:400}
}
// data format
let data={
    zoneName:params.zoneName,
    zoneManagerUsername:params.zoneManagerUsername,
    zoneManagerName:params.zoneManagerName,
    zoneManagerEmail:params.zoneManagerEmail,
    zoneManagerPhone:params.zoneManagerPhone,
    zoneManagerPassword:params.zoneManagerPassword,
    zoneManagerPhoto:params.zoneManagerPhoto,
    zoneManagerAadharNumber:params.zoneManagerAadharNumber,
    createdBy: adminData.id,
}
// insert data in data base
let insert = await Zone.create(data).catch((error)=>{return{error}})
if(!insert || (insert && insert.error)){
    return {error:"internal server error",status:500}
}
// retturn response
return {insert:{id:insert.id}}

}     

async function getAllZone(){
    // Retrieve all zone from the database
    let zone=await Zone.findAll().catch((error)=>{return{error}})
    if(!zone || (zone && zone.error)){
        return {error:zone.error,status:500}
    }
     // return response
     return{data:zone}

}     

async function getDetailById(zoneId) {
    // User data validation
    let schema = joi.object({
        id: joi.number().required()
    });

    let check = await validate(schema, { id: zoneId }).catch((error) => {
        return { error };
    });

    if (!check || (check && check.error)) {
        return { error: check.error, status: 400 };
    }
     // Fetch data from table using zoneId
     let detail = await Zone.findOne({ where: { id: zoneId } });

     if (!detail) {
         return { error: "Zone details not found" };
     }

     // Return response
     return { data: detail };
}

async function updateZone(zoneId, params) {
    // Zone data validation
        let schema = joi.object({
        id:joi.number().required(),
        zoneName:joi.string().required(),
        zoneManagerUsername:joi.string(),
        zoneManagerName:joi.string(),
        zoneManagerEmail:joi.string().email(),
        zoneManagerPhone:joi.string(),
        zoneManagerPassword:joi.string(),
        zoneManagerPhoto:joi.string(),
        zoneManagerAadharNumber:joi.string()
        })
        let check = await validate(schema, { id: zoneId, ...params }).catch((error) => {
            return { error };
        });

        if (!check || (check && check.error)) {
            return { error: check.error, status: 400 };
        }
        // Check if user exists
        let zone = await Zone.findOne({ where: { id: zoneId, isDeleted: false } });
        if (!zone) {
            return { error: "zone Not Found", status: 404 };
        }

        // Update data in DB
        let [updateCount] = await Zone.update(params, { where: { id: zoneId } });
        if (updateCount === 0) {
            return { error: "Zone details not updated", status: 500 };
        }
        // Return success response 
        return {data:updateCount};
    
}


async function deleteZone(zoneId) {
    // Zone data validation
    let schema = joi.object({
        id: joi.number().required()
    });

    let check = await validate(schema, { id: zoneId }).catch((error) => {
        return { error };
    });

    if (!check || (check && check.error)) {
        return { error: check.error, status: 400 };
    }
    // Check if zone exists
    let zone = await Zone.findOne({ where: { id: zoneId, isDeleted: false } });
    console.log("zone deleted or not ",zone);
    if (!zone) {
        return { error: "zone Not Found", status: 404 };
    }
    // Soft delete zone by setting isDeleted flag to true
    let update=await Zone.update({ isDeleted: true }, { where: { id: zoneId } })
    .catch((error)=>{ return{error}})
    if (!update || (update && update.error)) {
        return { error: "zone not deleted yet!...", status: 500 }
    }
    // Return success response 
    return {data:update};

}



module.exports={createZone,getAllZone,getDetailById,updateZone,deleteZone}
