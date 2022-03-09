import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

export const pokeUrl = axios.create({
    baseURL,
    withCredentials: false, // This is the default
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
});