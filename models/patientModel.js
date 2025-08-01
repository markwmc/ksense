class Patient {
    constructor({
        patient_id, name, age, gender, blood_pressure, temperature, visit_date, diagnosis, medications
    }) {
        this.patient_id = patient_id;
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.blood_pressure = blood_pressure;
        this.temperature = temperature;
        this.visit_date = visit_date;
        this.diagnosis = diagnosis;
        this.medications = medications;
    }
}

module.exports = Patient;