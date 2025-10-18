import { Client } from 'pg';

export async function ensureDatabaseExists() {
  const client = new Client({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'postgres', // connect to default db first
  });

  const targetDb = process.env.DB_DATABASE;

  try {
    await client.connect();
    const res = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = '${targetDb}'`
    );

    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE "${targetDb}"`);
      console.log(`✅ Database "${targetDb}" created successfully.`);
    } else {
      console.log(`🟢 Database "${targetDb}" already exists.`);
    }
  } finally {
    await client.end();
  }
}
