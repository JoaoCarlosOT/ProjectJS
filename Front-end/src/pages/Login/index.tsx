import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

type LoginFormState = {
    email: string;
    password: string;
};

const Login: React.FC = () => {
    const [form, setForm] = useState<LoginFormState>({ email: '', password: '' });
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const { login } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.email || !form.password) {
            setError('Preencha todos os campos.');
            return;
        }

        try {
            const result = await login(form);
            console.log("Usuário logado:", result);
            navigate("/");
        } catch (err) {
            setError("Credenciais inválidas. Tente novamente.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                        placeholder="Digite seu email"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Senha</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                        placeholder="Digite sua senha"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                >
                    Entrar
                </button>
            </form>
        </div>
    );
};

export default Login;
