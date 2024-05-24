const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const bodyParser = require("body-parser");
const swaggerSetup = require("./swagger");

const app = express();
connectDB();

app.use(bodyParser.json());

app.use("/users", authRoutes);

swaggerSetup(app); // Add this line to set up Swagger

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
