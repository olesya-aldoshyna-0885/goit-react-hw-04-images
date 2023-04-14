import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalContainer } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, children }) => {
  
  useEffect(() => {
    const handelClick = e => {
      if (e.code === 'Escape') {
        onClose();
      };
    };
    window.addEventListener('keydown', handelClick);
        
    return () => { 
      window.removeEventListener('keydown', handelClick);
    }
  }, [onClose]);
  
    const handleClickOnBackdrop = e => {
      if (e.target === e.currentTarget) {
        onClose();
      }
  }; 
  
  return createPortal(
      <Overlay onClick={handleClickOnBackdrop}>
        <ModalContainer>{children}</ModalContainer>
      </Overlay>,
      modalRoot
    );
  }

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};


export default Modal;