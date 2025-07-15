import CardTable from "@/components/card/card-table";

export default function Cards() {
  return (
    <section>
      <div className="my-6">
        <h2 className="text-2xl sm:text-3xl font-medium sm:font-semibold text-neutral-600">
          My Cards
        </h2>
      </div>
      <div className="w-full my-6">
        <CardTable />
      </div>
    </section>
  );
}
