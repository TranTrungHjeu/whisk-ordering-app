import { query } from "./db.js";

const checkSchema = async () => {
  try {
    console.log("Checking users table schema...");
    const result = await query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'users';
    `);
    console.table(result.rows);
  } catch (err) {
    console.error("Error checking schema:", err);
  } finally {
    process.exit();
  }
};

checkSchema();
