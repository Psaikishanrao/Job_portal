const mongoose = require('mongoose');
const recruiterSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  company: { type: String, required: true }
});

const Recruiter = mongoose.model('Recruiter', recruiterSchema);
module.exports = Recruiter;
