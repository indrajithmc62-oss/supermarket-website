const express = require("express");
const mongoose = require("mongoose");
const Order = require("../models/Order");
const Product = require("../models/Product");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// Put back the stock if something goes wrong
const releaseStock = async (reserved) => {
  for (const r of reserved) {
    await Product.findByIdAndUpdate(r.id, { $inc: { stock: r.qty } });
  }
};

// Place a new order (logged-in users)
router.post("/", protect, async (req, res) => {
  const reserved = [];
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const orderItems = [];
    let totalPrice = 0;

    for (const item of items) {
      const qty = Number(item.quantity);

      if (!mongoose.isValidObjectId(item.product) || !Number.isInteger(qty) || qty < 1) {
        await releaseStock(reserved);
        return res.status(400).json({ message: "Invalid product or quantity" });
      }

      // Reduce stock only if enough is available
      const product = await Product.findOneAndUpdate(
        { _id: item.product, stock: { $gte: qty } },
        { $inc: { stock: -qty } },
        { new: true }
      );

      if (!product) {
        await releaseStock(reserved);
        return res
          .status(400)
          .json({ message: "A product is out of stock or does not exist" });
      }

      reserved.push({ id: product._id, qty });
      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        unit: product.unit,
        quantity: qty,
      });
      totalPrice += product.price * qty;
    }

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice: Math.round(totalPrice * 100) / 100,
    });

    res.status(201).json(order);
  } catch (err) {
    await releaseStock(reserved);
    res.status(400).json({ message: err.message });
  }
});

// Get my orders (logged-in users)
router.get("/my", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all orders (admin only)
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update order status (admin only)
router.put("/:id/status", protect, adminOnly, async (req, res) => {
  try {
    const allowed = ["pending", "processing", "shipped", "delivered", "cancelled"];
    const { status } = req.body;

    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid order id" });
    }
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus: status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;