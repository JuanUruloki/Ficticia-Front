'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { LuDelete } from "react-icons/lu";
import { TbUserEdit } from "react-icons/tb";

export default function Dashboard() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
      const fetchClients = async () => {
        const { data } = await axios.get('http://localhost:5001/api/clients', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClients(data);
        setLoading(false);
      };

      fetchClients();
    }
  }, [router]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5001/api/clients/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClients(clients.filter((client) => client.id !== id));
    } catch (error) {
      console.error('Error al eliminar el cliente', error);
    }
  };

  if (!isAuthenticated) {
    return <div>Redirigiendo...</div>;
  }

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Clientes</h1>
      <button
        onClick={() => router.push('/clients')}
        className="bg-green-500 hover:bg-green-700 text-white tracking-wider font-header font-bold text-2xl py-2 px-4 rounded mb-4 shadow-md"
      >
        Agregar Cliente
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white  shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200 font-body">
            <tr>
              <th className="py-2 px-4">Nombre Completo</th>
              <th className="py-2 px-4">Identificación</th>
              <th className="py-2 px-4">Edad</th>
              <th className="py-2 px-4">Género</th>
              <th className="py-2 px-4">Estado</th>
              <th className="py-2 px-4">Maneja</th>
              <th className="py-2 px-4">Lentes</th>
              <th className="py-2 px-4">Diabetes</th>
              <th className="py-2 px-4">Enfermedades</th>
              <th className="py-2 px-4">Acciones</th>
            </tr>
          </thead>
          <tbody className='font-body'>
            {clients.map((client) => (
              <tr key={client.id} className="border-b">
                <td className="py-2 px-4">{client.fullName}</td>
                <td className="py-2 px-4">{client.identification}</td>
                <td className="py-2 px-4">{client.age}</td>
                <td className="py-2 px-4">{client.gender}</td>
                <td className="py-2 px-4">{client.isActive ? 'Activo' : 'Inactivo'}</td>
                <td className="py-2 px-4">{client.drives ? 'Maneja' : 'No maneja'}</td>
                <td className="py-2 px-4">{client.wearsGlasses ? 'Usa' : 'No usa'}</td>
                <td className="py-2 px-4">{client.isDiabetic ? 'Si' : 'No'}</td>
                <td className="py-2 px-4">{client.otherDiseases}</td>

                <td className="py-2 px-4">
                  <button
                    onClick={() => router.push(`/clients/edit/${client.id}`)}
                    className=" w-10 text-black tracking-wider font-header font-bold text-xl px-4 py-2  "
                  >
                    <TbUserEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(client.id)}
                    className=" w-10 text-black tracking-wider font-header font-bold text-xl px-4 py-2  ml-2 "
                  >
                    <LuDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}