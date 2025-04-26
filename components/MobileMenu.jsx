import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Shield } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

export default function MobileMenu() {
  const paths = [
    {
      id: uuidv4(),
      label: "Home",
      link: "/",
    },
    {
      id: uuidv4(),
      label: "Passwords",
      link: "/passwords",
    },
    {
      id: uuidv4(),
      label: "Cards",
      link: "/cards",
    },
  ];
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="p-1 cursor-pointer text-white rounded-lg border-2">
          <Menu />
        </button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader className="bg-purple-500 text-white">
          <SheetTitle className="hidden" />
          <Link href="/">
            <div className="w-full px-5 py-1">
              <h1 className="text-xl font-bold tracking-wide flex gap-x-2 cursor-pointer">
                <Shield />
                Secure Vault
              </h1>
            </div>
          </Link>
        </SheetHeader>
        {/* <Sidebar /> */}
        <SheetDescription className="w-full flex flex-col gap-y-2 text-base">
          {paths.map((item) => (
            <Link
              className="px-4 py-2 flex items-center justify-start gap-x-2"
              href={item.link}
              key={item.id}
            >
              {item.label}
            </Link>
          ))}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
}
