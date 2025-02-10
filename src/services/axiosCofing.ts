import axios from "axios";

const API = axios.create({
  baseURL: "https://api.thedogapi.com/v1/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
