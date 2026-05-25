import { render, screen } from '@testing-library/react';
import App from './App';

test('renderiza o título da calculadora', () => {
  render(<App />);
  const titulo = screen.getByText(/Calculadora de IMC/i);
  expect(titulo).toBeInTheDocument();
});
