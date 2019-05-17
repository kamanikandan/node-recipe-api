require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

//Connecting to DB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", error => console.error("error"));
db.once("open", () => console.log("Connected to Database!"));

//Setting Middleware
app.use(express.json());
const recipeRouter = require("./routes/recipie");
app.use("/recipes", recipeRouter);

app.listen(3000, () => console.log("Server started running..."));
