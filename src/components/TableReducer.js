import React, { useRef, useEffect, useReducer } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./modal.css";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { BsFillTrashFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from "react-icons/ai";
import { AiFillCalendar } from "react-icons/ai";

const initialState = {
  firstName: "",
  lastName: "",
  users: [],
  showModal: false,
  modalUserId: null,
  name: "",
  price: "",
  quantity: "",
  selectedDate: new Date(),
  color: "#000",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FIRST_NAME":
      return { ...state, firstName: action.payload };

    case "SET_LAST_NAME":
      return { ...state, lastName: action.payload };

    case "SET_USERS":
      return { ...state, users: action.payload };

    case "SET_SHOW_MODAL":
      return { ...state, showModal: action.payload };

    case "SET_MODAL_USER_ID":
      return { ...state, modalUserId: action.payload };

    case "SET_NAME":
      return { ...state, name: action.payload };

    case "SET_PRICE":
      return { ...state, price: action.payload };

    case "SET_QUANTITY":
      return { ...state, quantity: action.payload };

    case "SET_SELECTED_DATE":
      return { ...state, selectedDate: action.payload };

    case "SET_COLOR":
    case "SET_COLOR":
      const { index, color } = action.payload;
      const updatedUsers = [...state.users];
      updatedUsers[index] = {
        ...updatedUsers[index],
        color: color,
      };
      localStorage.setItem("users", JSON.stringify(updatedUsers)); // save updated users array to local storage
      return { ...state, users: updatedUsers };

    case "RESET_FORM":
      return {
        ...state,
        firstName: "",
        lastName: "",
        name: "",
        price: "",
        quantity: "",
        selectedDate: new Date(),
        color: "#000",
      };
    default:
      return state;
  }
};

const TableReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    firstName,
    lastName,
    users,
    showModal,
    modalUserId,
    name,
    price,
    quantity,
    selectedDate,
    color,
  } = state;
  const inputRef = useRef(null);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    dispatch({ type: "SET_USERS", payload: storedUsers });
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

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
      color,
    };
    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    dispatch({ type: "SET_USERS", payload: updatedUsers });
    dispatch({ type: "RESET_FORM" });
  };

  const handleDeleteUser = (id) => {
    const filteredUsers = users.filter((user) => user.id !== id);
    localStorage.setItem("users", JSON.stringify(filteredUsers));
    dispatch({ type: "SET_USERS", payload: filteredUsers });
  };

  const handleEditUser = (id) => {
    const editedUser = users.find((user) => user.id === id);
    dispatch({ type: "SET_FIRST_NAME", payload: editedUser.firstName });
    dispatch({ type: "SET_LAST_NAME", payload: editedUser.lastName });
    dispatch({ type: "SET_NAME", payload: editedUser.name });
    dispatch({ type: "SET_PRICE", payload: editedUser.price });
    dispatch({ type: "SET_QUANTITY", payload: editedUser.quantity });
    dispatch({ type: "SET_SELECTED_DATE", payload: new Date(editedUser.date) });
    dispatch({ type: "SET_MODAL_USER_ID", payload: id });
    dispatch({ type: "SET_SHOW_MODAL", payload: true });
  };

  const handleUpdateUser = () => {
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

    const updatedUsers = [...users];
    const userIndex = updatedUsers.findIndex((user) => user.id === modalUserId);

    updatedUsers[userIndex] = {
      ...updatedUsers[userIndex],
      firstName,
      lastName,
      name,
      price,
      quantity,
      date: selectedDate.toISOString(),
    };
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    dispatch({ type: "SET_USERS", payload: updatedUsers });
    dispatch({ type: "SET_SHOW_MODAL", payload: false });
    dispatch({ type: "RESET_FORM" });
  };

  const handleColorChange = (index, color) => {
    dispatch({ type: "SET_COLOR", payload: { index, color } });
  };

  const handleModalClose = () => {
    dispatch({ type: "SET_SHOW_MODAL", payload: false });
    dispatch({ type: "RESET_FORM" });
  };

  const handleDateChange = (date) => {
    dispatch({ type: "SET_SELECTED_DATE", payload: date });
  };

  const handleSortByName = () => {
    const sortedUsers = [...users].sort((a, b) =>
      a.firstName.localeCompare(b.firstName)
    );
    dispatch({ type: "SET_USERS", payload: sortedUsers });
  };

  const handleSortByPrice = () => {
    const sortedUsers = [...users].sort((a, b) => a.price - b.price);
    dispatch({ type: "SET_USERS", payload: sortedUsers });
  };

  const increaseQuantity = (index) => {
    const updatedUsers = [...state.users];
    updatedUsers[index].quantity = Number(updatedUsers[index].quantity) + 1;
    dispatch({ type: "SET_USERS", payload: updatedUsers });
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const decreaseQuantity = (index) => {
    const updatedUsers = [...state.users];
    const quantity = Number(updatedUsers[index].quantity);
    if (quantity > 1) {
      updatedUsers[index].quantity = quantity - 1;
      dispatch({ type: "SET_USERS", payload: updatedUsers });
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
  };

  const totalPrice = users.reduce(
    (accumulator, currentItem) =>
      accumulator + currentItem.price * currentItem.quantity,
    0
  );

  return (
    <div>
      <h1>Table</h1>
      <form>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) =>
            dispatch({ type: "SET_FIRST_NAME", payload: e.target.value })
          }
          ref={inputRef}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) =>
            dispatch({ type: "SET_LAST_NAME", payload: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            dispatch({ type: "SET_NAME", payload: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            dispatch({ type: "SET_PRICE", payload: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) =>
            dispatch({ type: "SET_QUANTITY", payload: e.target.value })
          }
        />
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
        
        />
          <AiFillCalendar  className="fs-3 calendar"/>
          
          
        <button className="btn btn-info text-white" type="button" onClick={handleAddUser}>
          Add User
        </button>
      </form>
      <button className="btn btn-warning text-white " type="button" onClick={handleSortByName}>
        Sort By Name
      </button>
      <button className="btn btn-warning text-white m-3" type="button" onClick={handleSortByPrice}>
        Sort By Price
      </button>
      <table className="w-100">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
            <th>Color</th>
            <th>Date</th>
          </tr>
        </thead>
        {users.map((user, index) => (
          <tr key={user.id} style={{ color: user.color }}>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.name}</td>
            <td>{user.price}</td>

            <td>
              <button  className="btn btn-success text-white" onClick={() => decreaseQuantity(index)}>
                <AiOutlineMinusSquare />
              </button>
              <span className="mx-1" >  {user.quantity}</span>
              <button  className="btn btn-success text-white" onClick={() => increaseQuantity(index)}>
                <AiOutlinePlusSquare />
              </button>
            </td>
        
            <td >  
              <button type="button"   className="btn btn-primary text-white mx-3" onClick={() => handleEditUser(user.id)}>
              <FiEdit className="fs-3"/>
              </button>
              <button type="button" className="btn btn-danger text-white "  onClick={() => handleDeleteUser(user.id)}>
              <BsFillTrashFill className="fs-3"/>
              </button>
            </td>

            <td className="d-flex justify-content-center align-items-center unique">
              <input
                type="color"
                value={user.color}
                onChange={(e) => handleColorChange(index, e.target.value)}
                className="my-2 w-50 "
              />
            </td>

            <td>
              {new Date(user.date.substring(0, 10))
                .toISOString()
                .substring(0, 10)}
            </td>
          </tr>
        ))}
      </table>

      <p className="btn btn-primary text-white my-3 fs-5">
          Total Price: ${totalPrice.toFixed(2)}{" "}
        </p>

      <Modal
        show={showModal}
        handleClose={handleModalClose}
        title="Update User"
      >
        <form>
          <div className="form-group ">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              value={firstName}
              onChange={(e) =>
                dispatch({ type: "SET_FIRST_NAME", payload: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              value={lastName}
              onChange={(e) =>
                dispatch({ type: "SET_LAST_NAME", payload: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) =>
                dispatch({ type: "SET_NAME", payload: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              value={price}
              onChange={(e) =>
                dispatch({ type: "SET_PRICE", payload: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              className="form-control"
              id="quantity"
              value={quantity}
              onChange={(e) =>
                dispatch({ type: "SET_QUANTITY", payload: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="selectedDate">Date</label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
            />
          </div>
     
          <button
            type="button"
            className="btn btn-primary my-2"
            onClick={handleUpdateUser}
          >
            Save
          </button>

          <button
            type="button"
            className="btn btn-danger mx-2"
            onClick={handleModalClose}
          >
            Close
          </button>
        </form>
      </Modal>
  
    </div>
    
  );
};
export default TableReducer;
