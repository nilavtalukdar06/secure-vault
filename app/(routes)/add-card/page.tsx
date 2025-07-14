import CreateCard from "@/components/card/create-card";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

export default function AddPassword() {
  return (
    <section className="w-full">
      <div className="my-16 max-w-sm mx-auto w-full">
        <div className="flex justify-center items-center gap-x-4">
          <Button variant="outline" className="pointer-events-none" size="sm">
            <CreditCard />
          </Button>
          <h2 className="text-xl font-normal text-gray-600">Add Card</h2>
        </div>
        <CreateCard />
      </div>
    </section>
  );
}
