import axios from "axios";

export const getProducts = () => {
    return axios.get(
        "http://localhost:3001/admin/product/"
    );
};

export const logOut = () => {
    const token = JSON.parse(localStorage.getItem('jwt'))
    console.log(token)
    return axios.get(
        "http://localhost:3001/admin/logout",{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
};