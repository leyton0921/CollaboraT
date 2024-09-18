"use client";

import Link from "next/link";
//import { Navbar } from "./UI/navbar"; 

export default function Home() {

  return (
    <div>
      <h1>home page</h1>
      <div>
        <Link  href="\register">register</Link>
        <Link  href="\login" >login</Link>
        <Link  href="\home" >home</Link>
        </div>
          </div>
  );
}
