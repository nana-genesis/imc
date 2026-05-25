import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renderiza o título da calculadora', () => {
  render(<App />);
  const titulo = screen.getByText(/Calculadora de IMC/i);
  expect(titulo).toBeInTheDocument();
});

test('calcula IMC e mostra classificação (ex: peso normal)', async () => {
  render(<App />);

  const inputAltura = screen.getByLabelText(/Altura/i);
  const inputPeso = screen.getByLabelText(/Peso/i);
  const btn = screen.getByRole('button', { name: /Calcular IMC/i });

  await userEvent.type(inputAltura, '1.75');
  await userEvent.type(inputPeso, '70');
  await userEvent.click(btn);

  const imcTexto = await screen.findByText(/IMC:/i);
  expect(imcTexto).toHaveTextContent('IMC: 22.86');
  const classificacaoP = screen.getByText(/Classificação:/i);
  expect(classificacaoP).toHaveTextContent(/Peso normal/i);
});

test('calcula IMC com vírgula decimal e classifica abaixo do peso', async () => {
  render(<App />);

  const inputAltura = screen.getByLabelText(/Altura/i);
  const inputPeso = screen.getByLabelText(/Peso/i);
  const btn = screen.getByRole('button', { name: /Calcular IMC/i });

  // number inputs can behave differently with commas; set values via change
  fireEvent.change(inputAltura, { target: { value: '1,70' } });
  fireEvent.change(inputPeso, { target: { value: '50' } });
  await userEvent.click(btn);

  const imcTexto2 = await screen.findByText(/IMC:/i);
  expect(imcTexto2).toHaveTextContent('IMC: 17.30');
  const classificacaoP2 = screen.getByText(/Classificação:/i);
  expect(classificacaoP2).toHaveTextContent(/Abaixo do peso/i);
});

