const axios = require('axios');
const axiosRetry = require('axios-retry').default;
require('dotenv').config();

axiosRetry(axios, {
    retries: 3,
    retryDelay: axiosRetry.exponentialDelay,
    retryCondition: (error) => {
        return axiosRetry.isNetworkOrIdempotentRequestError(error) || error.response?.status >= 500;
    }
});

async function fetchPatients() {
    const patients = [];
    let page = 1;
    const limit = 20;

    while (true) {

   
    const url = `${process.env.KSENSE_BASE_URL}/patients`;
    console.log("Fetching from URL: ", url);
    console.log("USing api key ", process.env.API_KEY ? 'REDACTED' : "MISSING");
    const response = await axios.get(url, {
        params: { page, limit },
        headers: {
         "x-api-key" : process.env.API_KEY
        }
    });
    console.log("API RESPONSE: ", JSON.stringify(response.data, null, 2))

    const patientPage = response.data.data || response.data.patients;

    patients.push(...patientPage);

    const pagination = response.data.pagination || {};

    const currentPage = pagination.page || {};
    const totalPages = pagination.totalPages || page;

    if (currentPage >= totalPages) {
        break;
    }
    page++;
 }
    return patients;
}


async function submitResults(results) {
    try {
    const url = `${process.env.KSENSE_BASE_URL}/submit-assessment`;
    console.log("Submitting", url);
    const response = await axios.post(url,  results, {
        headers: {
            "Content-type": "application/json",
            "x-api-key": process.env.API_KEY,
        }
    });

    console.log("submit success", response.status);
    console.log("response data: ", response.data);
    return response.data;
} catch (error) {
    console.error("error ", error.response?.data );
    throw error;
}
}
module.exports = { fetchPatients, submitResults };