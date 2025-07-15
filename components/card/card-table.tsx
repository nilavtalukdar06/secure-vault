"use client";
import { useState } from "react";
import { Input } from "../ui/input";

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
    </div>
  );
}
