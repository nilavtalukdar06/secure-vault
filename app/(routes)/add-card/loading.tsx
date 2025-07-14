import Spinner from "@/components/spinner";

export default function Loading() {
  return (
    <section className="my-24 md:my-36 max-w-screen relative overflow-x-hidden flex justify-center items-center">
      <Spinner />
    </section>
  );
}
