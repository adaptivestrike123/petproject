import axios from "axios";

export const apiAxios = axios.create({
  baseURL: "http://localhost:5000/",
});
console.log(localStorage.getItem("token"));
apiAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.authorization = token;
  }
  return config;
});
apiAxios.interceptors.response.use((res) => {
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
    delete res.data.token;
    return res;
  }
  return res;
});
