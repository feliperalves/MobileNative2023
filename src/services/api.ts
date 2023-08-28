import axios from "axios";

export const api = axios.create({
    baseURL: "https://projetoadonis.onrender.com",
    headers: {
        Accept: 'application/json'
    }    
})

