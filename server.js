const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const stripe = require("stripe")("your_stripe_secret_key_here"); // if you use Stripe

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static("public"));

// Example route
app.get("/", (req, res) => {
  res.send("Welcome to Thriftifai backend!");
});

// other routes here
// e.g. app.use("/users", require("./routes/users"));

// ✅ Only start server locally (not on Vercel)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// ✅ Export the app for Vercel
module.exports = app;
