const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const productsFile = path.join(__dirname, "../products.json");

// Get all products
router.get("/", (req, res) => {
  const products = fs.existsSync(productsFile) ? JSON.parse(fs.readFileSync(productsFile)) : [];
  res.json(products);
});

// Get products by category
router.get("/:category", (req, res) => {
  const category = req.params.category.toLowerCase();
  const products = fs.existsSync(productsFile) ? JSON.parse(fs.readFileSync(productsFile)) : [];
  res.json(products.filter(p => p.category.toLowerCase() === category));
});

module.exports = router;
