let zone=require("../model/zone");

async function createZone(req,res){
    let data = await zone.createZone(req.body,req.adminData).catch((error)=>{return {error}})

    if (!data || (data && data.error)) {
        let error = (data && data.error) ? data.error : "internal server error";
        let status = (data && data.status) ? data.status : 500;
        return res.status(status).send({ error })
    }
    return res.send(data)
}
async function getAllZone(req, res) {
    let data = await zone.getAllZone().catch((error) => { return { error } })
    
    if (!data || (data && data.error)) {
        let error = (data && data.error) ? data.error : "internal server error";
        let status = (data && data.status) ? data.status : 500;
        return res.status(status).send({ error })
    }
    return res.send(data)
}

async function getDetailById(req,res) {
    let data = await zone.getDetailById(req.params.zoneId).catch((error) => {
        return { error }
    })

    if (!data || (data && data.error)) {
        let error = (data && data.error) ? data.error : "Internal Server Error";
        let status = (data && data.status) ? data.status : 500;
        return res.status(status).send({ error })
    }
    return res.send({ data: data.data })  
}

async function updateZone(req, res) {
    let data = await zone.updateZone(req.params.zoneId, req.body, req.adminData).catch((error) => { return { error } })
    if (!data || (data && data.error)) {
        let error = (data && data.error) ? data.error : "internal server error";
        let status = (data && data.status) ? data.status : 500;
        return res.status(status).send({ error })
    }
    return res.send({ status: "Zone Updated successfully" })
}

async function deleteZone(req, res) {
    let data = await zone.deleteZone(req.params.zoneId).catch((error) => { return { error } })
    console.log("delete zone",data);
    if (!data || (data && data.error)) {
        let error = (data && data.error) ? data.error : "internal server error";
        let status = (data && data.status) ? data.status : 500;
        return res.status(status).send({ error })
    }
    return res.send({ status: "zone is successfully Deleteed" })
}


module.exports={createZone,getAllZone,getDetailById,updateZone,deleteZone}