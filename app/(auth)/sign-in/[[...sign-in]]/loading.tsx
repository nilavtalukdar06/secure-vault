import Spinner from "@/components/spinner";

export default function Loading() {
  return (
    <section className="min-h-screen max-w-screen relative overflow-x-hidden flex justify-center items-center">
      <Spinner />
    </section>
  );
}
