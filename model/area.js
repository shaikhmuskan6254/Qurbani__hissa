let { Area }=require("../schema/area_schemma");
let joi=require("joi");
let {validate}=require("../helper/validation");


async function createArea(params,adminData) {
    // Area data validation 
    let schema=joi.object({
        areaName:joi.string().required(),
        areaZoneName:joi.string().required(),
        areaManagerUsername:joi.string().required(),
        areaManagerName:joi.string().required(),
        areaManagerEmail:joi.string().email().required(),
        areaManagerPhone:joi.string().required(),
        areaManagerPassword:joi.string().required(),
        areaManagerPhoto:joi.string(),
        areaManagerAadharNumber:joi.string()
    })
    let check=await validate(schema,params).catch((error)=>{return{error}})
    if(!check || (check && check.error)){
        return {error:check.error ,status:400}
    }
    // data format
    let data={
        areaName:params.areaName,
        areaZoneName:params.areaZoneName,
        areaManagerUsername:params.areaManagerUsername,
        areaManagerName:params.areaManagerName,
        areaManagerEmail:params.areaManagerEmail,
        areaManagerPhone:params.areaManagerPhone,
        areaManagerPassword:params.areaManagerPassword,
        areaManagerPhoto:params.areaManagerPhoto,
        areaManagerAadharNumber:params.areaManagerAadharNumber,
        createdBy: adminData.id,
    }
    // insert data in data base
    let insert = await Area.create(data).catch((error)=>{return{error}})
    console.log("inser into db",insert);
    if(!insert || (insert && insert.error)){
        return {error:"internal server error",status:500}
    }
    // retturn response
    return {insert:{id:insert.id}}
}

async function getAllArea(){
    // Retrieve all area from the database
    let area=await Area.findAll().catch((error)=>{return{error}})
    if(!area || (area && area.error)){
        return {error:area.error,status:500}
    }
     // return response
     return{data:area}

}     

async function getDetailById(areaId) {
    // User data validation
    let schema = joi.object({
        id: joi.number().required()
    });

    let check = await validate(schema, { id: areaId }).catch((error) => {
        return { error };
    });

    if (!check || (check && check.error)) {
        return { error: check.error, status: 400 };
    }
     // Fetch data from table using areaId
     let detail = await Area.findOne({ where: { id: areaId } });

     if (!detail) {
         return { error: "area details not found" };
     }

     // Return response
     return { data: detail };
}

async function updateArea(areaId, params) {
    // area data validation
        let schema = joi.object({
        id:joi.number().required(),
        areaName:joi.string().required(),
        areaZoneName:joi.string().required(),
        areaManagerUsername:joi.string(),
        areaManagerName:joi.string(),
        areaManagerEmail:joi.string().email(),
        areaManagerPhone:joi.string(),
        areaManagerPassword:joi.string(),
        areaManagerPhoto:joi.string(),
        areaManagerAadharNumber:joi.string()
        })
        let check = await validate(schema, { id: areaId, ...params }).catch((error) => {
            return { error };
        });

        if (!check || (check && check.error)) {
            return { error: check.error, status: 400 };
        }
        // Check if user exists
        let area = await Area.findOne({ where: { id: areaId, isDeleted: false } });
        if (!area) {
            return { error: "area Not Found", status: 404 };
        }

        // Update data in DB
        let [updateCount] = await Area.update(params, { where: { id: areaId } });
        if (updateCount === 0) {
            return { error: "area details not updated", status: 500 };
        }
        // Return success response 
        return {data:updateCount};
    
}


async function deleteArea(areaId) {
    // area data validation
    let schema = joi.object({
        id: joi.number().required()
    });

    let check = await validate(schema, { id: areaId }).catch((error) => {
        return { error };
    });

    if (!check || (check && check.error)) {
        return { error: check.error, status: 400 };
    }
    // Check if area exists
    let area = await Area.findOne({ where: { id: areaId, isDeleted: false } });
    if (!area) {
        return { error: "area Not Found", status: 404 };
    }
    // Soft delete area by setting isDeleted flag to true
    let update=await Area.update({ isDeleted: true }, { where: { id: areaId } })
    .catch((error)=>{ return{error}})
    if (!update || (update && update.error)) {
        return { error: "area not deleted yet!...", status: 500 }
    }
    // Return success response 
    return {data:update};

}



module.exports={createArea,getAllArea,getDetailById,updateArea,deleteArea}

