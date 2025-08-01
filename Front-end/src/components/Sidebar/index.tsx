import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const Sidebar = () => {
    const { authenticated } = useContext(AppContext);

    if (!authenticated) {
        return null; // Não renderiza nada se não estiver logado
    }

    return (
        <aside className="hidden lg:block fixed top-0 left-0 w-[240px] h-screen bg-card rounded-r-3xl p-6 flex flex-col justify-between shadow-lg z-50">
            <div>
                <img src="/logodark.png" alt="Logo" className="w-10 h-10 mb-6" />
                <nav className="flex flex-col gap-4 text-texto">
                    <Link
                        to="/"
                        className="rounded-lg px-4 py-2 hover:bg-[#3e4c69] transition hover:text-white"
                    >
                        Home
                    </Link>
                    <Link
                        to="/favoritos"
                        className="rounded-lg px-4 py-2 hover:bg-[#3e4c69] transition hover:text-white"
                    >
                        Favoritos
                    </Link>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
