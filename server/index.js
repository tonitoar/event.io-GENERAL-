const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./models/User.model.js")

require('dotenv').config()
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);


app.use(express.json());

app.use(cors({
    credentials: true,
    origin:"http://localhost:5173"
}));

//console.log(process.env.MONGO_URL) si funciona dotenv
mongoose.connect(process.env.MONGO_URL)

app.get("/test", (req, res, next) => {
    res.json("HOLA");
});




app.post("/register", (req, res, next)=> {

const {name, email, password, code} = req.body;

  User.create({
    name,
    email,
    password: bcrypt.hashSync(password, bcryptSalt),
    code,
  })
    .then((resp) => {
      res.json(resp);
    })
    .catch((error) => {
      res.status(422).json(error);
    });
});

app.listen(3000); 