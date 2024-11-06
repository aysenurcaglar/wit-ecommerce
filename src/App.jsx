import './App.css'
import { ToastContainer } from 'react-toastify';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, initializeUser } from './store/actions/clientActions';
import PrivateRoute from './components/PrivateRoute';

import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import ProductDetail from './pages/ProductDetail';
import ContactPage from './pages/ContactPage';
import TeamPage from './pages/TeamPage';
import AboutPage from './pages/AboutPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import Header from './layout/Header';
import Footer from './layout/Footer';

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const featuredProducts = [
  {
    id: 5,
    name: "Graphic Design",
    brand: "English Department",
    price: 6.48,
    originalPrice: 16.48,
    image: "/product-cover-5.jpg",
    colors: ["#23A6F0", "#23856D", "#E77C40", "#E63946"]
  },
  {
    id: 6,
    name: "Graphic Design",
    brand: "English Department",
    price: 6.48,
    originalPrice: 16.48,
    image: "/product-cover-6.jpg",
    colors: ["#23A6F0", "#23856D", "#E77C40", "#E63946"]
  },
  {
    id: 7,
    name: "Graphic Design",
    brand: "English Department",
    price: 6.48,
    originalPrice: 16.48,
    image: "/product-cover-7.jpg",
    colors: ["#23A6F0", "#23856D", "#E77C40", "#E63946"]
  },
  {
    id: 8,
    name: "Graphic Design",
    brand: "English Department",
    price: 6.48,
    originalPrice: 16.48,
    image: "/product-cover-8.jpg",
    colors: ["#23A6F0", "#23856D", "#E77C40", "#E63946"]
  },
  {
    id: 9,
    name: "Graphic Design",
    brand: "English Department",
    price: 6.48,
    originalPrice: 16.48,
    image: "/product-cover-9.jpg",
    colors: ["#23A6F0", "#23856D", "#E77C40", "#E63946"]
  },
  {
    id: 10,
    name: "Graphic Design",
    brand: "English Department",
    price: 6.48,
    originalPrice: 16.48,
    image: "/product-cover-10.jpg",
    colors: ["#23A6F0", "#23856D", "#E77C40", "#E63946"]
  },
  {
    id: 11,
    name: "Graphic Design",
    brand: "English Department",
    price: 6.48,
    originalPrice: 16.48,
    image: "/product-cover-11.jpg",
    colors: ["#23A6F0", "#23856D", "#E77C40", "#E63946"]
  },
  {
    id: 12,
    name: "Graphic Design",
    brand: "English Department",
    price: 6.48,
    originalPrice: 16.48,
    image: "/product-cover-12.jpg",
    colors: ["#23A6F0", "#23856D", "#E77C40", "#E63946"]
  },
];

function App() {

  const dispatch = useDispatch();

  const history = useHistory();

  const { isLoading, error } = useSelector(state => state.client);

  useEffect(() => {
    console.log('App useEffect running');
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    if (token) {
      dispatch(initializeUser());
    }
  }, [dispatch]);

  return (
    <Router>
      <div>
        <ToastContainer />
        <Header />
        {isLoading && <div className="bg-white">Loading...</div>}
        {error && <div className="bg-white">Error: {error}</div>}
        <Switch>
          <PrivateRoute path="/shop" component={ShopPage} />
          <PrivateRoute exact path="/" render={() => <HomePage featuredProducts={featuredProducts} />} />
          <PrivateRoute
            path="/product/:id"
            render={(props) => <ProductDetail {...props} featuredProducts={featuredProducts} />}
          />
          <Route path="/contact" component={ContactPage} />
          <Route path="/team" component={TeamPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/login" component={LoginPage} />
        </Switch>
        <Footer />
      </ div>
    </ Router>
  )
}

export default App
