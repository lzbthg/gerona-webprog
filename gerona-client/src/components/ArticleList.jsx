import { Link } from "react-router-dom";
import Button from "./Button";

const ArticleList = ({ articles }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {articles.map((article, index) => (
        <article
          key={article.slug}
          className="flex h-full flex-col justify-between rounded-3xl border-2 border-[#D9C2A7] bg-[#FFF3E6] p-4"
        >
          <div className="w-full aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-[#FFEAD2]">
            {article.image ? (
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <div className="flex h-full items-center justify-center rounded-xl bg-[#F9E5C7] text-center px-4">
                <span className="text-sm font-semibold text-[#7C4A11]">
                  {article.title}
                </span>
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-col gap-2 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7C9A6D]">
              Article {String(index + 1).padStart(2, "0")}
            </p>

            <h3 className="text-lg font-semibold text-[#3E2C23]">
              {article.title}
            </h3>

            <p className="text-sm leading-6 text-[#5A4B3A]">
              {article.content
                ? `${article.content.substring(0, 150)}...`
                : "No preview available."}
            </p>
          </div>

          <Link to={`/articles/${article.slug}`}>
            <Button className="mt-4">Read More</Button>
          </Link>
        </article>
      ))}
    </div>
  );
};

export default ArticleList;
