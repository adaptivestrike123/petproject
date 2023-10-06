import axios from "axios";

export const apiAxios = axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    Authorization: localStorage.getItem("token")
      ? `${localStorage.getItem("token")}`
      : null,
  },
});
apiAxios.interceptors.response.use((res) => {
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
    delete res.data.token;
    return res;
  }
  return res;
});
