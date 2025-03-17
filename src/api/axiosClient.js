import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_URL_DOMAIN


// const API_BASE_URL = "https://your-backend-url.com/api"; // Thay bằng URL backend của bạn

const axiosClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});



// Thêm interceptor để tự động gắn token vào request (nếu cần)
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // Lấy token từ localStorage hoặc nơi lưu trữ khác
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// axiosClient.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response && error.response.message.toLowerCase().includes("token")) {
//             console.warn("Token hết hạn! Đang đăng xuất...");

//             // Xóa token & chuyển về trang đăng nhập
//             localStorage.removeItem("token");
//             const navigate = useNavigate();
//             navigate("/login");
//         }
//         return Promise.reject(error);
//     }
// );


export default axiosClient;
