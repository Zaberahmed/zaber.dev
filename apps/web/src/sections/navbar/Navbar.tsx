import { Link } from "react-router-dom";
import { navbarItems } from "./Navbar.constant.ts";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex space-x-4">
        {navbarItems.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="text-white hover:text-gray-300">
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
