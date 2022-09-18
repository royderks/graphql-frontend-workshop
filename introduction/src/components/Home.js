import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);

  // Reset articles when filter changes
  useEffect(() => {
    if (filter) setArticles([]);
  }, [filter]);

  // Reset articles when page changes
  useEffect(() => {
    if (page) setArticles([]);
  }, [page]);

  // Fetch articles
  useEffect(() => {
    const fetchArticles = async (filter = '', after = '') => {
      try {
        const data = await fetch(
          `https://public3b47822a17c9dda6.stepzen.net/api/newsapp/__graphql`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: `
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
              `,
              variables: {
                tag: filter,
                page,
              },
            }),
          },
        );
        const result = await data.json();

        if (result?.data?.articles) {
          setArticles(result.data.articles);
        }
      } catch (e) {
        console.log('Error', e.message);
      }
    };

    if (!articles.length) {
      fetchArticles(filter, page);
    }
  }, [articles, filter, page]);

  return (
    <>
      <ul style={listStyle}>
        {articles.length === 0 ? <li style={listItemStyle}>...</li> : null}
        {articles.map(({ id, title, description, user }, index) => (
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
