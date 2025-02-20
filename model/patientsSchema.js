const mongoose = require("mongoose");
const schema = mongoose.Schema;

const patientsSchema = new schema({
  patientName: {
    type: String,
    required: true,
  },
  age: Number,
  assignedDoctors: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Doctor",
    default: [],
  },
});

module.exports = mongoose.model("Patient", patientsSchema);
