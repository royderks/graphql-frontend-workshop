## Getting started

Clone this repository (or fork it), move into the directory `introduction` install all dependencies by running:

```
npm i
# or
yarn
```

After the installation is completed, run the development server:

```
npm start
# or
yarn start
```

Open http://localhost:3000 in your browser to see the result. Data from DEV.to is being pulled into the application.

## What's next?

To get a free GraphQL API, you need to install the [StepZen](https://stepzen.com) CLI:

```
npm i -g stepzen
```

The CLI is installed globally, so you can use it in different projects too.

After the installation is completed, you can [signup](https://stepzen.com/signup) for a free account. You will be able to use this account to create a secure GraphQL API for your data. Also, you can proceed without signing up and use a public GraphQL API endpoint.

## And Finally...

[Install Apollo Client DevTools](https://www.apollographql.com/docs/react/development-testing/developer-tooling#apollo-client-devtools) in your browser to inspect the GraphQL queries and mutations that are being executed in the application.

## Excercises

### Excercise 1

This application uses a GraphQL API created with StepZen, that is connected to DEV.to. To deploy this GraphQL API you need to use the StepZen CLI. You can then use GraphQL to explore the API.

To deploy the API, run the following command:

```
cd stepzen
stepzen start
```

You can continue with a public endpoint or [signup](https://stepzen.com/signup) for a free StepZen account to get a private, secure endpoint.

Run your first query, and retrieve the `id`, `title` and `description` of the articles from DEV.to; what does the query look like?

<details>
<summary>Show solution</summary>
<p>

```graphql
{
  articles {
    id
    title
    description
  }
}

# or

query {
  articles {
    id
    title
    description
  }
}
```

</p>
</details>

### Excercise 2

Can you alter the query to also get the username of the user that wrote every article?

> Hint: Think back to how you inspect a GraphQL API schema.

<details>
<summary>Show solution</summary>
<p>

```graphql
{
  articles {
    id
    title
    description
    user {
      username
    }
  }
}

# or

query {
  articles {
    id
    title
    description
    user {
      username
    }
  }
}
```

</p>
</details>

### Excercise 3

GraphQL APIs can be queried from a client application. In this exercise, you will use the GraphQL API from the previous exercise to query data from DEV.to inside the React application.

Change the `fetchArticles` function in `src/components/Home.js` to use the GraphQL API from the previous exercise. You can use the `fetch` API to query the API. The GraphQL API is available at the endpoint printed in the terminal where you ran `stepzen start`, this endpoint starts with `https://` (the `localhost` endpoint is only available for local epxloration with GraphiQL).

> Hint: if you signed up for StepZen, you also need to use your API key in the `Authorization` header. Run `stepzen whoami --apikey` to get your API key or head over to the [StepZen dashboard](https://dashboard.stepzen.com).

> Hint: have a look at the network tab in GraphiQL to see how the request to the GraphQL API is formatted.

<details>
<summary>Show solution</summary>
<p>

[Look at the code]()

</p>
</details>

### Excercise 4

Also change the request to get a single article from DEV.to. The `fetchArticle` function in `src/components/Article.js` needs to be changed to use the GraphQL API from the previous exercise.

> Hint: how do you pass the variable to the GraphQL query

<details>
<summary>Show solution</summary>
<p>

[Look at the code]()

</p>
</details>

### Excercise 5

The query you've used in the previous exercise has a query parameter, which can be better handled from a named query. Next to helping you to handle query variables, named queries are important for your GraphQL API and Client later, as they are often used for caching purposes.

Change the query to get an article to a named query, and change the implementation in `src/components/Article.js` to use the named query.

<details>
<summary>Show solution</summary>
<p>

The query becomes:

```graphql
query GetArticleById($id: String!) {
  article(id: $id) {
    id
    title
    description
    body_html
  }
}
```

[Look at the code]()

</p>
</details>

### Excercise 6

Finally, the `fetchArticles` function in `src/components/Home.js` can be changed to use a named query. This query can take the `tag` as a variable.

When you press the filters, the `tag` variable should be updated meaning new articles are loaded.

<details>
<summary>Show solution</summary>
<p>

[Look at the code]()

</p>
</details>

### Excercise 7

GraphQL APIs typically use "cursor-based" pagination. This means that you can use a cursor to get the next page of results. The cursor is a string that is returned with the results, and can be used to get the next page of results. Cursor-based pagination is a bit more complicated than page-based pagination, but it is more efficient and scalable - and is the default pagination strategy for GraphQL but will be handled later on.

The GraphQL API for these excersises support both cursor-based and page-based pagination. The `fetchArticles` function in `src/components/Home.js` can be changed to use page-based pagination.

Add a button on the bottom of the page to load the next page of articles. You can use the `page` variable in the `articles` query to get the next page of results.

<details>
<summary>Show solution</summary>
<p>

[Look at the code]()

</p>
</details>

### Excercise 8

Instead of using `fetch` we can also use a GraphQL client library to query the GraphQL API. In this exercise, you will use [Apollo Client](https://www.apollographql.com/docs/react/) to query the GraphQL API.

Install Apollo Client:

```
npm i @apollo/client graphql

# or

yarn add @apollo/client graphql
```

And add a `ApolloProvider` to the `src/index.js` file:

```js
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://YOUR_USERNAME.stepzen.net/api/newsapp/__graphql',
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);
```

if you're using a private, secure StepZen GraphQL endpoint you need to add your API key to the `headers` option:

```js
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://YOUR_USERNAME.stepzen.net/api/newsapp/__graphql',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: 'YOUR_STEPZEN_API_KEY',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
```

The GraphQL API is available at the endpoint printed in the terminal where you ran `stepzen start`, this endpoint starts with `https://` (the `localhost` endpoint is only available for local epxloration with GraphiQL).

Change the `useEffect` Hooks in `src/components/Home.js` and `src/components/Article.js` to use Apollo Client to query the GraphQL API. You can use the `useQuery` hook to query the API.

<details>
<summary>Show solution</summary>
<p>

[Look at the code]()

</p>
</details>

### Excercise 9

You cana also use GraphQL to handle mutations. The GraphQL schema has a mutation to add upvotes to an article. But before we'll do that, we'll need to refactor the `scr/components/Home.js` and create a new component to render the articles on the homepage.

Create a new component `src/components/ArticleBlock.js` and move the code to render an individual article to this component. The `src/components/Home.js` component should iterate over this component using the data from GraphQL.

Also, display the number of upvotes for each article.

<details>
<summary>Show solution</summary>
<p>

[Look at the code]()

</p>
</details>

### Excercise 10

Now that we have a component to render an article, we can add a button to upvote an article. The `src/components/ArticleBlock.js` component should have a button to upvote an article. When the button is pressed, a message that the upvote has been submitted should be displayed. The GraphQL API has a mutation to upvote an article, called `upvoteArticle` that you should use.

Add a button to upvote an article, you can use the `useMutation` hook from `@apollo/client` to handle the mutation.

> Bonus: Show a loading indicator when the button to upvote an article is pressed.

<details>
<summary>Show solution</summary>
<p>

[Look at the code]()

</p>
</details>

### Excercise 11

Every time you upvote an article the count for the total number of upvotes should be updated. However, this cana only happen when the GraphQL API is queried again. This can be done by using refetching. Refetching is a way to query the GraphQL API again, and update the data in the cache.

Refetch the data from the GraphQL API to list the articles when an article is upvoted. You can use the `refetchQueries` option from `@apollo/client` to refetch the data.

> Hint: there are two ways to do refetching.

<details>
<summary>Show solution</summary>
<p>

The easies way to do refetching is by using the query name. Remember why named queries were important?

```js
function ArticleBlock({ id, title, description, user, upvotes, index }) {
  const [upvoteArticle, { data, loading, error }] = useMutation(
    UPVOTE_ARTICLE,
    {
      variables: { postId: id },
      refetchQueries: ['GEtArticles'],
    },
  );

  // ...
}
```

More advanced refetching can be done by using the `query` option. This option takes a GraphQL query, and refetches the data based on the query. 

[Look at the code]()

</p>
</details>
