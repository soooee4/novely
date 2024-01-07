const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

const routes = require("./api");

// scheduler setting
const schedule = require('./schedule')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../image')));

app.use("/", routes);

app.listen(8080, function () {
  // 매일 00:00 스케쥴러 시작
  schedule.start();
  console.log("listening on 8080");
});