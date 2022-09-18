import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import ArticleBlock from './ArticleBlock';
import { GET_ARTICLES } from '../operations';

const listStyle = {
  listStyle: 'none',
  margin: 0,
  padding: 0,
};

const listItemStyle = {
  margin: '0 5px',
};

function Home({ filter }) {
  const [page, setPage] = useState(1);

  const { loading, error, data } = useQuery(GET_ARTICLES, {
    variables: { tag: filter, page },
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <ul style={listStyle}>
        {data.articles.length === 0 ? <li style={listItemStyle}>...</li> : null}
        {data.articles.map((article, index) => (
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
