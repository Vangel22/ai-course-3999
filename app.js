const express = require("express");

const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/config.env` });

const cors = require("cors");
const db = require("./pkg/db/index");

db.init();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log("Could not start service");
    return;
  }
  console.log(`Server started at port ${process.env.PORT}`);
});
