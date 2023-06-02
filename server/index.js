const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const User = require("./models/User.model.js");

require("dotenv").config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

// ! console.log(process.env.MONGO_URL) si funciona dotenv
mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res, next) => {
  res.json("HOLA");
});

app.post("/register", async (req, res, next) => {
  const { username, email, password, code } = req.body;

  try {
    const userDoc = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
      code,
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const userDoc = await User.findOne({ email });

    if (!userDoc) {
      return res.status(401).json("Invalid credentials or user not found");
    }
    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        jwt.sign(
          { email: userDoc.email, id: userDoc._id},
          process.env.TOKEN_SECRET,
          { algorithm: "HS256", expiresIn: "24h" },
          (error, token) => {
            if (error) {
              throw error;
            }
            res.cookie("token", token).json(userDoc);
          }
        );
      } else {
        res.status(401).json("Invalid credentials");
      }
    }
  } catch (error) {
    res.status(422).json(error);
  }
});

app.get("/profile", (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(
      token,
      process.env.TOKEN_SECRET,
      { algorithm: "HS256", expiresIn: "24h" },
      async (error, userData) => {
        if (error) throw err;
      const {username, email, _id} =  await User.findById(userData.id)
        res.json({username, email, _id});
      }
    );
  } else {
    res.json(null);
  }
});

app.listen(3000);
