import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import api from '../../services/api';
import { useMessage } from '../../context/FlashMessageContext';

const EditProfile = () => {
    const { user, setUser } = useContext(AppContext);
    const { setMessage } = useMessage();

    const [name, setName] = useState(user?.name || '');
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                window.history.back();
            }
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, []);

    const handleClickOutside = (e: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            window.history.back();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        if (image) formData.append('profileImage', image);

        try {
            const res = await api.put('/profile', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setUser((res.data as any)?.user);
            setMessage({ type: 'success', text: (res.data as any)?.message || 'Perfil atualizado com sucesso!' });
            window.history.back();
        } catch (err: any) {
            const msg = err.response?.data?.message || 'Erro ao atualizar perfil';
            setMessage({ type: 'error', text: msg });
        }
    };

    const currentImageUrl = user?.profileImage?.startsWith('http')
        ? user.profileImage
        : `${import.meta.env.VITE_API_URL}/uploads/user/${user?.profileImage}`;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
            <div ref={modalRef} className="bg-background p-6 rounded-xl w-full max-w-md shadow-lg relative">
                <h2 className="text-xl font-semibold mb-4">Editar Perfil</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">Nome</label>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="w-full bg-card px-3 py-2 border rounded focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Imagem de Perfil</label>

                        <div className="flex justify-center gap-6 items-center mt-2">
                            {currentImageUrl && !imagePreview && (
                                <div className="text-center">
                                    <p className="text-xs mb-1">Atual</p>
                                    <img
                                        src={currentImageUrl}
                                        alt="Imagem atual"
                                        className="w-20 h-20 object-cover rounded-full border"
                                    />
                                </div>
                            )}

                            {imagePreview && (
                                <div className="text-center">
                                    <p className="text-xs mb-1">Novo</p>
                                    <img
                                        src={imagePreview}
                                        alt="Preview da nova imagem"
                                        className="w-20 h-20 object-cover rounded-full border"
                                    />
                                </div>
                            )}
                        </div>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full mt-3 text-sm"
                        />
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="px-4 py-2 border rounded"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
