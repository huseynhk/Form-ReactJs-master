import React, { useState } from "react";
// import Modal from "react-bootstrap/Modal";
// import Table from "./Table";
import TableReducer from "./TableReducer";



const MyComponent = () => {
  // const [showModal, setShowModal] = useState(false);

  // const handleShowModal = () => {
  //   setShowModal(true);
  // };

  // const handleCloseModal = () => {
  //   setShowModal(false);
  // };

  const [showTable, setShowTable] = useState(false);


  const handleShowTable = () => {
    setShowTable(true);
  };


  const handleCloseTable = () => {
    setShowTable(false);
  };

  return (
    <div>

      {showTable && <TableReducer />}
      <button onClick={handleShowTable} className="btn button-87 text-white ">
        Add Table
      </button>
      <button onClick={handleCloseTable} className="btn button-87 text-white">
        Close Table
      </button>



{/* 
      <button onClick={handleShowModal} className="button-87 d-grid gap-2">
        Open Modal
      </button>

      <Modal show={showModal} onHide={handleCloseModal} className="my-modal">
        <Modal.Header closeButton>
          <Modal.Title className="my-modal-title">Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body className="my-modal-body">
          <Table />
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleCloseModal} className="my-modal-button">
            Close
          </button>
          <button onClick={handleCloseModal} className="my-modal-button">
            Save
          </button>
        </Modal.Footer>
      </Modal> */}

      {/* <button onClick={handleShowModal} className="btn btn-warning text-white mt-2">Add Title</button>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ColorSelector />
          </Modal.Body>

          <Modal.Footer>
            <button className="btn btn-danger rounded" onClick={handleCloseModal}>Close</button>
          </Modal.Footer>
        </Modal>
      {showModal && (
        <style>
          {`.modal-dialog {
            max-width: 100vw !important;
            max-height: 100vh !important;
          }`}
        </style> */}

        
      {/* )} */}
    </div>
  );
};

export default MyComponent;
