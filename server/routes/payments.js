const express = require('express');
const router = express.Router();
const { dbUtils } = require('../db');
const { generateId, authMiddleware } = require('../auth');

// Add payment
router.post('/', authMiddleware, async (req, res) => {
  try {
    const paymentId = generateId();
    const {
      farm_id,
      crop_sold,
      quantity,
      buyer_name,
      amount_received,
      pending_amount,
      payment_status,
      sale_date,
    } = req.body;

    await dbUtils.run(
      `INSERT INTO payments (id, farm_id, farmer_id, crop_sold, quantity, buyer_name, amount_received, pending_amount, payment_status, sale_date)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        paymentId,
        farm_id,
        req.userId,
        crop_sold,
        quantity,
        buyer_name,
        amount_received,
        pending_amount,
        payment_status,
        sale_date,
      ]
    );

    const payment = await dbUtils.get(
      'SELECT * FROM payments WHERE id = ?',
      [paymentId]
    );

    res.status(201).json(payment);
  } catch (error) {
    console.error('Create payment error:', error);
    res.status(500).json({ error: 'Failed to create payment' });
  }
});

// Get payments for farm
router.get('/farm/:farmId', authMiddleware, async (req, res) => {
  try {
    const payments = await dbUtils.all(
      'SELECT * FROM payments WHERE farm_id = ? ORDER BY sale_date DESC',
      [req.params.farmId]
    );

    res.json(payments);
  } catch (error) {
    console.error('Get payments error:', error);
    res.status(500).json({ error: 'Failed to fetch payments' });
  }
});

module.exports = router;
