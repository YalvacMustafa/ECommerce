const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const connectdb = require("./Database/connectdb");


dotenv.config({
  path: "./config/config.env",
});

connectdb();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server Başlatıldı: ", PORT);
});
