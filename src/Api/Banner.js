import axios from "axios";
import {port} from "../utils/dataBasePort";

export const addBanners = (addBanner) => {
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.post(`${port}/banner/`, addBanner, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}
export const findAllBanner = () => {
    return axios.get(`${port}/banner/`)
}

export const findOneBanner = (id) => {
    return axios.get(`${port}/banner/${id}`)
}

export const updateBanner  = (id, data) => {
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.put(`${port}/banner/${id}`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export const deleteBanner = (id) => {
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.delete(`${port}/banner/${id}`,  {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}