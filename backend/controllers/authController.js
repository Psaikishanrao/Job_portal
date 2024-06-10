const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Applicant = require('../models/Applicant');
const Recruiter = require('../models/Recruiter');
exports.registerApplicant = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newApplicant = new Applicant({ email, password: hashedPassword, name });
    await newApplicant.save();
    res.status(201).json({ message: 'Applicant registered successfully. Please login.' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering applicant', error });
  }
};


exports.registerRecruiter = async (req, res) => {
  try {
    const { email, password, name, company } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newRecruiter = new Recruiter({ email, password: hashedPassword, name, company });
    await newRecruiter.save();
    res.status(201).json({ message: 'Recruiter registered successfully. Please login.' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering recruiter', error });
  }
};

const setTokenCookie = (res, token) => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 3600000 // 1 hour
  });
};

exports.loginApplicant = async (req, res) => {
  try {
    const { email, password } = req.body;
    const applicant = await Applicant.findOne({ email });
    if (!applicant) return res.status(404).json({ message: 'Applicant not found' });

    const isMatch = await bcrypt.compare(password, applicant.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: applicant._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    setTokenCookie(res, token);
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in applicant:', error);
    res.status(500).json({ message: 'Error logging in applicant', error: error.message });
  }
};

exports.loginRecruiter = async (req, res) => {
  try {
    const { email, password } = req.body;
    const recruiter = await Recruiter.findOne({ email });
    if (!recruiter) return res.status(404).json({ message: 'Recruiter not found' });

    const isMatch = await bcrypt.compare(password, recruiter.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: recruiter._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    setTokenCookie(res, token);
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in recruiter:', error);
    res.status(500).json({ message: 'Error logging in recruiter', error: error.message });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful' });
};
