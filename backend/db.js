// db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'swapna',
  password: 'password',
  port: 5432,
});

const seedDatabase = async () => {
  try {
    const client = await pool.connect();
    const query = `
      INSERT INTO customers (customer_name, age, phone, location)
      VALUES ($1, $2, $3, $4)
    `;
    for (let i = 1; i <= 50; i++) {
      await client.query(query, [`Customer ${i}`, 20 + i, `123456789${i}`, `Location ${i}`]);
    }
    client.release();
    console.log('Database seeded successfully');
  } catch (err) {
    console.error('Error seeding database:', err);
  }
};

seedDatabase();

module.exports = pool;
