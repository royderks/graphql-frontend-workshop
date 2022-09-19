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

## Excercises

### Excercise 1

This application uses a GraphQL API created with StepZen, that is connected to DEV.to. To deploy this GraphQL API you need to use the StepZen CLI. You can then use GraphQL to explore the API.

To deploy the API, run the following command:

```
cd stepzen
stepzen start
```

You can continue with a public endpoint or [signup](https://stepzen.com/signup) for a free StepZen account to get a private, secure endpoint.

The GraphQL API has queries and mutations to retrieve articles, and "upvote" an article. You can explore the API by using the GraphiQL interface. The GraphiQL interface is available at the endpoint printed in the terminal where you ran `stepzen start`, this endpoint starts with `http://` (the `localhost` endpoint is only available for local epxloration with GraphiQL).

Run a query to upvote an article, and then run a query to retrieve the article again. What is the difference in the `upvotes` field for the article?

<details>
<summary>Show solution</summary>
<p>

```graphql
query GetArticleById($id: String!) {
  article(id: $id) {
    id
    title
    description
    upvotes
  }
}

# then

mutation UpvoteArticle($postId: Int!) {
  upvoteArticle(postId: $postId) {
    id
  }
}

# compare 

query GetArticleById($id: String!) {
  article(id: $id) {
    id
    title
    description
    upvotes
  }
}
```

</p>
</details>

### Excercise 2

Authentication is important for every API. When you use StepZen with a public endpoint, you don't have to deal with authentication. But when you do do sign up for a free account, you will get a secure and private endpoint. This endpoint needs an API key passed in the `Authorization` header.

But there is also a "second layer" of authentication, meaning the users that need to authenticate with the API. This is done by using a JWT token. The JWT token is generated by the StepZen API, and can be used to authenticate users. The JWT token is passed in the `Authorization` header, and is prefixed with `Bearer `.

To get a JWT token, you need to run the following mutation:

```graphql
mutation LoginUser($email: String = "demo@stepzen.com", $password: String = "demo") {
  login(email: $email, password: $password) {
    id
    email
    token
  }
}
```

Let's dive into the React application. 

Hook up the component `src/components/Login.js` to work with this mutation. Store the returned `token` in localStorage.

> Bonus: Add a logout button to the `src/App.js` component. When the user clicks the button, the token should be removed from localStorage.

<details>
<summary>Show solution</summary>
<p>

[Look at the code]()

</p>
</details>

### Excercise 3

GraphQL has built-in directives, which can be used to include (`@include`) or skip (`@skip`) fields in a query. You can use these directives to create a query that only returns the `id` and `title` of an article when a variable is passed to the query.

Can you alter the query to get the `upvotes` for the articles on the homepage so it will only return the upvotes when a variable is passed to the query that indicated the user is logged in? Also, hide the upvote button on the homepage if the query didn't return the `upvotes` field.

<details>
<summary>Show solution</summary>
<p>

[Look at the code]()

</p>
</details>

### Excercise 4

<details>
<summary>Show solution</summary>
<p>

[Look at the code]()

</p>
</details>