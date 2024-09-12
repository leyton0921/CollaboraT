'use client';
import { useDispatch } from 'react-redux';
import Papa from 'papaparse';
import { setUsers } from '../store/slices/usersSlice';
import { User } from '../store/slices/usersSlice'; 
import Style from '../styles/FileUpload.module.css'

const UploadCSV = () => {
  const dispatch = useDispatch();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
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
    <div className={Style["file-upload-container"]}>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className={Style["file-input"]}
        id="upload"
      />
      <label htmlFor="upload" className={Style["file-label"]}>
        <span>Add CSV file</span>
        <span className={Style["file-icon"]}>📁</span>
      </label>
    </div>
  );
};

export default UploadCSV;
