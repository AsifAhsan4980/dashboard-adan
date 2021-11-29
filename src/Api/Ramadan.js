import axios from "axios";

export const addRamadan = (addJummah) => {
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.post(`http://18.217.131.163:8989/ramadan/`, addJummah, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
};

export const getOneRamadan = (id1, id2, id3) => {
    console.log(id1)
    return axios.get(
        `http://localhost:8989/ramadan/?englishMonth=${id2}&englishYear=${id3}&englishDay=${id1}`
    );
};
export const updateRamadan = (id, addAdan) => {
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.put(`http://localhost:8989/ramadan/${id}`, addAdan, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
};
export const deleteRamadan= (id) => {
    console.log(id)
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.delete(`http://localhost:8989/ramadan/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
};
