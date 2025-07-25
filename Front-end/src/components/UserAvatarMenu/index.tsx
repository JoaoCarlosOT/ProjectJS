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
                <div className="absolute right-0 mt-2 w-50 bg-gray-800 border rounded shadow-lg z-50">
                    <div className="p-4">
                        <p className="font-semibold">{user.email}</p>
                    </div>
                    <hr />
                    <Link to={`/EditProfile`} className="block px-4 py-2 text-white hover:bg-slate-700">
                        Editar Perfil
                    </Link>
                    <button
                        className="block w-full text-left px-4 py-2 text-white hover:bg-slate-700"
                    >
                        tema
                    </button>
                    <button
                        className="block w-full text-left px-4 py-2 text-white hover:bg-slate-700"
                    >
                        Atalhos
                    </button>
                    <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-white hover:bg-slate-700"
                    >
                        Fazer logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserAvatarMenu;
