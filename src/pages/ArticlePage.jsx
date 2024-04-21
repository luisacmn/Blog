import { useParams } from "react-router-dom";
import articles from "../article-content";
import { NotFoundPage } from "./NotFoundPage";
import { useEffect, useState } from "react";
import CommentsList from "../components/CommentsList";
import axios from "axios";

const ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });
  const { articleId } = useParams();

 
  useEffect(() => {
    const loadArticleInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/articles/${articleId}`);
        const newArticleInfo = response.data;
        setArticleInfo(newArticleInfo);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    loadArticleInfo();
  }, [articleId]); 

  const article = articles.find(article => article.name === articleId);

  if (!article) {
      return <NotFoundPage />
  }

  return (
      <>
      <h1>{article.title}</h1>
      <p>This article has {articleInfo.upvotes} upvote(s)</p>
      {article.content.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
      ))}
      <CommentsList comments={articleInfo.comments} />
      </>
  );
}

export default ArticlePage;
