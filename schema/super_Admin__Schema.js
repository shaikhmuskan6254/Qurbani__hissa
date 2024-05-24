let {sequelizeCon,Model,DataTypes,Op}=require("../init/dbConfig");
let {User} = require("./user_schema");

class SuperAdmin extends Model{ }

SuperAdmin.init({   
    id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
    },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true
  },
  phone: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  optionalColumn1: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  optionalColumn2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  optionalColumn3: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue:true,
    allowNull: false,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue:false,
    allowNull: false,
  },
},{tableName:"superAdmin",modelName:"SuperAdmin",sequelize:sequelizeCon});
// SuperAdmin.sync();
module.exports={SuperAdmin}