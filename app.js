const express = require("express");

const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/config.env` });

const cors = require("cors");
const db = require("./pkg/db/index");

const auth = require("./handlers/authHandler");
const soil = require("./handlers/soilController");

db.init();

// npm i express dotenv mongoose cors jsonwebtoken

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/v1/signup", auth.signup);
app.post("/api/v1/login", auth.login);

app.post("/api/v1/soil", soil.createSoil);
app.get("/api/v1/soil", soil.getAllSoils);

app.post("/api/v1/soil/sample", soil.addSampleSoils);
app.post("/api/v1/soil/chat", soil.chatAboutSoils);

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log("Could not start service");
    return;
  }
  console.log(`Server started at port ${process.env.PORT}`);
});
