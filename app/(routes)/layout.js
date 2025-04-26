import Navbar from "../Navbar";

export default function Layout({ children }) {
  return (
    <main className="min-h-screen max-w-screen overflow-x-hidden relative">
      <Navbar />
      {children}
    </main>
  );
}
