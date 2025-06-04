import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://gh-card-finder-server.onrender.com",
  headers: { "X-Custom-Header": "foobar" },
});
