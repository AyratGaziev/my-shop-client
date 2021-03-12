import "./App.css";
import React from "react";
import Header from "./components/Header/Header";
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch
} from "react-router-dom";
import Footer from "./components/Footer/Footer";
import AllCards from "./components/AllCards/AllCards";
import ProductOverview from "./components/ProductOverview/ProductOverview";
import Cart from "./components/Cart/Cart";
import MessagePopUp from "./components/MessagePopUp/MessagePopUp";
import Registration from "./components/Registration/Registration";
import UserPage from "./components/UserPage/UserPage";
import Order from "./components/Order/Order";
import BarsSpinner from "./components/BarsSpinner/BarsSpinner";

function App() {
    return (
        <div className="app">
            <Router>
                <Header />
                <MessagePopUp />
                <Registration />
                <BarsSpinner />

                <div className="content">
                    <Switch>
                        <Route path="/cart">
                            <Cart />
                        </Route>
                        <Route exact path="/">
                            <Redirect to="/products/allProducts" />
                        </Route>
                        <Route
                            path={`/products/:category`}
                            component={AllCards}
                        />
                        <Route
                            path={`/search/:category/:searchText`}
                            component={AllCards}
                        />
                        <Route
                            path={`/productOverview/:id`}
                            component={ProductOverview}
                        />
                        <Route path={`/order/:id`} component={Order} />
                        <Route path={`/user-page`} component={UserPage} />
                    </Switch>
                </div>
            </Router>
            <Footer />
        </div>
    );
}

export default App;
