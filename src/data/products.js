// Mock products and categories have been replaced by backend API

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
