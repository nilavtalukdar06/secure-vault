"use client";
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FadeLoader } from "react-spinners";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

export default function CardForm() {
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/card/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user?.primaryEmailAddress?.emailAddress,
          cardNumber: formData.cardNumber,
          expiryDate: formData.expiryDate,
          cvv: formData.cvv,
        }),
      });
      if (!response.ok) {
        throw new Error("Error submitting card details");
      }
      toast.success("Card details submitted");
      setFormData({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
      });
    } catch (error) {
      toast.error("Error submitting card details");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            type="text"
            required
            value={formData.cardNumber}
            onChange={(e) =>
              setFormData({ ...formData, cardNumber: e.target.value })
            }
            disabled={isSubmitting}
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
            value={formData.expiryDate}
            onChange={(e) =>
              setFormData({ ...formData, expiryDate: e.target.value })
            }
            disabled={isSubmitting}
          />
          <p className="mt-1 text-slate-500 text-sm">
            This is your card expiry date
          </p>
        </div>
        <div className="w-full">
          <Label htmlFor="cvv" className="mb-2 text-gray-700">
            CVV
          </Label>
          <Input
            id="cvv"
            placeholder="Enter your CVV"
            type="text"
            required
            value={formData.cvv}
            onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
            disabled={isSubmitting}
          />
          <p className="mt-1 text-slate-500 text-sm">This is your card cvv</p>
        </div>
        <Button
          className="border hover:bg-purple-700 bg-purple-500 text-white cursor-pointer"
          type="submit"
          disabled={isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? (
            <span className="flex justify-center items-center">
              Submitting...{" "}
              <span className="scale-25">
                <FadeLoader />
              </span>
            </span>
          ) : (
            "Submit 😁"
          )}
        </Button>
      </div>
    </form>
  );
}
