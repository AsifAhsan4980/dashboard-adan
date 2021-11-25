
import axios from "axios";

export const login = (user) => {
    return axios.post("http://18.217.131.163:8989/auth/login", user, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
};

export const registration = (user) => {
    console.log(user)
    return axios.post("http://18.217.131.163:8989/auth/register", user, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
};