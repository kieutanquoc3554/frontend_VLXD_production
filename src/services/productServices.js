import axios from "axios";

const API = "http://localhost:5000/api";

export const fetchCategories = () => {
  axios.get(`${API}/category`);
};
