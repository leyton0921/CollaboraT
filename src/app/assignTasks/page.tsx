// HomeAdmin.tsx
"use client";
import UploadCSV from '../components/UploadCSV';
import UserTable from '../components/UserTable';
import { useEffect } from 'react';
import Navbar from '../UI/navbar';
import { useRouter } from 'next/navigation';
import Spinner from '../UI/Spiner/spiner';

const HomeAdmin = () => {
  // const router = useRouter();
  const role = localStorage.getItem('role');
  const id = localStorage.getItem('id');

  // useEffect(() => {
  //   if (role !== 'company') {
  //     router.push("/");
  //   }
  // }, [role, router]);

  // if (role !== 'company') {
  //   return <Spinner />;
  // }

  return (
    <div>
      <Navbar />
      <UploadCSV companyId={id} />
      <UserTable />
    </div>
  );
}

export default HomeAdmin;
