const JobPost = require('./models/JobPost');
const User = require('./models/User');
const XLSX = require('xlsx');

exports.exportApplicants = async (req, res) => {
  try {
    const job = await JobPost.findById(req.params.jobId).populate('applicants', 'username email');

    if (!job) {
      return res.status(404).send('Job not found');
    }

    const data = job.applicants.map(applicant => ({
      Username: applicant.username,
      Email: applicant.email,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Applicants');

    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    res.setHeader('Content-Disposition', `attachment; filename=applicants-${job._id}.xlsx`);
    res.send(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};
