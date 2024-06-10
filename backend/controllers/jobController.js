const JobPost = require('../models/JobPost');

const createJob = async (req, res) => {
  try {
    const { jobTitle, jobDescription, salary, vacation, recruiter } = req.body;
    const newJob = new JobPost({
      jobTitle,
      jobDescription,
      salary,
      vacation,
      recruiter
    });
    await newJob.save();
    res.status(201).json({ message: 'Job created', job: newJob });
} catch (error) {
  console.error('Error creating job:', error);
  res.status(500).json({ message: 'Error creating job', error: error.message });
}
};
const getAllJobs = async (req, res) => {
    try {
      const jobs = await JobPost.find();
      res.status(200).json(jobs); 
    } catch (error) {
      console.error('Error fetching jobs:', error);
      res.status(500).json([]); 
    }
  };
  
  
const getJobById = async (req, res) => {
  try {
    const job = await JobPost.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ job });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching job', error });
  }
};

const updateJob = async (req, res) => {
  try {
    const { jobTitle, jobDescription, salary, vacation } = req.body;
    const job = await JobPost.findByIdAndUpdate(
      req.params.id,
      { jobTitle, jobDescription, salary, vacation },
      { new: true }
    );
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ message: 'Job updated', job });
  } catch (error) {
    res.status(500).json({ message: 'Error updating job', error });
  }
};

const deleteJob = async (req, res) => {
  try {
    const job = await JobPost.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ message: 'Job deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting job', error });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
};
