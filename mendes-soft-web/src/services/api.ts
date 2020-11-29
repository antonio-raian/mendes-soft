import Axios from "axios";

const urlServer = "http://192.168.0.108:8080";

const api = Axios.create({
  baseURL: urlServer,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});

export default api;
