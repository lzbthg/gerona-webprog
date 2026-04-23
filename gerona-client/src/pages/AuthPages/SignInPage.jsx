import { Link } from "react-router-dom";
import Button from "../../components/Button";

const inputClasses =
  "mt-2 w-full rounded-2xl border border-[#D9C2A7] bg-[#FFF8F0] px-4 py-3 text-sm text-[#3E2C23] outline-none transition placeholder:text-[#BFAE99] focus:border-[#8B5E3C] focus:bg-white focus:ring-2 focus:ring-[#F2E4D5] shadow-sm";

const actionButtonClassName =
  "w-full rounded-2xl py-3 text-[11px] tracking-[0.2em]";

const SignInPage = () => {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-[#3E2C23] sm:text-4xl">Welcome Back! 🐾</h1>
      <p className="mt-3 text-sm leading-6 text-[#5A4B3A]">
        Log in to your Capy Corner account and continue your cozy journey.
      </p>

      <form className="mt-8 space-y-5">
        <div>
          <label htmlFor="signin-email" className="text-sm font-medium text-[#5A4B3A]">
            Email Address
          </label>
          <input
            id="signin-email"
            type="email"
            placeholder="delacruzjuan@example.com"
            autoComplete="email"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="signin-password" className="text-sm font-medium text-[#5A4B3A]">
            Password
          </label>
          <input
            id="signin-password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            className={inputClasses}
          />
          <p className="mt-2 text-xs leading-5 text-[#7A6A58]">
            Must be at least 8 characters with letters, numbers, and symbols.
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 text-sm">
          <label className="flex items-center gap-2 text-[#5A4B3A]">
            <input type="checkbox" className="h-4 w-4 rounded border-[#D9C2A7] accent-[#8B5E3C]"/>
            <span>Remember me</span>
          </label>

          <button type="button" className="font-medium text-[#7C9A6D] transition hover:text-[#6A8760]">
            Forgot Password?
          </button>
        </div>

        <Button type="submit" variant="primary" className={actionButtonClassName}>
          Log In
        </Button>

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <Button type="button" variant="secondary" className={actionButtonClassName}>
            Log in with Google
          </Button>
          <Button type="button" variant="secondary" className={actionButtonClassName}>
            Log in with Apple
          </Button>
        </div>
      </form>

      <div className="mt-8 border-t border-[#E5D3B8] pt-6 text-sm text-[#5A4B3A]">
        No account yet?{" "}
        <Link
          to="/auth/signup"
          className="font-semibold text-[#8B5E3C] transition hover:text-[#6F472D]">
          Sign Up
        </Link>
      </div>
    </>
  );
};

export default SignInPage;