const express = require("express");
const router = express.Router();

const patientHandler = require("../middleware/patientsHandler");
const varifyToken = require("../middleware/authMiddleware");

router.get("/", varifyToken, patientHandler.getAllPatients);

//post request to add patients
router.post("/", varifyToken, patientHandler.addPatient);

//get /:id to get patient by id
router.get("/:id", varifyToken, patientHandler.getPatientById);

router.put("/:id", varifyToken, patientHandler.updatePatient);
//put reuest /:id to update patient

//delete request /:id
router.delete("/:id", varifyToken, patientHandler.deletePatient);

module.exports = router;
