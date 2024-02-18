const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

const routes = require("./api");

// scheduler setting
const schedule = require('./schedule');

const port = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../image')));

app.use("/", routes);

// static path
app.use('/', express.static(path.resolve(__dirname, 'public')));

// front-end
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(port, function () {
  // 매일 00:00 스케쥴러 시작
  schedule.start();
  console.log(`listening on ${port}`);
});