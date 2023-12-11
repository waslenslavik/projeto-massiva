import styled from 'styled-components';

export const CardContainer = styled.div`
    position: relative;
    width: 30%;
    max-width: 450px;
    height: auto;
    padding: 2%;
    background: #ff8006;
    border-radius: 5%;
    margin: 0.5rem;
    transition: all 0.3s;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: left;
    font-size: 20px;
    font-weight: bold;
    word-wrap: break-word;
    box-shadow: 0 0 10px rgba(0, 0, 0, 2);
`
export const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid black;
    padding-bottom: 10px;
`

export const FecharCardButton = styled.button`
    background: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: #555;
    position: absolute;
    top: 0;
    right: 0;
    padding: 10px;
    transition: transform 0.3s ease;

    &:hover {
    color: #555;
    transform: scale(1.1);
    }
`