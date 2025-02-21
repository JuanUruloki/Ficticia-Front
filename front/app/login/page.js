'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL; // Obtener la URL del backend desde la variable de entorno
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, { // Usar la URL del backend configurada
        email,
        password,
      });
      console.log('Login response:', response.data); // Verificar la respuesta del servidor
      login(response.data.token);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error al iniciar sesión', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <div className="mb-4">
          <label className="block text-gray-700 text-mg font-titles mb-2" htmlFor="email">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6 relative">
          <label className="block text-gray-700 text-mg font-titles mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 px-3 py-2 font-body text-gray-600"
          >
            {showPassword ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white text-2xl font-header font-bold tracking-wider py-2 px-4  rounded shadow-md focus:outline-none focus:shadow-outline"
          >
            Iniciar Sesión
          </button>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="bg-gray-500 hover:bg-gray-700 text-white text-2xl font-header font-bold tracking-wider py-2 px-4 rounded shadow-md focus:outline-none focus:shadow-outline"
          >
            Cancelar
          </button>
        </div>
      </form>
      <p className="mt-4 text-mg font-body">
        ¿No tienes una cuenta?{' '}
        <a href="/register" className="text-blue-500 hover:text-blue-700">
          Crear Cuenta
        </a>
      </p>
    </div>
  );
}