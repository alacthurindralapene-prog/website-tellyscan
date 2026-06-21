const express = require("express");
const cors = require("cors");

const manpowerRoutes = require("./routes/manpowerRoutes");

const productionRoutes = require("./routes/productionRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/manpower", manpowerRoutes);

app.use("/api/production", productionRoutes);

app.listen(3000, () => {
  console.log("Server berjalan di http://localhost:3000");
});
