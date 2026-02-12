// src/database/init.ts

import { createDatabaseConnection } from './database';

export async function initDatabase() {
  const db = await createDatabaseConnection();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL
    )
  `);
}
