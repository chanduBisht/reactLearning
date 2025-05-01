import React, {useState} from 'react';

import './App.css';
import About from './components/About';
import Alert from './components/Alert';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import News from './components/News';
import Inotebook from './components/Inotebook';


function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })

    setTimeout(() => {
      setAlert(null);
    }, 1500); 
  }
  return (
    <>
    <Router>
    <div className="container">
      <Navbar title="Learn React"/>
      <Alert alert={alert}/>
      <Routes>
        <Route path="/news" element={<News pageSize={9}/>} />
        <Route path="/notebook" element={<Inotebook/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/" element={<TextForm/>} />
      </Routes>
    </div>
    </Router>
    </>
  );
}

export default App;
