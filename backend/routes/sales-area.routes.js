const express = require('express');
const router = express.Router();

// mock database
const salesAreas = [];

/**
 * POST /api/sales-area
 * create sales area
 */
router.post('/', (req, res) => {
  const { name, code, status = true } = req.body;

  // validation
  if (!name || !code) {
    return res.status(400).json({
      message: 'name and code are required'
    });
  }

  // duplicate check
  const isDuplicate = salesAreas.find(sa => sa.code === code);
  if (isDuplicate) {
    return res.status(409).json({
      message: 'sales area code already exists'
    });
  }

  const newSalesArea = {
    id: salesAreas.length + 1,
    name,
    code,
    status
  };

  salesAreas.push(newSalesArea);

  return res.status(201).json(newSalesArea);
});

module.exports = router;
