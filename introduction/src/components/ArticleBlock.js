import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

const labelStyle = {
  color: "#333333",
  paddingRight: 5,
};

const listItemStyle = {
  margin: "0 5px",
};

const titleStyle = {
  background: "transparent",
  color: "#333333",
  border: "none",
  font: "inherit",
  cursor: "pointer",
  padding: "5px 0",
};

const UPVOTE_ARTICLE = gql`
  mutation UpvoteArticle($postId: Int!) {
    upvoteArticle(postId: $postId) {
      id
    }
  }
`;

function ArticleBlock({ id, title, description, user, upvotes, index }) {
  const [upvoteArticle, { data, loading, error }] = useMutation(
    UPVOTE_ARTICLE,
    {
      variables: { postId: id },
    }
  );

  return (
    <li key={id} style={listItemStyle}>
      <span style={labelStyle}>{index + 1}. </span>

      <Link to={`articles/${id}`}>
        <button style={titleStyle}>{title}</button>
      </Link>

      <span style={{ paddingLeft: 5, ...labelStyle }}>({user.username})</span>

      <p>
        <span style={labelStyle}>{upvotes} upvotes</span>

        <span style={labelStyle}>{error && `Error! ${error.message}`}</span>
        <span style={labelStyle}>{data?.upvoteArticle?.id && "Upvoted!"}</span>

        <button
          type="button"
          disabled={loading}
          onClick={() => upvoteArticle()}
        >
          {loading ? "Loading" : "Upvote"}
        </button>
      </p>

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
