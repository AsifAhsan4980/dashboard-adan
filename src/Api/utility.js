/*import axios from "axios";

export const addBanners = (addBanner) => {

    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.post("http://localhost:3001/admin/banner", addBanner, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
};*/

import axios from "axios";

export const addBanners = (token,addBanner) => {

    return axios.post("http://localhost:3001/admin/banner", addBanner, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}
