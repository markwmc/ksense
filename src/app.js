const express = require('express');
const patientRoutes = require('./api/v1/patients')

const app = express();
app.use(express.json());

app.use('/api/patients', patientRoutes);

module.exports = app;