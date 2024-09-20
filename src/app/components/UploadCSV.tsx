'use client';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Papa from 'papaparse';
import { setUsers } from '../store/slices/usersSlice';
import { User } from '../store/slices/usersSlice';
import Style from '../styles/FileUpload.module.css';
import { registerUsers } from '../controllers/registerUsers.controllers';
import { generatePassword } from '../controllers/password.controllers';

const UploadCSV = ({ companyId }: { companyId: number }) => {
    const dispatch = useDispatch();
    const [fileName, setFileName] = useState('No file chosen');
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
                    const users: User[] = result.data.map((row: any) => {
                        const password = generatePassword(row.name);//
                        //aqui va la funcion de email
                        console.log(`Email: ${row.email}, Password: ${password}`);

                        return {
                            id: parseInt(row.id, 10),
                            name: row.name,
                            email: row.email,
                            role: row.role,
                            password: password,
                            tasks: [],
                        };
                    });

                    dispatch(setUsers(users));
                    sendFileAndUsersToServer(users);
                },
                error: (error) => {
                    console.error('Error parsing CSV:', error);
                },
            });
        } else {
            console.error('No se seleccionó ningún archivo.');
        }
    };

    const sendFileAndUsersToServer = async (users: User[]) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await registerUsers(companyId, users);
            console.log('Usuarios registrados con éxito:', response);
        } catch (error) {
            console.error('Error al enviar los usuarios al servidor:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className={Style["content-tittle"]}>
                <h1>Task Assignment Dashboard</h1>
            </div>
            <div className={Style["file-upload-container"]}>
                <label htmlFor="upload" className={Style["uploadButton"]}>
                    <span className={Style["icon"]}>📁</span> Upload
                </label>
                <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className={Style["inputField"]}
                    id="upload"
                />
                <span className={Style["fileName"]}>{fileName}</span>
                <button className={Style["uploadButton"]} disabled={loading}>
                    {loading ? 'Cargando...' : 'Descargar'}
                </button>
            </div>
        </div>
    );
};

export default UploadCSV;
