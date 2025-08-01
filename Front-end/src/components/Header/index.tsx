import { useState, useContext } from "react";
import { Link } from 'react-router-dom';
import { TiThMenu } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { AppContext } from "../../context/AppContext";
import SearchData from "../../services/SearchData";
import useAuth from "../../hooks/useAuth";
import UserAvatarMenu from "../UserAvatarMenu";


const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [search, setSearch] = useState<string>("");
    const { setTodos, authenticated } = useContext(AppContext);

    const { logout } = useAuth();

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const todos = await SearchData(search);
            console.log(todos)
            setTodos(todos);

            setSearch("");

        } catch (error) {
            console.log("Erro ao buscar dados", error);
        }

    };

    return (
        <header className="flex items-center justify-between px-1 py-4 bg-primary text-white shadow-md w-full relative">
            <div className="flex items-center justify-between container-desktop w-full">
                <img src="/logodark.png" alt="Logo" className="w-12 h-12" />

                <form className="w-full max-w-md" onSubmit={handleSearch}>
                    <label htmlFor="search" className="w-full">
                        <input
                            type="text"
                            id="search"
                            className="w-full px-4 py-2 rounded-lg border border-gray-700 text-gray-800 focus:outline-none"
                            placeholder="Pesquisar"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </label>
                </form>


                <nav className="hidden md:flex flex-wrap gap-6">


                    {authenticated ? (
                        <>
                            <Link to="/" className=" transition-colors">Home</Link>
                            <Link to="/cadastrar" className=" transition-colors">Cadastrar</Link>
                            <Link to="/favoritos" className=" transition-colors">Favoritos</Link>
                            {authenticated && <UserAvatarMenu />}

                        </>
                    ) : (
                        <>
                            <Link to="/login" className=" transition-colors">Sign in</Link>
                            <Link to="/register" className=" transition-colors">Sign up</Link>
                        </>
                    )}
                </nav>


                {/* Botão Mobile */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-white focus:outline-none"
                >
                    {menuOpen ? <IoClose size={28} /> : <TiThMenu size={28} />}
                </button>
            </div>

            <div className={`fixed top-0 right-0 h-full w-full bg-card p-6 z-50 transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
                <button onClick={() => setMenuOpen(false)} className="mb-6 text-white">
                    <IoClose size={24} />
                </button>
                <nav className="flex flex-col gap-4">
                    <Link to="/" className=" transition-colors" onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link to="/cadastrar" className=" transition-colors" onClick={() => setMenuOpen(false)}>Cadastrar</Link>
                    <Link to="/favoritos" className=" transition-colors" onClick={() => setMenuOpen(false)}>Favoritos</Link>
                    <button
                        type="button"
                        onClick={() => {
                            logout();
                            setMenuOpen(false);
                        }}
                        className=" transition-colors">
                        Sair
                    </button>
                </nav>
            </div>

            {menuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
                    onClick={() => setMenuOpen(false)}
                />
            )}
        </header>
    );
};

export default Header;
