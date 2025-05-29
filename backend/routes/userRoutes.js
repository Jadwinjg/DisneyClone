// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db'); 

router.get('/:id', (req, res) => {
  const userId = req.params.id;
  db.query('SELECT id, name, email FROM users WHERE id = ?', [userId], (err, result) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(result[0]);
  });
});

module.exports = router;
