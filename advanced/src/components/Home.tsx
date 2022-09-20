import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import ArticleBlock from './ArticleBlock';
import { GET_ARTICLES } from '../operations';
import { ArticleType } from 'src/types';

const listStyle = {
  listStyle: 'none',
  margin: 0,
  padding: 0,
};

const listItemStyle = {
  margin: '0 5px',
};

type GetArticlesData = {
  articles: ArticleType[];
};

type GetArticlesVars = {
  tag?: string;
  page?: number;
  loggedIn?: boolean;
};

function Home({ filter }: { filter: string }) {
  const [page, setPage] = useState(1);

  const { loading, error, data } = useQuery<GetArticlesData, GetArticlesVars>(
    GET_ARTICLES,
    {
      variables: {
        tag: filter,
        page,
        loggedIn: !!localStorage.getItem('token'),
      },
    },
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! {error.message}</p>;

  return (
    <>
      <ul style={listStyle}>
        {data?.articles.length === 0 ? (
          <li style={listItemStyle}>...</li>
        ) : null}
        {data?.articles.map((article, index: number) => (
          <ArticleBlock key={article.id} index={index} {...article} />
        ))}
      </ul>
      <div>
        <button type='button' onClick={() => setPage(page + 1)}>
          Next page
        </button>
      </div>
    </>
  );
}

export default Home;
