const Patient = require("../model/patientsSchema");
const mongoose = require("mongoose");

async function getAllPatients(req, res) {
  try {
    const patient = await Patient.find();
    if (patient.length === 0) {
      res.send("no Patient added Yet");
    } else {
      res.send(patient);
    }
  } catch (error) {
    res.status(400).send(`Invalid request: ${error.message}`);
  }
}

async function addPatient(req, res) {
  try {
    const { patientName, age } = req.body;
    const patient = new Patient({ patientName, age });
    await patient.save();
    res.status(201).json({ message: "patient successfully added", patient });
  } catch (error) {
    res.status(400).send(`Invalid request: ${error.message}`);
  }
}

async function getPatientById(req, res) {
  try {
    const patientId = req.params.id;
    console.log(patientId);
    const patient = await Patient.findById(patientId);
    if (!patient) {
      res.send("patient not found");
    } else {
      res.send(patient);
    }
  } catch (error) {
    res.status(400).send(`Invalid Patient ID: ${error.message}`);
  }
}

async function updatePatient(req, res) {
  try {
    const patientId = req.params.id;
    const updatePatientData = req.body;
    const patient = await Patient.findByIdAndUpdate(
      patientId,
      updatePatientData
    );

    if (!patient) {
      return res.status(404).send("Patient not found");
    }

    res.json({ message: "Patient Updated ", patient });
  } catch (error) {
    res.status(400).send(`Invalid Patient ID: ${error.message}`);
  }
}

async function deletePatient(req, res) {
  try {
    const patientId = req.params.id;
    const patient = await Patient.findByIdAndDelete(patientId);

    if (!patient) {
      return res.status(404).send("Patient not found");
    }

    res.json({ message: "Patient Deleted ", patient });
  } catch (error) {
    res.status(400).send(`Invalid Patient ID: ${error.message}`);
  }
}

module.exports = {
  getAllPatients,
  addPatient,
  getPatientById,
  updatePatient,
  deletePatient,
};
