import React, { useState } from 'react';
import './App.css';

function App() {
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [imc, setImc] = useState(null);
  const [classificacao, setClassificacao] = useState('');

  const calcularIMC = (e) => {
    e.preventDefault();
    
    if (!altura || !peso) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    const alturaMetros = parseFloat(altura);
    const pesoKg = parseFloat(peso);
    
    const imcCalculado = pesoKg / (alturaMetros * alturaMetros);
    setImc(imcCalculado.toFixed(2));
    
    // Classificação do IMC
    if (imcCalculado < 18.5) {
      setClassificacao('Abaixo do peso');
    } else if (imcCalculado < 25) {
      setClassificacao('Peso normal');
    } else if (imcCalculado < 30) {
      setClassificacao('Sobrepeso');
    } else if (imcCalculado < 35) {
      setClassificacao('Obesidade grau I');
    } else if (imcCalculado < 40) {
      setClassificacao('Obesidade grau II');
    } else {
      setClassificacao('Obesidade grau III');
    }
  };

  const limparCampos = () => {
    setAltura('');
    setPeso('');
    setImc(null);
    setClassificacao('');
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Calculadora de IMC</h1>
        
        <form onSubmit={calcularIMC}>
          <div className="form-group">
            <label htmlFor="altura">Altura (m):</label>
            <input
              type="number"
              id="altura"
              step="0.01"
              min="0"
              value={altura}
              onChange={(e) => setAltura(e.target.value)}
              placeholder="Ex: 1.75"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="peso">Peso (kg):</label>
            <input
              type="number"
              id="peso"
              step="0.1"
              min="0"
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
              placeholder="Ex: 70.5"
              required
            />
          </div>

          <div className="button-group">
            <button type="submit" className="btn-calcular">
              Calcular IMC
            </button>
            <button type="button" className="btn-limpar" onClick={limparCampos}>
              Limpar
            </button>
          </div>
        </form>

        {imc && (
          <div className="resultado">
            <h2>Resultado:</h2>
            <p className="imc-valor">IMC: <span>{imc}</span></p>
            <p className="imc-classificacao">Classificação: <span>{classificacao}</span></p>
          </div>
        )}

        {/* 👇 ADICIONE A TABELA AQUI - APÓS O RESULTADO 👇 */}
        <div className="tabela-referencia">
          <h3>Tabela de Referência IMC</h3>
          <table>
            <thead>
              <tr>
                <th>IMC</th>
                <th>Classificação</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Abaixo de 18,5</td>
                <td>Abaixo do peso</td>
              </tr>
              <tr>
                <td>18,5 - 24,9</td>
                <td>Peso normal</td>
              </tr>
              <tr>
                <td>25,0 - 29,9</td>
                <td>Sobrepeso</td>
              </tr>
              <tr>
                <td>30,0 - 34,9</td>
                <td>Obesidade grau I</td>
              </tr>
              <tr>
                <td>35,0 - 39,9</td>
                <td>Obesidade grau II</td>
              </tr>
              <tr>
                <td>Acima de 40,0</td>
                <td>Obesidade grau III</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* 👆 FIM DA TABELA 👆 */}

      </div>
    </div>
  );
}

export default App;