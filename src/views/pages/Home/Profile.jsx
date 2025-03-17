import { useForm } from "react-hook-form";
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Paper,
} from "@mui/material";
import { login } from "../../../api/Collections/Authcation";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        try {
            const response = await login(data); // Gọi API login
            // Xử lý phản hồi từ API, ví dụ: lưu token vào localStorage
            if (response.access_token) {
                localStorage.setItem("token", response.access_token);
                navigate("/home");
            }
        } catch (error) {
            console.error("Login failed:", error);
        }

    };

    return (

        <Container
            maxWidth={false} // Cho phép full width
            sx={{
                width: "100vw", // Chiều rộng 100% màn hình
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Paper elevation={3} sx={{ padding: 4, marginTop: 8, borderRadius: "16px", width: "500px" }} square={false}>
                <Typography variant="h5" textAlign="center" gutterBottom>
                    Đăng nhập
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        label="Email"
                        {...register("email", { required: "Vui lòng nhập email!" })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="password"
                        label="Mật khẩu"
                        {...register("password", { required: "Vui lòng nhập mật khẩu!" })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
                        Đăng nhập
                    </Button>

                </Box>
                <Button
                    sx={{ mt: 2 }}
                    variant="contained"
                    fullWidth
                    color="primary"
                    onClick={() => navigate("/register")}
                >
                    Đăng ký
                </Button>
            </Paper>
        </Container>
    );
}

export default Profile;