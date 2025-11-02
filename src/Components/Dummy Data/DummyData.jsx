import {
  ShoppingCart,
  DollarSign,
  Package,
  Users,
  UtensilsCrossed,
  ShoppingBag,
  Clock,
} from "lucide-react";

export const mainStats = [
  {
    title: "Total Orders",
    value: "1,524",

    icon: <ShoppingCart size={20} />,
    bg: "bg-indigo-50",
    iconBg: "bg-indigo-600 text-white",
  },
  {
    title: "Total Sales",
    value: "Rs. 53,200",

    icon: <DollarSign size={20} />,
    bg: "bg-green-50",
    iconBg: "bg-green-600 text-white",
  },
  {
    title: "Avg Revenue",
    value: "Rs. 6,650",

    icon: <Package size={20} />,
    bg: "bg-orange-50",
    iconBg: "bg-orange-500 text-white",
  },
  {
    title: "Total Customers",
    value: "1,002",

    icon: <Users size={20} />,
    bg: "bg-blue-50",
    iconBg: "bg-blue-600 text-white",
  },
];

export const sideStats = [
  {
    title: "Confirmed Orders",
    value: "1,240",

    icon: <Package size={20} />,
    bg: "bg-purple-50",
    iconBg: "bg-purple-600 text-white",
  },
  {
    title: "Delivered Orders",
    value: "1,108",

    icon: <Package size={20} />,
    bg: "bg-teal-50",
    iconBg: "bg-teal-600 text-white",
  },
];

export const weeklyData = [
  { name: "Mon", revenue: 4200 },
  { name: "Tue", revenue: 3100 },
  { name: "Wed", revenue: 5400 },
  { name: "Thu", revenue: 2800 },
  { name: "Fri", revenue: 3900 },
  { name: "Sat", revenue: 2500 },
  { name: "Sun", revenue: 4600 },
];
// Monthly Data (4 weeks)
export const monthlyData = [
  { name: "Week 1", revenue: 15400 },
  { name: "Week 2", revenue: 18900 },
  { name: "Week 3", revenue: 17600 },
  { name: "Week 4", revenue: 20100 },
];
// Yearly Data (12 months)
export const yearlyData = [
  { name: "Jan", revenue: 62000 },
  { name: "Feb", revenue: 58000 },
  { name: "Mar", revenue: 73000 },
  { name: "Apr", revenue: 69000 },
  { name: "May", revenue: 81000 },
  { name: "Jun", revenue: 75000 },
  { name: "Jul", revenue: 87000 },
  { name: "Aug", revenue: 92000 },
  { name: "Sep", revenue: 86000 },
  { name: "Oct", revenue: 94000 },
  { name: "Nov", revenue: 99000 },
  { name: "Dec", revenue: 102000 },
];

export const weeklyOrdersData = [
  { name: "Mon", orders: 4200 },
  { name: "Tue", orders: 3100 },
  { name: "Wed", orders: 5400 },
  { name: "Thu", orders: 2800 },
  { name: "Fri", orders: 3900 },
  { name: "Sat", orders: 2500 },
  { name: "Sun", orders: 4600 },
];
// Monthly OrdersData (4 weeks)
export const monthlyOrdersData = [
  { name: "Week 1", orders: 15400 },
  { name: "Week 2", orders: 18900 },
  { name: "Week 3", orders: 17600 },
  { name: "Week 4", orders: 20100 },
];
// Yearly OrdersData (12 months)
export const yearlyOrdersData = [
  { name: "Jan", orders: 62000 },
  { name: "Feb", orders: 58000 },
  { name: "Mar", orders: 73000 },
  { name: "Apr", orders: 69000 },
  { name: "May", orders: 81000 },
  { name: "Jun", orders: 75000 },
  { name: "Jul", orders: 87000 },
  { name: "Aug", orders: 92000 },
  { name: "Sep", orders: 86000 },
  { name: "Oct", orders: 94000 },
  { name: "Nov", orders: 99000 },
  { name: "Dec", orders: 102000 },
];

export const topSellingData = [
  { name: "Zinger Burger", orders: 124, revenue: 38000, trend: 12 },
  { name: "Chicken Karahi", orders: 98, revenue: 147000, trend: 8 },
  { name: "Biryani Special", orders: 87, revenue: 130500, trend: 15 },
  { name: "Grilled Tikka", orders: 76, revenue: 91200, trend: 5 },
  { name: "Cheese Pizza", orders: 69, revenue: 82800, trend: 3 },
];

export const leastSellingData = [
  {
    id: 1,
    name: "Grilled Veggie Sandwich",
    image: "/biryani.jpeg",
    category: "Snacks",
    totalSold: 18,
    revenue: 2700,
  },
  {
    id: 2,
    name: "Mushroom Soup",
    image: "/burger.jpeg",
    category: "Soups",
    totalSold: 22,
    revenue: 3300,
  },
  {
    id: 3,
    name: "Peach Smoothie",
    image: "/pasta.jpeg",
    category: "Beverages",
    totalSold: 15,
    revenue: 1800,
  },
  {
    id: 4,
    name: "Tuna Salad",
    image: "/biryani.jpeg",
    category: "Salads",
    totalSold: 10,
    revenue: 2200,
  },
  {
    id: 5,
    name: "Mini Pancakes",
    image: "/burger.jpeg",
    category: "Desserts",
    totalSold: 8,
    revenue: 1500,
  },
];

