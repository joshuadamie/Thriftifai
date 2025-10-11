const express = require("express");
const path = require("path");

const app = express();

// ✅ Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, "public")));

// ✅ Serve index.html for root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ Serve other HTML pages (e.g. /tops → tops.html)
app.get("/:page", (req, res, next) => {
  const page = req.params.page;
  const filePath = path.join(__dirname, "public", `${page}.html`);
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send("Page not found");
    }
  });
});

// ✅ Local run
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
}

// ✅ Export for Vercel
module.exports = app;
