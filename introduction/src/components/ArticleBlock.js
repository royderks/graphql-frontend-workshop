import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

const labelStyle = {
  color: "#333333",
  paddingRight: 5,
};

const listItemStyle = {
  margin: "28px 0px",
  padding: "5px 40px",
  background: "#E4E1DB"
};

const buttonStyle = {
  backgroundColor: "#333333",
    backgroundImage: "none",
    backgroundSize: "100% 40px",
    fontWeight: "normal",
    color: "#F1F0ED",
    padding: "10px",
    border: "none",
    marginRight: "10px"
};

const titleStyle = {
  textDecoration: "none",
  color: "#333",
}

const moreStyle = {
  color: "#333",
  marginBottom: "5px",
  textDecoration: "none",
  borderBottom: "1px solid #FF00FF",
   paddingBottom: "3px"
}

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
      <h2>
        <Link style={titleStyle} to={`articles/${id}`}>
          {title}
        </Link>
      </h2>
      
      {description}
      <br></br><br></br>
      <Link to={`/articles/${id}`} style={moreStyle}>Les mer</Link>
      <p>
      <br></br>
      <button
          type="button"
          style={buttonStyle}
          disabled={loading}
          onClick={() => upvoteArticle()}
        >
          <strong>{loading ? "Loading" : "Upvote"}</strong>
        </button>

        <span style={labelStyle}>{upvotes} upvotes</span>
        
        <span style={labelStyle}>{error && `Error! ${error.message}`}</span>
        <span style={labelStyle}>{data?.upvoteArticle?.id && "Upvoted!"}</span>
        <p style={{fontSize: 12, float: "right"}}>Posted by:<span style={{ paddingLeft: 5, ...labelStyle }}>{user.username}</span></p>
        
      </p>

      
    </li>
  );
}

export default ArticleBlock;
