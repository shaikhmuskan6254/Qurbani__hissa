const { Model } = require("sequelize");
let superAdmin_auth=require("../model/super_Admin")

async function register(req,res){
    let data=await superAdmin_auth.register(req.body).catch((error)=>{return{error}})
    console.log("data register",data);
    if (!data || (data && data.error)) {
        let error=(data && data.error) ? data.error:'internal server error';
        let status=(data && data.status) ? data.status:500;    

    return res.status(status).send({error})    

    }
    return res.send({data:data.data});
}

async function login(req,res) {
    let data = await superAdmin_auth.login(req.body).catch((error)=>{return{error}})
   
    if (!data || (data && data.error)) {
        let error = (data && data.error) ? data.error : "internal server error";
        let status = (data && data.status) ? data.status:500; 
        return res.status(status).send({error})
    }
    return res.header({"Access-Control-Expose-Headers":"token","token":data.token}).send({status:"success"})
}

module.exports={register,login}