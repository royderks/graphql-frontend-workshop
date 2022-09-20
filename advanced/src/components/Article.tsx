import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ARTICLE } from '../operations';
import { ArticleType } from 'src/types';

const articleStyle = {
  margin: 0,
  padding: '10px 20px',
};

type GetArticleData = {
  article: ArticleType;
};

type GetArticleVars = {
  id?: string;
};

function Article() {
  let params = useParams();

  const { loading, error, data } = useQuery<GetArticleData, GetArticleVars>(
    GET_ARTICLE,
    {
      variables: { id: params.id },
    },
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! {error.message}</p>;

  return (
    <div style={articleStyle}>
      {!data?.article.id ? <p>...</p> : null}
      <h2>{data?.article.title}</h2>
      {data?.article.body_html && (
        <div dangerouslySetInnerHTML={{ __html: data.article.body_html }} />
      )}
    </div>
  );
}

export default Article;
