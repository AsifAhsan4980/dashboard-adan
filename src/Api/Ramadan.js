import axios from "axios";
import {port} from "../utils/dataBasePort";

export const addRamadan = (addJummah) => {
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.post(`${port}/ramadan/`, addJummah, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
};

export const getOneRamadan = (id1, id2, id3) => {
    console.log(id1)
    return axios.get(
        `${port}/ramadan/?englishMonth=${id2}&englishYear=${id3}&englishDay=${id1}`
    );
};
export const updateRamadan = (id, addAdan) => {
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.put(`${port}/ramadan/${id}`, addAdan, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
};
export const deleteRamadan= (id) => {
    console.log(id)
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.delete(`${port}/ramadan/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
};
