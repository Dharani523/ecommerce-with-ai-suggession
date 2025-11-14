
import axios from "axios";

const instance = axios.create({
  baseURL: "https://ecommerce-backend-gz6k.onrender.com/api/v1",
});

export default instance;
