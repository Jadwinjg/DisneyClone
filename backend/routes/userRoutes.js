const express = require('express');
const router = express.Router();
const pool = require('../db');  // your PostgreSQL pool

router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await pool.query('SELECT id, name, email FROM users WHERE id = $1', [userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
