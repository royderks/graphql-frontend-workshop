import { useQuery, gql } from "@apollo/client";
import React, { useState } from "react";

import ArticleBlock from "./ArticleBlock";

const listStyle = {
  listStyle: "none",
  margin: 0,
  padding: 0,
};

const listItemStyle = {
  margin: "0 5px",
};

const GET_ARTICLES = gql`
  query GetArticles($tag: String) {
    articles(tag: $tag) {
      id
      title
      description
      user {
        username
      }
      upvotes
    }
  }
`;

function Home({ filter }) {
  const [page, setPage] = useState(1);
  const { loading, error, data } = useQuery(GET_ARTICLES, {
    variables: { tag: filter },
  });

  if (loading) return "Loading...";
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
        <button type="button" onClick={() => setPage(page + 1)}>
          Next page
        </button>
      </div>
    </>
  );
}

export default Home;
