import React, { Suspense } from "react";
import ResponsiveAppBar from "../../layouts/Topbar";
import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import User from "./User";
import Home from "./Home";
import NotFound from "../NotFound";
import Profile from "./Profile";

function Main() {
    return (
        <Box>
            <ResponsiveAppBar />
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/user" element={<User />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </Box>
    )
}

export default Main;