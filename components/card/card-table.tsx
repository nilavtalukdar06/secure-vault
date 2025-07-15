"use client";
import { useState, useCallback, useEffect } from "react";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Spinner from "../spinner";
import Error from "../error";
import axios from "axios";
import toast from "react-hot-toast";
import { ICard } from "@/models/card.model";
import DeleteCard from "./delete-card";

export default function CardTable() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [cardData, setCardData] = useState<ICard[]>([]);

  const fetchCards = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/card/get-cards");
      console.log(response.data);
      if (response.data.length === 0) {
        setCardData([]);
      } else {
        setCardData([...response.data]);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch cards");
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const filteredData = cardData.filter((card) =>
    card.cardNumber.includes(searchTerm)
  );

  return (
    <div>
      <Input
        placeholder="Search card by number"
        className="max-w-md"
        type="string"
        disabled={isLoading}
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      <div className="my-6 w-full">
        {isLoading ? (
          <div className="w-full flex justify-start items-center gap-x-4">
            <Spinner />
            <span>Loading</span>
          </div>
        ) : error ? (
          <div className="max-w-xl">
            <Error item="cards" />
          </div>
        ) : (
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Index</TableHead>
                <TableHead>CVV</TableHead>
                <TableHead>Card Number</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((card, index) => (
                <TableRow key={index + 1}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{card.cvv}</TableCell>
                  <TableCell>{card.cardNumber}</TableCell>
                  <TableCell>{card.expiryDate}</TableCell>
                  <TableCell className="text-right">
                    <DeleteCard
                      documentId={card._id.toString()}
                      setCardData={setCardData}
                      cardData={cardData}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