export const ordersData = [
  {
    _id: "68e4d2d1f88bed1252f73ada",
    customerId: {
      _id: "68d41435249e35b03b99f873",
      name: "Zaid",
      phone: "21324354657",
    },
    orderItems: [
      {
        _id: "68e4d2d1f88bed1252f73ad8",
        restaurantId: "68e25ecb270f182b796220df",
        item: {
          _id: "68e25f1a270f182b796220e5",
          restaurantId: "68e25ecb270f182b796220df",
          name: "Banana Shake",
          price: 130,
          category: "Drinks",
          image:
            "https://res.cloudinary.com/dcnen6bor/image/upload/v1759665948/restaurant/menu-items/vvwtlqtybrc1zpizenfw.jpg",
        },
        quantity: 5,
        price: 650,
      },
    ],
    deliveryAddress: "Johar Town, Lahore",
    status: "pending",
    paymentStatus: "pending",
    paymentMethod: "card",
    totalPrice: 6650,
    totalItems: 5,
    timeAgo: "12 days ago",
  },
  {
    _id: "68e4cd095a9a775ea239c2df",
    customerId: {
      _id: "68d41435249e35b03b99f874",
      name: "Ali",
      phone: "32154687954",
    },
    orderItems: [
      {
        _id: "68e4cd095a9a775ea239c2dd",
        restaurantId: "68e25ecb270f182b796220df",
        item: {
          _id: "68e25f1a270f182b796220e6",
          restaurantId: "68e25ecb270f182b796220df",
          name: "Chicken Burger",
          price: 450,
          category: "Fast Food",
          image:
            "https://res.cloudinary.com/dcnen6bor/image/upload/v1759665949/restaurant/menu-items/chicken-burger.jpg",
        },
        quantity: 2,
        price: 900,
      },
    ],
    deliveryAddress: "Model Town, Lahore",
    status: "confirmed",
    paymentStatus: "paid",
    paymentMethod: "card",
    totalPrice: 900,
    totalItems: 2,
    timeAgo: "11 days ago",
  },
  {
    _id: "68e4c8ae5a9a775ea239c2d9",
    customerId: {
      _id: "68d41435249e35b03b99f875",
      name: "Hassan",
      phone: "30011223344",
    },
    orderItems: [
      {
        _id: "68e4c8ad5a9a775ea239c2d7",
        restaurantId: "68e25ecb270f182b796220df",
        item: {
          _id: "68e25f1a270f182b796220e7",
          restaurantId: "68e25ecb270f182b796220df",
          name: "Pepperoni Pizza",
          price: 1100,
          category: "Italian",
          image:
            "https://res.cloudinary.com/dcnen6bor/image/upload/v1759665950/restaurant/menu-items/pepperoni-pizza.jpg",
        },
        quantity: 1,
        price: 1100,
      },
    ],
    deliveryAddress: "DHA Phase 5, Lahore",
    status: "pending",
    paymentStatus: "pending",
    paymentMethod: "cash",
    totalPrice: 1100,
    totalItems: 1,
    timeAgo: "10 days ago",
  },
  {
    _id: "68e3ff0e13f18b73d081e260",
    customerId: {
      _id: "68d41435249e35b03b99f876",
      name: "Sara",
      phone: "30122334455",
    },
    orderItems: [
      {
        _id: "68e3ff0e13f18b73d081e25e",
        restaurantId: "68e25ecb270f182b796220df",
        item: {
          _id: "68e25f1a270f182b796220e8",
          restaurantId: "68e25ecb270f182b796220df",
          name: "French Fries",
          price: 250,
          category: "Snacks",
          image:
            "https://res.cloudinary.com/dcnen6bor/image/upload/v1759665951/restaurant/menu-items/french-fries.jpg",
        },
        quantity: 3,
        price: 750,
      },
    ],
    deliveryAddress: "Bahria Town, Lahore",
    status: "pending",
    paymentStatus: "pending",
    paymentMethod: "cash",
    totalPrice: 750,
    totalItems: 3,
    timeAgo: "13 days ago",
  },
  {
    _id: "68e2746d29294c0415e5de3e",
    customerId: {
      _id: "68d41435249e35b03b99f877",
      name: "Ahmed",
      phone: "30255667788",
    },
    orderItems: [
      {
        _id: "68e2746d29294c0415e5de3c",
        restaurantId: "68e25ecb270f182b796220df",
        item: {
          _id: "68e25f1a270f182b796220e9",
          restaurantId: "68e25ecb270f182b796220df",
          name: "Beef Steak",
          price: 1800,
          category: "Main Course",
          image:
            "https://res.cloudinary.com/dcnen6bor/image/upload/v1759665952/restaurant/menu-items/beef-steak.jpg",
        },
        quantity: 1,
        price: 1800,
      },
    ],
    deliveryAddress: "Gulberg 3, Lahore",
    status: "delivered",
    paymentStatus: "paid",
    paymentMethod: "card",
    totalPrice: 1800,
    totalItems: 1,
    timeAgo: "14 days ago",
  },
];

