import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";
import CreatePassword from "@/components/password/create-password";

export default function AddPassword() {
  return (
    <section className="w-full">
      <div className="my-16 max-w-sm mx-auto w-full">
        <div className="flex justify-center items-center gap-x-4">
          <Button variant="outline" className="pointer-events-none" size="sm">
            <ShieldCheck />
          </Button>
          <h2 className="text-xl font-normal text-gray-600">Add Password</h2>
        </div>
        <CreatePassword />
      </div>
    </section>
  );
}
