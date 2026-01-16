const express = require('express');
const app = express();
const db = require('./models'); // สมมติว่ามีไฟล์ db.js สำหรับเชื่อมต่อฐานข้อมูล

app.use(express.json());

// import routes
const salesAreaRoutes = require('./routes/sales-area.routes');
app.use('/api/sales-area', salesAreaRoutes);

//เชื่อมต่อ sqlize และรัน server
//ถ้ามีตารางอยู่แล้วไม่ต้องลบ
db.sequelize.sync({force: false}).then(() => {
  app.listen(3000, () => {
    console.log('API running at http://localhost:3000');
  });
});