"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { ChevronRight, CreditCard, ShieldCheck, UserLock } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

export default function Navbar() {
  const authRoute = usePathname().startsWith("/sign-in");
  const { isSignedIn, isLoaded } = useUser();

  return (
    <header
      className={`py-4 w-full flex justify-between items-center gap-x-4 ${
        authRoute ? "hidden" : ""
      }`}
    >
      <Link className="flex justify-center items-center gap-x-3" href="/">
        <Button variant="outline" className="pointer-events-none">
          <UserLock />
        </Button>
        <h2 className="hidden sm:block text-2xl text-neutral-600 font-medium">
          Secure Vault
        </h2>
      </Link>
      {!isLoaded ? (
        <Skeleton className="h-[36px] w-[100px]" />
      ) : isSignedIn ? (
        <UserButton>
          <UserButton.MenuItems>
            <UserButton.Link
              href="/cards"
              label="My Cards"
              labelIcon={<CreditCard size={14} />}
            ></UserButton.Link>
            <UserButton.Link
              href="/passwords"
              label="My Passwords"
              labelIcon={<ShieldCheck size={14} />}
            ></UserButton.Link>
          </UserButton.MenuItems>
        </UserButton>
      ) : (
        <Link href="/sign-in">
          <Button>
            Get Started
            <ChevronRight color="#fff" className="hidden sm:inline-flex" />
          </Button>
        </Link>
      )}
    </header>
  );
}
