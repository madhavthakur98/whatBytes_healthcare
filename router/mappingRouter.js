const express = require("express");

const router = express.Router();

const mappingHandler = require("../middleware/mappingshandler");
const varifyToken = require("../middleware/authMiddleware");

router.post("/", varifyToken, mappingHandler.assignDoctor);

router.get("/", varifyToken, mappingHandler.allPatientDoctorMap);

router.get("/:patientId", varifyToken, mappingHandler.getAssignedDoctorById);

router.delete(
  "/:patientId/:doctorId",
  varifyToken,
  mappingHandler.removeDoctorFromPatient
);

module.exports = router;
