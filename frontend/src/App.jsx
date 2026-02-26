import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgetPassword from './pages/ForgetPassword'
import LandingPage from './pages/LandingPage'
import Dashboard from './Dashboard/Dashboard'
import ProtectedRoute from './ProtectedRoute/ProtectedRoute'
import EmployeeForm from './User/User'
import HelpPage from './Dashboard/HelpPage'
import Attendence from './Attendence/Attendence'
import ComingSoon from './ComingSoon/ComingSoon'
import ThankYou from './Email/ThankYouPage'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import SecurityPolicy from './pages/SecurityPolicy'
import Updates from './pages/Updates'
import EmployeeInfoPage from './pages/EmployeeInfoPage'
import EmployeeRegistration from './Admin/EmployeeRegistration'
import AttendanceModule from './pages/AttendanceModule'
import LeaveModule from './pages/LeaveModule'
import ReviewSection from './pages/ReviewHome'
import SaleryModule from './pages/SaleryModule'



function App() {
  return (
    <BrowserRouter>
      <Routes>


        <Route path="/" element={<Navigate to="/landingPage" replace />} />

        <Route path="/landingPage" element={<LandingPage />} />
        <Route path="landingPage/privacy" element={<PrivacyPolicy/>} />
        <Route path="/termsofservice" element={<TermsOfService/>} />
        <Route path="/SecurityPolicy" element={<SecurityPolicy/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path='/updates' element={<Updates />} />
        <Route path='/employeeInfoPage' element={<EmployeeInfoPage />} />
        <Route path='/EmployeeRegistration' element={<EmployeeRegistration />} />
        <Route path='/AttendanceModule' element={<AttendanceModule />} />
        <Route path="/LeaveModule" element={<LeaveModule />} />
        <Route path='/Reviews'element={<ReviewSection/>}/>

        <Route path='/SaleryModule' element={<SaleryModule />} />
        
        <Route
          path='/dashboardNew'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>

          } />

          <Route path="/attendance" 
          
          element={ <ProtectedRoute><Attendence/></ProtectedRoute>}

          />
          
          
        <Route
          path="/employeeForm"
          element={
            <ProtectedRoute><EmployeeForm /></ProtectedRoute>}
        />
        <Route
          path='/dashboardNew/help'

          element={
            <ProtectedRoute>
              <HelpPage />
            </ProtectedRoute>
          } />
         
        <Route path="/ComingSoon" 

        element={
        <ProtectedRoute><ComingSoon />
        </ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
