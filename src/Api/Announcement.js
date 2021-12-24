import axios from "axios";

export const addAnnouncement = (addAdan) => {
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.post(`http://18.217.131.163:8989/announcement/`, addAdan, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
};
export const findAllAnnouncement = () => {
    return axios.get(`http://18.217.131.163:8989/announcement/`)
}

export const findOneAnnouncement = (id) => {
    return axios.get(`http://18.217.131.163:8989/announcement/${id}`)
}

export const updateAnnouncement = (id, data) => {
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.put(`http://18.217.131.163:8989/announcement/${id}`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export const deleteAnnouncement = (id) => {
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.delete(`http://18.217.131.163:8989/announcement/${id}`,  {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}