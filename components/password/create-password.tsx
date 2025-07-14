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
import { Loader, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is too short" }),
  email: z.string().email({ message: "Email is not valid" }),
  password: z.string().min(1, { message: "Password is too short" }),
});

export default function CreatePassword() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      await axios.post("/api/password/create-new", {
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password.trim(),
      });
      toast.success("Added password");
      form.reset();
      router.push("/passwords");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add the password");
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex: Instagram, Github"
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex: johndoe123@example.com"
                    {...field}
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter a strong password"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant="outline"
            className={"w-full"}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span>Adding Password</span>
            ) : (
              <span>Add Password</span>
            )}
            {isSubmitting ? (
              <Loader className="animate-spin" />
            ) : (
              <ShieldCheck />
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
