import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import './index.css';

function App() {
  const [cards, setCards] = useState([]);
  const [localidade, setLocalidade] = useState('');
  const [horaDeFalha, setHoraDeFalha] = useState('');
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
    if (!localidade || !horaDeFalha || !previsaoDeRetorno) {
      alert('Por favor, preencha todas as informações.');
      return;
    }

    setCards((prevCards) => [
      ...prevCards,
      {
        id: prevCards.length + 1,
        localidade,
        horaDeFalha,
        previsaoDeRetorno,
        informacoesAdicionais, // Corrigido aqui
        texto: `Card ${prevCards.length + 1}`,
      },
    ]);

    setLocalidade('');
    setHoraDeFalha('');
    setPrevisaoDeRetorno('');
    setInformacoesAdicionais('');
    isModalClose();
  };

  return (
    <div className='App'>
      <button className='rivaldo' onClick={isModalOpen}>
        Novo Massiva
      </button>
      <div className='modal' id='modal' style={{ display: isOpen ? 'block' : 'none' }}>
        <div className='modal-header'>
          <button className='fechar-button' onClick={isModalClose}>
            <FontAwesomeIcon icon={faCircleXmark} size="xl" style={{ color: "#000000" }} />
          </button>
        </div>
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
            <label>Hora de Falha:</label>
            <input
              type='time'
              value={horaDeFalha}
              onChange={(e) => setHoraDeFalha(e.target.value)}
            />
          </div>
          <div>
            <label>Previsão de Retorno:</label>
            <input
              type='time'
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
