"use client";
import { useDispatch } from 'react-redux';
import Papa from 'papaparse';
import { setUsers } from '../store/slices/usersSlice';

const UploadCSV = () => {
  const dispatch = useDispatch();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (result) => {
          const users = result.data as any[];
          dispatch(setUsers(users));
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
      className="bg-purple-100 text-purple-600 px-8 py-4 rounded-lg shadow-md flex justify-center items-center cursor-pointer width-2"
    >
      <span>Add CSV file</span>
      <span className="ml-3 text-lg">📁</span>
    </label>
  </div>
);
};

export default UploadCSV;
