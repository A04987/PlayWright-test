const express = require('express');
const router = express.Router();

/**
 * POST /api/sales-area
 * create sales area
 */
router.post('/', async (req, res) => { 
  try{
    const { name, code, status = true } = req.body;

    //ตรสวจสอบข้อมูล
    if(!name || !code){
      return  res.status(400).json({ message: 'Name and Code are required.' });
    }

    // ตรวจสอบข้อมูลซ้ำ
    // สมมติว่าเรามีฟังก์ชัน checkDuplicateSalesArea ที่ตรวจสอบข้อมูลซ้ำ
    const isDuplicate = false; // await checkDuplicateSalesArea(name, code);
    if(isDuplicate){
      return res.status(409).json({ message: 'Sales Area with the same name or code already exists.' });
    }

    // บันทึกข้อมูลลงฐานข้อมูล
    const newSalesArea = { id: Date.now(), name, code, status };
  } catch (error) {
    console.error('Error creating sales area:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;