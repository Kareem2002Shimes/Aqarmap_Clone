import axios from "axios";
const BASE_URL = "https://testing-eg.am-root.com/api/v2";


export default axios.create({
  baseURL: BASE_URL,
});