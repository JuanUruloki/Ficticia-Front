'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/auth/login', {
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
        <div className="mb-6">
          <label className="block text-gray-700 text-mg font-titles mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
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