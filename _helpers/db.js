const config = require('../config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {}

initialize();

async function initialize() {
    const { host, port, user, password, database } = config.database;
    console.log('Now create mysql connection');
    const connection = await mysql.createConnection({ host, port, user, password });
    console.log('Created mysql connection: ' + `CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    console.log('Query');

    const sequelize = new Sequelize(database, user, password, {dialect: 'mysql'});

    db.User = require('../users/user.model')(sequelize);

    await sequelize.sync({ alter: true });
}