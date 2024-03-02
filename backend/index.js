// index.js
const express = require('express');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/api/customers', async (req, res) => {
  try {
    const { name, location, sort } = req.query;
    let query = 'SELECT * FROM customers';
    if (name) query += ` WHERE customer_name ILIKE '%${name}%'`;
    if (location) {
      if (name) query += ' AND';
      else query += ' WHERE';
      query += ` location ILIKE '%${location}%'`;
    }
    if (sort === 'date') query += ' ORDER BY created_at';
    else if (sort === 'time') query += ' ORDER BY created_at::time';
    const response = await pool.query(query);
    res.json(response.rows);
  } catch (err) {
    console.error('Error fetching customers:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
