'use client';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Papa from 'papaparse';
import { setUsers } from '../store/slices/usersSlice';
import { User } from '../store/slices/usersSlice';
import Style from '../styles/FileUpload.module.css';
import { generatePassword } from '../controllers/password.controllers';

const UploadCSV = ({ companyId }: { companyId: number }) => {
    const dispatch = useDispatch();
    const [fileName, setFileName] = useState('No hay archivos seleccionados');
    const [loading, setLoading] = useState(false);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        console.log('Archivo seleccionado:', file);

        if (file) {
            setFileName(file.name);

            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: (result) => {
                    console.log('Contenido del CSV:', result.data);
                    const users: User[] = result.data.map((row: any) => ({
                        id: parseInt(row.id, 10),
                        name: row.name,
                        email: row.email,
                        role: row.role,
                        password: generatePassword(row.name),
                        tasks: [],
                    }));

                    dispatch(setUsers(users));
                    sendUsersToServer(users);
                },
                error: (error) => {
                    console.error('Error parsing CSV:', error);
                },
            });
        } else {
            console.error('No se seleccionó ningún archivo.');
        }
    };

    const sendUsersToServer = async (users: User[]) => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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
            <div className={Style["content-title"]}>
                <h1>Task Assignment Dashboard</h1>
            </div>
            <div className={Style["file-upload-container"]}>
                <label htmlFor="upload" className={Style["uploadButton"]}>
                    <span className={Style["icon"]}>📁</span> Cargar
                </label>
                <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className={Style["inputField"]}
                    id="upload"
                />
                <span className={Style["fileName"]}>{fileName}</span>
                <button 
                    type="button"  // Asegúrate de que el tipo sea "button"
                    className={Style["uploadButton"]} 
                    disabled={loading} 
                    onClick={(e) => { 
                        e.preventDefault(); // Asegúrate de prevenir el comportamiento por defecto
                    }}
                >
                    {loading ? 'Cargando...' : 'Descargar'}
                </button>
            </div>
        </div>
    );
};

export default UploadCSV;
