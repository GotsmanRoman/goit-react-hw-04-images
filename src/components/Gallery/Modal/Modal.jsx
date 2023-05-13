import { createPortal } from 'react-dom';
import { ModalItem, OverlayItem, ImageItem } from './Modal.module';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

function Modal({ onClick, currentElement }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  });

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      onClick();
      window.removeEventListener('keydown', handleKeyDown);
    }
  };

  const handleClick = event => {
    if (event.currentTarget === event.target) {
      onClick();
      window.removeEventListener('keydown', handleKeyDown);
    }
  };

  return createPortal(
    <OverlayItem onClick={handleClick}>
      <ModalItem>
        <ImageItem
          src={currentElement.largeImageURL}
          alt={currentElement.tags}
        />
      </ModalItem>
    </OverlayItem>,
    modalRoot
  );
}

export { Modal };

Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
  currentElement: PropTypes.object.isRequired,
};
