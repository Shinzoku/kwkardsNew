import { Sequelize } from "sequelize";

const db = new Sequelize('kwkards', 'kwkards', '123', {
    host: "localhost",
    dialect: "mysql"
});

export default db;