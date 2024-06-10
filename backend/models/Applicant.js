const mongoose = require('mongoose');
const applicantSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true }
});

const Applicant = mongoose.model('Applicant', applicantSchema);
module.exports = Applicant;
