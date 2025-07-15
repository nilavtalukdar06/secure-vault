"use client";
import { useState } from "react";
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
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

export default function CardTable() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <div>
      <Input
        placeholder="Search card by number"
        className="max-w-md"
        type="string"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="my-6 w-full">
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
            <TableRow>
              <TableCell className="font-medium">1</TableCell>
              <TableCell>013</TableCell>
              <TableCell>4346-5885-5492-2939</TableCell>
              <TableCell>03/30</TableCell>
              <TableCell className="text-right">
                <Button variant="destructive">
                  Delete <Trash2 />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
