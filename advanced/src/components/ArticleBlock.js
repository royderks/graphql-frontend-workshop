import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { GET_ARTICLES, UPVOTE_ARTICLE } from '../operations';

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

function ArticleBlock({ id, title, description, user, upvotes, index }) {
  const [upvoteArticle, { data, loading, error }] = useMutation(
    UPVOTE_ARTICLE,
    {
      variables: { postId: id },
      refetchQueries: [{ query: GET_ARTICLES }],
    },
  );

  return (
    <li key={id} style={listItemStyle}>
      <span style={labelStyle}>{index + 1}. </span>

      

      <span style={{ paddingLeft: 5, ...labelStyle }}>({user.username})</span>

      <p>
        <span style={labelStyle}>{upvotes} upvotes</span>

        <span style={labelStyle}>{error && `Error! ${error.message}`}</span>
        <span style={labelStyle}>{data?.upvoteArticle?.id && 'Upvoted!'}</span>

        <button
          type='button'
          disabled={loading}
          onClick={() => upvoteArticle()}
        >
          {loading ? 'Loading' : 'Upvote'}
        </button>
      </p>

      <p>
        <small>
          <span>{description} </span>
          <Link to={`/articles/${id}`}>More...</Link>
        </small>
      </p>
      <Link to={`articles/${id}`}>
        <button style={titleStyle}>{title}</button>
      </Link>
    </li>
  );
}

export default ArticleBlock;
