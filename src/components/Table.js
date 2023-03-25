import React, { useRef, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./modal.css";
import ColorSelector from "./ColorSelector";
import { Form, Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";

const Table = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalUserId, setModalUserId] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [color, setColor] = useState("#000");
  const inputRef = useRef(null);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // const handleShowModal = () => {
  //   setShowModal(true);
  // };

  const handleAddUser = () => {
    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      name.trim() === "" ||
      price <= 0 ||
      quantity <= 0
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Bos saxlamaq olmaz!",
        footer: '<a href="">Why do I have this issue?</a>',
      });
      return;
    }

    const newUser = {
      firstName,
      lastName,
      name,
      price,
      quantity,
      id: Math.random(),
      date: selectedDate.toISOString(),
    };
    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    setFirstName("");
    setLastName("");
    setName("");
    setPrice("");
    setQuantity("");
    setSelectedDate(new Date());
  };

  const handleDeleteUser = (id) => {
    const filteredUsers = users.filter((user) => user.id !== id);
    localStorage.setItem("users", JSON.stringify(filteredUsers));
    setUsers(filteredUsers);
  };



  const handleEditUser = (id) => {
    const editedUser = users.find((user) => user.id === id);
    setFirstName(editedUser.firstName);
    setLastName(editedUser.lastName);
    setName(editedUser.name);
    setPrice(editedUser.price);
    setQuantity(editedUser.quantity);
    setShowModal(true);
    setModalUserId(id);
  };
  const handleSaveUser = () => {
    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      name.trim() === "" ||
      price <= 0 ||
      quantity <= 0
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Bos saxlamaq olmaz!",
        footer: '<a href="">Why do I have this issue?</a>',
      });
      return;
    }
    const newUser = {
      firstName,
      lastName,
      name,
      price,
      quantity,
      date: selectedDate.toISOString(),
    };
    const userIndex = users.findIndex((user) => user.id === modalUserId);
    const updatedUsers = [...users];
    updatedUsers[userIndex] = { ...updatedUsers[userIndex], ...newUser };

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    setShowModal(false);
    setFirstName("");
    setLastName("");
    setName("");
    setPrice("");
    setQuantity("");
  };



  const handleCloseModal = () => {
    setShowModal(false);
    setFirstName("");
    setLastName("");
    setName("");
    setPrice("");
    setQuantity("");
  };

  const increaseQuantity = (index) => {
    const newItems = [...users];
    newItems[index].quantity += 1;
    setUsers(newItems);
    localStorage.setItem("users", JSON.stringify(newItems));
  };

  const decreaseQuantity = (index) => {
    const newItems = [...users];
    if (newItems[index].quantity > 1) {
      newItems[index].quantity -= 1;
      setUsers(newItems);
    }
    localStorage.setItem("users", JSON.stringify(newItems));
  };

  const totalPrice = users.reduce(
    (accumulator, currentItem) =>
      accumulator + currentItem.price * currentItem.quantity,
    0
  );

  const handleColorChange = (index, color) => {
    const updatedUsers = [...users];
    updatedUsers[index].color = color;
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <form>
        
        <label className="my-1 h4 w-100">
          First Name:
          <input
            className="input"
            type="text"
            value={firstName}
            ref={inputRef}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>

        <label className="my-1 h4 w-100">
          Last Name:
          <input
            className="input"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>

        <label className="my-1 h4">Product Name</label>
        <input
          className="input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className="my-1 h4">Product Price</label>
        <input
          className="input"
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />

        <label className="my-1 h4">Product Count</label>
        <input
          className="input"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <label className="my-1 h4" style={{ color }}>
          Date
        </label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="input mb-4"
        />

        <button
          type="button"
          className="btn btn-info text-white d-block"
          onClick={handleAddUser}
        >
          Add User
        </button>
      </form>

      <div className="users mt-2 ">
        <h4>Users:</h4>

        <table className="table border border-dark table-info">
          <thead>
            <tr className="border border-dark">
              <th>F_Name</th>
              <th>L_Name</th>
              <th>P_Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Color</th>
              <th>Update</th>
              <th>Delete</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              const dateStr = user.date.substring(0, 10);
              const date = new Date(dateStr);
              date.setDate(date.getDate());
              const newDateStr = date.toISOString().substring(0, 10);

              return (
                <tr key={index} style={{ color: user.color }}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.name}</td>
                  <td>{user.price}</td>

                  <td>
                    <button
                      className="btn btn-warning text-white"
                      onClick={() => decreaseQuantity(index)}
                    >
                      -
                    </button>
                    <span className="mx-1"> {user.quantity}</span>
                    <button
                      className="btn btn-warning text-white"
                      onClick={() => increaseQuantity(index)}
                    >
                      +
                    </button>
                  </td>

                  <td className="d-flex justify-content-center align-items-center unique">
                    <input
                      type="color"
                      value={user.color}
                      onChange={(e) => handleColorChange(index, e.target.value)}
                      className="my-2 w-75"
                    />
                  </td>

                  <td>
                    <button
                      className="btn btn-success text-white"
                      onClick={() => handleEditUser(user.id)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger text-white"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <td className="d-flex justify-content-center align-items-center unique">
                      <span className="">{newDateStr}</span>
                    </td>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <p className="btn btn-success text-white">
          Total Price: ${totalPrice.toFixed(2)}{" "}
        </p>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>FirstName</Form.Label>
              <Form.Control
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter name"
              />
            </Form.Group>
            <Form.Group controlId="formBasicName">
              <Form.Label>LastName</Form.Label>
              <Form.Control
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter lastname"
              />

              <Form.Label>ProductName</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Pname"
              />

              <Form.Label>ProductPrice</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />

              <Form.Label>ProductCount</Form.Label>
              <Form.Control
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleSaveUser}>
            Save
          </Button>
          <Button variant="danger" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <ColorSelector />
    </div>
  );
};

export default Table;
