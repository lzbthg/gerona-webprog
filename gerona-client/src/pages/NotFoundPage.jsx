import Button from "../components/Button";
import capyLost from "../assets/capy-lost.png";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FFF8F0] px-4">
      <div className="max-w-xl text-center">
        {/* 404 Title */}
        <h1 className="text-6xl font-bold text-[#3E2C23]">404</h1>

        {/* Image */}
        <div className="mt-4 flex justify-center">
          <img
            src={capyLost}
            alt="Lost Capybara"
            className="w-55 h-55 object-contain"
          />
        </div>

        {/* Heading */}
        <h2 className="mt-4 text-2xl font-semibold text-[#3E2C23]">
          Oops! Page not found 🐹
        </h2>

        {/* Description */}
        <p className="mt-3 text-sm leading-6 text-[#5A4B3A]">
          Looks like this page wandered off like a capybara. The page you're
          looking for doesn’t exist or has been moved.
        </p>

        {/* Actions */}
        <div className="mt-6 flex justify-center gap-3">
          <Button to="/" className="bg-[#7C9A6D] text-white">
            Back Home
          </Button>

          <Button
            to="/articles"
            className="bg-transparent border border-[#7C9A6D] text-[#3E2C23]"
          >
            {" "}
            Browse Articles
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
