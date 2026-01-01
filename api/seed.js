import { query } from "./db.js";

const seed = async () => {
  try {
    console.log("Seeding database...");

    // 1. Clear existing data (optional, but good for idempotent runs)
    await query("DELETE FROM order_items");
    await query("DELETE FROM orders");
    await query("DELETE FROM products");
    await query("DELETE FROM categories");

    // 2. Insert Categories
    // Note: We store the "icon key" identifying the icon in the assets folder
    const categoriesData = [
      { id: "all", name: "Tất cả", icon: "coffeeMenu" },
      { id: "signature", name: "Signature", icon: "receptionBell" },
      { id: "specialty", name: "Đặc biệt", icon: "coffeeMachine" },
      { id: "frappe", name: "Frappe", icon: "coldCoffeeCup" },
      { id: "tea", name: "Trà", icon: "coffeeCup" },
      { id: "dessert", name: "Bánh ngọt", icon: "chocolateCake" },
    ];

    // Using a map to keep track of DB IDs for referencing in products
    const categoryIds = {};

    for (const cat of categoriesData) {
      // We manually insert keys or let SERIAL handle it?
      // The schema uses SERIAL for ID, but we want to map "signature" string to an ID.
      // For simplicity in this mock-to-real transition, I'll let SERIAL generate IDs
      // and finding the ID by checking what we inserted is complicated without returning it.
      // So I will insert and return ID.

      const res = await query(
        "INSERT INTO categories (name, icon) VALUES ($1, $2) RETURNING id",
        [cat.name, cat.icon]
      );
      // Map the "string id" from mock data (e.g. 'signature') to the real numeric DB ID
      categoryIds[cat.id] = res.rows[0].id;
      console.log(`Inserted category: ${cat.name} -> ID: ${res.rows[0].id}`);
    }

    // 3. Insert Products
    const productsData = [
      {
        name: "Classic Matcha Latte",
        description:
          "Trà xanh matcha Nhật Bản pha với sữa tươi, hương vị đậm đà, cân bằng hoàn hảo",
        price: 55000,
        image:
          "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400&h=400&fit=crop",
        category: "signature", // key from mock data
        sizes: [
          { name: "S", price: 0 },
          { name: "M", price: 10000 },
          { name: "L", price: 15000 },
        ],
        toppings: [
          { name: "Trân châu", price: 10000 },
          { name: "Thạch dừa", price: 8000 },
          { name: "Cream cheese", price: 15000 },
        ],
        isPopular: true,
      },
      {
        name: "Iced Matcha Espresso",
        description:
          "Matcha kết hợp espresso đậm, sữa tươi, đá xay - Sự giao thoa hoàn hảo",
        price: 65000,
        image:
          "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400&h=400&fit=crop",
        category: "signature",
        sizes: [
          { name: "S", price: 0 },
          { name: "M", price: 10000 },
          { name: "L", price: 15000 },
        ],
        toppings: [
          { name: "Trân châu", price: 10000 },
          { name: "Shot espresso", price: 12000 },
        ],
        isPopular: true,
      },
      {
        name: "Matcha Oat Milk",
        description:
          "Matcha cao cấp kết hợp sữa yến mạch, phù hợp người ăn chay",
        price: 60000,
        image:
          "https://images.unsplash.com/photo-1593480088038-c18b98ffd36c?w=400&h=400&fit=crop",
        category: "specialty",
        sizes: [
          { name: "S", price: 0 },
          { name: "M", price: 10000 },
          { name: "L", price: 15000 },
        ],
        toppings: [
          { name: "Thạch dừa", price: 8000 },
          { name: "Chia seed", price: 10000 },
        ],
        isNew: true,
      },
      {
        name: "Matcha Frappe",
        description:
          "Matcha đá xay mát lạnh với whipped cream, hoàn hảo cho mùa hè",
        price: 70000,
        image:
          "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=400&h=400&fit=crop",
        category: "frappe",
        sizes: [
          { name: "M", price: 0 },
          { name: "L", price: 10000 },
        ],
        toppings: [
          { name: "Whipped cream", price: 10000 },
          { name: "Chocolate drizzle", price: 8000 },
        ],
        isPopular: true,
        isNew: true,
      },
      {
        name: "Hojicha Latte",
        description:
          "Trà xanh rang Hojicha với hương vị caramel tự nhiên, ấm áp",
        price: 55000,
        image:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop",
        category: "tea",
        sizes: [
          { name: "S", price: 0 },
          { name: "M", price: 10000 },
          { name: "L", price: 15000 },
        ],
        toppings: [
          { name: "Trân châu", price: 10000 },
          { name: "Thạch dừa", price: 8000 },
        ],
      },
      {
        name: "Matcha Cheesecake",
        description: "Bánh phô mai matcha mềm mịn, phủ bột matcha Nhật Bản",
        price: 65000,
        image:
          "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=400&fit=crop",
        category: "dessert",
        sizes: [],
        toppings: [],
        isNew: true,
      },
      {
        name: "Matcha Tiramisu",
        description:
          "Tiramisu đặc biệt với lớp matcha cream, mascarpone béo ngậy",
        price: 75000,
        image:
          "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=400&fit=crop",
        category: "dessert",
        sizes: [],
        toppings: [],
      },
      {
        name: "Sencha Green Tea",
        description:
          "Trà xanh Sencha Nhật Bản nguyên chất, thanh mát sảng khoái",
        price: 45000,
        image:
          "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop",
        category: "tea",
        sizes: [
          { name: "S", price: 0 },
          { name: "M", price: 8000 },
          { name: "L", price: 12000 },
        ],
        toppings: [{ name: "Mật ong", price: 5000 }],
      },
    ];

    for (const prod of productsData) {
      const categoryId = categoryIds[prod.category];
      if (!categoryId) {
        console.warn(
          `Category not found for product: ${prod.name} (cat: ${prod.category})`
        );
        continue;
      }

      await query(
        `INSERT INTO products 
        (name, description, price, image, category_id, sizes, toppings, is_popular, is_new)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          prod.name,
          prod.description,
          prod.price,
          prod.image,
          categoryId,
          JSON.stringify(prod.sizes),
          JSON.stringify(prod.toppings),
          prod.isPopular || false,
          prod.isNew || false,
        ]
      );
      console.log(`Inserted product: ${prod.name}`);
    }

    console.log("Seeding completed successfully.");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
};

seed();
