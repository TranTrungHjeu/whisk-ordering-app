import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { query } from "./db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Get all categories
app.get("/api/categories", async (req, res) => {
  try {
    const result = await query("SELECT * FROM categories ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        p.id, p.name, p.description, p.price, p.image, 
        p.category_id as "categoryId",
        p.sizes, p.toppings,
        p.is_popular as "isPopular",
        p.is_new as "isNew",
        c.name as "categoryName", 
        c.icon as "categoryIcon",
        c.id as "category"
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.id ASC
    `);

    // Quick Fix: I'll use the category NAME or inferred slug.
    // Actually, checking seed.js:
    // { id: 'signature', name: 'Signature', ... }
    // I inserted (name, icon).
    // I should have added a 'slug' or 'key' column to categories table to keep the 'signature' identifier.
    // Or I can just filter by numeric ID on frontend now?
    // Frontend Home.jsx uses string IDs "all", "signature", etc.
    // I should probably update the DB schema to include a "slug" or "code" column.

    // For now, I will modify the query to return what we have.
    // I'll likely need to update schema to persist the 'id' string from mock data as a 'slug'.

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get single product by ID
app.get("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query(
      `
      SELECT 
        p.id, p.name, p.description, p.price, p.image, 
        p.category_id as "categoryId",
        p.sizes, p.toppings,
        p.is_popular as "isPopular",
        p.is_new as "isNew",
        c.name as "categoryName", 
        c.icon as "categoryIcon"
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = $1
    `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Create an order
app.post("/api/orders", async (req, res) => {
  const { userId, totalAmount, items } = req.body;

  try {
    // Start transaction (simple version without explicit BEGIN/COMMIT for now, just logical steps)

    // 1. Create Order
    const orderResult = await query(
      "INSERT INTO orders (user_id, total_amount, status) VALUES ($1, $2, $3) RETURNING id",
      [userId || "guest", totalAmount, "pending"]
    );
    const orderId = orderResult.rows[0].id;

    // 2. Create Order Items
    for (const item of items) {
      await query(
        `INSERT INTO order_items (order_id, product_id, product_name, quantity, price, size, toppings)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          orderId,
          item.productId,
          item.name,
          item.quantity,
          item.price,
          item.size,
          JSON.stringify(item.toppings),
        ]
      );
    }

    res.status(201).json({ message: "Order created", orderId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create order" });
  }
});

app.get("/", (req, res) => {
  res.send("WHISK Ordering App API is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
