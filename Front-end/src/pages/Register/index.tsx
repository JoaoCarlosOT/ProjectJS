import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import GoogleLoginButton from '../../components/LoginGoogle';
import { useMessage } from '../../context/FlashMessageContext';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { registerSchema } from '../../schemas/userSchema';
import { useTogglePassword } from "../../hooks/useChangeType";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";

type RegisterFormState = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
    const [form, setForm] = useState<Partial<RegisterFormState>>({
        name: '',
        email: '',
        password: '',
    });
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormState | 'profileImage', string>>>({});
    const { visible, toggle, inputType } = useTogglePassword();

    const { register } = useAuth();
    const { setMessage } = useMessage();

    useEffect(() => {
        if (profileImage) {
            setImagePreview(URL.createObjectURL(profileImage));
        }
    }, [profileImage]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: undefined });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;

        if (!file) return;

        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
            setErrors({ ...errors, profileImage: 'Apenas PNG, JPG ou JPEG são permitidos' });
            setProfileImage(null);
            setImagePreview(null);
            return;
        }

        const maxSize = 15 * 1024 * 1024;
        if (file.size > maxSize) {
            setErrors({ ...errors, profileImage: 'A imagem deve ter no máximo 15 MB' });
            setProfileImage(null);
            setImagePreview(null);
            return;
        }

        setProfileImage(file);
        setImagePreview(URL.createObjectURL(file));
        setErrors({ ...errors, profileImage: undefined });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validation = registerSchema.safeParse({ ...form });

        if (!validation.success) {
            const fieldErrors: Partial<Record<keyof RegisterFormState | 'profileImage', string>> = {};
            validation.error.issues.forEach((err) => {
                const key = err.path[0] as keyof RegisterFormState;
                if (key) fieldErrors[key] = err.message;
            });
            setErrors(fieldErrors);
            return;
        }

        if (!profileImage) {
            setErrors({ ...errors, profileImage: 'Selecione uma imagem de perfil' });
            return;
        }

        const formData = new FormData();
        formData.append('name', form.name!);
        formData.append('email', form.email!);
        formData.append('password', form.password!);
        formData.append('profileImage', profileImage);

        try {
            const res = await register(formData);
            const msg = (res.data as any)?.message || 'Registrado com sucesso';
            setMessage({ type: 'success', text: msg });
        } catch (error: any) {
            setMessage({
                type: 'error',
                text: error.response?.data?.message || 'Erro ao registrar. Verifique os dados e tente novamente.',
            });
        }
    };

    return (
        <div className="flex h-screen text-texto">
            <div
                className="hidden md:flex w-1/2 bg-cover bg-center"
                style={{ backgroundImage: "url('/mountain.jpg')" }}
            >
                <div className="flex flex-col justify-center items-center w-full bg-black/50 text-white p-8">
                    <h1 className="text-4xl font-bold mb-4">Organize suas Tarefas</h1>
                    <p className="text-lg">Acompanhe e complete suas tarefas com facilidade!</p>
                </div>
            </div>

            <div className="flex w-full md:w-1/2 justify-center items-center bg-background">
                <form onSubmit={handleSubmit} className="w-80" encType="multipart/form-data">
                    <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

                    <div className="mb-4">
                        <label className="bloc text-sm font-semibold mb-2">Nome</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name || ''}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                            placeholder="Digite seu nome"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="bloc text-sm font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email || ''}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                            placeholder="Digite seu email"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    <div className="mb-4 relative">
                        <label className="block text-sm font-semibold mb-2">Senha</label>
                        <input
                            type={inputType}
                            name="password"
                            value={form.password || ''}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                            placeholder="Digite sua senha"
                        />
                        <button
                            type="button"
                            onClick={toggle}
                            className="absolute right-3 top-10 text-gray-500"
                        >
                            {visible ? <FaEyeSlash /> : <IoEyeSharp />}
                        </button>
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-semibold mb-2">Imagem de Perfil</label>
                        <input
                            type="file"
                            accept="image/png, image/jpeg, image/jpg"
                            onChange={handleImageChange}
                            className="w-full text-sm"
                        />
                        {errors.profileImage && <p className="text-red-500 text-sm">{errors.profileImage}</p>}
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

                    <p className="mt-4 text-center">
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
