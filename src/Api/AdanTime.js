import axios from "axios";

export const addAdans = (addAdan) => {
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.post(`http://18.217.131.163:8989/adan/oneMonth/`, addAdan, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
};


export const getOneAdan = (id) => {
    console.log(id)
    return axios.get(
        `http://18.217.131.163:8989/admin/product/6189292932ade79dfada481a`
    );
};

export const getAllAdan = () => {

    return axios.get(
        `http://18.217.131.163:8989/admin/product/`
    );
};

export const updateProductss = (addProduct) => {

    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.post("http://18.217.131.163:8989/admin/product", addProduct, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
};

export const deleteOneProducts = (id) => {
    console.log(id)
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.delete(
        `http://18.217.131.163:8989/admin/product/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    );
};