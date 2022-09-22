import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import App from './App';
import './index.css';

// Enter your Free StepZen API root URL here, either public (no signup)
// or private (signup required, but secure and more performant)
const httpLink = createHttpLink({
  uri: 'https://',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: 'stepzen YOUR_STEPZEN_API_KEY (optionally)',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);
