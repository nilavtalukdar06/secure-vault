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
import { ICard } from "@/models/card.model";

export default function DeleteCard({
  documentId,
  setCardData,
  cardData,
}: {
  documentId: string;
  setCardData: React.Dispatch<React.SetStateAction<ICard[]>>;
  cardData: ICard[];
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const deleteCard = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/card/delete-card?documentId=${documentId}`);
      toast.success("Card deleted successfully");
      setCardData(
        cardData.filter((card) => card._id.toString() !== documentId)
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete the card");
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
            credit card data from the database
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isLoading} onClick={deleteCard}>
            {isLoading ? <Loader className="animate-spin" /> : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
