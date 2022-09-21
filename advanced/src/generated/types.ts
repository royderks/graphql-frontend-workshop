export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSON: any;
};

export type Article = {
  __typename?: 'Article';
  body_html?: Maybe<Scalars['String']>;
  canonical_url?: Maybe<Scalars['String']>;
  collection_id?: Maybe<Scalars['Int']>;
  comments_count?: Maybe<Scalars['Int']>;
  cover_image?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['DateTime']>;
  crossposted_at?: Maybe<Scalars['JSON']>;
  description?: Maybe<Scalars['String']>;
  edited_at?: Maybe<Scalars['DateTime']>;
  flare_tag?: Maybe<FlareTag>;
  id?: Maybe<Scalars['Int']>;
  last_comment_at?: Maybe<Scalars['DateTime']>;
  organization?: Maybe<Organization>;
  path?: Maybe<Scalars['String']>;
  positive_reactions_count?: Maybe<Scalars['Int']>;
  public_reactions_count?: Maybe<Scalars['Int']>;
  published_at?: Maybe<Scalars['DateTime']>;
  published_timestamp?: Maybe<Scalars['DateTime']>;
  readable_publish_date?: Maybe<Scalars['String']>;
  reading_time_minutes?: Maybe<Scalars['Int']>;
  slug?: Maybe<Scalars['String']>;
  social_image?: Maybe<Scalars['String']>;
  tag_list?: Maybe<Array<Maybe<Scalars['String']>>>;
  tags?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  type_of?: Maybe<Scalars['String']>;
  upvotes?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type ArticleConnection = {
  __typename?: 'ArticleConnection';
  edges?: Maybe<Array<Maybe<ArticleEdge>>>;
  pageInfo: PageInfo;
};

export type ArticleEdge = {
  __typename?: 'ArticleEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<Article>;
};

export type FlareTag = {
  __typename?: 'FlareTag';
  bg_color_hex?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  text_color_hex?: Maybe<Scalars['String']>;
};

export type Login = {
  __typename?: 'Login';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  password?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};

/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<Login>;
  upvoteArticle?: Maybe<Upvote>;
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationUpvoteArticleArgs = {
  postId?: InputMaybe<Scalars['Int']>;
};

export type Organization = {
  __typename?: 'Organization';
  name?: Maybe<Scalars['String']>;
  profile_image?: Maybe<Scalars['String']>;
  profile_image_90?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

/**
 * PageInfo indicates if more results are available in a connection.
 * See *GraphQL Cursor Connections Specification*
 */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** Cursor corresponding to the last node in edges */
  endCursor: Scalars['String'];
  /** Indicates whether more edges exist following the set defined by the pagination arguments. */
  hasNextPage: Scalars['Boolean'];
  /** Indicates whether more edges exist prior to the set defined by the pagination arguments. */
  hasPreviousPage: Scalars['Boolean'];
  /** Cursor corresponding to the first node in edges */
  startCursor: Scalars['String'];
};

/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type Query = {
  __typename?: 'Query';
  article?: Maybe<Article>;
  articles?: Maybe<Array<Maybe<Article>>>;
  paginatedArticles?: Maybe<ArticleConnection>;
  totalUpvotes?: Maybe<Scalars['Int']>;
  upvotes?: Maybe<Array<Maybe<Upvote>>>;
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryArticleArgs = {
  id?: InputMaybe<Scalars['String']>;
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryArticlesArgs = {
  page?: InputMaybe<Scalars['Int']>;
  per_page?: InputMaybe<Scalars['Int']>;
  tag?: InputMaybe<Scalars['String']>;
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryPaginatedArticlesArgs = {
  after?: Scalars['String'];
  first?: Scalars['Int'];
  tag?: InputMaybe<Scalars['String']>;
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryTotalUpvotesArgs = {
  postId?: InputMaybe<Scalars['Int']>;
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryUpvotesArgs = {
  postId?: InputMaybe<Scalars['Int']>;
};

export type Upvote = {
  __typename?: 'Upvote';
  createdAt?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  postId?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  github_username?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  profile_image?: Maybe<Scalars['String']>;
  profile_image_90?: Maybe<Scalars['String']>;
  twitter_username?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
  website_url?: Maybe<Scalars['String']>;
};

export type CoreArticleFieldsFragment = { __typename?: 'Article', id?: number | null, title?: string | null, description?: string | null };

export type GetArticlesQueryVariables = Exact<{
  tag?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  loggedIn?: InputMaybe<Scalars['Boolean']>;
}>;


export type GetArticlesQuery = { __typename?: 'Query', articles?: Array<{ __typename?: 'Article', upvotes?: number | null, id?: number | null, title?: string | null, description?: string | null, user?: { __typename?: 'User', username?: string | null } | null } | null> | null };

export type GetArticleByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetArticleByIdQuery = { __typename?: 'Query', article?: { __typename?: 'Article', body_html?: string | null, id?: number | null, title?: string | null, description?: string | null } | null };

export type UpvoteArticleMutationVariables = Exact<{
  postId: Scalars['Int'];
}>;


export type UpvoteArticleMutation = { __typename?: 'Mutation', upvoteArticle?: { __typename?: 'Upvote', id?: string | null } | null };

export type LoginUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginUserMutation = { __typename?: 'Mutation', login?: { __typename?: 'Login', token?: string | null } | null };
