'use client';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Papa from 'papaparse';
import { setUsers } from '../store/slices/usersSlice';
import { User } from '../store/slices/usersSlice';
import Style from '../styles/FileUpload.module.css';

const UploadCSV = () => {
  const dispatch = useDispatch();
  const [fileName, setFileName] = useState('No file chosen');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const users: User[] = result.data.map((row: any) => ({
            id: parseInt(row.id, 10),
            name: row.name,
            email: row.email,
            role: row.role,
            tasks: [], // Inicialmente vacío
          }));
          dispatch(setUsers(users));
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
        },
      });
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
        <button className={Style["uploadButton"]}>Descargar</button>
      </div>
    </div>
  );
};

export default UploadCSV;
