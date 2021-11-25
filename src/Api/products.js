import axios from "axios";

export const addProductss = (addProduct) => {
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.post("http://localhost:3001/admin/product", addProduct, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
};

export const getOneProducts = (id) => {
    console.log(id)
    return axios.get(
        `http://localhost:3001/admin/product/6189292932ade79dfada481a`
    );
};

export const getAllProducts = () => {

    return axios.get(
        `http://localhost:3001/admin/product/`
    );
};

export const updateProductss = (addProduct) => {

    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.post("http://localhost:3001/admin/product", addProduct, {
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
        `http://localhost:3001/admin/product/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    );
};
