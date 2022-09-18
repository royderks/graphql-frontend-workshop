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

<details>
<summary>Show solution</summary>
<p>

[Look at the code]()

</p>
</details>


Can you alter the query to get the `description`, `stargazerCount` (number of stars), and the `updatedAt` fields from Github? This query needs to be added to the function that fetches the data from the GraphQL API in `pages.index.js`.
