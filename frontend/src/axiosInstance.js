// import axios from "axios";

// const instance = axios.create({
//   baseURL: "http://localhost:8000/api/v1", // ✅ includes /api/v1
// });

// export default instance;
import axios from "axios";

const instance = axios.create({
  baseURL: "https://ecommerce-backend-gz6k.onrender.com/api/v1",
});

export default instance;
