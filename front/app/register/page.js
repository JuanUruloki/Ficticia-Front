'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    return re.test(password);
  };

  const handleSubmit = async (e) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL; // Obtener la URL del backend desde la variable de entorno
    e.preventDefault();
    let validationErrors = {};

    if (!name) {
      validationErrors.name = 'Debe completar este campo';
    }

    if (!email) {
      validationErrors.email = 'Debe completar este campo';
    } else if (!validateEmail(email)) {
      validationErrors.email = 'Correo electrónico no válido';
    }

    if (!password) {
      validationErrors.password = 'Debe completar este campo';
    } else if (!validatePassword(password)) {
      validationErrors.password = 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un carácter especial';
    }

    if (!confirmPassword) {
      validationErrors.confirmPassword = 'Debe completar este campo';
    } else if (password !== confirmPassword) {
      validationErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post(`${API_URL}/api/auth/register`, { // Usar la URL del backend configurada
        name,
        email,
        password,
      });
      router.push('/login');
    } catch (error) {
      console.error('Error al crear la cuenta', error);
      if (error.response && error.response.data) {
        setErrors({ server: error.response.data.message });
      } else {
        setErrors({ server: 'Error al crear la cuenta. Por favor, inténtelo de nuevo más tarde.' });
      }
    }
  };

  useEffect(() => {
    const validationErrors = {};
    if (email && !validateEmail(email)) {
      validationErrors.email = 'Correo electrónico no válido';
    }
    if (password && !validatePassword(password)) {
      validationErrors.password = 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un carácter especial';
    }
    if (confirmPassword && password !== confirmPassword) {
      validationErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    setErrors(validationErrors);
  }, [email, password, confirmPassword]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Crear Cuenta</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-titles mb-2" htmlFor="name">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => {
              if (!name) setErrors((prev) => ({ ...prev, name: 'Debe completar este campo' }));
            }}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
          {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-titles mb-2" htmlFor="email">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => {
              if (!email) setErrors((prev) => ({ ...prev, email: 'Debe completar este campo' }));
            }}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
          {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
        </div>
        <div className="mb-4 relative">
          <label className="block text-gray-700 text-sm font-titles mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => {
              if (!password) setErrors((prev) => ({ ...prev, password: 'Debe completar este campo' }));
            }}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 px-3 py-2 font-body text-gray-600"
          >
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
          {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
        </div>
        <div className="mb-6 relative">
          <label className="block text-gray-700 text-sm font-titles mb-2" htmlFor="confirmPassword">
            Confirmar Contraseña
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={() => {
              if (!confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: 'Debe completar este campo' }));
            }}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 px-3 py-2 font-body text-gray-600"
          >
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
          {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword}</p>}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white text-xl font-header font-bold tracking-wider py-2 px-4 rounded shadow-md focus:outline-none focus:shadow-outline"
          >
            Crear Cuenta
          </button>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="bg-gray-500 hover:bg-gray-700 text-white text-xl font-header font-bold tracking-wider py-2 px-4 rounded shadow-md focus:outline-none focus:shadow-outline"
          >
            Cancelar
          </button>
        </div>
        {errors.server && <p className="text-red-500 text-xs italic mt-4">{errors.server}</p>}
      </form>
      <p className="mt-4 font-body">
        ¿Ya tienes una cuenta?{' '}
        <a href="/login" className="text-blue-500 hover:text-blue-700">
          Iniciar Sesión
        </a>
      </p>
    </div>
  );
}