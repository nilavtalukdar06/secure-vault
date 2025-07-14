import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <section className="min-h-screen max-w-screen flex justify-center items-center">
      <SignIn />
    </section>
  );
}
