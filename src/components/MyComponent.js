import React, {useState , useRef, useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import ShoppingCart from './ShoppingCart'


const MyComponent = () => {
    const [showModal,
        setShowModal] = useState(false);

    
    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <button onClick={handleShowModal} className="button-87 d-grid gap-2">Add User</button>

            <Modal  show={showModal} onHide={handleCloseModal} className="my-modal">
                <Modal.Header closeButton>
                    <Modal.Title className="my-modal-title">Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body className="my-modal-body">
                    <ShoppingCart/>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={handleCloseModal} className="my-modal-button">Close</button>
                    <button onClick={handleCloseModal} className="my-modal-button">Save</button>
                </Modal.Footer>
            </Modal>

            {showModal && (
        <style>
          {`.modal-dialog {
            max-width: 100vw !important;
            max-height: 100vh !important;
          }`}
        </style>
      )}

        
        </div>
    );
};

export default MyComponent;
