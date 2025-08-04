import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = ["#f6f6f8", "#a1a8c4", "#262628"];

const Sidebar = () => {
    const { authenticated, todoStats } = useContext(AppContext);

    if (!authenticated) return null;

    const data = {
        labels: ["A Fazer", "Em Progresso", "Finalizados"],
        datasets: [
            {
                data: [
                    todoStats.aFazer,
                    todoStats.emProgresso,
                    todoStats.finalizados,
                ],
                backgroundColor: COLORS,
                borderWidth: 0,
            },
        ],
    };

    const options = {
        cutout: "70%",
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <aside className="hidden lg:block fixed top-0 left-0 w-[240px] h-screen bg-card rounded-r-3xl p-6 flex flex-col justify-between shadow-lg z-40">
            <div>
                <img src="/logodark.png" alt="Logo" className="w-10 h-10 mb-6" />
                <nav className="flex flex-col gap-4 text-texto mb-6">
                    <Link
                        to="/"
                        className="rounded-lg px-4 py-2 hover:bg-[#3e4c69] hover:text-white transition"
                    >
                        Home
                    </Link>
                    <Link
                        to="/favoritos"
                        className="rounded-lg px-4 py-2 hover:bg-[#3e4c69] hover:text-white transition"
                    >
                        Favoritos
                    </Link>
                </nav>

                <div>
                    <div className="relative w-full h-[180px]">
                        <Doughnut data={data} options={options} />
                        <div className="absolute inset-0 flex items-center justify-center text-base font-semibold">
                            {todoStats.total}
                        </div>
                    </div>

                    <div className="text-sm text-texto mt-4 space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="inline-block w-2.5 h-2.5 rounded-full bg-gray-100" />
                                <span>A Fazer</span>
                            </div>
                            <span>{todoStats.aFazer}</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="inline-block w-2.5 h-2.5 rounded-full bg-indigo-300" />
                                <span>Em Progresso</span>
                            </div>
                            <span>{todoStats.emProgresso}</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="inline-block w-2.5 h-2.5 rounded-full bg-gray-900" />
                                <span>Finalizados</span>
                            </div>
                            <span>{todoStats.finalizados}</span>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
