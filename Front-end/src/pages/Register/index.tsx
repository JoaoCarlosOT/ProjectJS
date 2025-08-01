import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import GoogleLoginButton from '../../components/LoginGoogle';
import { useMessage } from '../../context/FlashMessageContext';
import { MessageResponse } from '../../types/MessageResponse';
import { Link } from 'react-router-dom';

type LoginUser = {
    email: string;
    password: string;
};

const Register: React.FC = () => {
    const [user, setUser] = useState<LoginUser>({ email: '', password: '' });
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { register } = useAuth();
    const { setMessage } = useMessage();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfileImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user.email || !user.password || !profileImage) {
            setMessage({ type: 'error', text: 'Preencha todos os campos e selecione uma imagem.' });
            return;
        }

        const formData = new FormData();
        formData.append('email', user.email);
        formData.append('password', user.password);
        formData.append('profileImage', profileImage);

        try {
            const res = await register(formData);
            const msg = res.data.message || "Registrado com sucesso";
            setMessage({ type: 'success', text: msg });
        } catch (error) {
            setMessage({ type: 'error', text: 'Erro ao registrar. Verifique os dados e tente novamente.' });
        }
    };

    return (
        <div className="flex h-screen">
            {/* Lado da imagem */}
            <div
                className="hidden md:flex w-1/2 bg-cover bg-center"
                style={{ backgroundImage: "url('/mountain.jpg')" }}
            >
                <div className="flex flex-col justify-center items-center w-full bg-black/50 text-white p-8">
                    <h1 className="text-4xl font-bold mb-4">Create your Account</h1>
                    <p className="text-lg">Share your artwork and Get projects!</p>
                </div>
            </div>

            {/* Lado do formulário */}
            <div className="flex w-full md:w-1/2 justify-center items-center bg-white">
                <form
                    onSubmit={handleSubmit}
                    className="w-80"
                    encType="multipart/form-data"
                >
                    <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                            placeholder="Digite seu email"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Senha</label>
                        <input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                            placeholder="Digite sua senha"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Imagem de Perfil</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full text-sm"
                        />
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="mt-4 w-24 h-24 object-cover rounded-full mx-auto"
                            />
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-button hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded"
                    >
                        Registrar
                    </button>

                    <div className="mt-4">
                        <GoogleLoginButton />
                    </div>

                    <p className="mt-4 text-center text-gray-600">
                        Já tem uma conta?{" "}
                        <Link to="/login" className="font-bold underline">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
