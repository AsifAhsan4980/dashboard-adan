import axios from "axios";


export const getAllUser = (token) => {
    return axios.get("http://localhost:3001/admin/user/all_user",{

        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
}

export const deleteUser = (token,id) => {
    return axios.delete(`http://localhost:3001/admin/user/${id}`,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
}

export const updateUserRole = (token,role) => {
    return axios.put(`http://localhost:3001/admin/user/roleUpdate/${role._id}`, role, {
        headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${token}`
        }
    })
}