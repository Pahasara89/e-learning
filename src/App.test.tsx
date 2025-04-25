import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Using global test and expect functions
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
}); 