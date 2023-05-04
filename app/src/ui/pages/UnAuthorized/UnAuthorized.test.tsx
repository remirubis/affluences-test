import { render, screen } from '@testing-library/react';
import React from 'react';

import { UnAuthorized } from './UnAuthorized';

test('renders learn react link', () => {
  render(<UnAuthorized />);
  const linkElement = screen.getByText(/UnAuthorized/i);
  expect(linkElement).toBeInTheDocument();
});
