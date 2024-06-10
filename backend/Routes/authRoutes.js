const express = require('express');
const { registerApplicant, loginApplicant, registerRecruiter, loginRecruiter, logout } = require('../controllers/authController');
const router = express.Router();

router.post('/applicants/register', registerApplicant);
router.post('/applicants/login', loginApplicant);
router.post('/recruiters/register', registerRecruiter);
router.post('/recruiters/login', loginRecruiter);
router.post('/logout', logout);

module.exports = router;
