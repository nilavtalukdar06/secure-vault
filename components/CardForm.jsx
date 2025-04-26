"use client";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function CardForm() {
  return (
    <form className="px-5 py-4 border-2 rounded-lg w-full">
      <h3>Add a new card</h3>
      <div className="my-4 flex flex-col items-start justify-center gap-y-5">
        <div className="w-full">
          <Label htmlFor="card-number" className="mb-2 text-gray-700">
            Card Number
          </Label>
          <Input
            id="card-number"
            placeholder="Enter your card number"
            type="number"
            required
          />
          <p className="mt-1 text-slate-500 text-sm">
            This is your card number
          </p>
        </div>
        <div className="w-full">
          <Label htmlFor="expiry-date" className="mb-2 text-gray-700">
            Expiry Date
          </Label>
          <Input
            id="expiry-date"
            placeholder="Enter your card expiry date"
            required
          />
          <p className="mt-1 text-slate-500 text-sm">
            This is your card expiry date
          </p>
        </div>
        <div className="w-full">
          <Label htmlFor="cvv" className="mb-2 text-gray-700">
            CVV
          </Label>
          <Input id="cvv" placeholder="Enter your CVV" type="number" required />
          <p className="mt-1 text-slate-500 text-sm">This is your card cvv</p>
        </div>
        <Button
          className="border hover:bg-purple-700 bg-purple-500 text-white cursor-pointer"
          type="submit"
        >
          Submit 😁
        </Button>
      </div>
    </form>
  );
}
