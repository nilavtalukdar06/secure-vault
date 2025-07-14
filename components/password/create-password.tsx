"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is too short" }),
  email: z.string().email({ message: "Email is not valid" }),
  password: z.string().min(1, { message: "Password is too short" }),
});

export default function CreatePassword() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  }

  return (
    <div className="my-12">
      <div>Password</div>
    </div>
  );
}
