import React, {useState, useEffect} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import Swal from 'sweetalert2'
import "../App"

const UserForm = (props) => {
    const {color} = props;

    const [firstName,
        setFirstName] = useState('');
    const [lastName,
        setLastName] = useState('');
    const [users,
        setUsers] = useState([]);
    const [showModal,
        setShowModal] = useState(false);
    const [modalUserId,
        setModalUserId] = useState(null);

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        setUsers(storedUsers);
    }, []);

    const handleAddUser = () => {
      if (firstName.trim() === "" || lastName.trim() === "") {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Bos saxlamaq olmaz!',
          footer: '<a href="">Why do I have this issue?</a>'
        })
        return;
     
    }

    

        const newUser = {
            firstName,
            lastName,
            id: Date.now()
        };
        const updatedUsers = [
            ...users,
            newUser
        ];
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        setUsers(updatedUsers);
        setFirstName('');
        setLastName('');
    };

    const handleDeleteUser = (id) => {
        const filteredUsers = users.filter(user => user.id !== id);
        localStorage.setItem('users', JSON.stringify(filteredUsers));
        setUsers(filteredUsers);
    };

    const handleEditUser = (id) => {
        const editedUser = users.find(user => user.id === id);
        setFirstName(editedUser.firstName);
        setLastName(editedUser.lastName);
        handleDeleteUser(id);
        setShowModal(true);
        setModalUserId(id);

    };

    const handleSaveUser = () => {
        const editedUsers = users.map(user => {
            if (user.id === modalUserId) {
                return {
                    ...user,
                    firstName,
                    lastName
                };
            } else {
                return user;
            }
        });
        localStorage.setItem('users', JSON.stringify(editedUsers));
        setUsers(editedUsers);
        setShowModal(false);

    };

    const handleCloseModal = () => {
        setShowModal(false);
        setModalUserId(null);
        setFirstName('');
        setLastName('');
    };

    return (

        <div style={{
            width: "30rem"
        }}>

            <form style={{
                borderRadius: '25px'
            }}  >
                <label className="h4">
                    First Name:
                    <input
                        className="FormC"
                        style={{
                        color
                    }}
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}/>
                </label>
                <label className="h4">
                    Last Name:
                    <input
                        className="FormC"
                        style={{
                        color
                    }}
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}/>
                </label>
                <button
                    type="button"
                    className='btn btn-warning text-white m-1'
                    onClick={handleAddUser}>Add User</button>
            </form>
            <h2>Users:</h2>
            <div className="users">
                {users.map(user => (
                    <div key={user.id} className="user">
                        <span>{user.firstName} {user.lastName}</span>
                        <button onClick={() => handleEditUser(user.id)}>Edit</button>
                        <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                    </div>
                ))}
            </div>
            <Modal show={showModal} onHide={handleCloseModal} >
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="Enter name"/>
                        </Form.Group>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>LastName</Form.Label>
                            <Form.Control
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Enter lastname"/>
                        </Form.Group>

                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveUser}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UserForm;
