const express = require("express");

const cors = require("cors");

const routes = require("./api");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/", routes);


app.listen(8080, function () {
  console.log("listening on 8080");
});