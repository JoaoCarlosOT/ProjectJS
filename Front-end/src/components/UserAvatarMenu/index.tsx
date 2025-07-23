import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const UserAvatarMenu = () => {
    const { user } = useContext(AppContext);
    const [open, setOpen] = useState(false);
    const { logout } = useAuth();

    const imageUrl = user?.profileImage?.startsWith("http")
        ? user.profileImage
        : `${import.meta.env.VITE_API_URL}/uploads/${user?.profileImage}`;

    if (!user) return null;

    return (
        <div className="relative">
            <img
                src={imageUrl || "/default-avatar.png"}
                alt="avatar"
                className="w-10 h-10 rounded-full cursor-pointer border"
                onClick={() => setOpen(prev => !prev)}
            />

            {open && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-700 border rounded shadow-lg z-50">
                    <div className="p-4">
                        <p className="font-semibold">{user.email}</p>
                    </div>
                    <hr />
                    <Link to="/perfil" className="block px-4 py-2 hover:bg-gray-100">
                        Editar Perfil
                    </Link>
                    <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-blue-600 hover:bg-white"
                    >
                        Sair
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserAvatarMenu;
