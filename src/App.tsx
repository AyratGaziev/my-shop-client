import './App.css';
import React from 'react'
import Header from './components/Header/Header';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import Footer from './components/Footer/Footer';
import AllCards from './components/AllCards/AllCards';
import ProductOverview from './components/ProductOverview/ProductOverview';
import Cart from './components/Cart/Cart';

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <div className="content">
          <Switch>
            {/* <Route exact path='/'>
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
            <Route exact path='/search'>
              <AllCards category={'search'} />
            </Route> */}
            <Route exact path='/cart'>
              <Cart />
            </Route>
            <Route exact path = '/'>
              <Redirect to='/products/allProducts'/>
            </Route>
            <Route exact path={`/products/:category`} component={AllCards} />
            <Route exact path={`/search/:category/:searchText`} component={AllCards}/>
            <Route exact path={`/productOverview/:id`} component = {ProductOverview}/>
          </Switch>          
        </div>      
      </Router>
      <Footer/>
    </div>
  )
}

export default App;
