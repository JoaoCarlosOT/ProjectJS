import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useMessage } from '../../context/FlashMessageContext';
import GoogleLoginButton from '../../components/LoginGoogle';
// import { MessageResponse } from '../../types/MessageResponse';
import { Link } from 'react-router-dom';

type LoginFormState = {
    email: string;
    password: string;
};

const Login: React.FC = () => {
    const navigate = useNavigate();

    // const token = localStorage.getItem("token");

    // if (token) {
    //     navigate('/');
    // }

    const [form, setForm] = useState<LoginFormState>({ email: '', password: '' });

    const { login } = useAuth();
    const { setMessage } = useMessage();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.email || !form.password) {
            setMessage({ type: 'error', text: 'Preencha todos os campos.' });
            return;
        }

        try {
            const res = await login(form);
            // const msg = res.data.message || "Logado com sucesso"
            setMessage({ type: 'success', text: "Logado com sucesso!" });
            navigate('/');
        } catch (error) {
            setMessage({ type: 'error', text: "Erro ao logar!" });
            console.log(error);
        }
    };

    return (
        <div className="flex h-screen">
            <div
                className="hidden md:flex w-1/2 bg-cover bg-center"
                style={{ backgroundImage: "url('/mountain.jpg')" }}
            >
                <div className="flex flex-col justify-center items-center w-full bg-black/50 text-white p-8">
                    <h1 className="text-4xl font-bold mb-4">Create your Account</h1>
                    <p className="text-lg">Share your artwork and Get projects!</p>
                </div>
            </div>

            <div className="flex w-full md:w-1/2 justify-center items-center bg-white">
                <form onSubmit={handleSubmit} className="w-80">
                    <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

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
                        className="w-full bg-button hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded"
                    >
                        Entrar
                    </button>

                    <div className="mt-4">
                        <GoogleLoginButton />
                    </div>

                    <p className="mt-4 text-center text-gray-600">
                        Já tem uma conta?{" "}
                        <Link to="/register" className="font-bold underline">
                            Register
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
