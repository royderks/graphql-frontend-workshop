### Excercise 7

GraphQL APIs typically use "cursor-based" pagination. This means that you can use a cursor to get the next page of results. The cursor is a string that is returned with the results, and can be used to get the next page of results.

Cursor-based pagination is for example used by [Relay](https://relay.dev/graphql/connections.htm), and is also supported by the StepZen GraphQL API. The query parameters for `first` and `after` are used for pagination. With `first` you define the amount of results, while `after` is the cursor of the last result on the previous page. Think of `cursor` as `offset`, which you might know from other pagination methods. To dynamically get the value for `after` you should use the value from the `endCursor` field in `pageInfo`. Also, `hasNextPage` lets you know if there is a next page based on `first` and `endCursor` values.

The results won't be the response type we've seen before but a "connection" type:

- Connection type: a connection is a collection of objects with metadata such as:
    - `pageInfo` has all the information about the current page and contains `hasNextPage`, `hasPreviousPage`, `startCursor`, `endCursor`.
    - `edges` will provide you flexibility to use your data (node). Each edge has:
        - a `node`: a record or a data
        - a `cursor`: base64 encoded string to help GraphQL with pagination

> Hint: have a look at the `paginatedArticles` query in the GraphQL API schema.

<details>
<summary>Show solution</summary>
<p>


[Look at the code]()

</p>
</details>