export const restaurant = {
  name: "SpiceHub Restaurant",
  logo: "https://res.cloudinary.com/dcnen6bor/image/upload/v1759594498/restaurant/logos/gjmvrxw6iwfvvq4owcy3.webp",
  license: "https://pakobserver.net/wp-content/uploads/2024/09/lic-900x630.jpg",
  address: "123 Food Street, Lahore, Pakistan",
  restaurantPhoneNumber: "0300-1234567",
  cuisine: ["Italian", "Chinese", "Fast Food"],
  description:
    "A vibrant restaurant offering a mix of Italian, Chinese, and local flavors. Enjoy delicious food with fast delivery!",
  openingHours: "10:00 AM - 11:00 PM",
  deliveryAvailable: true,
  deliveryTime: "30-50 mins",
  operationalStatus: "warned",
  verificationStatus: "Approved",
};
export const customerInfoData = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "1234567890",
  profilePic: "https://cdn-icons-png.flaticon.com/512/147/147144.png",
  status: "active",
  createdAt: "2024-05-10T10:00:00Z",
};
export const dummyMenuData = [
  {
    id: 1,
    name: "Pasta",
    image: "/pasta.jpeg",
    category: "Noodles",
    price: 1200,
  },
  {
    id: 2,
    name: "Cheese Burger",
    image: "/burger.jpeg",
    category: "Fast Food",
    price: 800,
  },
  {
    id: 3,
    name: "Chicken Biryani",
    image: "/biryani.jpeg",
    category: "Rice",
    price: 600,
  },
];

export const complaints = [
  // Customer vs Restaurant
  {
    _id: "64b92f0a8d3b5e1c7a9f1234",
    raisedBy: { name: "John Doe", email: "john@example.com" },
    againstRestaurant: {
      name: "Pizza Hut",
      restaurantPhoneNumber: "12324567126",
    },
    orderId: {
      _id: "ORD123",
      totalPrice: 35.99,
      deliveryAddress: "Main Lahore street 123",
      paymentMethod: "Credit Card",
      paymentStatus: "Paid",
    },
    reason: "Late delivery of order",
    complaintStatus: "Customer",
    status: "Pending",
    createdAt: "2024-12-04T12:00:00Z",
  },

  {
    _id: "64b92f0a8d3b5e1c7a9f5678",
    raisedBy: { name: "Alice Smith", email: "alice@example.com" },
    againstRestaurant: {
      name: "Burger King",
      restaurantPhoneNumber: "12324567126",
    },
    orderId: {
      _id: "ORD456",
      totalPrice: 42.5,
      deliveryAddress: "Main Lahore street 123",
      paymentMethod: "Cash on Delivery",
      paymentStatus: "Unpaid",
    },
    reason: "Received wrong items",
    complaintStatus: "Customer",
    status: "Resolved",
    createdAt: "2023-12-04T12:00:00Z",
  },

  // Restaurant vs Customer
  {
    _id: "64b92f0a8d3b5e1c7a9f9876",
    raisedBy: { name: "KFC Manager", email: "manager@kfc.com" },
    againstUser: { name: "Michael Lee", email: "michael@example.com" },
    orderId: {
      _id: "ORD789",
      totalPrice: 25.75,
      deliveryAddress: "Main Lahore street 123",
      paymentMethod: "Debit Card",
      paymentStatus: "Refunded",
    },
    reason: "Customer provided incorrect address",
    complaintStatus: "Restaurant",
    status: "Pending",
    createdAt: "2023-12-04T12:00:00Z",
  },

  {
    _id: "64b92f0a8d3b5e1c7a9f1111",
    raisedBy: { name: "Sarah Johnson", email: "sarah@example.com" },
    againstRestaurant: {
      name: "McDonald's",
      restaurantPhoneNumber: "12324567126",
    },
    orderId: {
      _id: "ORD101",
      totalPrice: 50.0,
      deliveryAddress: "Main Lahore street 123",
      paymentMethod: "Credit Card",
      paymentStatus: "Paid",
    },
    reason: "Overcharged for items",
    complaintStatus: "Customer",
    status: "Pending",
    createdAt: "2023-12-04T12:00:00Z",
  },

  {
    _id: "64b92f0a8d3b5e1c7a9f2222",
    raisedBy: { name: "David Kim", email: "david@example.com" },
    againstRestaurant: {
      name: "Domino's Pizza",
      restaurantPhoneNumber: "12324567126",
    },
    orderId: {
      _id: "ORD202",
      totalPrice: 30.5,
      deliveryAddress: "Main Lahore street 123",
      paymentMethod: "PayPal",
      paymentStatus: "Paid",
    },
    reason: "Rude delivery person",
    complaintStatus: "Customer",
    status: "Resolved",
    createdAt: "2023-12-04T12:00:00Z",
  },

  // Restaurant vs Customer
  {
    _id: "64b92f0a8d3b5e1c7a9f3333",
    raisedBy: { name: "Subway Manager", email: "manager@subway.com" },
    againstUser: { name: "Emily Brown", email: "emily@example.com" },
    orderId: {
      _id: "ORD303",
      totalPrice: 28.0,
      deliveryAddress: "Main Lahore street 123",
      paymentMethod: "Cash on Delivery",
      paymentStatus: "Unpaid",
    },
    reason: "Customer was rude to staff",
    complaintStatus: "Restaurant",
    status: "Pending",
    createdAt: "2023-12-04T12:00:00Z",
  },

  {
    _id: "64b92f0a8d3b5e1c7a9f4444",
    raisedBy: { name: "Tom Wilson", email: "tom@example.com" },
    againstRestaurant: {
      name: "Taco Bell",
      restaurantPhoneNumber: "12324567126",
    },
    orderId: {
      _id: "ORD404",
      totalPrice: 22.99,
      deliveryAddress: "Main Lahore street 123",
      paymentMethod: "Credit Card",
      paymentStatus: "Paid",
    },
    reason: "Packaging was damaged",
    complaintStatus: "Customer",
    status: "Resolved",
    createdAt: "2023-12-04T12:00:00Z",
  },

  {
    _id: "64b92f0a8d3b5e1c7a9f5555",
    raisedBy: { name: "Sophia Martinez", email: "sophia@example.com" },
    againstRestaurant: {
      name: "Starbucks",
      restaurantPhoneNumber: "12324567126",
    },
    orderId: {
      _id: "ORD505",
      totalPrice: 15.75,
      deliveryAddress: "Main Lahore street 123",
      paymentMethod: "Debit Card",
      paymentStatus: "Paid",
    },
    reason: "Items missing from order",
    complaintStatus: "Customer",
    status: "Pending",
    createdAt: "2023-12-04T12:00:00Z",
  },
];

