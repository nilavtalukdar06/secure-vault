"use client";
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FadeLoader } from "react-spinners";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

export default function PasswordForm() {
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    website: "",
    username: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/password/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user?.primaryEmailAddress?.emailAddress,
          website: formData.website,
          username: formData.username,
          password: formData.password,
        }),
      });
      if (!response.ok) {
        throw new Error("Error submitting password details");
      }
      toast.success("Password details submitted");
      setFormData({
        email: "",
        website: "",
        username: "",
        password: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Error submitting password details");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="px-5 py-4 border-2 rounded-lg w-full">
      <h3>Add a password</h3>
      <div className="my-4 flex flex-col items-start justify-center gap-y-5">
        <div className="w-full">
          <Label htmlFor="website" className="mb-2 text-gray-700">
            Website
          </Label>
          <Input
            id="website"
            placeholder="Enter your website url"
            required
            value={formData.website}
            onChange={(e) =>
              setFormData({ ...formData, website: e.target.value })
            }
            disabled={isSubmitting}
          />
          <p className="mt-1 text-slate-500 text-sm">
            This is your your website url
          </p>
        </div>
        <div className="w-full">
          <Label htmlFor="username" className="mb-2 text-gray-700">
            Username
          </Label>
          <Input
            id="username"
            placeholder="Enter your username"
            required
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            disabled={isSubmitting}
          />
          <p className="mt-1 text-slate-500 text-sm">This is your username</p>
        </div>
        <div className="w-full">
          <Label htmlFor="password" className="mb-2 text-gray-700">
            Password
          </Label>
          <Input
            id="password"
            placeholder="Enter your password"
            required
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            disabled={isSubmitting}
          />
          <p className="mt-1 text-slate-500 text-sm">This is your password</p>
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
