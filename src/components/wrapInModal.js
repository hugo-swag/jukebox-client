import { Modal } from 'react-bootstrap';

function WrapInModal({children, title, isShowing, handleClose}) {
  return (
     <>
      <Modal show={isShowing} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
      </Modal>
    </> );
}

export default WrapInModal;