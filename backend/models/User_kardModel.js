import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from './UserModel.js';
import Kard from './KardModel.js';

const { DataTypes } = Sequelize;

const UserKard = db.define('user_kard',{
    id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
},{
    timestamps: false
});

export default UserKard;