import Navbar from "../Navbar";

export default function Layout({ children }) {
  return (
    <main className="min-h-screen max-w-screen overflow-x-hidden relative flex justify-center items-center">
      <Navbar />
      {children}
    </main>
  );
}