// 📊 Dummy data for your charts

// --- YEARLY DATA (month-wise) ---
export const admin_yearlyOrdersData = [
  { name: "Jan", orders: 1800 },
  { name: "Feb", orders: 2000 },
  { name: "Mar", orders: 2400 },
  { name: "Apr", orders: 2300 },
  { name: "May", orders: 2800 },
  { name: "Jun", orders: 3200 },
  { name: "Jul", orders: 3100 },
  { name: "Aug", orders: 3500 },
  { name: "Sep", orders: 3700 },
  { name: "Oct", orders: 3900 },
  { name: "Nov", orders: 4100 },
  { name: "Dec", orders: 4300 },
];

export const admin_yearlyRevenueData = [
  { name: "Jan", current: 52000, previous: 48000 },
  { name: "Feb", current: 56000, previous: 51000 },
  { name: "Mar", current: 61000, previous: 55000 },
  { name: "Apr", current: 59000, previous: 57000 },
  { name: "May", current: 64000, previous: 60000 },
  { name: "Jun", current: 70000, previous: 65000 },
  { name: "Jul", current: 72000, previous: 67000 },
  { name: "Aug", current: 75000, previous: 71000 },
  { name: "Sep", current: 77000, previous: 73000 },
  { name: "Oct", current: 81000, previous: 76000 },
  { name: "Nov", current: 85000, previous: 80000 },
  { name: "Dec", current: 88000, previous: 83000 },
];

// --- WEEKLY DATA ---
export const admin_weeklyOrdersData = [
  { name: "Mon", orders: 260 },
  { name: "Tue", orders: 310 },
  { name: "Wed", orders: 290 },
  { name: "Thu", orders: 380 },
  { name: "Fri", orders: 450 },
  { name: "Sat", orders: 520 },
  { name: "Sun", orders: 470 },
];

export const admin_weeklyRevenueData = [
  { name: "Mon", current: 12000, previous: 10000 },
  { name: "Tue", current: 14000, previous: 12500 },
  { name: "Wed", current: 13500, previous: 12800 },
  { name: "Thu", current: 19000, previous: 16000 },
  { name: "Fri", current: 22000, previous: 18500 },
  { name: "Sat", current: 25000, previous: 21000 },
  { name: "Sun", current: 23000, previous: 20000 },
];

// --- MONTHLY DATA ---
export const admin_monthlyOrdersData = [
  { name: "Week 1", orders: 1700 },
  { name: "Week 2", orders: 2100 },
  { name: "Week 3", orders: 2500 },
  { name: "Week 4", orders: 2300 },
];

export const admin_monthlyRevenueData = [
  { name: "Week 1", current: 78000, previous: 69000 },
  { name: "Week 2", current: 88000, previous: 76000 },
  { name: "Week 3", current: 96000, previous: 85000 },
  { name: "Week 4", current: 94000, previous: 90000 },
];

export const admin_analyticsData = [
  {
    title: "Total Customers",
    amount: "4,701",
    icon: <Users size={22} />,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
  },
  {
    title: "Total Restaurants",
    amount: "342",
    icon: <UtensilsCrossed size={22} />,
    iconBg: "bg-green-100",
    iconColor: "text-green-700",
  },
  {
    title: "Total Orders",
    amount: "2,966",
    icon: <ShoppingBag size={22} />,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-700",
  },
  {
    title: "Total Revenue",
    amount: "$129,380",
    icon: <DollarSign size={22} />,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-700",
  },
  {
    title: "Pending Restaurants",
    amount: "23",
    icon: <Clock size={22} />,
    iconBg: "bg-red-100",
    iconColor: "text-red-700",
  },
];

