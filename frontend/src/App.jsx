import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgetPassword from './pages/ForgetPassword'
import LandingPage from './pages/LandingPage'
import Dashboard from './Dashboard/Dashboard'
import ProtectedRoute from './ProtectedRoute/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>


        <Route path="/" element={<Navigate to="/landingPage" replace />} />

        <Route path="/landingPage" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route
          path='/dashboardNew'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>

          } />

      </Routes>
    </BrowserRouter>
  )
}

export default App
