import axios from "axios";

export const publicApi = axios.create({
  baseURL: process.env.BASE_URL,
});
