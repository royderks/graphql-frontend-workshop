import React from 'react';
import { Link } from 'react-router-dom';
import { GET_ARTICLES } from '../operations';
import {
  Article as ArticleType,
  useUpvoteArticleMutation
} from '../generated/types';

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

const listItemStyle = {
  margin: '0 5px',
};

type ArticleBlockTypes = {
  index: number;
} & ArticleType;

function ArticleBlock({
  id,
  title,
  description,
  user,
  upvotes,
  index,
}: ArticleBlockTypes) {
  const [upvoteArticle, { data, loading, error }] = useUpvoteArticleMutation({
    refetchQueries: [{ query: GET_ARTICLES }],
  });

  return (
    <li key={id} style={listItemStyle}>
      <span style={labelStyle}>{index + 1}. </span>

      <Link to={`articles/${id}`}>
        <button style={titleStyle}>{title}</button>
      </Link>

      <span style={{ paddingLeft: 5, ...labelStyle }}>({user?.username})</span>

      {typeof upvotes !== 'undefined' && upvotes !== null && id ? (
        <p>
          <span style={labelStyle}>{upvotes} upvotes</span>

          <span style={labelStyle}>{error && `Error! ${error.message}`}</span>
          <span style={labelStyle}>
            {data?.upvoteArticle?.id && 'Upvoted!'}
          </span>

          <button
            type='button'
            disabled={loading}
            onClick={() => upvoteArticle({ variables: { postId: id } })}
          >
            {loading ? 'Loading' : 'Upvote'}
          </button>
        </p>
      ) : null}

      <p>
        <small>
          <span>{description} </span>
          <Link to={`/articles/${id}`}>More...</Link>
        </small>
      </p>
    </li>
  );
}

export default ArticleBlock;
