import { GoogleLogin } from '@react-oauth/google';
import useAuth from '../../hooks/useAuth';

interface GoogleCredentialResponse {
    credential: string;
}

const GoogleLoginButton = () => {
    const { loginWithGoogle } = useAuth();

    return (
        <GoogleLogin
            onSuccess={(response: GoogleCredentialResponse) => {
                if (response.credential) {
                    loginWithGoogle(response.credential);
                }
            }}
            onError={() => {
                console.error('Login com Google falhou');
            }}
        />
    );
};

export default GoogleLoginButton;
