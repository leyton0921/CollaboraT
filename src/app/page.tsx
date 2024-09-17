import Image from "next/image";
//import Navbar from "./UI/navbar/nav";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>home page</h1>
      <div>
        <Link  href="\register">register</Link>
        <Link  href="\login" >login</Link>
      </div>
    </div>
  );
}
