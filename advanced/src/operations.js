import { gql } from '@apollo/client';

export const GET_ARTICLES = gql`
  query GetArticles($tag: String, $page: Int, $loggedIn: Boolean = false) {
    articles(tag: $tag, page: $page) {
      id
      title
      description
      upvotes @include(if: $loggedIn)
      user {
        username
      }
    }
  }
`;

export const GET_ARTICLE = gql`
  query GetArticleById($id: String!) {
    article(id: $id) {
      id
      title
      description
      body_html
    }
  }
`;

export const UPVOTE_ARTICLE = gql`
  mutation UpvoteArticle($postId: Int!) {
    upvoteArticle(postId: $postId) {
      id
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;
