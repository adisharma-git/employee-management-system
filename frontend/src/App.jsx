import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgetPassword from './pages/ForgetPassword'

function App() {


  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path='/forgetPassword' element={<ForgetPassword />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
