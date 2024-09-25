"use client";
import { useEffect, useState } from 'react';
import NavBArLEader from '../UI/navBarLader';
import { useRouter } from 'next/navigation';
import Spinner from '../UI/Spiner/spiner';
import UserTable from '../components/UserTable';

const HomeLeader = () => {
  const router = useRouter();
  const role = localStorage.getItem('role');
  const [companyId, setCompanyId] = useState<string | null>(null);

  // useEffect(() => {
  //   if (role !== 'company') {
  //     router.push("/");
  //   } else {
  //     // Obtener el companyId del localStorage o desde la API
  //     const storedCompanyId = localStorage.getItem('companyId'); // Asegúrate de que esté guardado
  //     if (storedCompanyId) {
  //       setCompanyId(storedCompanyId);
  //     } else {
  //       // Opcional: podrías hacer una llamada a la API para obtenerlo aquí
  //     }
  //   }
  // }, [role, router]);

  // if (role !== 'company' || companyId === null) {
  //   return <Spinner />;
  // }

  return (
    <div>
      <NavBArLEader />
      <UserTable />
    </div>
  );
}

export default HomeLeader;
