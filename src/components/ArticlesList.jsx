/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export const ArticlesList = ({ articles }) => {
  return (
    <>
      {articles.map((article, i) => (
        <div key={article.id + "-" + i}>
          <Link to={`/articles/${article.name}`} className="article-list-item">
            <h3>{article.title}</h3>
            <p>{article.content[0].substring(0, 150)}...</p>
          </Link>
        </div>
      ))}
    </>
  );
};
