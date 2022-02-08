import axios from "axios";
import {port} from "../utils/dataBasePort";
const token = JSON.parse(localStorage.getItem('jwt'))
export const addAnnouncement = (addAdan) => {

    return axios.post(`${port}/announcement/`, addAdan, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
};
export const findAllAnnouncement = () => {
    return axios.get(`${port}/announcement/`)
}

export const findOneAnnouncement = (id) => {
    return axios.get(`${port}/announcement/${id}`)
}

export const updateAnnouncement = (id, data) => {
    return axios.put(`${port}/announcement/${id}`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export const updateAnnouncementImage = (id, data) => {
    return axios.put(`${port}/announcement/image/${id}`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export const deleteAnnouncement = (id) => {
    return axios.delete(`${port}/announcement/${id}`,  {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}