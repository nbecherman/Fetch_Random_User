import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';

function UsersList() {
  const urlApi = "https://randomuser.me/api/?results=5";
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(urlApi)
      .then(response => response.json())
      .then(data => setUsers(data.results))
      .catch(error => console.log('Hubo un error ' + error));
  }, []);

  return (
    <div>
      <h1>Listado:</h1>
      <div className="cards-container">
        {users.map((user, index) => (
          <div className="card" key={index}>
            <div className="card-content">
              <img src={user.picture.medium} alt={`${user.name.first} ${user.name.last}`} />
              <p>{user.name.first} {user.name.last}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
        <UsersList />
  );
}

export default App;


