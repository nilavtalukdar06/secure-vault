import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <section>
      <h1>Secure Vault</h1>
      <Button>Click Me</Button>
      <UserButton />
    </section>
  );
}
