const router = require('express').Router();
const { GetAllJobs, getJobsById } = require('../controller/jobController');
const { auth } = require('../middleware/jwt');

router.get('/job', auth, GetAllJobs);
router.get('/job/:id', auth, getJobsById);

module.exports = router;
