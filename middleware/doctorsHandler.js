const Doctor = require("../model/doctorsSchema");
const mongoose = require("mongoose");

async function getAllDoctors(req, res) {
  try {
    const doctor = await Doctor.find();
    if (doctor.length === 0) {
      res.send("no doctor added Yet");
    } else {
      res.send(doctor);
    }
  } catch (error) {
    res.status(400).send(`Invalid request: ${error.message}`);
  }
}

async function addDoctor(req, res) {
  try {
    const { name, specialization } = req.body;
    const doctor = new Doctor({ name, specialization });
    await doctor.save();
    res.status(201).json({ message: "doctor successfully added", doctor });
  } catch (error) {
    res.status(400).send(`Invalid request: ${error.message}`);
  }
}

async function getDoctorById(req, res) {
  try {
    const doctorId = req.params.id;
    console.log(doctorId);
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      res.send("doctor not found");
    } else {
      res.send(doctor);
    }
  } catch (error) {
    res.status(400).send(`Invalid doctor ID: ${error.message}`);
  }
}

async function updateDoctor(req, res) {
  try {
    const doctorId = req.params.id;
    const updatedoctorData = req.body;
    const doctor = await Doctor.findByIdAndUpdate(doctorId, updatedoctorData);

    if (!doctor) {
      return res.status(404).send("doctor not found");
    }

    res.json({ message: "doctor Updated ", doctor });
  } catch (error) {
    res.status(400).send(`Invalid doctor ID: ${error.message}`);
  }
}

async function deleteDoctor(req, res) {
  try {
    const doctorId = req.params.id;
    const doctor = await Doctor.findByIdAndDelete(doctorId);

    if (!doctor) {
      return res.status(404).send("doctor not found");
    }

    res.json({ message: "doctor Deleted ", doctor });
  } catch (error) {
    res.status(400).send(`Invalid doctor ID: ${error.message}`);
  }
}

module.exports = {
  getAllDoctors,
  addDoctor,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
