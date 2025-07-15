import { TriangleAlert } from "lucide-react";

export default function Error({ item }: { item: string }) {
  return (
    <div
      className="p-4 mb-4 w-full text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 flex justify-start items-center gap-x-4"
      role="alert"
    >
      <span className="font-medium">
        <TriangleAlert color="red" />
      </span>{" "}
      Failed to fetch {item}, please try again later.
    </div>
  );
}
