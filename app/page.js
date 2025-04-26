import CardForm from "@/components/CardForm";
import PasswordForm from "@/components/PasswordForm";
import Navbar from "./Navbar";

export default function Home() {
  return (
    <section>
      <Navbar />
      <div className="w-full h-full p-4">
        <h1 className="text-gray-700 text-center text-xl md:text-2xl lg:text-3xl font-bold tracking-wide">
          Secure Vault
        </h1>
        <section className="max-w-6xl mx-auto my-5 md:my-10 grid grid-cols-1 grid-rows-2 md:grid-rows-1 md:grid-cols-2 place-items-center gap-6 md:gap-10">
          <div className="w-full">
            <h2 className="text-xl mb-2 font-semibold text-primary">
              Add a credit/debit card
            </h2>
            <CardForm />
          </div>
          <div className="w-full">
            <h2 className="text-xl mb-2 font-semibold text-primary">
              Add a password
            </h2>
            <PasswordForm />
          </div>
        </section>
      </div>
    </section>
  );
}
