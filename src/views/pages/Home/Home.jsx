import React from "react";
import { Box, Container, Typography, } from "@mui/material";
import Table from "../../components/Table";

export default function Home() {
    return (
        <Container
            maxWidth={false} // Cho phép full width
            sx={{
                flexDirection: "column",
                width: "100vw", // Chiều rộng 100% màn hình
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
            }}
        >
            <Typography variant="h4" gutterBottom
                sx={{
                    marginTop: "30px",
                }}>
                Danh sách người dùng
            </Typography>
            <Table />
        </Container>
    )
}
