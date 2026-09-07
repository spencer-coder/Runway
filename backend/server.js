const cors = require("cors");
require("dotenv").config();
const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const { ExpenseRouter } = require("./routes/expenseRoutes");
const { UserRouter } = require("./routes/userRoutes");
const { BudgetRouter } = require("./routes/budgetRoutes");

const app = express();
const port = process.env.PORT || 8000;

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file serving
app.use("/uploads", express.static(path.join("uploads")));

// Routes
app.use("/api/expenses", ExpenseRouter);
app.use("/api/users", UserRouter);
app.use("/api/budgets", BudgetRouter);

if (process.env.NODE_ENV === "production") {
  // Serve the built React app from the same origin as the API, so the client's
  // relative "api/..." paths resolve without a proxy or a CORS rule.
  const dist = path.join(__dirname, "..", "frontend", "dist");
  app.use(express.static(dist));

  // Anything the API routes above did not claim is a client-side route. Hand
  // back index.html and let React Router resolve it, otherwise a refresh on
  // /dashboard would 404 from Express.
  app.get("*", (req, res) => res.sendFile(path.join(dist, "index.html")));
} else {
  app.get("/", (req, res) => {
    res.send("hello world");
  });
}

// Error handling middleware, registered last so it sees errors from every
// route above it.
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`🌐 Server running on http://localhost:${port}`);
});
