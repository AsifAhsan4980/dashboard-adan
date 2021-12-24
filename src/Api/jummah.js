import axios from "axios";

export const addJummahs = (addJummah) => {
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.post(`http://18.217.131.163:8989/jummah/`, addJummah, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
};

export const getOneJummah = (id1, id2, id3) => {
    console.log(id1)
    return axios.get(
        `http://18.217.131.163:8989/jummah/?englishMonth=${id2}&englishYear=${id3}&englishDay=${id1}`
    );
};
export const updateJummah = (id, addAdan) => {
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.put(`http://18.217.131.163:8989/jummah/${id}`, addAdan, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
};
export const deleteJummah= (id) => {
    console.log(id)
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.delete(`http://18.217.131.163:8989/jummah/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
};
