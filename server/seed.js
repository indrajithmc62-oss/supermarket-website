const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const mongoose = require("mongoose");
const Product = require("./models/Product");

const products = [
  // Fruits
  { name: "Fresh Apples", description: "Crisp red apples", price: 180, category: "Fruits", stock: 50, unit: "kg" },
  { name: "Bananas", description: "Ripe yellow bananas", price: 60, category: "Fruits", stock: 80, unit: "kg" },
  { name: "Oranges", description: "Juicy Nagpur oranges", price: 90, category: "Fruits", stock: 60, unit: "kg" },
  { name: "Grapes", description: "Seedless green grapes", price: 120, category: "Fruits", stock: 40, unit: "kg" },
  { name: "Mangoes", description: "Sweet Alphonso mangoes", price: 250, category: "Fruits", stock: 30, unit: "kg" },

  // Vegetables
  { name: "Tomatoes", description: "Fresh red tomatoes", price: 40, category: "Vegetables", stock: 100, unit: "kg" },
  { name: "Potatoes", description: "Farm fresh potatoes", price: 30, category: "Vegetables", stock: 120, unit: "kg" },
  { name: "Onions", description: "Red onions", price: 35, category: "Vegetables", stock: 120, unit: "kg" },
  { name: "Carrots", description: "Crunchy orange carrots", price: 55, category: "Vegetables", stock: 70, unit: "kg" },
  { name: "Spinach", description: "Fresh green spinach", price: 25, category: "Vegetables", stock: 50, unit: "bunch" },

  // Dairy
  { name: "Full Cream Milk", description: "Fresh full cream milk", price: 60, category: "Dairy", stock: 60, unit: "litre" },
  { name: "Curd", description: "Thick fresh curd", price: 50, category: "Dairy", stock: 40, unit: "pack" },
  { name: "Butter", description: "Salted butter", price: 58, category: "Dairy", stock: 45, unit: "pack" },
  { name: "Paneer", description: "Soft fresh paneer", price: 90, category: "Dairy", stock: 30, unit: "pack" },
  { name: "Cheese Slices", description: "Processed cheese slices", price: 130, category: "Dairy", stock: 35, unit: "pack" },

  // Bakery
  { name: "White Bread", description: "Soft sandwich bread", price: 40, category: "Bakery", stock: 50, unit: "pack" },
  { name: "Brown Bread", description: "Whole wheat bread", price: 50, category: "Bakery", stock: 40, unit: "pack" },
  { name: "Butter Cookies", description: "Crispy butter cookies", price: 45, category: "Bakery", stock: 60, unit: "pack" },
  { name: "Chocolate Cake", description: "Fresh chocolate cake", price: 320, category: "Bakery", stock: 10, unit: "piece" },

  // Beverages
  { name: "Orange Juice", description: "100% orange juice", price: 110, category: "Beverages", stock: 50, unit: "litre" },
  { name: "Green Tea", description: "Green tea bags", price: 190, category: "Beverages", stock: 40, unit: "pack" },
  { name: "Instant Coffee", description: "Rich instant coffee", price: 240, category: "Beverages", stock: 35, unit: "pack" },
  { name: "Mineral Water", description: "Packaged drinking water", price: 20, category: "Beverages", stock: 200, unit: "litre" },

  // Snacks
  { name: "Potato Chips", description: "Salted potato chips", price: 20, category: "Snacks", stock: 150, unit: "pack" },
  { name: "Salted Peanuts", description: "Roasted salted peanuts", price: 45, category: "Snacks", stock: 80, unit: "pack" },
  { name: "Chocolate Bar", description: "Milk chocolate bar", price: 50, category: "Snacks", stock: 100, unit: "piece" },

  // Staples
  { name: "Basmati Rice", description: "Long grain basmati rice", price: 110, category: "Staples", stock: 90, unit: "kg" },
  { name: "Wheat Flour", description: "Whole wheat atta", price: 48, category: "Staples", stock: 100, unit: "kg" },
  { name: "Sugar", description: "Refined white sugar", price: 45, category: "Staples", stock: 100, unit: "kg" },
  { name: "Sunflower Oil", description: "Refined sunflower oil", price: 150, category: "Staples", stock: 60, unit: "litre" },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products`);
  } catch (err) {
    console.error("Seeding failed:", err.message);
  } finally {
    await mongoose.disconnect();
  }
};

seed();