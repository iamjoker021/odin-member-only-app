const pool = require('./pool');

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  membership_status VARCHAR(255) NOT NULL DEFAULT 'member'
);

CREATE TABLE IF NOT EXISTS message (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(30) NOT NULL,
  text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
`;

async function initalizeData() {
    console.log("seeding...");
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await client.query(SQL);
      await client.query('COMMIT');
      console.log('Data added success');
    }
    catch (e) {
      await client.query('ROLLBACK');
      console.log('Data added failed');
      throw e;
    }
    finally {
      client.release();
    }
}

initalizeData();