import axios from "axios";

export const addAnnouncement = (addAdan) => {
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.post(`http://localhost:8989/announcement/`, addAdan, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
};
export const findAllAnnouncement = () => {
    return axios.get("http://localhost:8989/announcement/")
}

export const updateAnnouncement = (id, data) => {
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.put(`http://localhost:8989/announcement/${id}`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export const deleteAnnouncement = (id) => {
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.delete(`http://localhost:8989/announcement/${id}`,  {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}