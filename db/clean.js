const pool = require('../db/pool');

const SQL = `
DROP TABLE user CASCADE;
DROP TABLE message;
`;

async function initalizeData() {
    console.log("seeding...");
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await client.query(SQL);
      await client.query('COMMIT');
      console.log('Clean Database done');
    }
    catch (e) {
      await client.query('ROLLBACK');
      console.log('Clean Database Failed');
      throw e;
    }
    finally {
      client.release();
    }
}

initalizeData();