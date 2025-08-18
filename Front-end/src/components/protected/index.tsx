import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from "../../context/AppContext";
import Loading from '../Loading';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { authenticated, loading } = useContext(AppContext);

    if (loading) {
        return (
            <Loading />
        );
    }

    if (!authenticated) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
