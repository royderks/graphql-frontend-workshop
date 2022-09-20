import { gql } from '@apollo/client';

export const CORE_ARTICLE_FIELDS = gql`
  fragment CoreArticleFields on Article {
    id
    title
    description
  }
`;

export const GET_ARTICLES = gql`
  ${CORE_ARTICLE_FIELDS}
  query GetArticles($tag: String, $page: Int, $loggedIn: Boolean = false) {
    articles(tag: $tag, page: $page) {
      ...CoreArticleFields
      upvotes @include(if: $loggedIn)
      user {
        username
      }
    }
  }
`;

export const GET_ARTICLE = gql`
  ${CORE_ARTICLE_FIELDS}
  query GetArticleById($id: String!) {
    article(id: $id) {
      ...CoreArticleFields
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
