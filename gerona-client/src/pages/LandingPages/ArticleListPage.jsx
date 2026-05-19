import { useEffect, useState } from "react";
import Button from "../../components/Button.jsx";
import { fetchArticles } from "../../services/ArticleService";
import { articleImages } from "../../data/article-content";

const ArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);

        const { data } = await fetchArticles();

        setArticles(
          (data.articles || []).filter((article) => article.isActive),
        );
      } catch (err) {
        console.error(err);

        setError("Unable to load articles at this time.");
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  const featuredArticles = articles.filter((article) => article.featured);

  const standardArticles = articles.filter((article) => !article.featured);

  const renderArticles = (articleList) => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {articleList.map((article, index) => (
        <article
          key={article._id}
          className="rounded-3xl border-2 border-[#D9C2A7] bg-[#FFF3E6] p-4"
        >
          {/* BADGE */}
          <div className="mb-4 flex items-center justify-between px-2">
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
            Read Article
          </Button>
        </article>
      ))}
    </div>
  );

  return (
    <div className="flex w-full flex-col gap-6 bg-[#FFF3E6]">
      {/* HERO */}
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

      {/* CONTENT */}
      <section className="border-y-2 border-[#8B5E3C] bg-[#FFF8F0] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {error ? (
          <div className="text-sm text-red-600">{error}</div>
        ) : loading ? (
          <div className="text-sm text-[#5A4B3A]">Loading articles...</div>
        ) : (
          <div className="flex flex-col gap-10">
            {/* FEATURED */}
            {featuredArticles.length > 0 && (
              <div>
                <div className="mb-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7C9A6D]">
                    Featured Articles
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold text-[#3E2C23]">
                    Popular Topics
                  </h2>
                </div>

                {renderArticles(featuredArticles)}
              </div>
            )}

            {/* STANDARD */}
            {standardArticles.length > 0 && (
              <div>
                <div className="mb-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7C9A6D]">
                    Standard Articles
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold text-[#3E2C23]">
                    More Capybara Stories
                  </h2>
                </div>

                {renderArticles(standardArticles)}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default ArticleListPage;
