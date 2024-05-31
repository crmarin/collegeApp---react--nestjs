import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    // Authorization: "Bearer " + localStorage.getItem("token"),
  },
});

export default api;
