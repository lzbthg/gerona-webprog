import { NavLink } from "react-router-dom";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Articles", to: "/articles" },
];

const navLinkClassName = ({ isActive }) =>
  [
    "rounded-full border-2 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] transition",
    isActive
      ? "border-[#7C9A6D] bg-[#7C9A6D] text-white shadow-md"
      : "border-transparent text-[#3E2C23] hover:border-[#7C9A6D] hover:bg-[#D9C2A7] hover:text-[#3E2C23]",
  ].join(" ");

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-[#8B5E3C] bg-[#F5E8DC]"> 
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        
        <NavLink to="/" className="flex items-center gap-3">
          <div className="space-y-0.5">
            <img
              src="src/assets/capy-logo3.png"
              alt="Logo"
              className="h-12 w-auto object-contain" 
            />
          </div>
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

      </div>
    </header>
  );
};

export default NavBar;