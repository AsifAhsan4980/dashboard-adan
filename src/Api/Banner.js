import axios from "axios";

export const addBanners = (token,addBanner) => {
    return axios.post("http://localhost:8989/banner/", addBanner, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export const findAllBanner = () => {
    return axios.get("http://localhost:8989/banner/")
}

export const updateBanner  = (id, data) => {
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.put(`http://localhost:8989/banner/${id}`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export const deleteBanner = (id) => {
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.delete(`http://localhost:8989/banner/${id}`,  {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}