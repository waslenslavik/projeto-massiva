import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Navbar } from './Navbar'
import './index.css';
import './navbar.css';

function App() {
  const [cards, setCards] = useState([]);
  const [localidade, setLocalidade] = useState('');
  const [tipoDeFalha, setTipoDeFalha] = useState('');
  const [horarioDaFalha, setHorarioDaFalha] = useState('');
  const [previsaoDeRetorno, setPrevisaoDeRetorno] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [informacoesAdicionais, setInformacoesAdicionais] = useState('');

  const isModalOpen = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const isModalClose = () => {
    setIsOpen(false);
  };

  const criarCard = () => {
    if (!localidade || !horarioDaFalha || !previsaoDeRetorno || !tipoDeFalha || !informacoesAdicionais) {
      alert('Por favor, preencha todas as informações.');
      return;
    }

    setCards((prevCards) => [
      ...prevCards,
      {
        id: prevCards.length + 1,
        localidade,
        horarioDaFalha,
        previsaoDeRetorno,
        tipoDeFalha,
        informacoesAdicionais,
        texto: `Card ${prevCards.length + 1}`,
      },
    ]);

    setLocalidade('');
    setHorarioDaFalha('');
    setPrevisaoDeRetorno('');
    setInformacoesAdicionais('');
    setTipoDeFalha('');
    isModalClose();
  };

  return (
    <div className='App'>
      <Navbar/>
      <button className='rivaldo' onClick={isModalOpen}>
        Novo Massiva
      </button>
      <div className='modal' id='modal' style={{ display: isOpen ? 'block' : 'none' }}>
        <div className='modal-header'>
          <button className='fechar-button' onClick={isModalClose}>
            <FontAwesomeIcon icon={faCircleXmark} size="xl" style={{ color: "#000000" }} />
          </button>
        </div>
        <div className='rivaldo2'>
        <div className='modal-content'>
          <div>
            <label>Localidade:</label>
            <input
              type='text'
              value={localidade}
              onChange={(e) => setLocalidade(e.target.value)}
            />
          </div>
          <div>
          <label>Tipo de Falha:</label>
            <select  value={tipoDeFalha} onChange={(e) => setTipoDeFalha(e.target.value)}>
              <option value="">Selecione a Falha</option>
              <option value="Rompimento">Rompimento</option>
              <option value="Falha de Energia">Falha de Energia</option>
              <option value="Lentidão">Lentidão</option>
              <option value="Manutenção">Manutenção</option>
            </select>
          </div>
          <div>
            <label>Horário da Falha:</label>
            <input
              type='time'
              value={horarioDaFalha}
              onChange={(e) => setHorarioDaFalha(e.target.value)}
            />
          </div>
          <div>
            <label>Previsão de Retorno:</label>
            <input
              type='text'
              value={previsaoDeRetorno}
              onChange={(e) => setPrevisaoDeRetorno(e.target.value)}
            />
          </div>
          <div>
            <label>Informações Adicionais:</label>
            <input
              type='text'
              value={informacoesAdicionais}
              onChange={(e) => setInformacoesAdicionais(e.target.value)}
            />
          </div>
          </div>
          <button className='salvar-button' onClick={criarCard}>
            Salvar
          </button>
        </div>
      </div>
      <div className='cards-container'>
        {cards.map((card) => (
          <div key={card.id} className='card'>
            <button className='fechar-card-button'
              onClick={() => {
                setCards((prevCards) => prevCards.filter((c) => c.id !== card.id));
              }}
            >
              <FontAwesomeIcon icon={faCircleXmark} size="sm" style={{ color: "white" }} />
            </button>
            <p>Localidade: {card.localidade}</p>
            <p>Tipo de Falha: {card.tipoDeFalha}</p>
            <p>Hora de Falha: {card.horaDeFalha}</p>
            <p>Previsão de Retorno: {card.previsaoDeRetorno}</p>
            <p  className='informacoesAdicionais'>Informações Adicionais: {card.informacoesAdicionais}</p> {/* Adicionado aqui */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;