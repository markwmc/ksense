function calculateBloodPressureRisk(bloodPressure){
    if (!bloodPressure) return { category: 'Unknown', score: 0 };
    
    const split = bloodPressure.split('/')
    if (split.length !== 2) return {category: "invalid", score: 0 };
    const systolic = split[0];
    const diastolic = split[1];

    if (systolic < 120 && diastolic < 80){
        return { category: "Normal", score: 0 };
    } else if ((systolic >= 120 || systolic <= 129) && diastolic < 80) {
        return { category: "Elevated", score: 1 };
    } else if ((systolic >= 130 || systolic <= 139) || (diastolic > 80 || diastolic < 89)) {
        return { category: "Stage 1", score: 2 }
    } else if (systolic >= 140 || diastolic >= 90) {
        return { category: "Stage 2", score: 3};
    } else {
        return { category: "unknown", score: null};
    }
};

function calculateTemperatureRisk(temp){
    if (temp <= 99.5) {
       return { category: "Normal", score: 0 };
    } else if ( temp >= 99.6 || temp <= 100.9 ) {
       return { category: "Low Fever", score: 1 };
    } else if (temp > 100.9) {
        return { category: "High Fever", score: 2};
    } else {
    return { category: "Unknown", score: 0 };
}
}

function calculateAgeRisk(age) {
    if (age === undefined || age === null) return {category: "unknown", score: 0 };
    if (age < 40) {
        return { category: "Low Risk", score: 0};
    } else if (age >40 && age < 65) {
        return { category: "Medium Risk", score: 1}
    } else if (age >= 65) {
        return { category: "High Risk", score: 2};
    } else {
        return { category: "Unknown", score: 0 };
    }
}

module.exports = { calculateBloodPressureRisk, calculateTemperatureRisk, calculateAgeRisk}