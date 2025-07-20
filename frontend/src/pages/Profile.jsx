import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


const Profile = () => {
    const { user, login } = useContext(AuthContext);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        direccion: ''
    });
    const [notification, setNotification] = useState('');

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            setFormData({
                nombre: user.name || '',
                apellido: user.lastName || '',
                email: user.email || '',
                direccion: user.address || ''
            });
        }
    }, [user, navigate]);


    const onChangeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSaveChanges = (e) => {
        e.preventDefault();
        if (!user) return; 

        const allUsers = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = allUsers.findIndex(u => u.email === user.email);

        if (userIndex !== -1) {
            const updatedUser = { ...allUsers[userIndex], ...formData };
            allUsers[userIndex] = updatedUser;
            
            localStorage.setItem('users', JSON.stringify(allUsers));
            login(updatedUser); 
            
            setNotification('¡Datos actualizados con éxito!');
            setTimeout(() => setNotification(''), 3000);
        }
    };
    
    if (!user) {
        return (
            <div className="text-center my-20">
                <p>Cargando perfil...</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto my-10 p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6">Mi Perfil</h1>
            {notification && <p className="bg-green-100 text-green-800 p-3 rounded mb-4">{notification}</p>}
            <form onSubmit={handleSaveChanges} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input type="text" name="nombre" value={formData.nombre} onChange={onChangeHandler} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Apellido</label>
                    <input type="text" name="apellido" value={formData.apellido} onChange={onChangeHandler} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email (no se puede editar)</label>
                    <input type="email" name="email" value={formData.email} disabled className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Dirección</label>
                    <input type="text" name="direccion" value={formData.direccion} onChange={onChangeHandler} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                </div>
                <button type="submit" className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800">
                    Guardar Cambios
                </button>
            </form>
        </div>
    );
};

export default Profile;