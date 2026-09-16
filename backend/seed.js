const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

const products = [
  {
    name: "Dumbbells",
    description: "Comfortable coated dumbbells for strength training at home.",
    price: 1199,
    category: "Strength",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    stock: 12,
  },
  {
    name: "Resistance Band",
    description:
      "A versatile resistance band for warm-ups, strength, and mobility.",
    price: 399,
    category: "Strength",
    image:
      "https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    stock: 24,
  },
  {
    name: "Yoga Mat",
    description:
      "A supportive non-slip mat for yoga, stretching, and floor workouts.",
    price: 699,
    category: "Yoga",
    image:
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    stock: 18,
  },
  {
    name: "Skipping Rope",
    description:
      "A lightweight skipping rope designed for quick cardio sessions.",
    price: 249,
    category: "Cardio",
    image:
      "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    stock: 30,
  },
  {
    name: "Gym Gloves",
    description: "Breathable training gloves with a secure grip for lifting.",
    price: 499,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    stock: 15,
  },
  {
    name: "Water Bottle",
    description:
      "A reusable bottle to keep hydration close during every workout.",
    price: 299,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
    rating: 4.4,
    stock: 22,
  },
  {
    name: "Foam Roller",
    description: "A firm foam roller for recovery, release, and mobility work.",
    price: 799,
    category: "Yoga",
    image:
      "https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    stock: 9,
  },
  {
    name: "Workout Bag",
    description:
      "A spacious everyday bag for carrying your training essentials.",
    price: 999,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    stock: 11,
  },
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log(`${products.length} products added to MongoDB`);
    await mongoose.disconnect();
  } catch (error) {
    console.error("Product seeding failed:", error.message);
    process.exitCode = 1;
  }
}

seedProducts();
