const Doctor = require("../model/doctorsSchema");
const Patient = require("../model/patientsSchema");

async function assignDoctor(req, res) {
  try {
    console.log("working");
    const { doctorId, patientId } = req.body;
    console.log(req.body);
    const doctor = await Doctor.findById(doctorId);
    const patient = await Patient.findById(patientId);
    console.log(doctor, patient);
    if (!doctor || !patient) {
      res.status(400).send("Patient or Doctor not found");
    }
    if (!doctor.patients.includes(patient._id)) {
      doctor.patients.push(patient._id);
    }
    if (!patient.assignedDoctors.includes(doctor._id)) {
      patient.assignedDoctors.push(doctor._id);
    }

    await patient.save();
    await doctor.save();

    return res.status(200).json({
      patient,
      doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(`invalid request ${error.message}`);
  }
}

async function allPatientDoctorMap(req, res) {
  try {
    // Get all patients and populate their assigned doctors
    const patients = await Patient.find().populate(
      "assignedDoctors",
      "name specialization"
    );

    return res.status(200).json(patients);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Error fetching mappings" });
  }
}

async function getAssignedDoctorById() {
  try {
    const { patientId } = req.params;

    const patient = await Patient.findById(patientId).populate(
      "assignedDoctors",
      "name specialization"
    );

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    return res.status(200).json({
      patientName: patient.patientName,
      assignedDoctors: patient.assignedDoctors,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error fetching patient's doctors" });
  }
}

async function removeDoctorFromPatient() {
  try {
    const { patientId, doctorId } = req.params;
    const patient = await Patient.findById(patientId);
    const doctor = await Doctor.findById(doctorId);
    if (!patient || !doctor) {
      return res.status(404).json({ error: "Patient or Doctor not found" });
    }

    patient.assignedDoctors = patient.assignedDoctors.filter(
      (id) => id.toString() !== doctorId
    );

    doctor.patients = doctor.patients.filter(
      (id) => id.toString() !== patientId
    );

    await Promise.all([patient.save(), doctor.save()]);

    return res.status(200).json({
      message: "Doctor removed successfully",
      patient,
      doctor,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error removing doctor mapping" });
  }
}

module.exports = {
  assignDoctor,
  allPatientDoctorMap,
  getAssignedDoctorById,
  removeDoctorFromPatient,
};
