import React, { useRef, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UserForm from "../components/UserForm";
import ColorSelector from "./ColorSelector";
import { Form, Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import moment from 'moment';

const Table = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalUserId, setModalUserId] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
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

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddUser = () => {
    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      name.trim() === ""
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
      // id: Date.now(),
       id: Math.random(),
      date: selectedDate.toISOString()
    };
    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    setFirstName("");
    setLastName("");
    setName("");
    setPrice(0);
    setQuantity(1);
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
    handleDeleteUser(id);
    setShowModal(true);
    setModalUserId(id);
  };

  const handleSaveUser = () => {
    const editedUsers = users.map((user) => {
      if (user.id === modalUserId) {
        return {
          ...user,
          firstName,
          lastName,
          date: selectedDate.toISOString()
        };
      } else {
        return user;
      }
    });
    localStorage.setItem("users", JSON.stringify(editedUsers));
    setUsers(editedUsers);
    setShowModal(false);
  };

  const handleCloseModalEnter = () => {
    setShowModal(false);
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
        width: "90rem",
      }}
    >
      <form
        style={{
          borderRadius: "30px",
        }}
      >
        <label className="h4">
          First Name:
          <input
            className="FormC"
            type="text"
            value={firstName}
            ref={inputRef}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label className="h4">
          Last Name:
          <input
            className="FormC"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>

        <label>Product Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Product Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />

        <label>Product Count</label>
        <input
          placeholder="Product Count"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <label className="mb-1" style={{ color }}>
          Date
        </label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="mb-4 border border-dark"
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
              <th className="border border-dark">F_Name</th>
              <th className="border border-dark">L_Name</th>
              <th className="border border-dark">P_Name</th>
              <th className="border border-dark">Price</th>
              <th className="border border-dark">Quantity</th>
              <th className="border border-dark">Color</th>
              <th className="border border-dark">Update</th>
              <th className="border border-dark">Delete</th>
              <th className="border border-dark">Date</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} style={{ color: user.color }}>
                <td>{user.firstName}</td>
                <td  className="border border-dark">{user.lastName}</td>
                <td className="border border-dark">{user.name}</td>
                <td className="border border-dark">{user.price}</td>

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

                <td className="border border-dark">
                  <input
                    type="color"
                    value={user.color}
                    onChange={(e) => handleColorChange(index, e.target.value)}
                    className="mb-3 border border-dark w-25"
                  />
                </td>

                <td className="border border-dark">
                  <button
                    className="btn btn-warning text-white"
                    onClick={() => handleEditUser(user.id)}
                  >
                    Edit
                  </button>
                </td>
                <td className="border border-dark">
                  <button
                    className="btn btn-danger text-white"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  {/* <td> {selectedDate.toLocaleDateString()}  </td> */}
                  <td>{user.date.substring(0,10)}</td>
                </td>
              </tr>
            ))}
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
      <ColorSelector/>
    </div>
  );
};

export default Table;
