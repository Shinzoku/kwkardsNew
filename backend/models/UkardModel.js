import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Ukards = db.define('totoukard',{
    UserID:{
        type: DataTypes.STRING
    },
    KardID:{
        type: DataTypes.STRING
    },
    infirmary:{
        type: DataTypes.STRING
    },
    market:{
        type: DataTypes.STRING
    },
    moral:{
        type: DataTypes.STRING
    }
},{
    freezeTableName:true
});

(async () => {
    await db.sync();
})();

export default Ukards;