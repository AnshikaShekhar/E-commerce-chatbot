import React from 'react';
import './App.css';
import Chatbot from './components/Chatbot';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <h1>E-commerce Chatbot</h1>
      <Login />
      <Chatbot />
    </div>
  );
}

export default App;
