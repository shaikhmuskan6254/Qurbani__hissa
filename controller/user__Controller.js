let user=require("../model/user");

async function createuser(req,res){
    let data = await user.createUser(req.body,req.adminData).catch((error)=>{return {error}})

    if (!data || (data && data.error)) {
        let error = (data && data.error) ? data.error : "internal server error";
        let status = (data && data.status) ? data.status : 500;
        return res.status(status).send({ error })
    }
    return res.send(data)
}
async function getAllUsers(req, res) {
    let data = await user.getAllUsers().catch((error) => { return { error } })
    
    if (!data || (data && data.error)) {
        let error = (data && data.error) ? data.error : "internal server error";
        let status = (data && data.status) ? data.status : 500;
        return res.status(status).send({ error })
    }
    return res.send(data)
}

async function getDetailById(req,res) {
    let data = await user.getDetailById(req.params.userId).catch((error) => {
        return { error }
    })

    if (!data || (data && data.error)) {
        let error = (data && data.error) ? data.error : "Internal Server Error";
        let status = (data && data.status) ? data.status : 500;
        return res.status(status).send({ error })
    }
    return res.send({ data: data.data })  
}

async function updateUser(req, res) {
    let data = await user.updateUser(req.params.userId, req.body, req.adminData).catch((error) => { return { error } })
    console.log("uppdate user",data);
    if (!data || (data && data.error)) {
        let error = (data && data.error) ? data.error : "internal server error";
        let status = (data && data.status) ? data.status : 500;
        return res.status(status).send({ error })
    }
    return res.send({ status: "User Updated successfully" })
}

async function deleteUser(req, res) {
    let data = await user.deleteUser(req.params.userId).catch((error) => { return { error } })
    console.log("uppdate user",data);
    if (!data || (data && data.error)) {
        let error = (data && data.error) ? data.error : "internal server error";
        let status = (data && data.status) ? data.status : 500;
        return res.status(status).send({ error })
    }
    return res.send({ status: "User Deleteed" })
}


module.exports={createuser,getAllUsers,getDetailById,updateUser,deleteUser}