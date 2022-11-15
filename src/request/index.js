import axios from "axios";

const service = axios.create({
    baseURL: 'http://localhost:3000',
    // timeout: 1000,
    withCredentials: true
})


export default service