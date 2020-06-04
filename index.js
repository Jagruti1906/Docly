const express = require("express");
const mongoose = require("mongoose");
const chalk = require("chalk");

const app = express();

app.use(express.json()); // for post requests
const patients = require("./routes/patients");
const doctors = require("./routes/doctors");

mongoose
  .connect("mongodb://localhost/Docly")
  .then(() => console.log(chalk.green("connected to mongoDB..")));

app.use("/api/patients", patients);
app.use("/api/doctors", doctors);
app.use(express.json()); // for post requests

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(chalk.yellow(`listening on port ${port}...`))
);
