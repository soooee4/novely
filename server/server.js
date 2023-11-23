const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

const routes = require("./api");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../image')));

app.use("/", routes);

app.listen(8080, function () {
  console.log("listening on 8080");
});