export const topRestaurants = [
  {
    id: 1,
    name: "The Golden Spoon",
    orders: 1234,
    revenue: "$45,680",
    status: "Active",
  },
  {
    id: 2,
    name: "Burger Palace",
    orders: 1056,
    revenue: "$38,920",
    status: "Active",
  },
  {
    id: 3,
    name: "Sushi Master",
    orders: 892,
    revenue: "$52,340",
    status: "Active",
  },
  {
    id: 4,
    name: "Pizza Paradise",
    orders: 745,
    revenue: "$28,450",
    status: "Active",
  },
  {
    id: 5,
    name: "Taco Town",
    orders: 623,
    revenue: "$19,870",
    status: "Warned",
  },
];

export const orderStatusData = [
  { name: "Pending", value: 32 },
  { name: "Confirmed", value: 131 },
  { name: "Preparing", value: 89 },
  { name: "Arriving", value: 21 },
  { name: "Delivered", value: 32 },
];

export const customerReturnungData = [
  { name: "New Customers", value: 15 },
  { name: "Returning", value: 25 },
];

export const dummyOrders = [
  {
    id: "ORD123456",
    name: "Ali Khan",
    email: "ali.khan@example.com",
    restaurantName: "Pizza Mania",
    items: 3,
    total: 1200,
    date: "2025-09-30",
    time: "12:45 PM",
    status: "Pending",
  },
  {
    id: "ORD987654",
    name: "Sara Ahmed",
    email: "sara.ahmed@example.com",
    restaurantName: "Burger Hub",
    items: 2,
    total: 850,
    date: "2025-09-29",
    time: "08:15 PM",
    status: "Preparing",
  },
  {
    id: "ORD567890",
    name: "Usman Ali",
    email: "usman.ali@example.com",
    restaurantName: "Biryani Point",
    items: 4,
    total: 1450,
    date: "2025-09-28",
    time: "02:30 PM",
    status: "Arriving",
  },
  {
    id: "ORD246810",
    name: "Maryam Fatima",
    email: "maryam.fatima@example.com",
    restaurantName: "Kebab Junction",
    items: 1,
    total: 500,
    date: "2025-09-27",
    time: "07:00 PM",
    status: "Delivered",
  },
];

export const dummyCustomers = [
  {
    id: "64b92f0a8d3b5e1c7a9f1234",
    name: "John Doe",
    email: "john.doe@example.com",
    profilePic: "/dummyPic.jpeg",
    joined: "2023-05-10",
    status: "Active",
    phone: "1234278261",
    orders: 15,
    totalSpent: "$320.50",
  },
  {
    id: "64b92f0a8d3b5e1c7a9f5678",
    name: "Alice Smith",
    email: "alice.smith@example.com",
    profilePic: "/user.png",
    joined: "2023-08-21",
    status: "Warned",
    phone: "23145678940",
    orders: 8,
    totalSpent: "$150.00",
  },
  {
    id: "64b92f0a8d3b5e1c7a9f9876",
    name: "Michael Lee",
    email: "michael.lee@example.com",
    profilePic: "/dummyPic.jpeg",
    joined: "2022-12-02",
    status: "Blocked",
    phone: "23145678940",
    orders: 3,
    totalSpent: "$40.99",
  },
  {
    id: "64b92f0a8d3b5e1c7a9f4321",
    name: "Sophia Johnson",
    email: "sophia.j@example.com",
    profilePic: "/user.png",
    joined: "2023-09-12",
    status: "Active",
    phone: "23145678940",
    orders: 20,
    totalSpent: "$540.75",
  },
  {
    id: "64b92f0a8d3b5e1c7a9f8765",
    name: "David Brown",
    email: "david.brown@example.com",
    profilePic: "/dummyPic.jpeg",
    joined: "2024-01-05",
    status: "Warned",
    phone: "23145678940",
    orders: 5,
    totalSpent: "$85.30",
  },
];

export const restaurantsData = [
  {
    id: 1,
    logo: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=100&h=100&fit=crop",
    name: "Bella Italia",
    cusisine: ["Italian", "Pizza", "Pasta"],
    ownerId: { name: "Mario Rossi", email: "mario.rossi@example.com" },
    status: "Pending",
    orders: 150,
    revenue: "$12,500",
  },
  {
    id: 2,
    logo: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop",
    name: "Tokyo Sushi",
    cusisine: ["Japanese", "Sushi", "Ramen"],
    ownerId: { name: "Aiko Tanaka", email: "aiko.tanaka@example.com" },
    status: "Approved",
    orders: 230,
    revenue: "$18,900",
  },
  {
    id: 3,
    logo: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=100&h=100&fit=crop",
    name: "Burger Hub",
    cusisine: ["American", "Fast Food"],
    ownerId: { name: "John Smith", email: "john.smith@example.com" },
    status: "Rejected",
    orders: 95,
    revenue: "$7,200",
  },
  {
    id: 4,
    logo: "/biryani.jpeg",
    name: "Green Bowl",
    cusisine: ["Vegetarian", "Healthy", "Salads"],
    ownerId: { name: "Priya Sharma", email: "priya.sharma@example.com" },
    status: "Approved",
    orders: 310,
    revenue: "$22,300",
  },
  {
    id: 5,
    logo: "/pasta.jpeg",
    name: "Texas BBQ",
    cusisine: ["BBQ", "Grill", "American"],
    ownerId: { name: "Robert Brown", email: "robert.brown@example.com" },
    status: "Pending",
    orders: 120,
    revenue: "$10,800",
  },
];

