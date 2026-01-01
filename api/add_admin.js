import { query } from "./db.js";

const upgradeSchema = async () => {
  try {
    console.log("Adding role column...");
    await query(
      "ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'user';"
    );

    console.log("Seeding Admin User...");
    const adminPhone = "0999999999";
    // Check if admin exists
    const check = await query("SELECT * FROM users WHERE phone = $1", [
      adminPhone,
    ]);
    if (check.rows.length === 0) {
      await query(
        "INSERT INTO users (id, name, phone, password, role, points, tier) VALUES ($1, $2, $3, $4, $5, 0, 'Diamond')",
        ["admin_01", "Quản trị viên", adminPhone, "admin123", "admin"]
      );
      console.log("Admin user created: 0999999999 / admin123");
    } else {
      console.log("Admin user already exists.");
    }
  } catch (err) {
    console.error("Error:", err);
  } finally {
    process.exit();
  }
};

upgradeSchema();
