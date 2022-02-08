import axios from "axios";
import {port} from "../utils/dataBasePort";


export const addEvent = ( formData) => {
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.post(`${port}/event/`, formData, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
};
export const findAllEvent = () => {
    return axios.get(`${port}/event/`)
}
export const findOneEvent = (id) => {
    return axios.get(`${port}/event/${id}`)
}
export const updateEvent = (id, data) => {
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.put(`${port}/event/${id}`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}


export const deleteEvent = (id) => {
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.delete(`${port}/event/${id}`,  {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}
