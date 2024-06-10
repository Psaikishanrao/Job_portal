const mongoose = require('mongoose');

const jobPostSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  jobDescription: { type: String, required: true },
  salary: { type: Number, required: true },
  vacation: { type: Number, required: true },
  recruiter: { type: mongoose.Schema.Types.ObjectId, ref: 'Recruiter' } // Assuming a reference to a Recruiter model
});

const JobPost = mongoose.model('JobPost', jobPostSchema);

module.exports = JobPost;
