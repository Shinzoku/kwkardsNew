import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from './UserModel.js';
import UserKard from './User_kardModel.js';

const { DataTypes } = Sequelize;

const Kard = db.define('kard',{
    nom:{
        type: DataTypes.STRING(190),
        allowNull: false,
    },
    rare:{
        type: DataTypes.STRING(190),
        allowNull: false,
    },
    valeur:{
        type: DataTypes.INTEGER(11),
        allowNull: false,
    },
    image:{
        type: DataTypes.STRING(190),
        allowNull: false,
    },
},{ 
    timestamps: false 
},{
    freezeTableName:true
});

Kard.belongsToMany(User, { through: UserKard });

// (async () => {
//     await db.sync();
// })();

export default Kard;