import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ARTICLE } from '../operations';

const articleStyle = {
  margin: 0,
  padding: '10px 20px',
};

function Article() {
  let params = useParams();

  const { loading, error, data } = useQuery(GET_ARTICLE, {
    variables: { id: params.id },
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div style={articleStyle}>
      {!data.article.id === 0 ? <p>...</p> : null}
      <h2>{data.article.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: data.article.body_html }} />
    </div>
  );
}

export default Article;
