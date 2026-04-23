import { Link } from "react-router-dom";
import Button from "./Button";


const ArticleList = ({ articles }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {articles.map((article, index) => (
        <article
          key={article.name}
          className="flex h-full flex-col justify-between rounded-3xl border-2 border-[#D9C2A7] bg-[#FFF3E6] p-4"
        >
          <div className="w-full aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-[#FFEAD2]">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          <div className="mt-4 flex flex-col gap-2 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7C9A6D]">
              Article {String(index + 1).padStart(2, "0")}
            </p>

            <h3 className="text-lg font-semibold text-[#3E2C23]">
              {article.title}
            </h3>

            <p className="text-sm leading-6 text-[#5A4B3A]">
              {article.content[0].substring(0, 150)}...
            </p>
          </div>

          <Link to={`/articles/${article.name}`}>
            <Button className="mt-4">Read More</Button>
          </Link>
        </article>
      ))}
    </div>
  );
};

export default ArticleList;
