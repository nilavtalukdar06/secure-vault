import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { CreditCard, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section>
      <div className="overflow-hidden">
        <div className="w-full mx-auto pt-24 pb-6">
          <h1 className="font-medium md:font-semibold text-[#131316] text-5xl md:text-6xl">
            <span className="bg-clip-text bg-linear-to-tl from-blue-600 to-violet-600 text-transparent">
              Secure Vault
            </span>
          </h1>
          <div className="mt-5 max-w-4xl">
            <p className="text-neutral-500 text-base md:text-lg font-light md:font-normal">
              Secure your passwords in a single place of truth. Secure Vault is
              your trusted solution for managing and protecting your sensitive
              information. Store, organize, and access your passwords with
              confidence, knowing your data is safe and always available when
              you need it.
            </p>
          </div>
          <div className="my-8 w-full flex justify-start items-center gap-x-4">
            <Link href="/add-card">
              <Button>
                Add Card <CreditCard size={14} />
              </Button>
            </Link>
            <Link href="/add-password">
              <Button variant="outline">
                Add Password <ShieldCheck size={14} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="relative overflow-hidden py-0 md:py-4">
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="mb-4">
              <h2 className="text-neutral-500 font-light md:font-normal">
                Trusted by individuals, teams, and organizations worldwide
              </h2>
            </div>
            <div className="flex justify-start sm:justify-between flex-wrap items-center gap-6">
              {[1, 2, 3, 4, 5].map((item) => (
                <Image
                  src={`/icons/icon${item}.svg`}
                  key={item}
                  width={96}
                  height={36}
                  alt="icon"
                  className="py-3 lg:py-5 text-neutral-400"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}
