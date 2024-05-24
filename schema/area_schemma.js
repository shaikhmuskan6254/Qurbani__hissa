let {sequelizeCon,Model,DataTypes,Op}=require("../init/dbConfig");

class Area extends Model{ }

Area.init({   
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    areaName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    areaZoneName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    areaManagerName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    areaManagerEmail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    areaManagerPhone: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    areaManagerUsername: {
        type: DataTypes.STRING,
        allowNull: false
    },
    areaManagerPassword: {
        type: DataTypes.STRING,
        allowNull: false
    },
    areaManagerPhoto: {
        type: DataTypes.STRING // Assuming it stores the file path or URL
    },
    areaManagerAadharNumber: {
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
},{tableName:"area",modelName:"Area",sequelize:sequelizeCon});
// Area.sync();
module.exports={Area}
