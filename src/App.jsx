import './App.css'
import { ToastContainer } from 'react-toastify';
import HomePage from './pages/HomePage'
import Header from './layout/Header';
import Footer from './layout/Footer';

import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
    <ToastContainer />
      <Header />
      <HomePage />
      <Footer />
    </>
  )
}

export default App
