'use client';
import { useDispatch } from 'react-redux';
import Papa from 'papaparse';
import { setUsers } from '../store/slices/usersSlice';
import { User } from '../store/slices/usersSlice'; 
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
    <div className="mb-8 text-center">
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="hidden"
        id="upload"
      />
      <label
        htmlFor="upload"
        className="bg-purple-100 text-purple-600 px-8 py-4 rounded-lg shadow-md flex justify-center items-center cursor-pointer"
      >
        <span>Add CSV file</span>
        <span className="ml-3 text-lg">📁</span>
      </label>
    </div>
  );
};

export default UploadCSV;
