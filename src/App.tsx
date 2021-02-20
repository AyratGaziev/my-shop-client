import './App.css';
import React from 'react'
import Header from './components/Header/Header';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Footer from './components/Footer/Footer';
import AllCards from './components/AllCards/AllCards';

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <div className="content">
          <Switch>
            <Route exact path='/'>
              <AllCards category={'allProducts'} />
            </Route>
            <Route exact path='/notebooks'>
              <AllCards category={'notebooks'} />
            </Route>
            <Route exact path='/phones'>
              <AllCards category={'phones'} />
            </Route>
            <Route exact path='/tvs'>
              <AllCards category={'tvs'} />
            </Route>
          </Switch>          
        </div>      
      </Router>
      <Footer/>
    </div>
  )
}

export default App;
