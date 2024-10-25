import './App.css'
import { ToastContainer } from 'react-toastify';
import HomePage from './pages/HomePage'
import Header from './layout/Header';
import Footer from './layout/Footer';

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <div>
      <ToastContainer />
      <Header />

          <HomePage />

      <Footer />
    </ div>
  )
}

export default App
