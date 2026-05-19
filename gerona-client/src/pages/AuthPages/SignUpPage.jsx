import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { Visibility, VisibilityOff } from "@mui/icons-material";

import { createUser } from "../../services/UserService";
import Button from "../../components/Button";

const inputClasses =
  "mt-2 w-full rounded-2xl border border-[#D9C2A7] bg-[#FFF8F0] px-4 py-3 text-sm text-[#3E2C23] outline-none transition placeholder:text-[#BFAE99] focus:border-[#8B5E3C] focus:bg-white focus:ring-2 focus:ring-[#F2E4D5] shadow-sm";

const actionButtonClassName =
  "w-full rounded-2xl py-3 text-[11px] tracking-[0.2em]";

const genders = ["male", "female", "other"];

const blankForm = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  contactNumber: "",
  email: "",
  username: "",
  password: "",
  address: "",
  type: "viewer",
  isActive: true,
};

const SignUpPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = ({ target: { name, value, checked, type } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear field error
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const nextErrors = {};
    const email = form.email.trim().toLowerCase();
    const username = form.username.trim().toLowerCase();
    const namePattern = /^[A-Za-z\s'-]+$/;
    const ageNumber = Number(form.age);

    [
      ["firstName", "First name"],
      ["lastName", "Last name"],
      ["age", "Age"],
      ["gender", "Gender"],
      ["contactNumber", "Contact number"],
      ["email", "Email"],
      ["username", "Username"],
      ["password", "Password"],
      ["address", "Address"],
    ].forEach(([key, label]) => {
      if (!String(form[key]).trim()) {
        nextErrors[key] = `${label} is required.`;
      }
    });

    if (!nextErrors.firstName && !namePattern.test(form.firstName.trim())) {
      nextErrors.firstName = "First name contains invalid characters.";
    }

    if (!nextErrors.lastName && !namePattern.test(form.lastName.trim())) {
      nextErrors.lastName = "Last name contains invalid characters.";
    }

    // EMAIL VALIDATION
    if (!nextErrors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    // PASSWORD VALIDATION
    if (!nextErrors.password && form.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    // CONTACT VALIDATION
    if (!nextErrors.contactNumber && !/^\d{11}$/.test(form.contactNumber)) {
      nextErrors.contactNumber = "Contact number must be exactly 11 digits.";
    }

    if (!nextErrors.contactNumber && !form.contactNumber.startsWith("09")) {
      nextErrors.contactNumber = "Contact number must start with 09.";
    }

    // AGE VALIDATION
    if (!nextErrors.age && !/^\d+$/.test(form.age)) {
      nextErrors.age = "Age must contain numbers only.";
    }

    if (!nextErrors.age && (ageNumber < 1 || ageNumber > 120)) {
      nextErrors.age = "Enter a valid age.";
    }

    // USERNAME VALIDATION
    if (!nextErrors.username && /\s/.test(username)) {
      nextErrors.username = "Username must not contain spaces.";
    }

    return nextErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setErrors({});

    const nextErrors = validate();

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setLoading(true);

    const newUser = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      age: form.age.trim(),
      gender: form.gender.trim().toLowerCase(),
      contactNumber: form.contactNumber.trim(),
      email: form.email.trim().toLowerCase(),
      username: form.username.trim().toLowerCase(),
      password: form.password,
      address: form.address.trim(),
      type: "viewer",
      isActive: true,
    };

    try {
      console.log("Creating account:", newUser);

      const { data } = await createUser(newUser);

      console.log("Account created successfully:", data);

      setSuccess("Account created successfully! Redirecting to login...");

      setTimeout(() => {
        navigate("/auth/signin");
      }, 2000);
    } catch (err) {
      console.error(
        "Signup failed:",
        err.response?.data?.message || err.message,
      );

      setErrors({
        submit:
          err.response?.data?.message || "Sign up failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-[#3E2C23] sm:text-4xl">
        Join Capy Corner 🐹
      </h1>

      <p className="mt-3 text-sm leading-6 text-[#5A4B3A]">
        Create your account and start your cozy journey with capybaras.
      </p>

      {success && (
        <div className="mt-4 rounded-lg border border-[#B7D7A8] bg-[#EEF6EC] px-4 py-3 text-sm font text-[#4F7A43]">
          {success}
        </div>
      )}

      {errors.submit && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {errors.submit}
        </div>
      )}

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        {/* FIRST + LAST NAME */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="first-name"
              className="text-sm font-medium text-[#5A4B3A]"
            >
              First Name
            </label>

            <input
              id="first-name"
              type="text"
              name="firstName"
              placeholder="Juan"
              autoComplete="given-name"
              value={form.firstName}
              onChange={handleChange}
              required
              className={`${inputClasses}${
                errors.firstName ? " border-red-500" : ""
              }`}
            />

            {errors.firstName && (
              <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="last-name"
              className="text-sm font-medium text-[#5A4B3A]"
            >
              Last Name
            </label>

            <input
              id="last-name"
              type="text"
              name="lastName"
              placeholder="Dela Cruz"
              autoComplete="family-name"
              value={form.lastName}
              onChange={handleChange}
              required
              className={`${inputClasses}${
                errors.lastName ? " border-red-500" : ""
              }`}
            />

            {errors.lastName && (
              <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* AGE + GENDER */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="age" className="text-sm font-medium text-[#5A4B3A]">
              Age
            </label>

            <input
              id="age"
              type="text"
              name="age"
              placeholder="25"
              value={form.age}
              onChange={handleChange}
              required
              className={`${inputClasses}${
                errors.age ? " border-red-500" : ""
              }`}
            />

            {errors.age && (
              <p className="mt-1 text-xs text-red-600">{errors.age}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="gender"
              className="text-sm font-medium text-[#5A4B3A]"
            >
              Gender
            </label>

            <select
              id="gender"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
              className={`${inputClasses}${
                errors.gender ? " border-red-500" : ""
              }`}
            >
              <option value="">Select Gender</option>

              {genders.map((g) => (
                <option key={g} value={g}>
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </option>
              ))}
            </select>

            {errors.gender && (
              <p className="mt-1 text-xs text-red-600">{errors.gender}</p>
            )}
          </div>
        </div>

        {/* CONTACT */}
        <div>
          <label
            htmlFor="contact-number"
            className="text-sm font-medium text-[#5A4B3A]"
          >
            Contact Number
          </label>

          <input
            id="contact-number"
            type="text"
            name="contactNumber"
            placeholder="09123456789"
            value={form.contactNumber}
            onChange={handleChange}
            required
            className={`${inputClasses}${
              errors.contactNumber ? " border-red-500" : ""
            }`}
          />

          {errors.contactNumber && (
            <p className="mt-1 text-xs text-red-600">{errors.contactNumber}</p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <label
            htmlFor="signup-email"
            className="text-sm font-medium text-[#5A4B3A]"
          >
            Email
          </label>

          <input
            id="signup-email"
            type="email"
            name="email"
            placeholder="delacruzjuan@example.com"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            required
            className={`${inputClasses}${
              errors.email ? " border-red-500" : ""
            }`}
          />

          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email}</p>
          )}
        </div>

        {/* USERNAME */}
        <div>
          <label
            htmlFor="username"
            className="text-sm font-medium text-[#5A4B3A]"
          >
            Username
          </label>

          <input
            id="username"
            type="text"
            name="username"
            placeholder="johndoe"
            value={form.username}
            onChange={handleChange}
            required
            className={`${inputClasses}${
              errors.username ? " border-red-500" : ""
            }`}
          />

          {errors.username && (
            <p className="mt-1 text-xs text-red-600">{errors.username}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <label
            htmlFor="signup-password"
            className="text-sm font-medium text-[#5A4B3A]"
          >
            Password
          </label>

          <div className="relative mt-2">
            <input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create a password"
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              required
              className={`${inputClasses} pr-12${
                errors.password ? " border-red-500" : ""
              }`}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/3 items-center justify-center rounded-full transition hover:bg-[#F3E8D7]"
            >
              {showPassword ? (
                <Visibility
                  className="text-[#8B5E3C]"
                  style={{
                    fontSize: 18,
                  }}
                />
              ) : (
                <VisibilityOff
                  className="text-[#8B5E3C]"
                  style={{
                    fontSize: 18,
                  }}
                />
              )}
            </button>
          </div>

          <p className="mt-2 text-xs leading-5 text-[#7A6A58]">
            Use at least 8 characters.
          </p>

          {errors.password && (
            <p className="mt-1 text-xs text-red-600">{errors.password}</p>
          )}
        </div>

        {/* ADDRESS */}
        <div>
          <label
            htmlFor="address"
            className="text-sm font-medium text-[#5A4B3A]"
          >
            Address
          </label>

          <textarea
            id="address"
            name="address"
            placeholder="Enter your address"
            value={form.address}
            onChange={handleChange}
            required
            rows="3"
            className={`${inputClasses} resize-none${
              errors.address ? " border-red-500" : ""
            }`}
          />

          {errors.address && (
            <p className="mt-1 text-xs text-red-600">{errors.address}</p>
          )}
        </div>

        {/* SUBMIT */}
        <Button
          type="submit"
          variant="primary"
          className={actionButtonClassName}
          disabled={loading || success}
        >
          {loading
            ? "Creating Account..."
            : success
              ? "Redirecting..."
              : "Create Account"}
        </Button>

        {/* SOCIALS */}
        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <Button
            type="button"
            variant="secondary"
            className={actionButtonClassName}
          >
            Sign up with Google
          </Button>

          <Button
            type="button"
            variant="secondary"
            className={actionButtonClassName}
          >
            Sign up with Apple
          </Button>
        </div>
      </form>

      {/* LOGIN */}
      <div className="mt-8 border-t border-[#E5D3B8] pt-6 text-sm text-[#5A4B3A]">
        Already have an account?{" "}
        <Link
          to="/auth/signin"
          className="font-semibold text-[#8B5E3C] transition hover:text-[#6F472D]"
        >
          Log In
        </Link>
      </div>
    </>
  );
};

export default SignUpPage;
