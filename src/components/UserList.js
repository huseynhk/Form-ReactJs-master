// import React, { useState, useEffect, useRef } from "react";
// import { Modal, Button, Form } from "react-bootstrap";
// import Swal from "sweetalert2";
// import "../App.css";

// const UserList = (props) => {
//   const { color } = props;

//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [users, setUsers] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [cart, setCart] = useState([]);
//   const inputRef = useRef(null);

//   useEffect(() => {
//     if (inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, []);

//   useEffect(() => {
//     const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
//     setUsers(storedUsers);
//   }, []);

//   const handleAddUser = () => {
//     if (firstName.trim() === "" || lastName.trim() === "") {
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Bos saxlamaq olmaz!",
//         footer: '<a href="">Why do I have this issue?</a>',
//       });
//       return;
//     }

//     const newUser = {
//       firstName,
//       lastName,
//       id: Date.now(),
//     };
//     const updatedUsers = [...users, newUser];
//     localStorage.setItem("users", JSON.stringify(updatedUsers));
//     setUsers(updatedUsers);
//     setFirstName("");
//     setLastName("");
//   };

//   const handleDeleteUser = (id) => {
//     const filteredUsers = users.filter((user) => user.id !== id);
//     localStorage.setItem("users", JSON.stringify(filteredUsers));
//     setUsers(filteredUsers);
//   };

//   const handleEditUser = (user) => {
//     setSelectedUser(user);
//     setShowModal(true);
//   };

//   const handleSaveUser = () => {
//     const editedUsers = users.map((user) =>
//       user.id === selectedUser.id
//         ? { ...user, firstName, lastName }
//         : user
//     );
//     localStorage.setItem("users", JSON.stringify(editedUsers));
//     setUsers(editedUsers);
//     setSelectedUser(null);
//     setShowModal(false);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setSelectedUser(null);
//     setFirstName("");
//     setLastName("");
//   };

//   const handleAddToCart = (user) => {
//     setCart((prevCart) => [...prevCart, user]);
//   };

//   const handleRemoveFromCart = (userId) => {
//     setCart((prevCart) => prevCart.filter((user) => user.id !== userId));
//   };

//   return (
//     <div className="row">
//       <div className="col-6">
//         <div className="card shadow-lg">
//           <div className="card-body">
//             <form>
//               <div className="form-group">
//                 <label>First Name: </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   ref={inputRef}
//                   value={firstName}
//                   onChange={(e) => setFirstName(e.target.value)}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Last Name: </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={lastName}
//                   onChange={(e) => setLastName(e.target.value)}
//                 />
//               </div>
//               <div className="form-group">
//                 <button
//                   type="button"
//                   className="btn btn-info w-100"
//                   onClick={handleAddUser}
//                 >
//                   Add User
//                 </button>
//               </div>
//             </form>
//             <h4>Users:</h4>
//             <div className="list-group">
//               {users.map((user) => (
//                 <div
//                   key={user.id}
//                   className="list-group-item d-flex justify-content-between align-items-center"
//                 >
//                   <div>
//                     <h5
//                       className="mb-0"
//                       style={{ cursor: "pointer", color }}
//                       onClick={() =>
//                         handleEditUser({ ...user, firstName, lastName })
//                       }
//                     >
//                       {user.firstName} {user.lastName}
//                     </h5>
//                   </div>
//                   <div>
//                     <button
//                       className="btn btn-primary btn-sm mr-2"
//                       onClick={() => handleAddToCart(user)}
//                     >
//                       Add to Cart
//                     </button>
//                     <button
//                       className="btn btn-danger btn-sm"
//                       onClick={() => handleDeleteUser(user.id)}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="col-6">
//         <div className="card shadow-lg">
//           <div className="card-body">
//             <h4>Cart:</h4>
//             <div className="list-group">
//               {cart.map((user) => (
//                 <div
//                   key={user.id}
//                   className="list-group-item d-flex justify-content-between align-items-center"
//                 >
//                   <div>{user.firstName} {user.lastName}</div>
//                   <div>
//                     <button
//                       className="btn btn-danger btn-sm"
//                       onClick={() => handleRemoveFromCart(user.id)}
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit User</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formBasicName">
//               <Form.Label>First Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={selectedUser ? selectedUser.firstName : ""}
//                 onChange={(e) => setFirstName(e.target.value)}
//                 placeholder="Enter first name"
//               />
//             </Form.Group>
//             <Form.Group controlId="formBasicName">
//               <Form.Label>Last Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={selectedUser ? selectedUser.lastName : ""}
//                 onChange={(e) => setLastName(e.target.value)}
//                 placeholder="Enter last name"
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseModal}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleSaveUser}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default UserList;