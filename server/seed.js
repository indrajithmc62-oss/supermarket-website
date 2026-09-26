const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const mongoose = require("mongoose");
const Product = require("./models/Product");

const products = [
  // Fruits
  { name: "Fresh Apples", description: "Crisp red apples", price: 180, category: "Fruits", stock: 50, unit: "kg", image: "https://media.istockphoto.com/id/614871876/photo/apple-isolated-on-wood-background.jpg?b=1&s=612x612&w=0&k=20&c=IdSTQVZikxJkJCGBbK8Fm8Vuq1FzvKFM_ysR8UZqnjg=" },
  { name: "Bananas", description: "Ripe yellow bananas", price: 60, category: "Fruits", stock: 80, unit: "kg", image: "https://images.pexels.com/photos/30873714/pexels-photo-30873714.jpeg" },
  { name: "Oranges", description: "Juicy Nagpur oranges", price: 90, category: "Fruits", stock: 60, unit: "kg", image: "https://images.pexels.com/photos/8639570/pexels-photo-8639570.jpeg" },
  { name: "Grapes", description: "Seedless green grapes", price: 120, category: "Fruits", stock: 40, unit: "kg", image: "https://images.pexels.com/photos/33344322/pexels-photo-33344322.jpeg" },
  { name: "Mangoes", description: "Sweet Alphonso mangoes", price: 250, category: "Fruits", stock: 30, unit: "kg", image: "https://images.pexels.com/photos/37816783/pexels-photo-37816783.jpeg" },

  // Vegetables
  { name: "Tomatoes", description: "Fresh red tomatoes", price: 40, category: "Vegetables", stock: 100, unit: "kg", image: "https://images.pexels.com/photos/29479888/pexels-photo-29479888.jpeg" },
  { name: "Potatoes", description: "Farm fresh potatoes", price: 30, category: "Vegetables", stock: 120, unit: "kg", image: "https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg" },
  { name: "Onions", description: "Red onions", price: 35, category: "Vegetables", stock: 120, unit: "kg", image: "https://images.pexels.com/photos/38088072/pexels-photo-38088072.jpeg" },
  { name: "Carrots", description: "Crunchy orange carrots", price: 55, category: "Vegetables", stock: 70, unit: "kg", image: "https://images.pexels.com/photos/31080486/pexels-photo-31080486.jpeg" },
  { name: "Spinach", description: "Fresh green spinach", price: 25, category: "Vegetables", stock: 50, unit: "bunch", image: "https://images.pexels.com/photos/7511845/pexels-photo-7511845.jpeg" },

  // Dairy
  { name: "Full Cream Milk", description: "Fresh full cream milk", price: 60, category: "Dairy", stock: 60, unit: "litre", image: "https://images.pexels.com/photos/5946724/pexels-photo-5946724.jpeg" },
  { name: "Curd", description: "Thick fresh curd", price: 50, category: "Dairy", stock: 40, unit: "pack", image: "https://images.pexels.com/photos/10809243/pexels-photo-10809243.jpeg" },
  { name: "Butter", description: "Salted butter", price: 58, category: "Dairy", stock: 45, unit: "pack", image: "https://images.pexels.com/photos/7966386/pexels-photo-7966386.jpeg" },
  { name: "Paneer", description: "Soft fresh paneer", price: 90, category: "Dairy", stock: 30, unit: "pack", image: "https://images.pexels.com/photos/11115801/pexels-photo-11115801.jpeg" },
  { name: "Cheese Slices", description: "Processed cheese slices", price: 130, category: "Dairy", stock: 35, unit: "pack", image: "https://images.pexels.com/photos/15754940/pexels-photo-15754940.jpeg" },

  // Bakery
  { name: "White Bread", description: "Soft sandwich bread", price: 40, category: "Bakery", stock: 50, unit: "pack", image: "https://images.pexels.com/photos/8599591/pexels-photo-8599591.jpeg" },
  { name: "Brown Bread", description: "Whole wheat bread", price: 50, category: "Bakery", stock: 40, unit: "pack", image: "https://images.pexels.com/photos/30419546/pexels-photo-30419546.jpeg" },
  { name: "Butter Cookies", description: "Crispy butter cookies", price: 45, category: "Bakery", stock: 60, unit: "pack", image: "https://media.istockphoto.com/id/1182279813/photo/butter-toffee-crunch-chocolate-chip-cookies.jpg?b=1&s=612x612&w=0&k=20&c=FZ_ulbLxEABjCuvaFwpD3A2WgrxAnvrw4PKg8Psn1Jo=" },
  { name: "Chocolate Cake", description: "Fresh chocolate cake", price: 320, category: "Bakery", stock: 10, unit: "piece", image: "https://images.pexels.com/photos/10249461/pexels-photo-10249461.jpeg" },

  // Beverages
  { name: "Orange Juice", description: "100% orange juice", price: 110, category: "Beverages", stock: 50, unit: "litre", image: "https://media.istockphoto.com/id/517309572/photo/carton-of-orange-juice-with-clipping-path.jpg?b=1&s=612x612&w=0&k=20&c=KyiGkAWbLxmPF6D_YvvEpu00D_fE3HdmshjCMR7auE4=" },
  { name: "Green Tea", description: "Green tea bags", price: 190, category: "Beverages", stock: 40, unit: "pack", image: "https://images.pexels.com/photos/27509157/pexels-photo-27509157.jpeg" },
  { name: "Instant Coffee", description: "Rich instant coffee", price: 240, category: "Beverages", stock: 35, unit: "pack", image: "https://images.pexels.com/photos/30688515/pexels-photo-30688515.jpeg" },
  { name: "Mineral Water", description: "Packaged drinking water", price: 20, category: "Beverages", stock: 200, unit: "litre", image: "https://images.pexels.com/photos/35020123/pexels-photo-35020123.jpeg" },

  // Snacks
  { name: "Potato Chips", description: "Salted potato chips", price: 20, category: "Snacks", stock: 150, unit: "pack", image: "https://images.pexels.com/photos/13060681/pexels-photo-13060681.jpeg" },
  { name: "Salted Peanuts", description: "Roasted salted peanuts", price: 45, category: "Snacks", stock: 80, unit: "pack", image: "https://media.istockphoto.com/id/157294999/photo/salted-peanuts-background.jpg?s=612x612&w=0&k=20&c=_5WWVk-VUYqZHzd_60pXOKhD3KHAV8Bf3DubgdR8GRw=" },
  { name: "Chocolate Bar", description: "Milk chocolate bar", price: 50, category: "Snacks", stock: 100, unit: "piece", image: "https://media.istockphoto.com/id/1347473460/photo/crispy-chocolate-ice-cream.jpg?s=612x612&w=is&k=20&c=YmOVyIUCpeIqEPCCMDOj1BOC1xWmWucH-61ugCcg-NY=" },

  // Staples
  { name: "Basmati Rice", description: "Long grain basmati rice", price: 110, category: "Staples", stock: 90, unit: "kg", image: "https://images.pexels.com/photos/8108170/pexels-photo-8108170.jpeg" },
  { name: "Wheat Flour", description: "Whole wheat atta", price: 48, category: "Staples", stock: 100, unit: "kg", image: "https://media.istockphoto.com/id/186831897/photo/flour-and-wheat-grains.jpg?b=1&s=612x612&w=0&k=20&c=yIHpuD4M9_W8xSDRntEyxoIogDAag8zdf0XTOZb5oXI=" },
  { name: "Sugar", description: "Refined white sugar", price: 45, category: "Staples", stock: 100, unit: "kg", image: "https://media.istockphoto.com/id/467511250/photo/white-granulated-sugar.jpg?s=612x612&w=0&k=20&c=5YH1RL-WEwnbFUAR7O73aQJSo8UB7DtVyhcvN4BAeJQ=" },
  { name: "Sunflower Oil", description: "Refined sunflower oil", price: 150, category: "Staples", stock: 60, unit: "litre", image: "https://media.istockphoto.com/id/1177294413/photo/sunflower-oil-in-food-processing-plant.jpg?s=612x612&w=0&k=20&c=mywKGQ3EPCzi20aI5Q6LcZ1IZqdwLUpokEePtSLsDYA=" },
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