-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  icon VARCHAR(255) NOT NULL
);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  image VARCHAR(255),
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  sizes JSONB DEFAULT '[]', -- Store sizes as JSON array eg: [{"name": "M", "price": 10000}]
  toppings JSONB DEFAULT '[]', -- Store toppings as JSON array
  is_popular BOOLEAN DEFAULT FALSE,
  is_new BOOLEAN DEFAULT FALSE
);

-- Users Table (Simplified for demo)
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(255) PRIMARY KEY, -- Can use Auth provider ID or UUID
  name VARCHAR(255),
  phone VARCHAR(20),
  points INTEGER DEFAULT 0,
  tier VARCHAR(50) DEFAULT 'Silver',
  member_since DATE DEFAULT CURRENT_DATE
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) REFERENCES users(id) ON DELETE SET NULL,
  total_amount INTEGER NOT NULL,
  points_earned INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'pending', -- pending, completed, cancelled
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id),
  product_name VARCHAR(255) NOT NULL, -- Cache name in case product changes
  quantity INTEGER NOT NULL,
  price INTEGER NOT NULL, -- Price at time of order
  size VARCHAR(50),
  toppings JSONB DEFAULT '[]'
);

-- Seed Data (Optional - just for initial population if tables empty)
INSERT INTO categories (name, icon) VALUES 
('Signature', 'receptionBell'),
('Đặc biệt', 'coffeeMachine'),
('Frappe', 'coldCoffeeCup'),
('Trà', 'coffeeCup'),
('Bánh ngọt', 'chocolateCake'),
('Tất cả', 'coffeeMenu')
ON CONFLICT DO NOTHING;
