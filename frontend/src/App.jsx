import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgetPassword from './pages/ForgetPassword'
import LandingPage from './pages/LandingPage'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Navigate/>} /> */}
        <Route path="/landingPage" element={<LandingPage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/forgetPassword' element={<ForgetPassword />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
