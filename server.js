const express = require("express");
const path = require("path");

const app = express();

// ✅ Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, "public")));

// ✅ Serve index.html for the root path
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ Serve other HTML pages in /public (like tops.html, jackets.html, etc.)
app.get("/:page", (req, res, next) => {
  const filePath = path.join(__dirname, "public", `${req.params.page}.html`);
  res.sendFile(filePath, (err) => {
    if (err) {
      next(); // Pass to next middleware (404)
    }
  });
});

// ✅ 404 fallback (optional)
app.use((req, res) => {
  res.status(404).send("Page not found");
});

// ✅ Export for Vercel
module.exports = app;

// ✅ Only start server locally
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}
