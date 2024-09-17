import Image from "next/image";
import Link from "next/link";

import RegisterForm from '../components/auth.components/RegisterForm';

const RegisterPage = () => {
  return (
    <div>
      <h1> register </h1>
      <RegisterForm />
    </div>
  );
};
export default RegisterPage;