import Button from "../components/Button.jsx";
import ArticleList from "../components/ArticleList.jsx";
import articles from "../assets/article-content.js";

const ArticleListPage = () => {
  return (
    <div className="flex w-full flex-col gap-6 bg-[#FFF3E6]">
      <section className="border-y-2 border-[#8B5E3C] bg-[#FFF8F0] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7C9A6D]">
          Articles
        </p>

        <h1 className="max-w-xl text-3xl font-bold leading-tight text-[#3E2C23] sm:text-4xl">
          Explore Capybara Stories and Facts
        </h1>

        <p className="mt-4 max-w-lg text-sm leading-7 text-[#5A4B3A] sm:text-base">
          Discover different topics about capybaras including their lifestyle,
          behavior, habitat, and fun facts that make them beloved around the
          world.
        </p>

        <div className="mt-6">
          <Button to="/">Back Home</Button>
        </div>
      </section>

      <section className="border-y-2 border-[#8B5E3C] bg-[#FFF8F0] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7C9A6D]">
            Featured Articles
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-[#3E2C23]">
            Capybara Topics
          </h2>
        </div>

        <ArticleList articles={articles} />
      </section>
    </div>
  );
};

export default ArticleListPage;
