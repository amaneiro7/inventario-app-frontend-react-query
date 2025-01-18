import { lazy } from "react";
import { Routes, Route } from "react-router-dom"
import { ProtectedRoute } from "./ProtectedRoute";
// import { ProtectedRoute } from "./ProtectedRoute";

const NotFound = lazy(async () => await import("@/pages/404"))
const Home = lazy(async () => await import("../pages/Home"))
const Login = lazy(async () => await import("../pages/Login"))

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute />}>
                <Route path="/" element={<Home />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
} 