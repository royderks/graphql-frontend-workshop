import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import Articles from './Article';

const mocks = []; // We'll fill this in next

it('renders without error', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Articles />
    </MockedProvider>,
  );
  expect(await screen.findByText('Loading...')).toBeInTheDocument();
});
