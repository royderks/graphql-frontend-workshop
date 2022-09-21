import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import Article from './Article';
import { GetArticleByIdDocument } from 'src/generated/types';

const mocks = [
  {
    request: {
      query: GetArticleByIdDocument,
      variables: {
        id: '12121',
      },
    },
    result: {
      data: {
        article: {
          id: '12121',
          title: 'Test',
          description: 'This is test',
          body_html: '<h1>Test</h1><p>This is a test</p>',
        },
      },
    },
  },
];

jest.mock('react-router-dom', () => ({
  useParams: () => ({ id: '12121' }),
}));

it('renders without error', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Article />
    </MockedProvider>,
  );
  expect(await screen.findByText('Loading...')).toBeInTheDocument();
});

it('renders without error', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Article />
    </MockedProvider>,
  );

  expect(await screen.findByText('Test')).toBeInTheDocument();
  expect(await screen.findByText('This is a test')).toBeInTheDocument();
});
