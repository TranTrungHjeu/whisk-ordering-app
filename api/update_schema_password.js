import { query } from "./db.js";

const updateSchema = async () => {
  try {
    console.log("Adding password column to users table...");
    await query(
      `ALTER TABLE users ADD COLUMN IF NOT EXISTS password VARCHAR(255);`
    );
    console.log("Schema updated successfully.");
  } catch (err) {
    console.error("Error updating schema:", err);
  } finally {
    process.exit();
  }
};

updateSchema();
