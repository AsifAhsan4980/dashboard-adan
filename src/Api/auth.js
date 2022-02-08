import axios from "axios";
import {port} from "../utils/dataBasePort";

export const login = (user) => {
    return axios.post(`${port}/auth/login`, user, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
};

export const registration = (user) => {
    console.log(user)
    return axios.post(`${port}/auth/register`, user, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
};