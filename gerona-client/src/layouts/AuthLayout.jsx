import { Outlet } from "react-router-dom";
import capyLogo from "../assets/capy-logo-vertical.png";

const AuthLayout = () => {
  return (
    <section className="min-h-screen bg-[#FFF3E6] text-[#3E2C23]">
      <div className="grid min-h-screen w-full lg:grid-cols-[1fr_0.95fr]">
        <div className="flex items-center justify-center border-b-2 border-[#D9C2A7] bg-[#FFF8F0] p-8 sm:p-10 lg:border-b-0 lg:border-r-2 lg:border-[#D9C2A7] lg:p-16">
          <div className="max-w-md text-center">
            <img
              src={capyLogo}
              alt="Capybara"
              className="mx-auto w-full max-w-sm rounded-3xl"
            />

            <p className="mt-4 text-sm leading-7 text-[#5A4B3A]">
              A cozy corner for capybara stories, fun facts, and slow, gentle living.
            </p>

            <div className="mt-5 text-base font-medium uppercase tracking-[0.32em] text-[#7C9A6D]">
              Stay soft. Stay calm. Stay capy.
            </div>
          </div>
        </div>

        <main className="flex items-center bg-[#FFF3E6] px-6 py-10 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <Outlet />
          </div>
        </main>
      </div>
    </section>
  );
};

export default AuthLayout;
