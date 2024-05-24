let area=require("../model/area");


async function createArea(req,res){
    let data = await area.createArea(req.body,req.adminData).catch((error)=>{return {error}})
    console.log("create user controller",data);
    if (!data || (data && data.error)) {
        let error = (data && data.error) ? data.error : "internal server error";
        let status = (data && data.status) ? data.status : 500;
        return res.status(status).send({ error })
    }
    return res.send(data)
}
async function getAllArea(req, res) {
    let data = await area.getAllArea().catch((error) => { return { error } })
    
    if (!data || (data && data.error)) {
        let error = (data && data.error) ? data.error : "internal server error";
        let status = (data && data.status) ? data.status : 500;
        return res.status(status).send({ error })
    }
    return res.send(data)
}

async function getDetailById(req,res) {
    let data = await area.getDetailById(req.params.areaId).catch((error) => {
        return { error }
    })

    if (!data || (data && data.error)) {
        let error = (data && data.error) ? data.error : "Internal Server Error";
        let status = (data && data.status) ? data.status : 500;
        return res.status(status).send({ error })
    }
    return res.send({ data: data.data })  
}

async function updateArea(req, res) {
    let data = await area.updateArea(req.params.areaId, req.body, req.adminData).catch((error) => { return { error } })
    if (!data || (data && data.error)) {
        let error = (data && data.error) ? data.error : "internal server error";
        let status = (data && data.status) ? data.status : 500;
        return res.status(status).send({ error })
    }
    return res.send({ status: "area Updated successfully" })
}

async function deleteArea(req, res) {
    let data = await area.deleteArea(req.params.areaId).catch((error) => { return { error } })
    if (!data || (data && data.error)) {
        let error = (data && data.error) ? data.error : "internal server error";
        let status = (data && data.status) ? data.status : 500;
        return res.status(status).send({ error })
    }
    return res.send({ status: "area is successfully Deleteed" })
}


module.exports={createArea,getAllArea,getDetailById,updateArea,deleteArea}


