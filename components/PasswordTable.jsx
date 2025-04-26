"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function PasswordTable() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [passwords, setPasswords] = useState([]);
  const { user } = useUser();

  const fetchPasswords = async (user) => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/get-passwords?email=${user?.primaryEmailAddress?.emailAddress}`
      );
      if (!response.ok) {
        throw new Error("Passwords not found");
      }
      const data = await response.json();
      if (!data.passwords.length) {
        router.push("/");
        toast.error("Create a password first");
      }
      setPasswords(data.passwords);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching passwords");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const deletePassword = async (passwordId) => {
    try {
      const response = await fetch("/api/delete-password", {
        method: "DELETE",
        body: JSON.stringify({ passwordId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Password could not be deleted");
      }
      toast.success("Password Deleted");
      setPasswords(passwords.filter((p) => p._id !== passwordId));
    } catch (error) {
      toast.error("Error deleting password");
    }
  };

  useEffect(() => {
    user && fetchPasswords(user);
    console.log(passwords);
  }, [user]);

  return (
    <div>
      {loading ? (
        <div className="w-full flex justify-center overflow-hidden h-full">
          <FadeLoader />
        </div>
      ) : error ? (
        <div className="my-10 text-red-500 font-bold text-2xl tracking-wider flex gap-x-2 justify-center items-center">
          <span>Passwords not found 😓🥲</span>{" "}
        </div>
      ) : (
        <Table>
          <TableCaption>A list of your recent passwords</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Serial</TableHead>
              <TableHead>Website</TableHead>
              <TableHead>Username</TableHead>
              <TableHead className="text-right">Password</TableHead>
              <TableHead className="text-right">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {passwords.map((password, index) => (
              <TableRow key={password._id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{password.website}</TableCell>
                <TableCell>{password.username}</TableCell>
                <TableCell className="text-right">
                  {password.password}
                </TableCell>
                <TableCell className="text-right">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" className="cursor-pointer">
                        Delete 🥲
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your password from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-500 hover:bg-red-700 cursor-pointer"
                          onClick={() => deletePassword(password._id)}
                        >
                          Continue ☠️
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
