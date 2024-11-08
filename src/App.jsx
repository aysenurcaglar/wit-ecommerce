import './App.css'
import { ToastContainer } from 'react-toastify';
import {
  
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, initializeUser } from './store/actions/clientActions';
import { fetchCategories, fetchProducts } from './store/actions/productActions';
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

import { Loader2 } from 'lucide-react';

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const featuredProducts = [
  {
    id: 5,
    name: "Graphic Design T-Shirt",
    brand: "English Department",
    price: 6.48,
    originalPrice: 16.48,
    image: "/product-cover-5.jpg",
    colors: ["#23A6F0", "#23856D", "#E77C40", "#E63946"]
  },
  {
    id: 6,
    name: "Graphic Design T-Shirt",
    brand: "English Department",
    price: 6.48,
    originalPrice: 16.48,
    image: "/product-cover-6.jpg",
    colors: ["#23A6F0", "#23856D", "#E77C40", "#E63946"]
  },
  {
    id: 7,
    name: "Graphic Design T-Shirt",
    brand: "English Department",
    price: 6.48,
    originalPrice: 16.48,
    image: "/product-cover-7.jpg",
    colors: ["#23A6F0", "#23856D", "#E77C40", "#E63946"]
  },
  {
    id: 8,
    name: "Graphic Design T-Shirt",
    brand: "English Department",
    price: 6.48,
    originalPrice: 16.48,
    image: "/product-cover-8.jpg",
    colors: ["#23A6F0", "#23856D", "#E77C40", "#E63946"]
  },
  {
    id: 9,
    name: "Graphic Design T-Shirt",
    brand: "English Department",
    price: 6.48,
    originalPrice: 16.48,
    image: "/product-cover-9.jpg",
    colors: ["#23A6F0", "#23856D", "#E77C40", "#E63946"]
  },
  {
    id: 10,
    name: "Graphic Design T-Shirt",
    brand: "English Department",
    price: 6.48,
    originalPrice: 16.48,
    image: "/product-cover-10.jpg",
    colors: ["#23A6F0", "#23856D", "#E77C40", "#E63946"]
  },
  {
    id: 11,
    name: "Graphic Design T-Shirt",
    brand: "English Department",
    price: 6.48,
    originalPrice: 16.48,
    image: "/product-cover-11.jpg",
    colors: ["#23A6F0", "#23856D", "#E77C40", "#E63946"]
  },
  {
    id: 12,
    name: "Graphic Design T-Shirt",
    brand: "English Department",
    price: 6.48,
    originalPrice: 16.48,
    image: "/product-cover-12.jpg",
    colors: ["#23A6F0", "#23856D", "#E77C40", "#E63946"]
  },
];

function App() {

  const dispatch = useDispatch();

  const { isLoading, error } = useSelector(state => state.client);
  const { productList, fetchState } = useSelector((state) => state.product);

  useEffect(() => {
    console.log('App useEffect running');
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    if (token) {
      dispatch(initializeUser());
    }
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, []);

  return (
      <div>
        <ToastContainer />
        <Header />
        {isLoading && <div className="bg-white">
          <Loader2 className="mr-2 h-4 w-4 inline animate-spin" />
          Loading...</div>}
        {error && <div className="bg-white">Error: {error}</div>}
        <Switch>
          <PrivateRoute exact path="/shop" component={ShopPage} />
          <PrivateRoute exact path="/" render={() => <HomePage />} />
          <PrivateRoute
            path="/shop/:gender/:categoryName/:categoryId/:nameSlug/:productId"
            component={ProductDetail} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/team" component={TeamPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/login" component={LoginPage} />
        </Switch>
        <Footer />
      </ div>

  )
}

export default App
