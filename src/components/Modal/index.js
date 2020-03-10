import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ModalWrapper, ModalCard, Background } from './styles';

function Portal({ children }) {
  const modalRoot = document.getElementById('modal');
  const el = document.createElement('div');

  useEffect(() => {
    modalRoot.appendChild(el);
  }, [el, modalRoot]);

  useEffect(() => {
    return () => modalRoot.removeChild(el);
  });

  return createPortal(children, el);
}

export default function Modal({ children, open }) {
  return (
    <Portal>
      {open && (
        <ModalWrapper>
          <ModalCard>{children}</ModalCard>
          <Background />
        </ModalWrapper>
      )}
    </Portal>
  );
}

Modal.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
  open: PropTypes.bool.isRequired,
};
