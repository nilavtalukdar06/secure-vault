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

export function CardTable() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [cards, setCards] = useState([]);
  const { user } = useUser();

  const fetchCards = async (user) => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/get-cards?email=${user?.primaryEmailAddress?.emailAddress}`
      );
      if (!response.ok) {
        throw new Error("Cards not found");
      }
      const data = await response.json();
      if (!data.cards.length) {
        router.push("/");
        toast.error("Create a Card first");
      }
      setCards(data.cards);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching cards");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const deleteCard = async (cardId) => {
    try {
      const response = await fetch("/api/delete-card", {
        method: "DELETE",
        body: JSON.stringify({
          cardId: cardId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Card could not be deleted");
      }
      toast.success("Card Details Deleted");
      const newCards = cards.filter((card) => card._id !== cardId);
      setCards(newCards);
    } catch (error) {
      console.error(error);
      toast.error("Error deleting card");
    }
  };

  useEffect(() => {
    user && fetchCards(user);
    console.log(cards);
  }, [user]);

  return (
    <div>
      {loading ? (
        <div className="w-full flex justify-center overflow-hidden h-full">
          <FadeLoader />
        </div>
      ) : error ? (
        <div className="my-10 text-red-500 font-bold text-2xl tracking-wider flex gap-x-2 justify-center items-center">
          <span>Cards not found 😓🥲</span>{" "}
        </div>
      ) : (
        <Table>
          <TableCaption>A list of your recent cards</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Serial</TableHead>
              <TableHead>Card Number</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead className="text-right">CVV</TableHead>
              <TableHead className="text-right">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cards.map((card, index) => (
              <TableRow key={card._id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{card.cardNumber}</TableCell>
                <TableCell>{card.expiryDate}</TableCell>
                <TableCell className="text-right">{card.cvv}</TableCell>
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
                          delete your card from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-500 hover:bg-red-700 cursor-pointer"
                          onClick={() => deleteCard(card._id)}
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
