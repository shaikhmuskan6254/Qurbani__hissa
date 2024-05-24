let express=require("express");
let router=express.Router();
let superAdmin_controller=require("./controller/super_Admin_Controller");
let zoneController=require("./controller/zone")
let userController=require("./controller/user__Controller")
let areaController=require("./controller/area")

let auth=require("./middlewere/adminAuthMiddlewere")


router.get("/",(req,res)=>{
    return res.send("welcome to lazeez foods");
})


//Super Admin Relatede Api's
router.post("/register",superAdmin_controller.register);
router.post("/login",superAdmin_controller.login);

// user relatted api
router.post('/users',auth, userController.createuser);
router.put("/user/:userId",auth,userController.updateUser);
router.get("/users/list",auth,userController.getAllUsers);
router.get("/user/:userId",auth,userController.getDetailById);
router.delete('/user/:userId', userController.deleteUser);

// zone related Apis
router.post('/zones',auth, zoneController.createZone);
router.put("/zone/:zoneId",auth,zoneController.updateZone);
router.get("/zones/list",auth,zoneController.getAllZone);
router.get("/zone/:zoneId",auth,zoneController.getDetailById);
router.delete('/zone/:zoneId', zoneController.deleteZone);

// Area related Apis
router.post('/area',auth, areaController.createArea);
router.put("/area/:areaId",auth,areaController.updateArea);
router.get("/area/list",auth,areaController.getAllArea);
router.get("/area/:areaId",auth,areaController.getDetailById);
router.delete('/area/:areaId', areaController.deleteArea);






// Create a new area
// router.post('/zones',auth, zoneController.createZone);
// Get all zones
// router.get('/zones', zoneController.getAllZones);
// // Get details of a specific zone
// router.get('/zones/:id', zoneController.getZoneById);
// Update details of a zone
// router.put('/zones/:id',auth, zoneController.updateZone);
// // Delete a zone
// router.delete('/zones/:id', zoneController.deleteZone);

module.exports=router
