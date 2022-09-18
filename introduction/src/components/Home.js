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

  // Reset articles when filter changes
  useEffect(() => {
    if (filter) setArticles([]);
  }, [filter]);

  // Fetch articles
  useEffect(() => {
    const fetchArticles = async (filter = '') => {
      try {
        const data = await fetch(
          `https://dev.to/api/articles${filter ? `?tag=${filter}` : ''}`,
        );
        const result = await data.json();

        if (result) {
          setArticles(result);
        }
      } catch (e) {
        console.log('Error', e.message);
      }
    };

    if (!articles.length) {
      fetchArticles(filter);
    }
  }, [articles, filter]);

  return (
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
  );
}

export default Home;
