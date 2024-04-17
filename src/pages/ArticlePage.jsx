import { useParams } from "react-router-dom";
import articles from "../article-content";

export const ArticlePage = () => {
  const params = useParams();
  const articleId = params.articleId; //the param key is defined in the route /id:paramName, and the value is what is typed in the url

  const article = articles.find((article) => article.name === articleId);

  return (
    <>
      <h1>{article.title}</h1>
      {article.content.map((content) => (
        <p key={content.id}>{content}</p>
      ))}
    </>
  );
};
