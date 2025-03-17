import axiosClient from "../axiosClient";

export const login = async (userData) => {
    try {
        const response = await axiosClient.post('/auth/login', userData);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await axiosClient.post(`/auth/register`, userData);
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await axiosClient.post(`/auth/logout`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
};

export const checkToken = async () => {
    try {
        const response = await axiosClient.get(`/check-auth`);
        return response;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
};

export const getAllUser = async () => {
    try {
        const response = await axiosClient.get("/admin/users");
        return response.data;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

export const updateUser = async (updatedData) => {
    
    try {
        const response = await axiosClient.put(`/admin/users/update`, updatedData);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating user:", error);
    }
};

// export const updateUserByAdmin = async (formData, id) => {
//     try {
//         if (!id) throw new Error('ID không được định nghĩa');

//         console.log("Dữ liệu gửi API:", formData);
//         const response = await axiosClient.put(`/admin/users/${id}`, formData); 
//         console.log("Response từ API:", response.data);
//         return response.data;
//     } catch (error) {
//         console.error("Lỗi cập nhật user:", error);
//         throw error;
//     }
// };
export const updateUserByAdmin = async (updatedData) => {
    try {
        const response = await axiosClient.put(`/admin/users/update`, updatedData);
        console.log("Dữ liệu từ API:", response);
        return response.data; // Trả về data thay vì response toàn bộ
    } catch (error) {
        console.error("Lỗi khi cập nhật user:", error);
        return null; // Tránh lỗi undefined khi gọi API thất bại
    }
};


export const deleteUser = async (id) => {
    try {
        const response = await axiosClient.delete(`/admin/users/${id}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating user:", error);
    }
};