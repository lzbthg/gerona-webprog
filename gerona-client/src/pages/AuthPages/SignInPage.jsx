import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/UserService";
import Button from "../../components/Button";

import { Visibility, VisibilityOff } from "@mui/icons-material";

const inputClasses =
  "mt-2 w-full rounded-2xl border border-[#D9C2A7] bg-[#FFF8F0] px-4 py-3 text-sm text-[#3E2C23] outline-none transition placeholder:text-[#BFAE99] focus:border-[#8B5E3C] focus:bg-white focus:ring-2 focus:ring-[#F2E4D5] shadow-sm";

const actionButtonClassName =
  "w-full rounded-2xl py-3 text-[11px] tracking-[0.2em]";

const SignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      // API Call
      const { data } = await loginUser({
        email: email.trim(),
        password,
      });

      console.log("Login successful:", data.user);

      // USER DATA
      const loggedInUser = data.user;

      // SAVE USER
      const userData = {
        token: data.token,
        _id: loggedInUser._id,
        firstName: loggedInUser.firstName,
        lastName: loggedInUser.lastName,
        email: loggedInUser.email,
        username: loggedInUser.username,
        type: loggedInUser.type,
      };

      localStorage.setItem("user", JSON.stringify(userData));

      setSuccess(
        `Welcome back, ${loggedInUser.firstName}! Redirecting to dashboard...`,
      );

      // REDIRECT
      setTimeout(() => {
        navigate("/dashboard", {
          state: {
            firstName: loggedInUser.firstName,
            type: loggedInUser.type,
          },
        });
      }, 1800);
    } catch (err) {
      console.error(
        "Login failed:",
        err.response?.data?.message || err.message,
      );

      setError(
        err.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-[#3E2C23] sm:text-4xl">
        Welcome Back! 🐾
      </h1>

      <p className="mt-3 text-sm leading-6 text-[#5A4B3A]">
        Log in to your Capy Corner account and continue your cozy journey.
      </p>

      {success && (
        <div className="mt-4 rounded-lg border border-[#CFE3CC] bg-[#EEF6EC] p-3 text-sm text-[#4F7A43]">
          {success}
        </div>
      )}

      {error && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        {/* EMAIL */}
        <div>
          <label
            htmlFor="signin-email"
            className="text-sm font-medium text-[#5A4B3A]"
          >
            Email Address
          </label>

          <input
            id="signin-email"
            type="email"
            placeholder="delacruzjuan@example.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputClasses}
          />
        </div>

        {/* PASSWORD */}
        <div>
          <label
            htmlFor="signin-password"
            className="text-sm font-medium text-[#5A4B3A]"
          >
            Password
          </label>

          <div className="relative mt-2">
            <input
              id="signin-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`${inputClasses} pr-12`}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/3 items-center justify-center rounded-full transition hover:bg-[#F3E8D7]"
            >
              {showPassword ? (
                <Visibility
                  className="text-[#8B5E3C]"
                  style={{ fontSize: 18 }}
                />
              ) : (
                <VisibilityOff
                  className="text-[#8B5E3C]"
                  style={{ fontSize: 18 }}
                />
              )}
            </button>
          </div>

          <p className="mt-2 text-xs leading-5 text-[#7A6A58]">
            Must be at least 8 characters.
          </p>
        </div>

        {/* OPTIONS */}
        <div className="flex items-center justify-between gap-4 text-sm">
          <label className="flex items-center gap-2 text-[#5A4B3A]">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-[#D9C2A7] accent-[#8B5E3C]"
            />
            <span>Remember me</span>
          </label>

          <button
            type="button"
            className="font-medium text-[#7C9A6D] transition hover:text-[#6A8760]"
          >
            Forgot Password?
          </button>
        </div>

        <Button
          type="submit"
          variant="primary"
          className={actionButtonClassName}
          disabled={loading || success}
        >
          {loading ? "Logging In..." : success ? "Redirecting..." : "Log In"}
        </Button>

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <Button
            type="button"
            variant="secondary"
            className={actionButtonClassName}
          >
            Log in with Google
          </Button>

          <Button
            type="button"
            variant="secondary"
            className={actionButtonClassName}
          >
            Log in with Apple
          </Button>
        </div>
      </form>

      <div className="mt-8 border-t border-[#E5D3B8] pt-6 text-sm text-[#5A4B3A]">
        No account yet?{" "}
        <Link
          to="/auth/signup"
          className="font-semibold text-[#8B5E3C] transition hover:text-[#6F472D]"
        >
          Sign Up
        </Link>
      </div>
    </>
  );
};

export default SignInPage;
