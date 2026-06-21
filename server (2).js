const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const manpowerRoutes = require("./routes/manpowerRoutes");
const productionRoutes = require("./routes/productionRoutes");
const scanRoutes = require("./routes/scanRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/manpower", manpowerRoutes);
app.use("/api/production", productionRoutes);
app.use("/api/scan", scanRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});