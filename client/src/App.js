import React, { useEffect, useState } from 'react';
import { Route, Link } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import './App.css';
import axios from 'axios';


function App() {
  const [users, setUsers] = useState([])
  // const [loggedIn, setLoggedIn] = useState(false)

  // useEffect(() => {
  //   axios.get('http://localhost:8000/api/users')
  //     .then(res => {
  //       console.log(res)
  //       setUsers(res.data)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }, [loggedIn])


  return (
    <div className="App">
      <nav>
        <Link to='/login'>Login</Link>
        <br></br>
        <Link to='/register'>Register</Link>
   
      </nav>

      {users.map(user => {
        return (
          <div key={user.id}>
            <div> {user.username} </div>
            <div> {user.id} </div>
          </div>
        )
      })}

      <Route exact path='/login'>
        <Login
          // setLoggedIn={setLoggedIn}
        />
      </Route>

      <Route exact path='/register' component={Register} />

    </div>
  );
}

export default App;
