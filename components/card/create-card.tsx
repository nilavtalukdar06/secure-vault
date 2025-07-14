"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is too short" }),
  cardNumber: z
    .string()
    .min(1, { message: "Card number is too short" })
    .regex(/^(?:\d[ -]*?){13,19}$/, { message: "Enter a valid card number" }),
  cvv: z
    .string()
    .min(1, { message: "CVV is too short" })
    .regex(/^\d{3,4}$/, { message: "Invalid CVV type" }),
  expiryDate: z
    .string()
    .min(1, { message: "Expiry date is too short" })
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, {
      message: "Enter a valid expiry date",
    }),
});

export default function CreateCard() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cardNumber: "",
      cvv: "",
      expiryDate: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="my-12">
      <p>Create Card</p>
    </div>
  );
}
