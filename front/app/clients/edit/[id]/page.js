'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';

export default function EditClient() {
  const [fullName, setFullName] = useState('');
  const [identification, setIdentification] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [drives, setDrives] = useState(false);
  const [wearsGlasses, setWearsGlasses] = useState(false);
  const [isDiabetic, setIsDiabetic] = useState(false);
  const [otherDiseases, setOtherDiseases] = useState('');
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const token = localStorage.getItem('token');
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const { data } = await axios.get(`${API_URL}/api/clients/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFullName(data.fullName);
        setIdentification(data.identification);
        setAge(data.age);
        setGender(data.gender);
        setIsActive(data.isActive);
        setDrives(data.drives);
        setWearsGlasses(data.wearsGlasses);
        setIsDiabetic(data.isDiabetic);
        setOtherDiseases(data.otherDiseases);
      } catch (error) {
        console.error('Error al obtener los datos del cliente', error);
      }
    };

    fetchClient();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    try {
      await axios.put(
        `${API_URL}/api/clients/${id}`,
        {
          fullName,
          identification,
          age: parseInt(age),
          gender,
          isActive,
          drives,
          wearsGlasses,
          isDiabetic,
          otherDiseases,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      router.push('/dashboard');
    } catch (error) {
      if (error.response && error.response.data) {
        const { status, data } = error.response;
        if (status === 409 && data.field === 'identification') {
          setErrors({ identification: 'Cliente ya existe' });
        } else {
          setErrors({ [data.field]: data.message });
        }
      } else {
        console.error('Error al actualizar el cliente', error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-titlestitles text-gray-800 mb-4">Editar Cliente</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <div className="mb-4">
          <label className="block text-gray-700 text-mg font-titles mb-2" htmlFor="fullName">
            Nombre Completo
          </label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
          {errors.fullName && <p className="text-red-500 text-xs italic">{errors.fullName}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-mg font-titles mb-2" htmlFor="identification">
            Identificación
          </label>
          <input
            type="text"
            id="identification"
            value={identification}
            onChange={(e) => setIdentification(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
          {errors.identification && <p className="text-red-500 text-xs italic">{errors.identification}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-mg font-titles mb-2" htmlFor="age">
            Edad
          </label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
          {errors.age && <p className="text-red-500 text-xs italic">{errors.age}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-mg font-titles mb-2" htmlFor="gender">
            Género
          </label>
          <input
            type="text"
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
          {errors.gender && <p className="text-red-500 text-xs italic">{errors.gender}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-mg font-titles mb-2" htmlFor="isActive">
            Activo
          </label>
          <input
            type="checkbox"
            id="isActive"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="form-checkbox h-5 w-5 text-green-600"
          />
          {errors.isActive && <p className="text-red-500 text-xs italic">{errors.isActive}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-mg font-titles mb-2" htmlFor="drives">
            Conduce
          </label>
          <input
            type="checkbox"
            id="drives"
            checked={drives}
            onChange={(e) => setDrives(e.target.checked)}
            className="form-checkbox h-5 w-5 text-green-600"
          />
          {errors.drives && <p className="text-red-500 text-xs italic">{errors.drives}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-mg font-titles mb-2" htmlFor="wearsGlasses">
            Usa Gafas
          </label>
          <input
            type="checkbox"
            id="wearsGlasses"
            checked={wearsGlasses}
            onChange={(e) => setWearsGlasses(e.target.checked)}
            className="form-checkbox h-5 w-5 text-green-600"
          />
          {errors.wearsGlasses && <p className="text-red-500 text-xs italic">{errors.wearsGlasses}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-mg font-titles mb-2" htmlFor="isDiabetic">
            Diabético
          </label>
          <input
            type="checkbox"
            id="isDiabetic"
            checked={isDiabetic}
            onChange={(e) => setIsDiabetic(e.target.checked)}
            className="form-checkbox h-5 w-5 text-green-600"
          />
          {errors.isDiabetic && <p className="text-red-500 text-xs italic">{errors.isDiabetic}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-mg font-titles mb-2" htmlFor="otherDiseases">
            Otras Enfermedades
          </label>
          <input
            type="text"
            id="otherDiseases"
            value={otherDiseases}
            onChange={(e) => setOtherDiseases(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.otherDiseases && <p className="text-red-500 text-xs italic">{errors.otherDiseases}</p>}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold font-header text-xl tracking-wider py-2 px-4 rounded shadow-md focus:outline-none focus:shadow-outline"
          >
            Actualizar Cliente
          </button>
          <button
            type="button"
            onClick={() => router.push('/dashboard')}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold font-header text-xl tracking-wider py-2 px-4 rounded shadow-md focus:outline-none focus:shadow-outline"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}