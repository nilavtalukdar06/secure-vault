import { Shield } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="py-4 border-b border-purple-500 shadow-sm px-5 items-center bg-purple-500 text-white w-full flex justify-between">
      <h1 className="text-xl font-bold tracking-wide flex gap-x-2 sm:flex-1 justify-start">
        <Shield />
        Secure Vault
      </h1>
      <nav className="hidden sm:flex gap-x-3 text-sm">
        <p className="cursor-pointer">Home</p>
        <p className="cursor-pointer">About</p>
        <p className="cursor-pointer">Services</p>
      </nav>
      <div className="flex gap-x-2 justify-end items-center sm:flex-1">
        <span>Profile</span>
        <Image
          src="/avatar.jpg"
          alt="Logo"
          height={30}
          width={30}
          className="rounded-full"
        />
      </div>
    </header>
  );
}
