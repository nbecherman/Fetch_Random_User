import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';

function Modal({ user, onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
        <img src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} />
        <h2>{user.name.first} {user.name.last}</h2>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Location: {user.location.city}, {user.location.country}</p>
      </div>
    </div>
  );
}

function UsersList() {
  const urlApi = "https://randomuser.me/api/?results=5";
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch(urlApi)
      .then(response => response.json())
      .then(data => setUsers(data.results))
      .catch(error => console.log('Hubo un error ' + error));
  }, []);

  const handleOpenModal = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  return (
    <div>
      <h1>Listado:</h1>
      <div className="cards-container">
        {users.map((user, index) => (
          <div className="card" key={index}>
            <div className="card-content">
              <img src={user.picture.medium} alt={`${user.name.first} ${user.name.last}`} />
              <p>{user.name.first} {user.name.last}</p>
              <button className="open-modal-btn" onClick={() => handleOpenModal(user)}>Mas info</button>
            </div>
          </div>
        ))}
      </div>
      {selectedUser && <Modal user={selectedUser} onClose={handleCloseModal} />}
    </div>
  );
}

function App() {
  return (
    <UsersList />
  );
}

export default App;
