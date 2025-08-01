const express = require('express');
const router = express.Router();

const { getPatientsWithRisk } = require('../../controllers/patientController');

router.get('/', getPatientsWithRisk);

module.exports = router;
