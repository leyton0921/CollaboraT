'use client';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Papa from 'papaparse';
import { setUsers } from '../store/slices/usersSlice';
import { User } from '../store/slices/usersSlice';
import { generatePassword } from '../controllers/password.controllers';

// Función para manejar la carga del archivo CSV
const UploadCSV = ({ companyId }: { companyId: number }) => {
    const dispatch = useDispatch();
    const [fileName, setFileName] = useState('No hay archivos seleccionados');
    const [loading, setLoading] = useState(false);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            setFileName(file.name);

            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: (result) => {
                    const users = result.data.map((row: any) => ({
                        id: row.id,
                        name: row.name,
                        email: row.email,
                        role: row.role,
                        password: generatePassword(row.name), // Genera contraseña personalizada
                        tasks: [],
                    }));

                    dispatch(setUsers(users));  // Almacenar los usuarios en Redux

                    // Mostrar los usuarios y contraseñas en consola
                    console.log("Usuarios cargados con contraseñas generadas:");
                    users.forEach((user) => {
                        console.log(`ID: ${user.id}, Nombre: ${user.name}, Email: ${user.email}, Rol: ${user.role}, Contraseña: ${user.password}`);
                    });

                    sendUsersToServer(users);   // Enviar los usuarios al servidor
                },
                error: (error) => {
                    console.error('Error parsing CSV:', error);
                },
            });
        }
    };

    const sendUsersToServer = async (users: User[]) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');  // Obtener el token desde localStorage
            const response = await fetch(`http://localhost:4000/api/v1/auth/register/companies/${companyId}/collaborators`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`  // Asegúrate de enviar un token válido
                },
                body: JSON.stringify(users),
            });
    
            if (!response.ok) {
                throw new Error('Error al enviar los usuarios al servidor');
            }
    
            const data = await response.json();
            console.log('Usuarios registrados con éxito:', data);
        } catch (error) {
            console.error('Error al enviar los usuarios al servidor:', error);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div>
            <div>
                <h1>Panel de asignación de tareas</h1>
            </div>
            <div>
                <label htmlFor="upload">
                    <span>📁</span> Cargar
                </label>
                <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    id="upload"
                />
                <span>{fileName}</span>
                <button type="button" disabled={loading}>
                    {loading ? 'Cargando...' : 'Descargar'}
                </button>
            </div>
        </div>
    );
};

export default UploadCSV;
