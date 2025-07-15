"use client";
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
import { Button } from "../ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Loader } from "lucide-react";
import { IPassword } from "@/models/password.model";

export default function DeletePassword({
  documentId,
  setPasswordData,
  passwordData,
}: {
  documentId: string;
  setPasswordData: React.Dispatch<React.SetStateAction<IPassword[]>>;
  passwordData: IPassword[];
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const deletePassword = async () => {
    try {
      setIsLoading(true);
      await axios.delete(
        `/api/password/delete-password?documentId=${documentId}`
      );
      toast.success("Password deleted successfully");
      setPasswordData(
        passwordData.filter(
          (password) => password._id.toString() !== documentId
        )
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete the password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            password data from the database
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isLoading} onClick={deletePassword}>
            {isLoading ? <Loader className="animate-spin" /> : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
