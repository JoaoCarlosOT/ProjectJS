import { useState, useContext } from "react";
import { Link } from 'react-router-dom';
import { TiThMenu } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { AppContext } from "../../context/AppContext";
import SearchData from "../../services/SearchData";
import useAuth from "../../hooks/useAuth";
import UserAvatarMenu from "../UserAvatarMenu";
import { IoSearchSharp } from "react-icons/io5";
import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);


const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [search, setSearch] = useState<string>("");
    const { setTodos, authenticated, todoStats } = useContext(AppContext);

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
        <header className="flex items-center justify-center px-1 py-2 bg-background text-texto w-full relative">
            <div className="flex items-center justify-between w-full mx-4">

                {authenticated ? (
                    <>
                        <form className="max-w-md w-full relative" onSubmit={handleSearch}>
                            <IoSearchSharp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />

                            <input
                                type="text"
                                id="search"
                                className="w-full max-w-[500px] pl-10 pr-4 py-2 rounded-lg border-[2px] border-gray-400 text-gray-800 focus:outline-none"
                                placeholder="Pesquisar"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </form>
                    </>
                ) : (
                    <>
                        <img src="/logoDarkJS.png" alt="" className="w-18 h-12" />
                    </>
                )}

                <nav className="hidden md:flex items-center gap-6">
                    {authenticated ? (
                        <>
                            <UserAvatarMenu />
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="h-10 flex items-center transition-colors">Sign in</Link>
                            <Link to="/register" className="h-10 flex items-center transition-colors">Sign up</Link>
                        </>
                    )}
                </nav>

                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-texto focus:outline-none"
                >
                    {menuOpen ? <IoClose size={28} /> : <TiThMenu size={28} />}
                </button>
            </div>

            <div
                className={`fixed top-0 right-0 h-full w-[80%] max-w-xs bg-card z-50 transform transition-transform duration-300 p-5 flex flex-col justify-between md:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex justify-end">
                    <button
                        onClick={() => setMenuOpen(false)}
                        aria-label="Fechar menu"
                        className="text-texto hover:text-foreground transition-colors"
                    >
                        <IoClose size={26} />
                    </button>
                </div>

                {authenticated && (
                    <div className="flex flex-col items-center gap-5">
                        <UserAvatarMenu />

                        <div className="relative w-full max-w-[200px] h-[130px] mx-auto">
                            <Doughnut className="mx-auto"
                                data={{
                                    labels: ["A Fazer", "Em Progresso", "Finalizados"],
                                    datasets: [
                                        {
                                            data: [
                                                todoStats.aFazer,
                                                todoStats.emProgresso,
                                                todoStats.finalizados,
                                            ],
                                            backgroundColor: ["#f6f6f8", "#a1a8c4", "#262628"],
                                            borderWidth: 0,
                                        },
                                    ],
                                }}
                                options={{
                                    cutout: "70%",
                                    plugins: { legend: { display: false } },
                                }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-texto">
                                {todoStats.total}
                            </div>
                        </div>

                        <div className="w-full text-sm text-texto space-y-2">
                            {[
                                { label: "A Fazer", color: "bg-gray-100", count: todoStats.aFazer },
                                {
                                    label: "Em Progresso",
                                    color: "bg-indigo-300",
                                    count: todoStats.emProgresso,
                                },
                                {
                                    label: "Finalizados",
                                    color: "bg-gray-900",
                                    count: todoStats.finalizados,
                                },
                            ].map(({ label, color, count }) => (
                                <div key={label} className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
                                        <span>{label}</span>
                                    </div>
                                    <span>{count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <nav className="flex flex-col items-center gap-4 mt-8">
                    <Link
                        to="/"
                        onClick={() => setMenuOpen(false)}
                        className="text-base font-medium text-texto hover:text-foreground transition"
                    >
                        Home
                    </Link>
                    <Link
                        to="/favoritos"
                        onClick={() => setMenuOpen(false)}
                        className="text-base font-medium text-texto hover:text-foreground transition"
                    >
                        Favoritos
                    </Link>
                    <button
                        type="button"
                        onClick={() => {
                            logout();
                            setMenuOpen(false);
                        }}
                        className="text-base font-medium text-red-500 hover:text-red-600 transition"
                    >
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
