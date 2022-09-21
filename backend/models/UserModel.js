import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const User = db.define('user',{
    pseudo:{
        type: DataTypes.STRING(190),
        allowNull: false,
        unique: true
    },
    email:{
        type: DataTypes.STRING(190),
        allowNull: false,
    },
    password:{
        type: DataTypes.STRING(190),
        allowNull: false,
    },
    date:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    parrain:{
        type: DataTypes.STRING(190),
        allowNull: true,
    },
    level:{
        type: DataTypes.INTEGER(11),
        defaultValue: 0,
    },
    xp:{
        type: DataTypes.INTEGER(11),
        defaultValue: 0,
    },
    koins:{
        type: DataTypes.INTEGER(11),
        defaultValue: 0,
    },
    event:{
        type: DataTypes.INTEGER(11),
        defaultValue: 0,
    },
    claw:{
        type: DataTypes.INTEGER(11),
        defaultValue: 1,
    },
    king:{
        type: DataTypes.INTEGER(11),
        defaultValue: 0,
    },
    exchange:{
        type: DataTypes.INTEGER(11),
        defaultValue: 0,
    },
    logoutWin:{
        type: DataTypes.INTEGER(11),
        allowNull: true,
    },
    winsVsIA:{
        type: DataTypes.INTEGER(11),
        allowNull: true,
    },
    rewardLevel:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    infirmary:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    fridays:{
        type: DataTypes.STRING(190),
        defaultValue: 'NNNNNNNNNN',
    },
    refresh_token:{
        type: DataTypes.TEXT
    },  
},{ 
    timestamps: false 
},{
    freezeTableName:true
});

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

const UserKard = db.define('user_kard',
{},
{
    timestamps: false
});

User.belongsToMany(Kard, { through: UserKard });
Kard.belongsToMany(User, { through: UserKard });

(async () => {
    await User.sync();
    await Kard.sync();
    await UserKard.sync();
})();

export default User;