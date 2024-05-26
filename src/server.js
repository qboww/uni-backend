// server.js
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const bodyParser = require("body-parser");
const swaggerSetup = require("./swagger");
const cors = require("cors");
const { eventsHandler } = require("./sseManager");

const app = express();
connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(bodyParser.json());

app.use("/users", authRoutes);
app.use("/contacts", contactRoutes);

app.get("/events", eventsHandler);

swaggerSetup(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
