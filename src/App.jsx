import React, { useState, useEffect } from 'react';

export default function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_API+'/users')
      .then(res => res.json())
      .then(result => {
        setUsers(result);
        console.log(result);
      });
  }, []);

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>
          <h2>{user.id}</h2>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}
