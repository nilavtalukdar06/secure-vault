"use client";
import MobileMenu from "@/components/MobileMenu";
import { UserButton, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { Shield } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user } = useUser();
  const createUser = async () => {
    try {
      const response = await fetch("/api/create-user", {
        method: "POST",
        body: JSON.stringify({
          name: user?.fullName || "user",
          email: user?.primaryEmailAddress?.emailAddress,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Error creating user");
      }
      const data = await response.json();
      if (data.status === 201) {
        toast.success("User created successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create user");
    }
  };

  useEffect(() => {
    createUser();
  }, [user]);

  return (
    <header className="py-4 border-b border-purple-500 shadow-sm px-5 items-center bg-purple-500 text-white w-full flex justify-between">
      <Link className="sm:flex hidden sm:flex-1 justify-start" href="/">
        <h1 className="text-xl font-bold tracking-wide flex gap-x-2 cursor-pointer">
          <Shield />
          Secure Vault
        </h1>
      </Link>
      <div className="sm:hidden">
        <MobileMenu />
      </div>

      <nav className="hidden sm:flex gap-x-3 text-sm">
        <Link className="cursor-pointer" href="/">
          Home
        </Link>
        <Link className="cursor-pointer" href="/passwords">
          Passwords
        </Link>
        <Link className="cursor-pointer" href="/cards">
          Cards
        </Link>
      </nav>
      <div className="flex gap-x-2 justify-end items-center sm:flex-1">
        <span>Profile</span>
        <UserButton />
      </div>
    </header>
  );
}
