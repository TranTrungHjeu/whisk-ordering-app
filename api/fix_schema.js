import { query } from "./db.js";

const fixSchema = async () => {
  try {
    console.log("Attempting to add password column...");
    // Drop column if exists just to be safe (unlikely in this case but good for retry)
    // await query('ALTER TABLE users DROP COLUMN IF EXISTS password;');
    // Actually better not drop, just add.

    await query("ALTER TABLE users ADD COLUMN password VARCHAR(255);");
    console.log("SUCCESS: Password column added.");
  } catch (err) {
    console.error("ERROR adding column:", err.message);
  } finally {
    // Check again
    try {
      const result = await query(
        "SELECT column_name FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'password'"
      );
      if (result.rows.length > 0) {
        console.log("VERIFICATION: Password column EXISTS.");
      } else {
        console.log("VERIFICATION: Password column STILL MISSING.");
      }
    } catch (e) {
      console.error(e);
    }
    process.exit();
  }
};

fixSchema();
