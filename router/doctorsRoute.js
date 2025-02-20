const express = require("express");
const router = express.Router();

const doctorsHandler = require("../middleware/doctorsHandler");
const varifyToken = require("../middleware/authMiddleware");

router.get("/", varifyToken, doctorsHandler.getAllDoctors);

//post request to add Doctors
router.post("/", varifyToken, doctorsHandler.addDoctor);

//get /:id to get patient by id
router.get("/:id", varifyToken, doctorsHandler.getDoctorById);

router.put("/:id", varifyToken, doctorsHandler.updateDoctor);
//put reuest /:id to update patient

//delete request /:id
router.delete("/:id", varifyToken, doctorsHandler.deleteDoctor);

module.exports = router;
