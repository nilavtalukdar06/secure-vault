"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Loader } from "lucide-react";
import axios from "axios";

const formSchema = z.object({
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
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: "",
      cvv: "",
      expiryDate: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      const response = await axios.post("/api/card/create-new", {
        cardNumber: values.cardNumber,
        cvv: values.cvv,
        expiryDate: values.expiryDate,
      });
      console.log(response);
      toast.success("Added Card");
      form.reset();
      router.push("/cards");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add card");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="my-12">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="cardNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Card Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex: 3454-1423-xxxx-xxxx"
                    {...field}
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cvv"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter CVV</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: 123" {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="expiryDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter the expiry date</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: xx/xx" {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="outline" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Adding Card" : "Add Card"}
            {isSubmitting ? (
              <Loader className="animate-spin" />
            ) : (
              <CreditCard />
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
