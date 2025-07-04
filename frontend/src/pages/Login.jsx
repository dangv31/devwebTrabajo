import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirigir al usuario
import { ShopContext } from '../context/ShopContext.jsx'; // Para acceder al estado de sesión

const Login = () => {
    const [currentState, setCurrentState] = useState('Iniciar Sesión');

    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        direccion: '',
        password: '',
        confirmPassword: ''
    });

    const [notification, setNotification] = useState({ message: '', type: '' });

    const navigate = useNavigate(); 
    const { login } = useContext(ShopContext); 

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();
        setNotification({ message: '', type: '' });

        if (currentState === 'Registrarse') {
            if (formData.password !== formData.confirmPassword) {
                setNotification({ message: 'Las contraseñas no coinciden.', type: 'error' });
                return;
            }

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userExists = users.some(user => user.email === formData.email);

            if (userExists) {
                setNotification({ message: 'El correo electrónico ya está registrado.', type: 'error' });
                return;
            }

            const newUser = { ...formData };
            delete newUser.confirmPassword;
            users.push(newUser);

            localStorage.setItem('users', JSON.stringify(users));
            setNotification({ message: '¡Registro exitoso! Ahora puedes iniciar sesión.', type: 'success' });
            setCurrentState('Iniciar Sesión');
        }

        else {
            // Datos simulados del administrador
            const ADMIN_EMAIL = 'admin@berriondo.com';
            const ADMIN_PASS = 'admin123';

            if (formData.email === ADMIN_EMAIL && formData.password === ADMIN_PASS) {
                const adminUser = {
                    nombre: 'Admin',
                    email: ADMIN_EMAIL,
                    role: 'admin' 
                };
                login(adminUser); 
                navigate('/');  
                return; 
            }

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === formData.email);

            if (user && user.password === formData.password) {
                login(user);   
                navigate('/'); 
            } else {
                setNotification({ message: 'Credenciales inválidas. Por favor, inténtalo de nuevo.', type: 'error' });
            }
        }
    };

    return (
        <div className='w-full min-h-screen bg-gray-100 flex items-start justify-center p-4 pt-15'>
            <form onSubmit={onSubmitHandler} className='w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-200 flex flex-col gap-4'>
                
                <h1 className='prata-regular text-3xl text-gray-800 text-center font-semibold mb-4'>
                    {currentState}
                </h1>
                
                {notification.message && (
                    <div className={`w-full text-center p-2 rounded ${
                        notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                        {notification.message}
                    </div>
                )}

                <div className='flex flex-col gap-4 max-h-[55vh] overflow-y-auto pr-2'>
                    {currentState === 'Registrarse' && (
                        <>
                            <input name='nombre' onChange={onChangeHandler} value={formData.nombre} type="text" className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Nombre' required />
                            <input name='apellido' onChange={onChangeHandler} value={formData.apellido} type="text" className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Apellido' required />
                        </>
                    )}
                    <input name='email' onChange={onChangeHandler} value={formData.email} type="email" className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Email' required />
                    {currentState === 'Registrarse' && (
                        <input name='direccion' onChange={onChangeHandler} value={formData.direccion} type="text" className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Dirección' required />
                    )}
                    <input name='password' onChange={onChangeHandler} value={formData.password} type="password" className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Contraseña' required />
                    {currentState === 'Registrarse' && (
                        <input name='confirmPassword' onChange={onChangeHandler} value={formData.confirmPassword} type="password" className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Confirmar contraseña' required />
                    )}
                </div>

                {currentState === 'Iniciar Sesión' && (
                    <p className='w-full text-sm -mt-1'>
                        ¿Olvidaste tu contraseña?
                        <span className='ml-2 font-bold text-indigo-600 cursor-pointer hover:underline'>
                            Click acá
                        </span>
                    </p>
                )}

                <button type="submit" className='w-full bg-black text-white font-semibold py-2 mt-4 rounded-md hover:bg-gray-800 transition-colors'>
                    {currentState === 'Iniciar Sesión' ? 'Iniciar Sesión' : 'Crear Cuenta'}
                </button>

                {currentState === 'Iniciar Sesión' ? (
                    <p className='text-sm text-center'>
                        ¿No tienes una cuenta?
                        <span onClick={() => { setCurrentState('Registrarse'); setNotification({ message: '', type: '' }); }}
                              className='ml-2 font-bold text-indigo-600 cursor-pointer hover:underline'>
                            Regístrate aquí
                        </span>
                    </p>
                ) : (
                    <p className='text-sm text-center'>
                        ¿Ya tienes una cuenta?
                        <span onClick={() => { setCurrentState('Iniciar Sesión'); setNotification({ message: '', type: '' }); }}
                              className='ml-2 font-bold text-indigo-600 cursor-pointer hover:underline'>
                            Inicia sesión aquí
                        </span>
                    </p>
                )}
            </form>
        </div>
    );
};

export default Login;