export const dummyRestaurants = [
  {
    id: 1,
    logo: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
    name: "Pizza Palace",
    cuisine: ["Italian", "Pizza"],
    address: "123 Main Street, Lahore",
    openingHours: { open: "10:00", close: "23:00" },
    deliveryTime: "25-35 min",
    deliveryAvailable: true,
    minPrice: 700,
    maxPrice: 2500,
  },
  {
    id: 2,
    logo: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
    name: "Burger Bistro",
    cuisine: ["American", "Burgers"],
    address: "45 Liberty Market, Lahore",
    openingHours: { open: "09:00", close: "21:00" },
    deliveryTime: "15-25 min",
    deliveryAvailable: true,
    minPrice: 500,
    maxPrice: 1800,
  },
  {
    id: 3,
    logo: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    name: "Sushi Spot",
    cuisine: ["Japanese", "Sushi"],
    address: "12 Clifton Road, Karachi",
    openingHours: { open: "11:00", close: "22:00" },
    deliveryTime: "30-40 min",
    deliveryAvailable: true,
    minPrice: 1200,
    maxPrice: 4000,
  },
  {
    id: 4,
    logo: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    name: "Taco Town",
    cuisine: ["Mexican", "Tacos"],
    address: "8 Saddar Street, Islamabad",
    openingHours: { open: "10:00", close: "00:00" },
    deliveryTime: "20-30 min",
    deliveryAvailable: false,
    minPrice: 600,
    maxPrice: 2200,
  },
  {
    id: 5,
    logo: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80",
    name: "Pasta Paradise",
    cuisine: ["Italian", "Pasta"],
    address: "99 Gulberg Avenue, Lahore",
    openingHours: { open: "10:00", close: "23:00" },
    deliveryTime: "25-35 min",
    deliveryAvailable: true,
    minPrice: 800,
    maxPrice: 2800,
  },
  {
    id: 6,
    logo: "https://img.freepik.com/free-photo/top-view-fast-food-mix-grilled-lamb-meat-cucumber-tomato-french-fries-arugula-salad-with-salmon-parmesan-cheese-grilled-chicken-breast-with-fresh-greens-bread-bas_141793-3996.jpg?semt=ais_hybrid&w=740&q=80",
    name: "Curry Corner",
    cuisine: ["Indian", "Curry"],
    address: "77 Clifton Block 5, Karachi",
    openingHours: { open: "11:00", close: "23:00" },
    deliveryTime: "30-40 min",
    deliveryAvailable: false,
    minPrice: 500,
    maxPrice: 2000,
  },
  {
    id: 7,
    logo: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
    name: "Grill & Chill",
    cuisine: ["BBQ", "Steakhouse"],
    address: "201 F-7 Markaz, Islamabad",
    openingHours: { open: "12:00", close: "23:00" },
    deliveryTime: "35-45 min",
    deliveryAvailable: true,
    minPrice: 1000,
    maxPrice: 3500,
  },
  {
    id: 8,
    logo: "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?auto=format&fit=crop&w=800&q=80",
    name: "Vegan Vibes",
    cuisine: ["Vegan", "Healthy"],
    address: "56 DHA Phase 6, Lahore",
    openingHours: { open: "09:00", close: "21:00" },
    deliveryTime: "20-30 min",
    deliveryAvailable: true,
    minPrice: 400,
    maxPrice: 1500,
  },
  {
    id: 9,
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpiz6fMr-Q75hK9pCx51SHjVBmG6TL_06jgw&s",
    name: "Seafood Shack",
    cuisine: ["Seafood"],
    address: "18 Clifton Sea View, Karachi",
    openingHours: { open: "11:00", close: "22:00" },
    deliveryTime: "30-40 min",
    deliveryAvailable: false,
    minPrice: 1500,
    maxPrice: 5000,
  },
  {
    id: 10,
    logo: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    name: "Salad Station",
    cuisine: ["Healthy", "Salads"],
    address: "22 Bahria Town, Rawalpindi",
    openingHours: { open: "08:00", close: "20:00" },
    deliveryTime: "15-20 min",
    deliveryAvailable: true,
    minPrice: 300,
    maxPrice: 1200,
  },
  {
    id: 11,
    logo: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    name: "Tasty Tacos",
    cuisine: ["Mexican", "Street Food"],
    address: "33 I-8 Markaz, Islamabad",
    openingHours: { open: "10:00", close: "23:00" },
    deliveryTime: "25-35 min",
    deliveryAvailable: true,
    minPrice: 500,
    maxPrice: 2000,
  },
  {
    id: 12,
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRgRqyPKyD7qBvQlMruRRJd87-5FiDkj_OBw&s",
    name: "Dim Sum Delights",
    cuisine: ["Chinese", "Dim Sum"],
    address: "5 Mall Road, Lahore",
    openingHours: { open: "10:00", close: "22:00" },
    deliveryTime: "20-30 min",
    deliveryAvailable: false,
    minPrice: 600,
    maxPrice: 2500,
  },
  {
    id: 13,
    logo: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80",
    name: "Breakfast Barn",
    cuisine: ["Breakfast", "Bakery"],
    address: "11 G-9 Markaz, Islamabad",
    openingHours: { open: "07:00", close: "14:00" },
    deliveryTime: "10-20 min",
    deliveryAvailable: true,
    minPrice: 200,
    maxPrice: 1000,
  },
  {
    id: 14,
    logo: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    name: "Urban Eatery",
    cuisine: ["Fusion", "Modern"],
    address: "9 DHA Phase 5, Karachi",
    openingHours: { open: "11:00", close: "23:00" },
    deliveryTime: "25-30 min",
    deliveryAvailable: true,
    minPrice: 800,
    maxPrice: 3200,
  },
  {
    id: 15,
    logo: "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=800&q=80",
    name: "Mediterraneo",
    cuisine: ["Mediterranean"],
    address: "10 E-11 Markaz, Islamabad",
    openingHours: { open: "12:00", close: "22:00" },
    deliveryTime: "30-40 min",
    deliveryAvailable: false,
    minPrice: 1000,
    maxPrice: 3500,
  },
  {
    id: 16,
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvy9fn6DVd2dKiejC2R6mCfpONB61fZ_cLHg&s",
    name: "Noodle Nook",
    cuisine: ["Asian", "Noodles"],
    address: "7 Model Town, Lahore",
    openingHours: { open: "11:00", close: "22:00" },
    deliveryTime: "20-30 min",
    deliveryAvailable: true,
    minPrice: 600,
    maxPrice: 2500,
  },
  {
    id: 17,
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJhZgO11B54FmFQJfhH2PYRzC2Q5mWQ0Sl9qBuBYM9SGCOHWI1K94QqKGxi6JwDQNIGok&usqp=CAU",
    name: "Kebab Kingdom",
    cuisine: ["Middle Eastern", "Grill"],
    address: "15 F-10 Markaz, Islamabad",
    openingHours: { open: "12:00", close: "00:00" },
    deliveryTime: "30-45 min",
    deliveryAvailable: true,
    minPrice: 900,
    maxPrice: 3000,
  },
  {
    id: 18,
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOPIHUznTHyjWaQJ_euJ2nHsYr3I0jKN5E_g&s",
    name: "Cafe Mocha",
    cuisine: ["Cafe", "Desserts"],
    address: "88 Gulshan-e-Iqbal, Karachi",
    openingHours: { open: "08:00", close: "22:00" },
    deliveryTime: "15-25 min",
    deliveryAvailable: true,
    minPrice: 300,
    maxPrice: 1800,
  },
  {
    id: 19,
    logo: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=80",
    name: "Ramen Republic",
    cuisine: ["Japanese", "Ramen"],
    address: "42 Garden Town, Lahore",
    openingHours: { open: "11:00", close: "21:00" },
    deliveryTime: "25-35 min",
    deliveryAvailable: false,
    minPrice: 800,
    maxPrice: 2700,
  },
  {
    id: 20,
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2NEIJD8n5zpXGOZsfu6BZs55RG-YEOF6vecCtfFWd9evey5wotY88zRmIM79uc8T9qVw&usqp=CAU",
    name: "Steak Supreme",
    cuisine: ["Steakhouse", "Grill"],
    address: "101 Gulberg III, Lahore",
    openingHours: { open: "12:00", close: "23:00" },
    deliveryTime: "35-45 min",
    deliveryAvailable: true,
    minPrice: 1500,
    maxPrice: 5000,
  },
];


