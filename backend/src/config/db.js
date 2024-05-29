const { Sequelize } = require('sequelize');

const db = new Sequelize({
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST || "localhost",
  username: process.env.POSTGRES_USER || "pg",
  password: process.env.POSTGRES_PASSWORD || "12345678",
  database: process.env.POSTGRES_DB || "todolist",
  port: process.env.POSTGRES_PORT || 5432,
});

const testDb = async () => {
    try {
        await db.authenticate();
        db.sync();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testDb();

module.exports = db;
