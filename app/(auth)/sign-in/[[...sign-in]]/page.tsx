import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <section className="min-h-screen max-w-screen overflow-x-hidden relative flex justify-center items-center">
      <SignIn />
    </section>
  );
}
