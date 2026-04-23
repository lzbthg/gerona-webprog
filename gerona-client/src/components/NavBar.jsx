import { NavLink } from "react-router-dom";
import Button from "../components/Button";
import logo from "../assets/capy-logo3.png";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Articles", to: "/articles" },
];

const navLinkClassName = ({ isActive }) =>
  [
    "rounded-full border-2 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] transition",
    isActive
      ? "border-[#7C9A6D] bg-[#7C9A6D] text-white shadow-md"
      : "border-transparent text-[#3E2C23] hover:border-[#7C9A6D] hover:bg-[#D9C2A7] hover:text-[#3E2C23]",
  ].join(" ");

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-[#8B5E3C] bg-[#F5E0C3]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">

        <NavLink to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Logo"
            className="h-12 w-auto object-contain"
          />
        </NavLink>

        <nav className="hidden items-center gap-3 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={navLinkClassName}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button to="/auth/signin" variant="secondary">
            Log In
          </Button>

          <Button to="/auth/signup" variant="primary">
            Sign Up
          </Button>
        </div>

      </div>
    </header>
  );
};

export default NavBar;