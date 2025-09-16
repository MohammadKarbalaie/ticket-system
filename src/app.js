const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser"); 
const connectDB = require("./config/db");
const { swaggerUi, swaggerSpec } = require("./docs/swagger");
const cors = require("cors");
const categoryRoutes = require("./routes/category.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const ticketRoutes = require("./routes/ticket.routes");
const messageRoutes = require("./routes/message.routes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, 
  })
);
app.use(cookieParser()); 

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/messages", messageRoutes);

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
