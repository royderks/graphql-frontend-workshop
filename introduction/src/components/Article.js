import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const articleStyle = {
  margin: 0,
  padding: '10px 20px',
};

function Article() {
  const [article, setArticle] = useState({});
  let params = useParams();

  useEffect(() => {
    async function fetchArticleById(id) {
      try {
        const data = await fetch(`https://dev.to/api/articles/${id}`);
        const result = await data.json();

        if (result) {
          setArticle(result);
        }
      } catch (e) {
        console.log('Error', e.message);
      }
    }
    if (!article.id && params.id) {
      fetchArticleById(params.id);
    }
  }, [params.id, article]);

  return (
    <div style={articleStyle}>
      {!article.id === 0 ? <p>...</p> : null}
      <h2>{article.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: article.body_html }} />
    </div>
  );
}

export default Article;
