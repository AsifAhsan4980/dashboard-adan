import axios from "axios";
import {port} from "../utils/dataBasePort";

export const addAdans = (addAdan) => {
    const token = JSON.parse(localStorage.getItem('jwt'))
    console.log("ok")
    return axios.post(`${port}/adan/oneMonth/`, addAdan, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
};

export const updateAdans = (id, addAdan) => {
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.post(`${port}/adan/oneMonth/${id}`, addAdan, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
};


export const getOneAdan = (id1, id2, id3) => {
    console.log(id1)
    return axios.get(
        `${port}/adan/oneDay/?englishMonth=${id2}&englishYear=${id3}&englishDay=${id1}`
    );
};


export const deleteAdans= (id) => {
    console.log(id)
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.delete (`${port}/adan/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
};

export const updateProductss = (id, addProduct) => {

    const token = JSON.parse(localStorage.getItem('jwt'))
    console.log(addProduct)
    return axios.put(`${port}/adan/${id}`, addProduct, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
};

// export const deleteOneProducts = (id) => {
//     console.log(id)
//     const token = JSON.parse(localStorage.getItem('jwt'))
//     return axios.delete(
//         `http://18.217.131.163:8989/admin/product/${id}`, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             }
//         }
//     );
// };

export const updateNotificationTime = ( addProduct) => {

    const token = JSON.parse(localStorage.getItem('jwt'))
    console.log(addProduct)
    return axios.put(`${port}/adan/notificationTime/62089d098849a46b962af7b1`, addProduct, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
};