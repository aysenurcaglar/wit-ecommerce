import './App.css'
import { ToastContainer } from 'react-toastify';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import Header from './layout/Header';
import Footer from './layout/Footer';

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <Router>
      <div>
        <ToastContainer />
        <Header />
        <Switch>
        <Route path="/shop">
            <ShopPage />
          </Route>
          <Route exact path="/">
            <HomePage />
          </Route>
        </Switch>
        <Footer />
      </ div>
    </ Router>
  )
}

export default App
