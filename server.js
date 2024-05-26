// server.js
const express = require("express");
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const contactRoutes = require("./src/routes/contactRoutes");
const bodyParser = require("body-parser");
const swaggerSetup = require("./src/swagger");
const cors = require("cors");
const { eventsHandler } = require("./src/sseManager");

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
