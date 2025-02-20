const mongoose = require("mongoose");
const schema = mongoose.Schema;

const doctorSchema = new schema({
  name: String,
  specialization: String,
  patients: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Patient",
    default: [], 
  },
});

module.exports = mongoose.model("Doctor", doctorSchema);
