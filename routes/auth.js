const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const usersFile = path.join(__dirname, "../users.json");

// Sign-up
router.post("/signup", (req, res) => {
  const { email, password } = req.body;
  let users = fs.existsSync(usersFile) ? JSON.parse(fs.readFileSync(usersFile)) : [];
  
  if (users.find(u => u.email === email)) {
    return res.json({ success: false, message: "Email already registered" });
  }

  users.push({ email, password });
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  res.json({ success: true, message: "Account created successfully!" });
});

// Sign-in
router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  let users = fs.existsSync(usersFile) ? JSON.parse(fs.readFileSync(usersFile)) : [];
  
  const user = users.find(u => u.email === email && u.password === password);
  if (user) res.json({ success: true, message: "Sign in successful!" });
  else res.json({ success: false, message: "Invalid email or password" });
});

module.exports = router;
