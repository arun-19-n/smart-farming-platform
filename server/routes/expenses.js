const express = require('express');
const router = express.Router();
const { dbUtils } = require('../db');
const { generateId, authMiddleware } = require('../auth');

// Add expense
router.post('/', authMiddleware, async (req, res) => {
  try {
    const expenseId = generateId();
    const { farm_id, category, amount, description, expense_date, crop_related } = req.body;

    await dbUtils.run(
      `INSERT INTO expenses (id, farm_id, farmer_id, category, amount, description, expense_date, crop_related)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [expenseId, farm_id, req.userId, category, amount, description, expense_date, crop_related]
    );

    const expense = await dbUtils.get(
      'SELECT * FROM expenses WHERE id = ?',
      [expenseId]
    );

    res.status(201).json(expense);
  } catch (error) {
    console.error('Create expense error:', error);
    res.status(500).json({ error: 'Failed to create expense' });
  }
});

// Get expenses for farm
router.get('/farm/:farmId', authMiddleware, async (req, res) => {
  try {
    const expenses = await dbUtils.all(
      'SELECT * FROM expenses WHERE farm_id = ? ORDER BY expense_date DESC',
      [req.params.farmId]
    );

    res.json(expenses);
  } catch (error) {
    console.error('Get expenses error:', error);
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
});

module.exports = router;
