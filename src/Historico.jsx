import React from "react";

const Historico = ({ historicoDeFalhas }) => {
  return (
    <div>
      <h1>Histórico de Falhas</h1>

      <table>
        <thead>
          <tr>
            <th>Localidade</th>
            <th>Tipo de Falha</th>
          </tr>
        </thead>
        <tbody>
          {historicoDeFalhas.map((falha) => (
            <tr key={falha.id}>
              <td>{falha.localidade}</td>
              <td>{falha.tipoDeFalha}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Historico;
