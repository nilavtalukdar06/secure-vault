import { Button } from "./ui/button";
import { UserLock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="my-12 sm:my-6">
      <div className="relative z-10">
        <div className="w-full">
          <div className="inline-flex items-center">
            <Button variant="outline" className="pointer pointer-events-none">
              <UserLock />
            </Button>
            <div className="border-s-2 border-neutral-200 ps-5 ms-5">
              <p className="text-sm text-neutral-400">© 2025 Secure Vault.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
