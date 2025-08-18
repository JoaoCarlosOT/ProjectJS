import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useMessage } from '../../context/FlashMessageContext';
import GoogleLoginButton from '../../components/LoginGoogle';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { loginSchema } from '../../schemas/userSchema';

type LoginFormState = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState<LoginFormState>({ email: '', password: '' });
    const [errors, setErrors] = useState<Partial<Record<keyof LoginFormState, string>>>({});

    const { login } = useAuth();
    const { setMessage } = useMessage();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: undefined });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validation = loginSchema.safeParse(form);

        if (!validation.success) {
            const fieldErrors: Partial<Record<keyof LoginFormState, string>> = {};
            validation.error.issues.forEach((err) => {
                const key = err.path[0] as keyof LoginFormState;
                if (key) fieldErrors[key] = err.message;
            });
            setErrors(fieldErrors);
            return;
        }

        try {
            await login(form);
            setMessage({ type: 'success', text: 'Logado com sucesso!' });
            navigate('/');
        } catch (error: any) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Erro ao logar!' });
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
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
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
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
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
                        Não tem conta?{" "}
                        <Link to="/register" className="font-bold underline">
                            Registrar
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
