import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/noteState';
import Alert from './components/Alert';
import Login from './components/Login';
import SignUp from './components/SignUp';
import React, { useState } from 'react';

function App() {

  const [alert, setAlert] = useState(null)
  const showAlert = (msg, type, time) => {
    setAlert({
      msg: msg,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, time);
  }

  return (
    <NoteState>
      <BrowserRouter>
        <div>
          <Navbar />
          <Alert alert={alert} />
          <div className='container'>
            <Routes>
              <Route exact path='/' element={<Home showAlert={showAlert} />} />
              <Route exact path='/about' element={<About />} />
              <Route exact path='/login' element={<Login showAlert={showAlert} />} />
              <Route exact path='/signup' element={<SignUp showAlert={showAlert} />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </NoteState>
  );
}

export default App;
