let {sequelizeCon,Model,DataTypes,Op}=require("../init/dbConfig");

class User extends Model{ }

User.init({   
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    areaName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    areaManagerName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    appUserName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    appUserPhone: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    appUserEmail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    appLogin: {
        type: DataTypes.STRING,
        allowNull: false
    },
    appPassword: {
        type: DataTypes.STRING,
        allowNull: false
    },
    areaUserPhoto: {
        type: DataTypes.STRING // Assuming it stores the file path or URL
    },
    appUserAadharNumber: {
        type: DataTypes.STRING // Assuming it's a string for Aadhar number
    },
    optionalColumn1: {
        type: DataTypes.STRING
    },
    optionalColumn2: {
        type: DataTypes.STRING
    },
    optionalColumn3: {
        type: DataTypes.STRING
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
},{tableName:"user",modelName:"User",sequelize:sequelizeCon});
// User.sync();
module.exports={User}