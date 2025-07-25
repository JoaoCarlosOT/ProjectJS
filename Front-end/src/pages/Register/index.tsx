import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import GoogleLoginButton from '../../components/LoginGoogle';
import { useMessage } from '../../context/FlashMessageContext';
import { MessageResponse } from '../../types/MessageResponse';

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
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md w-80"
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
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                >
                    Registrar
                </button>
                <GoogleLoginButton />
            </form>
        </div>
    );
};

export default Register;
