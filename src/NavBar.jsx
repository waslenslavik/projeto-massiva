import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHistory, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './NavBar.css';


export const Navbar = () => {
      return (
        <div className='navbar'>
          <div className='navbar-item'>
            <FontAwesomeIcon icon={faHome} size="2x" />
            <span>Home</span>
          </div>
          <div className='navbar-item'>
            <FontAwesomeIcon icon={faHistory} size="2x" />
            <span>Histórico</span>
          </div>
          <div className='navbar-item'>
            <FontAwesomeIcon icon={faSignOutAlt} size="2x" />
            <span>Sair</span>
          </div>
        </div>
      );
    };
    
