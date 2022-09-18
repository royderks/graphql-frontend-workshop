import React from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

const GET_ARTICLE = gql`
  query GetArticleById($id: String!) {
    article(id: $id) {
      id
      title
      description
      body_html
    }
  }
`;

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
