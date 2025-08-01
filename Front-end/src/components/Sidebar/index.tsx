import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const COLORS = ["#f6f6f8", "#a1a8c4", "#262628"];

const Sidebar = () => {
    const { authenticated, todoStats } = useContext(AppContext);

    if (!authenticated) {
        return null;
    }

    const data = [
        { name: "A Fazer", value: todoStats.aFazer },
        { name: "Em Progresso", value: todoStats.emProgresso },
        { name: "Finalizados", value: todoStats.finalizados },
    ];

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
                    {/* <h3 className="text-sm font-bold text-texto mb-2">Resumo das Tarefas</h3> */}
                    <div>

                    </div>
                    <ResponsiveContainer width="100%" height={180}>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={60}
                                dataKey="value"
                                startAngle={90}
                                endAngle={450}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>

                            <text
                                x="50%"
                                y="50%"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="text-base font-semibold"
                            >
                                {todoStats.total}
                            </text>
                        </PieChart>
                    </ResponsiveContainer>


                    <div className="text-sm text-texto mt-4 space-y-2">
                        {/* A Fazer */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="inline-block w-2.5 h-2.5 rounded-full bg-gray-100" />
                                <span>A Fazer</span>
                            </div>
                            <span>{todoStats.aFazer}</span>
                        </div>

                        {/* Em Progresso */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="inline-block w-2.5 h-2.5 rounded-full bg-indigo-300" />
                                <span>Em Progresso</span>
                            </div>
                            <span>{todoStats.emProgresso}</span>
                        </div>

                        {/* Finalizados */}
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
