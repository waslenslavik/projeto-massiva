import React, { useState } from 'react';
import './index.css';

function App() {
  const [cards, setCards] = useState([]);
  const [localidade, setLocalidade] = useState('');
  const [horaDeFalha, setHoraDeFalha] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const [ isOpen, setIsOpen ] = useState(false);


  const isModalOpen = (e) => {
    e.preventDefault();

    setIsOpen(!isOpen)
    const modal = document.getElementById('modal');
    if(isOpen){
      modal.style.display = 'block'
    }
  }

  const isModalClose = () => {


    setIsOpen(!isOpen)
    const modal = document.getElementById('modal');

    if(!isOpen){
      modal.style.display = 'none'
    }
  }


  const criarCard = () => {
    if (!localidade || !horaDeFalha || !prioridade) {
      alert('Por favor, preencha todas as informações.');
      return;
    }

    setCards([
      ...cards,
      {
        id: cards.length + 1,
        localidade,
        horaDeFalha,
        prioridade,
        texto: `Card ${cards.length + 1}`,
      },
    ]);

    setLocalidade('');
    setHoraDeFalha('');
    setPrioridade('');

    isModalClose();

  };

  const novoMassiva = () =>  {
  }

  return (
    <div className='App'>
        <button className='rivaldo' onClick={(e) => isModalOpen(e)}>Novo Massiva</button>
      <div className='modal' id='modal'>
      <div>
        <label>Localidade:</label>
        <input
          type="text"
          value={localidade}
          onChange={(e) => setLocalidade(e.target.value)}
        />
      </div>
      <div>
        <label>Hora de Falha:</label>
        <input
          type='text'
          value={horaDeFalha}
          onChange={(e) => setHoraDeFalha(e.target.value)}
        />
      </div>
      <div>
        <label>Prioridade:</label>
        <input
          type='text'
          value={prioridade}
          onChange={(e) => setPrioridade(e.target.value)}
        />
      </div>
      <button className='salvar-button' onClick={criarCard}>Salvar</button>
      </div>
        <div className='cards-container'>
          {cards.map((card) => (
            <div key={card.id} className='card'>
              <h3>{card.texto}</h3>
              <p>Localidade: {card.localidade}</p>
              <p>Hora de Falha: {card.horaDeFalha}</p>
              <p>Prioridade: {card.prioridade}</p>
            </div>
          ))}
        </div>
    </div>
    
  );
}

export default App;
