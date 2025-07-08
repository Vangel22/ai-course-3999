const express = require("express");
const { expressjwt } = require("express-jwt");

const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/config.env` });

const cors = require("cors");
const db = require("./pkg/db/index");

const auth = require("./handlers/authHandler");
const soil = require("./handlers/soilController");
const { getUsers } = require("./handlers/userController");

db.init();

// npm i express dotenv mongoose cors jsonwebtoken

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  expressjwt({
    algorithms: ["HS256"],
    secret: process.env.JWT_SECRET,
  }).unless({
    path: "/api/v1/signup",
    path: "/api/v1/login",
  })
);

app.post("/api/v1/signup", auth.signup);
app.post("/api/v1/login", auth.login);

app.post("/api/v1/soil", soil.createSoil);
app.get("/api/v1/soil", soil.getAllSoils);

app.post("/api/v1/soil/sample", soil.addSampleSoils);
app.post("/api/v1/soil/chat", soil.chatAboutSoils);

app.get("/users", getUsers);

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log("Could not start service");
    return;
  }
  console.log(`Server started at port ${process.env.PORT}`);
});