export const orderStatus = [
  "all",
  "confirmed",
  "preparing",
  "arriving",
  "delivered",
];

export const Cus_dummyOrders = [
  {
    id: "FG12345",
    restaurant: "Burger Palace",
    image:
      "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&h=300&fit=crop",
    date: "Jan 15, 2025",
    time: "2:30 PM",
    total: "$28.50",
    status: "preparing",
    currentStep: 1, // 0=Placed, 1=Preparing, 2=Out for delivery, 3=Delivered
  },
  {
    id: "FG12344",
    restaurant: "Pizza Paradise",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2NEIJD8n5zpXGOZsfu6BZs55RG-YEOF6vecCtfFWd9evey5wotY88zRmIM79uc8T9qVw&usqp=CAU",
    date: "Jan 14, 2025",
    time: "7:45 PM",
    total: "$42.00",
    status: "delivered",
    currentStep: 3, // 0=Placed, 1=Preparing, 2=Out for delivery, 3=Delivered
  },
  {
    id: "FG12343",
    restaurant: "Sushi Station",
    image:
      "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300&fit=crop", // Sushi image
    date: "Jan 13, 2025",
    time: "1:20 PM",
    total: "$55.00",
    status: "delivered",
    currentStep: 3, // 0=Placed, 1=Preparing, 2=Out for delivery, 3=Delivered
  },
  {
    id: "FG12342",
    restaurant: "Taco Fiesta",
    image:
      "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=80",
    date: "Jan 12, 2025",
    time: "8:00 PM",
    total: "$32.50",
    status: "arriving",
    currentStep: 2, // 0=Placed, 1=Preparing, 2=Out for delivery, 3=Delivered
  },
  {
    id: "FG12341",
    restaurant: "Pasta House",
    image:
      "https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?w=400&h=300&fit=crop", // Pasta image
    date: "Jan 11, 2025",
    time: "6:30 PM",
    total: "$38.00",
    status: "confirmed",
    currentStep: 0, // 0=Placed, 1=Preparing, 2=Out for delivery, 3=Delivered
  },
  {
    id: "FG12340",
    restaurant: "Thai Kitchen",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvy9fn6DVd2dKiejC2R6mCfpONB61fZ_cLHg&s",
    date: "Jan 10, 2025",
    time: "7:15 PM",
    total: "$45.50",
    status: "confirmed",
    currentStep: 0, // 0=Placed, 1=Preparing, 2=Out for delivery, 3=Delivered
  },
];

