import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { GET_ARTICLES, UPVOTE_ARTICLE } from '../operations';
import { ArticleType, UpvoteType } from 'src/types';

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

type UpvoteArticleData = {
  upvoteArticle: UpvoteType;
};

type UpvoteArticleVars = {
  postId: string;
};

function ArticleBlock({
  id,
  title,
  description,
  user,
  upvotes,
  index,
}: ArticleBlockTypes) {
  const [upvoteArticle, { data, loading, error }] = useMutation<
    UpvoteArticleData,
    UpvoteArticleVars
  >(UPVOTE_ARTICLE, {
    variables: { postId: id },
    refetchQueries: [{ query: GET_ARTICLES }],
  });

  return (
    <li key={id} style={listItemStyle}>
      <span style={labelStyle}>{index + 1}. </span>

      <Link to={`articles/${id}`}>
        <button style={titleStyle}>{title}</button>
      </Link>

      <span style={{ paddingLeft: 5, ...labelStyle }}>({user?.username})</span>

      {typeof upvotes !== 'undefined' && upvotes !== null ? (
        <p>
          <span style={labelStyle}>{upvotes} upvotes</span>

          <span style={labelStyle}>{error && `Error! ${error.message}`}</span>
          <span style={labelStyle}>
            {data?.upvoteArticle?.id && 'Upvoted!'}
          </span>

          <button
            type='button'
            disabled={loading}
            onClick={() => upvoteArticle()}
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
