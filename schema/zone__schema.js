let {sequelizeCon,Model,DataTypes,Op}=require("../init/dbConfig");

class Zone extends Model{ }

Zone.init({   
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    zoneName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    zoneManagerName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    zoneManagerEmail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    zoneManagerPhone: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    zoneManagerUsername: {
        type: DataTypes.STRING,
        allowNull: false
    },
    zoneManagerPassword: {
        type: DataTypes.STRING,
        allowNull: false
    },
    zoneManagerPhoto: {
        type: DataTypes.STRING // Assuming it stores the file path or URL
    },
    zoneManagerAadharNumber: {
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
},{tableName:"zone",modelName:"Zone",sequelize:sequelizeCon});
// Zone.sync();
module.exports={Zone}
