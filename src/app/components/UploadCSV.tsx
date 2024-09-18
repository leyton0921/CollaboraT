'use client';
import { useDispatch } from 'react-redux';
import Papa from 'papaparse';
import { registerCollaborator } from '../controllers/register.colaborates.controllers';
import Style from '../styles/FileUpload.module.css';

const UploadCSV = () => {
  const dispatch = useDispatch();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: async (result) => {
          const rows = result.data as any[];

          for (const row of rows) {
            const { name, email, role, companyId, occupationId } = row;

            try {
              //registrar cada colaborador
              const response = await registerCollaborator(
                name,
                email,
                role,
                companyId,
                parseInt(occupationId, 10)
              );

              if (response.user) {
                console.log(`Colaborador ${name} registrado con éxito`);
              } else {
                console.error(`Error registrando a ${name}: ${response.message}`);
              }
            } catch (error) {
              console.error('Error al registrar colaborador:', error);
            }
          }
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
        },
      });
    }
  };

  return (
    <div className={Style['file-upload-container']}>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className={Style['file-input']}
        id="upload"
      />
      <label htmlFor="upload" className={Style['file-label']}>
        <span>Añadir archivo CSV</span>
        <span className={Style['file-icon']}>📁</span>
      </label>
    </div>
  );
};

export default UploadCSV;
