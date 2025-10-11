const express = require("express");
const router = express.Router();

// Example: store cart in memory for now
let carts = {};

// Add item
router.post("/add", (req, res) => {
  const { email, product } = req.body;
  if (!carts[email]) carts[email] = [];
  carts[email].push(product);
  res.json({ success: true, message: "Added to cart" });
});

// Get cart
router.get("/:email", (req, res) => {
  const email = req.params.email;
  res.json(carts[email] || []);
});

module.exports = router;
