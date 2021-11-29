import axios from "axios";


export const addEvent = ( formData) => {
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.post(`http://18.217.131.163:8989/event/`, formData, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
};
export const findAllEvent = () => {
    return axios.get("http://localhost:8989/event/")
}
export const findOneEvent = () => {
    return axios.get("http://localhost:8989/event/")
}
export const updateEvent = (id, data) => {
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.put(`http://localhost:8989/event/${id}`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export const deleteEvent = (id) => {
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.delete(`http://localhost:8989/event/${id}`,  {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}