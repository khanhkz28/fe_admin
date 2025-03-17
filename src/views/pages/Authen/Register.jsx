/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Alert, // Thêm Alert để hiển thị thông báo
} from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import { registerUser } from "../../../api/Collections/Authcation";
import { useNavigate } from "react-router-dom";
import { useState } from "react"; // Thêm useState để quản lý trạng thái thông báo

// Keyframes cho hiệu ứng
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(25, 118, 210, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0);
  }
`;

// Styled components với hiệu ứng
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(6),
  borderRadius: "8px",
  width: "400px",
  backgroundColor: "#fff",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  animation: `${fadeIn} 0.8s ease-out`,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  padding: theme.spacing(1.2),
  textTransform: "none",
  fontWeight: 600,
  fontSize: "1rem",
  backgroundColor: "#1976d2",
  "&:hover": {
    backgroundColor: "#1565c0",
    transform: "translateY(-2px)",
    transition: "all 0.3s ease",
  },
  "&:active": {
    animation: `${pulse} 0.5s`,
  },
}));

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(""); // Thêm state để lưu thông báo lỗi

  const onSubmit = async (data) => {
    try {
      console.log("Register Data:", data);
      const response = await registerUser(data);
      console.log("Register Response:", response);
      setErrorMessage(""); // Xóa thông báo lỗi nếu đăng ký thành công
      navigate("/login");
    } catch (error) {
      console.error("Register failed:", error.response?.data || error.message);
      // Kiểm tra lỗi từ API, giả sử API trả về thông báo "Email already exists"
      if (error.response?.status === 422 && error.response?.data?.errors?.email) {
        const emailError = error.response.data.errors.email;
        if (emailError.includes("already exists")) {
          setErrorMessage("Tài khoản đã tồn tại!");
        } else {
          setErrorMessage("Đăng ký thất bại: " + emailError);
        }
      } else {
        setErrorMessage("Đăng ký thất bại, vui lòng thử lại!");
      }
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to bottom right, #e3f2fd, #bbdefb)",
        overflow: "hidden",
      }}
    >
      <StyledPaper elevation={0} square={false}>
        <Typography
          variant="h5"
          textAlign="center"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: "#1976d2",
            mb: 2,
            animation: `${fadeIn} 1s ease-out`,
          }}
        >
          Đăng ký
        </Typography>
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2, animation: `${fadeIn} 0.5s ease-out` }}>
            {errorMessage}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            id="name"
            variant="outlined"
            fullWidth
            margin="normal"
            label="Tên"
            {...register("name", { required: "Vui lòng nhập tên!" })}
            error={!!errors.name}
            helperText={errors.name?.message}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: "#e6f0fa",
                "& fieldset": {
                  borderColor: "rgba(0, 0, 0, 0.1)",
                },
                "&:hover fieldset": {
                  borderColor: "#1976d2",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1976d2",
                  borderWidth: "1px",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#666",
                "&.Mui-focused": {
                  color: "#1976d2",
                },
              },
              animation: `${fadeIn} 0.9s ease-out`,
            }}
          />
          <TextField
            id="email"
            variant="outlined"
            fullWidth
            margin="normal"
            label="Email"
            {...register("email", {
              required: "Vui lòng nhập email!",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email không hợp lệ!",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: "#e6f0fa",
                "& fieldset": {
                  borderColor: "rgba(0, 0, 0, 0.1)",
                },
                "&:hover fieldset": {
                  borderColor: "#1976d2",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1976d2",
                  borderWidth: "1px",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#666",
                "&.Mui-focused": {
                  color: "#1976d2",
                },
              },
              animation: `${fadeIn} 1s ease-out`,
            }}
          />
          <TextField
            id="password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            label="Mật khẩu"
            {...register("password", {
              required: "Vui lòng nhập mật khẩu!",
              minLength: {
                value: 6,
                message: "Mật khẩu phải có ít nhất 6 ký tự!",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: "#e6f0fa",
                "& fieldset": {
                  borderColor: "rgba(0, 0, 0, 0.1)",
                },
                "&:hover fieldset": {
                  borderColor: "#1976d2",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1976d2",
                  borderWidth: "1px",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#666",
                "&.Mui-focused": {
                  color: "#1976d2",
                },
              },
              animation: `${fadeIn} 1.1s ease-out`,
            }}
          />
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
          >
            Đăng ký
          </StyledButton>
        </Box>
      </StyledPaper>
    </Container>
  );
};

export default Register;