import Button from "../components/Button";
import capyLost from "../assets/capy-lost.png";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FFF8F0] px-4 py-10">
      <div className="w-full max-w-2xl rounded-[2rem] border-2 border-[#E5D3B8] bg-[#FFFDF9] p-8 text-center shadow-[0_12px_40px_rgba(139,94,60,0.08)] sm:p-12">
        {/* 404 LABEL */}
        <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#7C9A6D]">
          Error 404
        </p>

        {/* TITLE */}
        <h1 className="mt-4 text-6xl font-black tracking-tight text-[#3E2C23] sm:text-7xl">
          Lost Capybara 
        </h1>

        {/* IMAGE */}
        <div className="mt-8 flex justify-center">
          <img
            src={capyLost}
            alt="Lost Capybara"
            className="h-52 w-52 object-contain sm:h-64 sm:w-64"
          />
        </div>

        {/* SUBTITLE */}
        <h2 className="mt-6 text-2xl font-semibold text-[#3E2C23] sm:text-3xl">
          Oops! This page wandered away.
        </h2>

        {/* DESCRIPTION */}
        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#5A4B3A] sm:text-base">
          Looks like the page you're searching for took a relaxing dip
          somewhere else. It may have been moved, deleted, or never existed in
          the first place.
        </p>

        {/* BUTTONS */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            to="/"
            variant="primary"
            className="min-w-[170px]"
          >
            Back Home
          </Button>

          <Button
            to="/articles"
            variant="secondary"
            className="min-w-[170px]"
          >
            Browse Articles
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;