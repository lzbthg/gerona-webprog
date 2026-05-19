import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { articleImages } from "../../data/article-content";
import { fetchArticles } from "../../services/ArticleService";

const HomePage = () => {
  const [featuredArticles, setFeaturedArticles] = useState([]);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const { data } = await fetchArticles();

        const featured = data.articles.filter(
          (article) => article.featured && article.isActive,
        );

        setFeaturedArticles(featured);
      } catch (err) {
        console.error(err);
      }
    };

    loadArticles();
  }, []);

  return (
    <div className="flex w-full flex-col gap-6 bg-[#FFF3E6]">
      {/* HERO SECTION */}
      <section className="border-y-2 border-[#8B5E3C] bg-[#FFF8F0] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7C9A6D]">
              Capybara World
            </p>

            <h1 className="max-w-xl text-3xl font-bold leading-tight text-[#3E2C23] sm:text-4xl">
              Welcome to Capy Corner! 🐹
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-7 text-[#5A4B3A] sm:text-base">
              Capybaras are the largest rodents in the world and are known for
              their calm and friendly nature.
            </p>

            <div className="mt-6">
              <Button to="/about" variant="primary">
                Learn More
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-dashed border-[#D9C2A7] bg-[#FFF3E6] p-6">
            <img
              src="src/assets/capy1.jpg"
              alt="capybara"
              className="w-full rounded-xl"
            />
          </div>
        </div>
      </section>

      {/* FACTS SECTION */}
      <section className="border-y-2 border-[#8B5E3C] bg-[#FFF8F0] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7C9A6D]">
            Capybara Facts
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-[#3E2C23]">
            Quick Overview
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border-2 border-[#D9C2A7] bg-[#FFF3E6] p-5">
            <p className="text-2xl font-bold text-brown-900">8–10 years</p>

            <p className="mt-2 text-[11px] uppercase text-[#7C9A6D]">
              Lifespan
            </p>
          </div>

          <div className="rounded-3xl border-2 border-[#D9C2A7] bg-[#FFF3E6] p-5">
            <p className="text-2xl font-bold text-brown-900">5–20</p>

            <p className="mt-2 text-[11px] uppercase text-[#7C9A6D]">
              Group Size
            </p>
          </div>

          <div className="rounded-3xl border-2 border-[#D9C2A7] bg-[#FFF3E6] p-5">
            <p className="text-2xl font-bold text-brown-900">
              Excellent Swimmers
            </p>

            <p className="mt-2 text-[11px] uppercase text-[#7C9A6D]">Ability</p>
          </div>

          <div className="rounded-3xl border-2 border-[#D9C2A7] bg-[#FFF3E6] p-5">
            <p className="text-2xl font-bold text-brown-900">Webbed Feet</p>

            <p className="mt-2 text-[11px] uppercase text-[#7C9A6D]">
              Adaptation
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED ARTICLES */}
      <section className="border-y-2 border-[#8B5E3C] bg-[#FFF8F0] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7C9A6D]">
            Featured Articles
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-[#3E2C23]">
            Meet the Capybaras
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {featuredArticles.map((article, index) => (
            <article
              key={article._id}
              className="rounded-3xl border-2 border-[#D9C2A7] bg-[#FFF3E6] p-4"
            >
              {/* TOP BAR */}
              <div className="mb-4 flex items-center justify-between px-1">
                <span className="text-xs font-bold tracking-[0.28em] text-[#7C9A6D]">
                  ARTICLE {String(index + 1).padStart(2, "0")}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${
                    article.featured
                      ? "border border-[#6E8B74] bg-[#DDEBDD] text-[#35523B]"
                      : "border border-[#B08968] bg-[#EBD8C3] text-[#6B4F3A]"
                  }`}
                >
                  {article.featured ? "Featured" : "Standard"}
                </span>
              </div>

              {/* IMAGE */}
              <img
                src={article.imageUrl || articleImages[article.imageKey]}
                alt={article.title}
                className="h-90 w-full rounded-xl object-cover"
              />

              {/* TITLE */}
              <h3 className="mt-4 text-lg font-semibold text-[#3E2C23]">
                {article.title}
              </h3>

              {/* CONTENT */}
              <p className="mt-3 line-clamp-3 text-sm text-[#5A4B3A]">
                {article.content}
              </p>

              {/* BUTTON */}
              <Button
                to={`/articles/${article.slug}`}
                className="mt-4"
                variant="primary"
              >
                View More
              </Button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
