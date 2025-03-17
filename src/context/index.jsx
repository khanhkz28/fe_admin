import { createContext, useState, useEffect } from "react";

// Tạo context
const AuthContext = createContext();

// Provider để quản lý trạng thái đăng nhập
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Kiểm tra localStorage để duy trì trạng thái đăng nhập
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Hàm đăng nhập (Lưu user vào state và localStorage)
    const setData = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData)); // Lưu vào localStorage
    };
    const loginData = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData)); // Lưu vào localStorage
    };

    // Hàm đăng xuất (Xóa user khỏi state và localStorage)
    const logoutData = () => {
        setUser(null);
        localStorage.removeItem("user"); // Xóa khỏi localStorage
    };

    return (
        <AuthContext.Provider value={{ user, loginData, logoutData, setData }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;