import axios from "axios";
import {port} from "../utils/dataBasePort";

export const addJummahs = (addJummah) => {
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.post(`${port}/jummah/`, addJummah, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
};

export const getOneJummah = (id1, id2, id3) => {
    console.log(id1)
    return axios.get(
        `${port}/jummah/?englishMonth=${id2}&englishYear=${id3}&englishDay=${id1}`
    );
};
export const updateJummah = (id, addAdan) => {
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.put(`${port}/jummah/${id}`, addAdan, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
};
export const deleteJummah= (id) => {
    console.log(id)
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.delete(`${port}/jummah/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
};
