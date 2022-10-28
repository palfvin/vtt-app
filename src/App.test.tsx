import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders input field', () => {
  render(<App />);
  const inputElement = screen.getByLabelText('Select .vtt file(s)')
  expect(inputElement).toBeInTheDocument();

});
