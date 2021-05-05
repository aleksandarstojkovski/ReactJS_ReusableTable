import { render, screen } from '@testing-library/react';
import TableComponent from "./TableComponent";

test('renders learn react link', () => {
  render(<TableComponent />);
  const linkElement = screen.getByText(/React Table/i);
  expect(linkElement).toBeInTheDocument();
});
