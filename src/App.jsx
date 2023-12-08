import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Navbar } from './Navbar';
import './App.css';
import './navbar.css';

function App() {
  const [cards, setCards] = useState([]);
  const [massives, setMassives] = useState([]);
  const [localidade, setLocalidade] = useState('');
  const [tipoDeFalha, setTipoDeFalha] = useState('');
  const [horarioDaFalha, setHorarioDaFalha] = useState('');
  const [previsaoDeRetorno, setPrevisaoDeRetorno] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [informacoesAdicionais, setInformacoesAdicionais] = useState('');
  const [locaisAfetados, setLocaisAfetados] = useState('');

  const [mostrarMensagens, setMostrarMensagens] = useState(false);
  const [localidadeError, setLocalidadeError] = useState('');
  const [tipoDeFalhaError, setTipoDeFalhaError] = useState('');
  const [horarioDaFalhaError, setHorarioDaFalhaError] = useState('');
  const [previsaoDeRetornoError, setPrevisaoDeRetornoError] = useState('');

  useEffect(()  => {
    const getMassive = async () => {
      await axios.get('http://localhost:3000/api/massives')
      .then((response) => {
        setMassives(response.data)
        return response
      });
    }
    getMassive();
  }, []);


  const isModalOpen = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const isModalClose = () => {
    setIsOpen(false);
    ocultarMensagens();
  };

  const ocultarMensagens = () => {
    setMostrarMensagens(false);
    setLocalidadeError('');
    setTipoDeFalhaError('');
    setHorarioDaFalhaError('');
    setPrevisaoDeRetornoError('');
  };

  const criarCard = async () => {
    setLocalidadeError('');
    setTipoDeFalhaError('');
    setHorarioDaFalhaError('');
    setPrevisaoDeRetornoError('');
  
    let temErro = false;
  
    if (!localidade) {
      setLocalidadeError('Por favor, preencha este campo.');
      temErro = true;
    }
    if (!tipoDeFalha) {
      setTipoDeFalhaError('Por favor, selecione o tipo de falha.');
      temErro = true;
    }
  
    if (temErro) {
      setMostrarMensagens(true);
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3000/api/massives', {
        localidade,
        tipoDeFalha,
        horarioDaFalha,
        previsaoDeRetorno,
        informacoesAdicionais,
        locaisAfetados,
      });
  
      setCards((prevCards) => [
        ...prevCards,
        {
          id: response.data.id,
          localidade: response.data.localidade,
          tipoDeFalha: response.data.tipoDeFalha,
          horarioDaFalha: response.data.horarioDaFalha,
          previsaoDeRetorno: response.data.previsaoDeRetorno,
          informacoesAdicionais: response.data.informacoesAdicionais,
          locaisAfetados: response.data.locaisAfetados,
          texto: `Card ${response.data.id}`,
        },
      ]);
  
      limparCampos();
      isModalClose();
    } catch (error) {
      console.error('Erro ao criar o card:', error);
    }
  };  

  const limparCampos = () => {
    setLocalidade('');
    setTipoDeFalha('');
    setHorarioDaFalha('');
    setPrevisaoDeRetorno('');
    setInformacoesAdicionais('');
    setLocaisAfetados('');
  };

  return (
    <div className='App'>
      <Navbar />
      <button className='rivaldo' onClick={isModalOpen}>
        Novo Massiva
      </button>
      <div className='modal' id='modal' style={{ display: isOpen ? 'block' : 'none' }}>
        <div className='modal-header'>
          <button className='fechar-button' onClick={isModalClose}>
            <FontAwesomeIcon icon={faCircleXmark} size='xl' style={{ color: '#000000' }} />
          </button>
        </div>
        <div className='rivaldo2'>
          <div className='modal-content'>
            <div>
              <label>Localidade:</label>
              <input
                type='text'
                value={localidade}
                onChange={(e) => {
                  setLocalidade(e.target.value);
                  setLocalidadeError('');
                }}
              />
              {mostrarMensagens && localidadeError && (
                <span className='error-message'>{localidadeError}</span>
              )}
            </div>
            <div>
              <label>Tipo de Falha:</label>
              <select value={tipoDeFalha} onChange={(e) => setTipoDeFalha(e.target.value)}>
                <option value=''>Selecione a Falha</option>
                <option value='ROMPIMENTO'>ROMPIMENTO</option>
                <option value='FALHA DE ENERGIA'>FALHA DE ENERGIA</option>
                <option value='LENTIDÃO'>LENTIDÃO</option>
                <option value='MANUTENÇÃO'>MANUTENÇÃO</option>
              </select>
              {mostrarMensagens && tipoDeFalhaError && (
                <span className='error-message'>{tipoDeFalhaError}</span>
              )}
            </div>
            <div>
              <label>Horário da Falha:</label>
              <input
                type='time'
                value={horarioDaFalha}
                onChange={(e) => {
                  setHorarioDaFalha(e.target.value);
                  setHorarioDaFalhaError('');
                }}
              />
              {mostrarMensagens && horarioDaFalhaError && (
                <span className='error-message'>{horarioDaFalhaError}</span>
              )}
            </div>
            <div>
              <label>Previsão de Retorno:</label>
              <input
                type='text'
                value={previsaoDeRetorno}
                onChange={(e) => {
                  setPrevisaoDeRetorno(e.target.value);
                  setPrevisaoDeRetornoError('');
                }}
              />
              {mostrarMensagens && previsaoDeRetornoError && (
                <span className='error-message'>{previsaoDeRetornoError}</span>
              )}
            </div>
            <div>
              <label>Locais Afetados:</label>
              <input
                type='text'
                value={locaisAfetados}
                onChange={(e) => setLocaisAfetados(e.target.value)}
              />
            </div>
            <div>
              <label>Informações Adicionais: </label>
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
      </div>
      <div className='cards-container'>
        {massives.map((card, index) => (
          <div key={index} className='card'>
            <div className='header'>
              <p>{card.type}</p>
              <p></p>
            </div>
            <hr />
            <div className='informacoesLocais'>
              <p>Previsão de Retorno: {card.returndate}</p>
              <p>Locais Afetados: {card.locaisAfetados}</p>
              <p>Informações Adicionais: {card.description}</p>
            </div>
            <button
              className='fechar-card-button'
              onClick={() => {
                setCards((prevCards) => prevCards.filter((c) => c.id !== card.id));
              }}
            >
              <FontAwesomeIcon icon={faCircleXmark} size='sm' style={{ color: 'white' }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
