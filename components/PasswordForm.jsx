"use client";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function PasswordForm() {
  return (
    <form className="px-5 py-4 border-2 rounded-lg w-full">
      <h3>Add a password</h3>
      <div className="my-4 flex flex-col items-start justify-center gap-y-5">
        <div className="w-full">
          <Label htmlFor="website" className="mb-2 text-gray-700">
            Website
          </Label>
          <Input id="website" placeholder="Enter your website url" required />
          <p className="mt-1 text-slate-500 text-sm">
            This is your your website url
          </p>
        </div>
        <div className="w-full">
          <Label htmlFor="username" className="mb-2 text-gray-700">
            Username
          </Label>
          <Input id="username" placeholder="Enter your username" required />
          <p className="mt-1 text-slate-500 text-sm">This is your username</p>
        </div>
        <div className="w-full">
          <Label htmlFor="password" className="mb-2 text-gray-700">
            Password
          </Label>
          <Input id="password" placeholder="Enter your password" required />
          <p className="mt-1 text-slate-500 text-sm">This is your password</p>
        </div>
        <Button
          className="border hover:bg-purple-700 bg-purple-500 text-white cursor-pointer"
          type="button"
        >
          Submit 😁
        </Button>
      </div>
    </form>
  );
}
