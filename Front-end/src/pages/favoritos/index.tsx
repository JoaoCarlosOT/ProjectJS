import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import Todos from '../../components/Todos';

const Favoritos = () => {
    const { favorites } = useContext(AppContext);

    return (
        <div className="max-w-4xl mx-auto mt-10 p-4">
            <h1 className="text-2xl font-bold mb-4">Tarefas Favoritas</h1>
            {favorites.length === 0 ? (
                <p>Nenhuma tarefa favoritada.</p>
            ) : (
                <table className="w-full border border-gray-300 rounded-xl overflow-hidden shadow-sm">
                    <tbody>
                        {favorites.map((todo) => (
                            <tr key={todo.id} className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition">
                                <Todos Todo={todo} onDelete={() => { }} mostrarAcoes={false} />
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Favoritos;