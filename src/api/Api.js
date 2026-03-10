import axios from 'axios';

const host = location.host.toLowerCase();
const isLocalHost = host.includes("localhost")

const baseUrl = isLocalHost ? 'http://localhost:7777/api' : "";

const api = axios.create({
    baseURL: baseUrl
});


export const saveSurveyAnswer = async (answer) => {
    const response = await api.post(`/survey/answer`, answer);
    return response.data;
};