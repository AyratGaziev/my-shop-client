import './App.css';
import React from 'react'
import Card from './components/Card/Card';
import Header from './components/Header/Header';
import {BrowserRouter as Router} from 'react-router-dom'

function App() {
  return (
    <div>
      <Router>
        <Header />
        <div className="content">
          <Card/>
        </div>      
      </Router>      
    </div>
  )
}

export default App;
