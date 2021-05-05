import axios from "axios";

export default function createAxiosInstance(baseURL,timeout){
    if (timeout===undefined){
        timeout = 2000;
    }
    const axiosInstance = axios.create({
        baseURL: baseURL,
        timeout: timeout,
        headers: {'Content-Type':'application/x-www-form-urlencoded'}
    })
    return axiosInstance;
}

