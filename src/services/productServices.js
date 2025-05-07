import axios from "axios";

const API = "https://backend-vlxd-production.onrender.com/api";

export const fetchCategories = () => {
  axios.get(`${API}/category`);
};
