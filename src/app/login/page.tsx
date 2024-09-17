import Image from "next/image";
import Link from "next/link";

import LoginForm from "../components/auth.components/LoginForm";

const RegisterPage = () => {
  return (
    <div>
      <h1> register </h1>
      <LoginForm />
    </div>
  );
};
export default RegisterPage;