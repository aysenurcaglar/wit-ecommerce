import { useState } from 'react'
import './App.css'
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ToastContainer />
      <h1 className='font-bold'>E-Commerce</h1>
    </>
  )
}

export default App
