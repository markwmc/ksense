const { fetchPatients, submitResults } = require('../../service/apiService');

const {
    calculateBloodPressureRisk,
    calculateTemperatureRisk,
    calculateAgeRisk,
} = require('../../service/riskAssessments');

const { validatePatient } = require('../../utils/validators');

async function getPatientsWithRisk(req, res) {
    try {
        const patients = await fetchPatients();

        const validPatients = [];
        const invalidPatients = [];
        const invalidPatientIds = [];
        const highRiskPatientIds = [];
        const feverPatientIds = [];

        for (const patient of patients) {
            const error = validatePatient(patient);
            

            const bpRisk = calculateBloodPressureRisk(patient.blood_pressure || '');
            const tempRisk = calculateTemperatureRisk(patient.temperature ?? 0);
            const ageRisk = calculateAgeRisk(patient.age ?? 0);
            const riskScore = bpRisk.score + tempRisk.score + ageRisk.score;



            const processedPatientData = {
                id: patient.patient_id,
                name: patient.name,
                age: patient.age,
                gender: patient.gender,
                blood_pressure: patient.blood_pressure,
                temperature: patient.temperature,
                visit_date: patient.visit_date,
                diagnosis: patient.diagnosis,
                medications: patient.medications,
                bloodPressureRisk: bpRisk ,
                temperatureRisk: tempRisk,
                ageRisk: ageRisk,
                totalRiskScore: riskScore,
            }
        
            if (error) {
                invalidPatients.push({patient: processedPatientData, error});
                invalidPatientIds.push(patient.patient_id || patient.id || null);
            } else {
            validPatients.push(processedPatientData);
            
             if (riskScore >= 4) {
                highRiskPatientIds.push(patient.patient_id || patient.id || null);
             }

             if (tempRisk !== null && patient.temperature >= 99.6) {
                feverPatientIds.push(patient.patient_id || patient.id || null);
             }
        }
         }

         const results = {
            high_risk_patients: highRiskPatientIds,
            fever_patients: feverPatientIds,
            data_quality_issues: invalidPatientIds,
         };

        //  res.json({results});

         await submitResults(results);
        //        res.json({
        //     validPatients,
        //     invalidPatients,
        //     alerts: {
        //         highRiskPatientIds,
        //         feverPatientIds,
        //         invalidPatients,
        //     },
        //     counts: {
        //         validCount: validPatients.length,
        //         invalidPatientsCount: invalidPatients.length,

        //     }
            
    //    });
    

        
    } catch (err) {
        console.error('Error fetching or processing patients: ', err);
        res.status(500).json({message: 'Internal server error'});
    }
}

module.exports = { getPatientsWithRisk };