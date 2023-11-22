import axios from 'axios';

const API = axios.create({
    withCredentials: true,
  });

const API_URL = process.env.REACT_APP_API_URL || "https://api.blueprintbarbers.co";
// const API_URL = process.env.REACT_APP_API_URL || "http://192.168.86.44:8000";


export const getAPI = async (path, body) => {
    const response = await API.get(`${API_URL}${path}`, JSON.stringify(body),{
        headers: {
            'Content-Type': "application/json"
        }
    })
    return response
}

export const postAPI = async (path, body) => {
    const response = await API.post(`${API_URL}${path}`,JSON.stringify(body),{
        headers: {
            'Content-Type': "application/json"
        }
    })
    return response
}

export const putAPI = async (path, body) => {
    const response = await API.put(`${API_URL}${path}`,JSON.stringify(body),{
        headers: {
            'Content-Type': "application/json"
        }
    })
    return response
}

export const deleteAPI = async (path, body) => {
    const response = await API.delete(`${API_URL}${path}`,JSON.stringify(body),{
        headers: {
            'Content-Type': "application/json"
        }
    })
    return response
}

export const postAPIMultipart = async (path, body) => {
    const response = await API.post(`${API_URL}${path}`, body, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }})
    return response
}

export const putAPIMultipart = async (path, body) => {
    const response = await API.put(`${API_URL}${path}`, body, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }})
    return response
}