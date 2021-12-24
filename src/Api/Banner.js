import axios from "axios";

export const addBanners = (addBanner) => {
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.post("http://18.217.131.163:8989/banner/", addBanner, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}
export const findAllBanner = () => {
    return axios.get("http://18.217.131.163:8989/banner/")
}

export const findOneBanner = (id) => {
    return axios.get(`http://18.217.131.163:8989/banner/${id}`)
}

export const updateBanner  = (id, data) => {
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.put(`http://18.217.131.163:8989/banner/${id}`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export const deleteBanner = (id) => {
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.delete(`http://18.217.131.163:8989/banner/${id}`,  {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}