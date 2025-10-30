import { useContext, useState, useRef, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useTheme } from '../../context/ThemeContext';
import { IoIosArrowDown } from "react-icons/io";
import { FaCloudSun } from "react-icons/fa";
import { BsFillCloudMoonFill } from "react-icons/bs";

const UserAvatarMenu = () => {
    const { user } = useContext(AppContext);
    const [open, setOpen] = useState(false);
    const [themeMenuOpen, setThemeMenuOpen] = useState(false);
    const { logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const filterRef = useRef<HTMLDivElement>(null);

    const imageUrl = user?.profileImage
        ? (user.profileImage.startsWith("https")
            ? user.profileImage
            : user.profileImage)
        : "/defaultProfile.jpg";

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleEsc);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEsc);
        };
    }, [open]);

    if (!user) return null;

    return (
        <div className="relative">
            <div
                className='flex items-center justify-center gap-2 cursor-pointer'
                onClick={() => {
                    setOpen(prev => !prev);
                    setThemeMenuOpen(false);
                }}
            >
                <div className='flex items-center gap-2'>
                    <img
                        src={imageUrl}
                        alt="avatar"
                        className="w-10 h-10 rounded-full border"
                    />
                    <p className="text-md font-bold text-texto">{user.name}</p>
                </div>
                <IoIosArrowDown className="text-sd ml-2" />
            </div>

            {open && (
                <div ref={filterRef} className="absolute right-0 mt-2 w-56 bg-card border rounded shadow-lg z-50">
                    <div className="p-4 text-texto">
                        <p className="font-semibold">{user.email}</p>
                    </div>
                    <hr />

                    <Link to="/EditProfile" className="block px-4 py-2 text-texto hover:bg-background">
                        Editar Perfil
                    </Link>

                    <div
                        className="block px-4 py-2 text-texto hover:bg-background cursor-pointer relative"
                        onClick={() => setThemeMenuOpen(prev => !prev)}
                    >
                        Tema
                        {themeMenuOpen && (
                            <div className="absolute top-0 right-full ml-1 w-40 bg-background border rounded shadow-lg z-50">
                                <button
                                    onClick={() => {
                                        toggleTheme("light");
                                        setThemeMenuOpen(false);
                                        setOpen(false);
                                    }}
                                    className="flex items-center justify-between w-full px-4 py-2 hover:bg-background transition-colors"
                                >
                                    <div className="flex items-center gap-2">
                                        <FaCloudSun className="w-5 h-5 text-yellow-500" />
                                        <span className="text-texto">Claro</span>
                                    </div>
                                    <span
                                        className={`w-3 h-3 rounded-full border border-gray-400 ${theme === "light" ? "bg-blue-600 border-blue-600" : "bg-transparent"}`}
                                    />
                                </button>

                                <button
                                    onClick={() => {
                                        toggleTheme("dark");
                                        setThemeMenuOpen(false);
                                        setOpen(false);
                                    }}
                                    className="flex items-center justify-between w-full px-4 py-2 hover:bg-background transition-colors"
                                >
                                    <div className="flex items-center gap-2">
                                        <BsFillCloudMoonFill className="w-5 h-5 text-button" />
                                        <span className="text-texto">Escuro</span>
                                    </div>
                                    <span
                                        className={`w-3 h-3 rounded-full border border-gray-400 ${theme === "dark" ? "bg-blue-600 border-blue-600" : "bg-transparent"}`}
                                    />
                                </button>
                            </div>
                        )}
                    </div>

                    <button className="block w-full text-left px-4 py-2 text-texto hover:bg-background">
                        Atalhos
                    </button>
                    <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-texto hover:bg-background"
                    >
                        Fazer logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserAvatarMenu;
