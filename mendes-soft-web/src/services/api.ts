import Axios from "axios";

// const urlServer = "http://221.1.1.7:8080";
const urlServer = "http://192.168.0.104:8080";
// const urlServer = "http://34.122.241.243:8080";

const api = Axios.create({
  baseURL: urlServer,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});

export default api;
