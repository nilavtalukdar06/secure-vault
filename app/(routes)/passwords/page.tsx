import PasswordTable from "@/components/password/password-table";

export default function Passwords() {
  return (
    <section>
      <div className="my-6">
        <h2 className="text-2xl sm:text-3xl font-medium sm:font-semibold text-neutral-600">
          My Passwords
        </h2>
      </div>
      <div className="w-full my-6">
        <PasswordTable />
      </div>
    </section>
  );
}
