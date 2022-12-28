import axios from 'axios';

export const territoryApi = axios.create({
    baseURL: `http://localhost:8080/`,
}) 