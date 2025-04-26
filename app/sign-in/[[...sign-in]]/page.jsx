import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <section className="min-h-screen max-w-screen overflow-x-hidden relative grid place-items-center">
      <SignIn />
    </section>
  );
}
