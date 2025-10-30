import { GoogleLogin } from '@react-oauth/google';
import useAuth from '../../hooks/useAuth';

const GoogleLoginButton = () => {
    const { loginWithGoogle } = useAuth();

    return (
        <GoogleLogin
            onSuccess={(response) => {
                if (response.credential) {
                    loginWithGoogle(response.credential);
                }
            }}
            onError={() => {
                console.error("Erro no login com Google",);
            }}
        />
    );
};

export default GoogleLoginButton;
