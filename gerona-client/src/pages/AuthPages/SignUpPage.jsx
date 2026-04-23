import { Link } from "react-router-dom";
import Button from "../../components/Button";

const inputClasses =
  "mt-2 w-full rounded-2xl border border-[#D9C2A7] bg-[#FFF8F0] px-4 py-3 text-sm text-[#3E2C23] outline-none transition placeholder:text-[#BFAE99] focus:border-[#8B5E3C] focus:bg-white focus:ring-2 focus:ring-[#F2E4D5] shadow-sm ";

const actionButtonClassName =
  "w-full rounded-2xl py-3 text-[11px] tracking-[0.2em]";

const SignUpPage = () => {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-[#3E2C23] sm:text-4xl">
        Join Capy Corner 🐹
      </h1>

      <p className="mt-3 text-sm leading-6 text-[#5A4B3A]">
        Create your account and start your cozy journey with capybaras.
      </p>

      <form className="mt-8 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="text-sm font-medium text-[#5A4B3A]">
            First Name
            </label>
            <input
              id="first-name"
              type="text"
              placeholder="Juan"
              autoComplete="given-name"
              className={inputClasses}
            />
          </div>
          <div>
            <label
              htmlFor="last-name" className="text-sm font-medium text-[#5A4B3A]">
              Last Name
            </label>
            <input
              id="last-name"
              type="text"
              placeholder="Dela Cruz"
              autoComplete="family-name"
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label htmlFor="signup-email" className="text-sm font-medium text-[#5A4B3A]">
            Email
          </label>
          <input
            id="signup-email"
            type="email"
            placeholder="delacruzjuan@example.com"
            autoComplete="email"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="signup-password" className="text-sm font-medium text-[#5A4B3A]">
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            placeholder="Create a password"
            autoComplete="new-password"
            className={inputClasses}
          />
          <p className="mt-2 text-xs leading-5 text-[#7A6A58]">
            Use at least 8 characters with letters, numbers, and symbols.
          </p>
        </div>

        <Button type="submit" variant="primary" className={actionButtonClassName}>
          Create Account
        </Button>

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <Button type="button" variant="secondary" className={actionButtonClassName}>
            Sign up with Google
          </Button>
          <Button type="button" variant="secondary" className={actionButtonClassName}>
            Sign up with Apple
          </Button>
        </div>
      </form>

      <div className="mt-8 border-t border-[#E5D3B8] pt-6 text-sm text-[#5A4B3A]">
        Already have an account?{" "}
        <Link to="/auth/signin" className="font-semibold text-[#8B5E3C] transition hover:text-[#6F472D]">
          Log In
        </Link>
      </div>
    </>
  );
};

export default SignUpPage;
