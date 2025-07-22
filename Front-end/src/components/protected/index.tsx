import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from "../../context/AppContext";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { authenticated } = useContext(AppContext);

    if (!authenticated) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
