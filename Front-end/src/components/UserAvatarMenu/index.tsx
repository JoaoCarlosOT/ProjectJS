import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useTheme } from '../../context/ThemeContext';

const UserAvatarMenu = () => {
    const { user } = useContext(AppContext);
    const [open, setOpen] = useState(false);
    const [themeMenuOpen, setThemeMenuOpen] = useState(false);
    const { logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const imageUrl = user?.profileImage?.startsWith("http")
        ? user.profileImage
        : `${import.meta.env.VITE_API_URL}/uploads/user/${user?.profileImage}`;

    if (!user) return null;

    return (
        <div className="relative">
            <img
                src={imageUrl || "/default-avatar.png"}
                alt="avatar"
                className="w-10 h-10 rounded-full cursor-pointer border"
                onClick={() => {
                    setOpen(prev => !prev);
                    setThemeMenuOpen(false); // fecha o menu de tema se o principal for reaberto
                }}
            />

            {open && (
                <div className="absolute right-0 mt-2 w-56 bg-slate-400  border rounded shadow-lg z-50">
                    <div className="p-4 text-texto">
                        <p className="font-semibold">{user.email}</p>
                    </div>
                    <hr />

                    <Link to="/EditProfile" className="block px-4 py-2 text-texto hover:bg-slate-700">
                        Editar Perfil
                    </Link>

                    <div
                        className="block px-4 py-2 text-texto hover:bg-slate-700 cursor-pointer relative"
                        onClick={() => setThemeMenuOpen(prev => !prev)}
                    >
                        Tema

                        {themeMenuOpen && (
                            <div className="absolute top-0 right-full ml-1 w-32 bg-gray-900 border rounded shadow-lg z-50">
                                <button
                                    onClick={() => {
                                        toggleTheme("light");
                                        setThemeMenuOpen(false);
                                        setOpen(false);
                                    }}
                                    className={`block w-full text-left px-4 py-2 ${theme === 'light' ? 'bg-blue-600 text-white' : 'text-white hover:bg-slate-700'
                                        }`}
                                >
                                    Claro
                                </button>
                                <button
                                    onClick={() => {
                                        toggleTheme("dark");
                                        setThemeMenuOpen(false);
                                        setOpen(false);
                                    }}
                                    className={`block w-full text-left px-4 py-2 ${theme === 'dark' ? 'bg-blue-600 text-white' : 'text-white hover:bg-slate-700'
                                        }`}
                                >
                                    Escuro
                                </button>
                            </div>
                        )}
                    </div>

                    <button className="block w-full text-left px-4 py-2 text-texto hover:bg-slate-700">
                        Atalhos
                    </button>
                    <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-texto hover:bg-slate-700"
                    >
                        Fazer logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserAvatarMenu;
