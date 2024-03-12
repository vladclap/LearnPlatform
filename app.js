const express = require("express");
const mongoose = require("mongoose");
const keys = require("./const");
const authRoutes = require("./routes/authRoutes");
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(keys.connectionDB, {});

app.use(express.json());
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
