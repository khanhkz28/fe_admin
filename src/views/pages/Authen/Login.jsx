/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Divider,
} from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import { checkToken, login } from "../../../api/Collections/Authcation";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthContext from "../../../context";

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
  padding: theme.spacing(5),
  marginTop: theme.spacing(2),
  borderRadius: "20px",
  width: "550px",
  background: "linear-gradient(145deg, #ffffff, #f5f7fa)",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  animation: `${fadeIn} 0.8s ease-out`,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "12px",
  padding: theme.spacing(1.5),
  textTransform: "none",
  fontWeight: 600,
  fontSize: "1rem",
  boxShadow: "0 4px 15px rgba(25, 118, 210, 0.3)",
  "&:hover": {
    boxShadow: "0 6px 20px rgba(25, 118, 210, 0.4)",
    transform: "translateY(-2px)",
    transition: "all 0.3s ease",
  },
  "&:active": {
    animation: `${pulse} 0.5s`,
  },
}));

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { loginData } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      console.log("Login Data:", data);
      const response = await login(data);
      console.log("Login Response:", response);
      if (response.token) {
        localStorage.setItem("token", response.token);
        loginData(response.user);
        navigate("/home");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const checkT = async () => {
    try {
      const data = await checkToken();
      navigate("/home");
    } catch (error) {
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      checkT();
    }
  }, [navigate]);

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
          variant="h4"
          textAlign="center"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: "#1976d2",
            letterSpacing: "0.5px",
            mb: 4,
            animation: `${fadeIn} 1s ease-out`,
          }}
        >
          Đăng nhập
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            id="email"
            variant="outlined"
            fullWidth
            margin="normal"
            label="Email"
            {...register("email", { required: "Vui lòng nhập email!" })}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "#fff",
                transition: "all 0.3s ease",
                "&:hover fieldset": {
                  borderColor: "#1976d2",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1976d2",
                  borderWidth: "2px",
                  boxShadow: "0 0 8px rgba(25, 118, 210, 0.3)",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#666",
                transition: "all 0.3s ease",
                "&.Mui-focused": {
                  color: "#1976d2",
                },
              },
              animation: `${fadeIn} 0.9s ease-out`,
            }}
          />
          <TextField
            id="password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            label="Mật khẩu"
            {...register("password", { required: "Vui lòng nhập mật khẩu!" })}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "#fff",
                transition: "all 0.3s ease",
                "&:hover fieldset": {
                  borderColor: "#1976d2",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1976d2",
                  borderWidth: "2px",
                  boxShadow: "0 0 8px rgba(25, 118, 210, 0.3)",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#666",
                transition: "all 0.3s ease",
                "&.Mui-focused": {
                  color: "#1976d2",
                },
              },
              animation: `${fadeIn} 1s ease-out`,
            }}
          />
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, backgroundColor: "#1976d2" }}
          >
            Đăng nhập
          </StyledButton>
        </Box>
        <Divider sx={{ my: 3, borderColor: "rgba(0, 0, 0, 0.1)" }} />
        <StyledButton
          fullWidth
          variant="outlined"
          onClick={() => navigate("/register")}
          sx={{
            mt: 1,
            backgroundColor: "transparent",
            borderColor: "#1976d2",
            color: "#1976d2",
            "&:hover": {
              backgroundColor: "rgba(25, 118, 210, 0.04)",
              borderColor: "#1565c0",
            },
          }}
        >
          Đăng ký
        </StyledButton>
      </StyledPaper>
    </Container>
  );
};

export default Login;