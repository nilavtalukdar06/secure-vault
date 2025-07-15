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
import { IPassword } from "@/models/password.model";
import DeletePassword from "./delete-password";

export default function PasswordTable() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [passwordData, setPasswordData] = useState<IPassword[]>([]);

  const fetchPasswords = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/password/get-passwords");
      console.log(response.data);
      if (response.data.length === 0) {
        setPasswordData([]);
      } else {
        setPasswordData([...response.data]);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch Passwords");
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPasswords();
  }, [fetchPasswords]);

  const filteredData = passwordData.filter((password) =>
    password.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Input
        placeholder="Search password by website/app name"
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
            <Error item="passwords" />
          </div>
        ) : (
          <Table>
            <TableCaption>A list of your recent passwords.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Index</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Password</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((password, index) => (
                <TableRow key={index + 1}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{password.name}</TableCell>
                  <TableCell>{password.email}</TableCell>
                  <TableCell>{password.password}</TableCell>
                  <TableCell className="text-right">
                    <DeletePassword
                      documentId={password._id.toString()}
                      setPasswordData={setPasswordData}
                      passwordData={passwordData}
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
