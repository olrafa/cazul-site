import Image from "next/image";
import Link from "next/link";

const Navbar = () => (
  <nav className="flex gap-4 w-screen py-2 bg-cazul-blue items-center text-black pl-2">
    <Link href="#intro-text">
      <Image src="/images/cazul_txt.png" width={100} height={100} alt="Cazul" />
    </Link>
  </nav>
);

export default Navbar;
