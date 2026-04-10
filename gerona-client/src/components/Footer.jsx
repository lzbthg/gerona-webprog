import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t-2 border-[#8B5E3C] bg-[#F5E0C3] px-4 py-8 sm:px-6 lg:px-8 mt-10">
      <div className="mx-auto max-w-6xl flex flex-col gap-6 sm:flex-row sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#3E2C23]">Capy Corner 🐹</h2>
          <p className="mt-2 text-sm text-[#5A4B3A] max-w-xs">
            Discover fun facts, stories, and everything about the world's
            friendliest animal — the capybara.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7C9A6D]">
            Navigation
          </p>
          <Link to="/" className="text-sm text-[#3E2C23] hover:underline">
            Home
          </Link>
          <Link to="/about" className="text-sm text-[#3E2C23] hover:underline">
            About
          </Link>
          <Link
            to="/articles"
            className="text-sm text-[#3E2C23] hover:underline"
          >
            Articles
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7C9A6D]">
            Follow Us
          </p>
          <a
            href="/instagram"
            className="text-sm text-[#3E2C23] hover:underline"
          >
            Instagram
          </a>
          <a href="/twitter" className="text-sm text-[#3E2C23] hover:underline">
            Twitter
          </a>
          <a
            href="/facebook"
            className="text-sm text-[#3E2C23] hover:underline"
          >
            Facebook
          </a>
        </div>
      </div>

      <div className="mt-5 border-t border-[#D9C2A7] pt-4 text-center">
        <p className="text-xs text-[#5A4B3A]">
          © 2026 Capy Corner. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
