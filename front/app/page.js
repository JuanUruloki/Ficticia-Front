'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuth } from './context/AuthContext';

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-t from-gray-400 to-gray-000">
      <h1 className="text-4xl font-bold text-gray-800 mb-4 font-titles text-center">Bienvenido a Ficticia S.A.</h1>
      <p className="text-lg text-gray-700 mb-8 text-center font-titles  max-w-2xl">
        En Ficticia S.A., entendemos la importancia de la seguridad y la confianza. Nuestro seguro de vida está diseñado para brindarte la tranquilidad que necesitas, sabiendo que tus seres queridos estarán protegidos en todo momento. Con años de experiencia en el sector, nos comprometemos a ofrecerte un servicio de calidad, adaptado a tus necesidades específicas. Confía en nosotros para asegurar tu futuro y el de tu familia.
      </p>
    </div>
  );
}