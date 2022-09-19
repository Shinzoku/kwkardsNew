import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Kards = db.define('totokard',{
    nom:{
        type: DataTypes.STRING
    },
    rare:{
        type: DataTypes.STRING
    },
    valeur:{
        type: DataTypes.STRING
    },
    image:{
        type: DataTypes.STRING
    },
    price:{
        type: DataTypes.STRING
    }
},{
    freezeTableName:true
});

(async () => {
    await db.sync();
})();

export default Kards;