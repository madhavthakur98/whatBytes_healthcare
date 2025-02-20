const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = 3000;

const patientRouter = require("./router/patientsRouter");

const authRouter = require("./router/authRouter");

const doctorsRouter = require("./router/doctorsRoute");

const mappingRouter = require("./router/mappingRouter");

app.use(express.urlencoded({ extended: true }));



app.use("/api/patients", patientRouter);

app.use("/api/doctors", doctorsRouter);

app.use("/api/auth", authRouter);

app.use("/api/mappings", mappingRouter);



mongoose.connect(process.env.DB_link).then(() => {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});
