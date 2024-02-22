import Link from "next/link";

const Navbar = () => (
  <nav className="flex gap-4 w-screen py-2 bg-slate-600 items-center">
    <Link href="#mapa">Home</Link>
    <Link href="#intro-text">Cazul</Link>
  </nav>
);

export default Navbar;
