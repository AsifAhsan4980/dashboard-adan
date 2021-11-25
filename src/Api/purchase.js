import axios from "axios";

export const getAllPurchaseById = (token,id) => {
    return axios.get(`http://localhost:3001/purchase/${id}`,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
}

export const getAllPurchase = (token) => {
    return axios.get("http://localhost:3001/purchase/",{
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
}