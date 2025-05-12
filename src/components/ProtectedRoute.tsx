import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";

interface ProtectedRouteProps {
    children: ReactNode;
    role?: "Admin" | "BookOwner" | "Reader";
}

const ProtectedRoute = ({ children, role}: ProtectedRouteProps) => {
    const { token, user } = useAuthStore();
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (user && role && user.role !== role) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;