export const sampleComplaint = [
  {
    _id: "c1",
    orderId: "ORD-1023",
    reason: "Food was cold and delayed by 30 minutes",
    complaintStatus: "Customer", // who raised it
    status: "Pending",
    managerAction: "None",
    responseToCustomer: "",
    createdAt: "2025-10-22T10:30:00Z",
    againstRestaurant: {
      name: "Hot & Spicy Grill",
      image:
        "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=500&auto=format&fit=crop&q=60",
    },
  },
  {
    _id: "c2",
    orderId: "ORD-1077",
    reason: "Received wrong items in the order",
    complaintStatus: "Customer",
    status: "Reviewing", // renamed from Under Review
    managerAction: "Warned",
    responseToCustomer: "We’ve contacted the restaurant to resolve this.",
    createdAt: "2025-10-20T15:45:00Z",
    againstRestaurant: {
      name: "Pizza Point",
      image:
        "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300&fit=crop", // Sushi image,
    },
  },
  {
    _id: "c3",
    orderId: "ORD-1105",
    reason: "Rude behavior from delivery person",
    complaintStatus: "Customer",
    status: "Resolved",
    managerAction: "Blocked",
    responseToCustomer: "The delivery partner has been suspended.",
    createdAt: "2025-10-18T09:00:00Z",
    againstRestaurant: {
      name: "Food Fusion",
      image:
        "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&h=300&fit=crop",
    },
  },
];

export const dummyMenu = [
  {
    id: 1,
    name: "Margherita Pizza",
    category: "Pizza",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
    description: "Classic pizza with fresh mozzarella and basil.",
  },
  {
    id: 2,
    name: "Pepperoni Pizza",
    category: "Pizza",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
    description: "Loaded with pepperoni and cheese.",
  },
  {
    id: 3,
    name: "Spaghetti Carbonara",
    category: "Pasta",
    price: 13.5,
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
    description: "Rich pasta with bacon, egg, and parmesan.",
  },
  {
    id: 4,
    name: "Caesar Salad",
    category: "Salads",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
    description: "Crispy romaine with creamy dressing.",
  },
];

export const Res_sampleComplaint = [
  {
    _id: "rc1",
    orderId: "ORD-2051",
    reason: "Customer provided incorrect address causing delivery delay",
    complaintStatus: "Restaurant", // raised by restaurant
    status: "Pending",
    managerAction: "None",
    responseToRestaurant: "",
    createdAt: "2025-10-25T12:30:00Z",
    againstUser: {
      name: "Ali Khan",
      profilePic:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNzaV4Q57w3IhP0aScPvxOj19A__yI1d13kw&s",

    },
  },
  {
    _id: "rc2",
    orderId: "ORD-2099",
    reason: "Customer refused order without valid reason",
    complaintStatus: "Restaurant",
    status: "Reviewing",
    managerAction: "Warned",
    responseToRestaurant: "We are contacting the customer for clarification.",
    createdAt: "2025-10-23T14:15:00Z",
    againstUser: {
      name: "Sara Ahmed",
      profilePic:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&h=400&fit=crop&q=60",
    },
  },
  {
    _id: "rc3",
    orderId: "ORD-2120",
    reason: "Customer used abusive language with delivery staff",
    complaintStatus: "Restaurant",
    status: "Resolved",
    managerAction: "Blocked",
    responseToRestaurant:
      "The customer account has been restricted due to behavior violation.",
    createdAt: "2025-10-20T09:45:00Z",
    againstUser: {
      name: "Hassan Raza",
      profilePic:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&q=60",
    },
  },
];
