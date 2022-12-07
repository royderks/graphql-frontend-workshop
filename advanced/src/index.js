import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './App';
import './index.css';

// Enter your Free StepZen API root URL here, either public (no signup)
// or private (signup required, but secure and more performant)
const client = new ApolloClient({
  uri: 'https://YOUR_USERNAME.stepzen.net/api/newsapp/__graphql',
  headers: {
    authorization: 'YOUR_STEPZEN_API_KEY',
  },
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);
