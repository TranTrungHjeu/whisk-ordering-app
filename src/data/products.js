// Mock products data for WHISK
export const products = [
  {
    id: 1,
    name: "Classic Matcha Latte",
    description:
      "Trà xanh matcha Nhật Bản pha với sữa tươi, hương vị đậm đà, cân bằng hoàn hảo",
    price: 55000,
    image:
      "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400&h=400&fit=crop",
    category: "signature",
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
    id: 2,
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
    id: 3,
    name: "Matcha Oat Milk",
    description: "Matcha cao cấp kết hợp sữa yến mạch, phù hợp người ăn chay",
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
    id: 4,
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
  },
  {
    id: 5,
    name: "Hojicha Latte",
    description: "Trà xanh rang Hojicha với hương vị caramel tự nhiên, ấm áp",
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
    id: 6,
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
    id: 7,
    name: "Matcha Tiramisu",
    description: "Tiramisu đặc biệt với lớp matcha cream, mascarpone béo ngậy",
    price: 75000,
    image:
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=400&fit=crop",
    category: "dessert",
    sizes: [],
    toppings: [],
  },
  {
    id: 8,
    name: "Sencha Green Tea",
    description: "Trà xanh Sencha Nhật Bản nguyên chất, thanh mát sảng khoái",
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

export const categories = [
  { id: "all", name: "Tất cả", icon: "Grid3X3" },
  { id: "signature", name: "Signature", icon: "Star" },
  { id: "specialty", name: "Đặc biệt", icon: "Sparkles" },
  { id: "frappe", name: "Frappe", icon: "IceCream" },
  { id: "tea", name: "Trà", icon: "Leaf" },
  { id: "dessert", name: "Bánh ngọt", icon: "Cake" },
];

export const userMock = {
  id: "user123",
  name: "Minh Anh",
  phone: "0912345678",
  points: 2450,
  tier: "Gold",
  tierProgress: 75,
  nextTier: "Platinum",
  pointsToNextTier: 550,
  totalOrders: 28,
  memberSince: "2025-03-15",
};

export const rewards = [
  {
    id: 1,
    name: "Giảm 20K",
    pointsRequired: 500,
    description: "Giảm 20,000đ cho đơn từ 100K",
  },
  {
    id: 2,
    name: "Free Size Up",
    pointsRequired: 300,
    description: "Miễn phí nâng size M lên L",
  },
  {
    id: 3,
    name: "Free Topping",
    pointsRequired: 200,
    description: "Tặng 1 topping bất kỳ",
  },
  {
    id: 4,
    name: "Matcha Free",
    pointsRequired: 1500,
    description: "Tặng 1 Classic Matcha Latte",
  },
];

export const orderHistory = [
  {
    id: "ORD001",
    date: "2025-12-28",
    items: [{ name: "Classic Matcha Latte", size: "M", quantity: 2 }],
    total: 130000,
    pointsEarned: 130,
    status: "completed",
  },
  {
    id: "ORD002",
    date: "2025-12-25",
    items: [
      { name: "Matcha Frappe", size: "L", quantity: 1 },
      { name: "Matcha Cheesecake", quantity: 1 },
    ],
    total: 145000,
    pointsEarned: 145,
    status: "completed",
  },
];
