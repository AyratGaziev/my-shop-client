import './App.css';
import React from 'react'
import Header from './components/Header/Header';
import {BrowserRouter as Router} from 'react-router-dom'
import AllCards from './components/AllCards/AllCards';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <div className="content">
          <AllCards/>
        </div>      
      </Router>
      <Footer/>
    </div>
  )
}

export default App;
