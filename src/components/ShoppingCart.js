import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UserForm from "../components/UserForm";
import ColorSelector from "./ColorSelector";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

const ShoppingCart = () => {
  const [items, setItems] = useLocalStorage("cart", []);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [color, setColor] = useState("#100");
  const [showModal, setShowModal] = useState(false);


  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const addItem = () => {
    if (name.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Bos saxlamaq olmaz!",
        footer: '<a href="">Why do I have this issue?</a>',
      });
      return;
    }
    setItems([...items, { name, price, quantity }]);
    setName("");
    setPrice(0);
    setQuantity(1);
    setColor(color);
  };

  // const editItem = (index) => {
  //   const newItems = [...items];
  //   newItems[index] = { name, price, quantity };
  //   setItems(newItems);
  //   setName("");
  //   setPrice(0);
  //   setQuantity(1);
  //   setColor(color);
  // };

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const increaseQuantity = (index) => {
    const newItems = [...items];
    newItems[index].quantity += 1;
    setItems(newItems);
  };

  const decreaseQuantity = (index) => {
    const newItems = [...items];
    if (newItems[index].quantity > 1) {
      newItems[index].quantity -= 1;
      setItems(newItems);
    }
  };

  const totalPrice = items.reduce(
    (accumulator, currentItem) =>
      accumulator + currentItem.price * currentItem.quantity,
    0
  );

  return (
    <div >
      <UserForm color={color} />
      <div>
       <h3 className="mt-5">Shopping Area</h3>
       <label>Product Name</label>
        <input
          type="text"
          value={name}
          style={{ color }}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Product Price</label>
        <input
          type="number"
          value={price}
          style={{ color }}
          onChange={(e) => setPrice(Number(e.target.value))}
        />

        <label>Product Count</label>
        <input
          placeholder="Product Count"
          type="number"
          value={quantity}
          style={{ color }}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
  
        <button className="btn btn-info text-white my-2" onClick={addItem}>Add Item</button>
      </div>



      <table  className="table border border-dark">
        <thead>
          <tr >
            <th>Name</th>
            <th>Add Date</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td style={{ color }}>{item.name}  </td>
              <td style={{ color }}> {selectedDate.toLocaleDateString()}</td>
              <td style={{ color }}>${item.price.toFixed(2)}</td>
              <td>
                <button className="btn btn-warning text-white" onClick={() => decreaseQuantity(index)}>-</button>
                <span className="mx-1" style={{ color }}> {item.quantity}</span>
                <button className="btn btn-warning text-white" onClick={() => increaseQuantity(index)}>+</button>
              </td>
             
            
              <td>
              <button className="btn btn-danger text-white" onClick={() => removeItem(index)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="btn btn-success text-white" style={{ color }}>Total Price: ${totalPrice.toFixed(2)} </p>

   
      
            

      <div className="d-flex justify-content-between align-items-center">
      <div>
      <label className="mb-1" style={{ color }}>Date</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="mb-4 border border-dark"
          style={{ color }}
        />
      </div>
      
      <input
          type="color"
          value={color}
          style={{ color }}
          onChange={(e) => setColor(e.target.value)}
          className="mb-3 border border-dark w-25"

        />
        <button onClick={handleShowModal} className="btn btn-info text-white mt-2" id="add-title-button" >Add Title</button>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ColorSelector />
          </Modal.Body>

          <Modal.Footer>
            <button onClick={handleCloseModal}>Close</button>
            <button onClick={handleCloseModal}>Save</button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default ShoppingCart;
