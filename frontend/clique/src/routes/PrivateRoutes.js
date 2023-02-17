import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    return (
        isAuthenticated ? <Outlet/> : <Navigate to="/login" />
    )
}

export default PrivateRoutes 