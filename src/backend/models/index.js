const Sequelize = require('sequelize');

// สร้าง instance ของ Sequelize สำหรับเชื่อมต่อ Database
// ใช้ SQLite สำหรับทดสอบ
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:' // ใช้ in-memory database สำหรับทดสอบ
});

// import models
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// เพิ่ม models
db.SalesArea = require('./sales-area')(sequelize, Sequelize);

module.exports = db;
