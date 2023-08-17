const express = require("express");
const bcrypt = require("bcrypt");
const connectDB = require("./db");
const User = require("./models/User");
const app = express();

app.use(express.json());

app.post("/register", async (req, res, next) => {
  /**
   * Request Input Sources:
   * - req Body
   * - req Param
   * - req Query
   * - req Header
   * - req Cookies
   */

  const {name, email, password} = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({message: "Invalid data."});
  }

  try {
    let user = await User.findOne({email});
    if (user) {
      return res.status(400).json({message: "User already exists."});
    }

    user = new User({name, email, password});

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    user.password = hash;

    await user.save();

    return res.status(201).json({message: "User Create Successfully", user});
  } catch (error) {
    next(error);
  }
});

app.get("/", (req, res) => {
  const obj = {
    name: "Ayman",
    email: "admin@gmail.com",
  };
  res.json(obj);
});

app.use((err, req, res, next) => {
  console.log(err);
  return res.status(500).json({message: "Server Error Occurred"});
});

connectDB("mongodb://localhost:27017/attendance-db")
  .then(() => {
    console.log("Database connection established!");

    app.listen(3001, () => {
      console.log("Server is running on port 3001");
    });
  })
  .catch((err) => console.error(err));
