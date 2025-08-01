const Joi = require('joi');

const PatientSchema = Joi.object({
    patient_id: Joi.string().required(),
    name: Joi.string().required(),
    age: Joi.number().min(0).required(),
    gender: Joi.string().required(),
    blood_pressure: Joi.string().required(),
    temperature: Joi.number().min(90).max(106).required(),
    visit_date: Joi.string().required(),
    diagnosis: Joi.string().required(),
    medications: Joi.string().required(),
})

function validatePatient(patient) {
    const { error } = PatientSchema.validate(patient)
    return error ? error.details : null;
}

module.exports = { validatePatient };