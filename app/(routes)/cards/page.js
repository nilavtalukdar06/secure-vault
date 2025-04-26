import { CardTable } from "@/components/CardTable";

export default function CardPage() {
  return (
    <section className="my-5 lg:my-10 p-4 md:p-6">
      <h1 className="text-slate-800 font-bold text-xl md:text-2xl lg:text-3xl text-center tracking-wide">
        Your Cards
      </h1>
      <div className="max-w-2xl overflow-auto mx-auto my-5">
        <CardTable />
      </div>
    </section>
  );
}
