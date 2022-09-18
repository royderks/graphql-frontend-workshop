import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

const GET_ARTICLES = gql`
  query GetArticles($tag: String, $page: Int) {
    articles(tag: $tag, page: $page) {
      id
      title
      description
      user {
        username
      }
    }
  }
`;

const listStyle = {
  listStyle: 'none',
  margin: 0,
  padding: 0,
};

const listItemStyle = {
  margin: '0 5px',
};

const labelStyle = {
  color: '#828282',
  paddingRight: 5,
};

const titleStyle = {
  background: 'transparent',
  border: 'none',
  font: 'inherit',
  cursor: 'pointer',
  padding: '5px 0',
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
        {data.articles.map(({ id, title, description, user }, index) => (
          <li key={id} style={listItemStyle}>
            <span style={labelStyle}>{index + 1}. </span>

            <Link to={`articles/${id}`}>
              <button style={titleStyle}>{title}</button>
            </Link>

            <span style={{ paddingLeft: 5, ...labelStyle }}>
              ({user.username})
            </span>

            <p>
              <small>
                <span>{description} </span>
                <Link to={`/articles/${id}`}>More...</Link>
              </small>
            </p>
          </li>
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
