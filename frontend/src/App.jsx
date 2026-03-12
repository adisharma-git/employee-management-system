import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import DashboardHome from "./Dashboard/DashboardHome";


const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ForgetPassword = lazy(() => import("./pages/ForgetPassword"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const Dashboard = lazy(() => import("./Dashboard/Dashboard"));
const EmployeeForm = lazy(() => import("./User/User"));
const HelpPage = lazy(() => import("./Dashboard/HelpPage"));
const Attendence = lazy(() => import("./Attendence/Attendence"));
const ComingSoon = lazy(() => import("./ComingSoon/ComingSoon"));
const ThankYou = lazy(() => import("./Email/ThankYouPage"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const SecurityPolicy = lazy(() => import("./pages/SecurityPolicy"));
const Updates = lazy(() => import("./pages/Updates"));
const EmployeeInfoPage = lazy(() => import("./pages/EmployeeInfoPage"));
const EmployeeRegistration = lazy(() => import("./Admin/EmployeeRegistration"));
const AttendanceModule = lazy(() => import("./pages/AttendanceModule"));
const LeaveModule = lazy(() => import("./pages/LeaveModule"));
const ReviewSection = lazy(() => import("./pages/ReviewHome"));
const SaleryModule = lazy(() => import("./pages/SaleryModule"));
const LeavesPage = lazy(() => import("./LeavesSection/LeavesPage"));
const ApplyLeaveForm = lazy(() => import("./LeavesSection/LeaveForm"));

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen text-xl">
            Loading Page...
          </div>
        }
      >
        <Routes>

          <Route path="/" element={<Navigate to="/landingPage" replace />} />

          <Route path="/landingPage" element={<LandingPage />} />
          <Route path="/landingPage/privacy" element={<PrivacyPolicy />} />
          <Route path="/termsofservice" element={<TermsOfService />} />
          <Route path="/SecurityPolicy" element={<SecurityPolicy />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/thank-you" element={<ThankYou />} />

          <Route path="/updates" element={<Updates />} />
          <Route path="/employeeInfoPage" element={<EmployeeInfoPage />} />
          <Route path="/EmployeeRegistration" element={<EmployeeRegistration />} />

          <Route
            path="/AttendanceModule"
            element={
              <ProtectedRoute>
                <AttendanceModule />
              </ProtectedRoute>
            }
          />

          <Route path="/LeaveModule" element={<LeaveModule />} />
          <Route path="/Reviews" element={<ReviewSection />} />
          <Route path="/SaleryModule" element={<SaleryModule />} />

          <Route
            path="/dashboardNew"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/attendance"
            element={
              <ProtectedRoute>
                <Attendence />
              </ProtectedRoute>
            }
          />

          <Route
            path="/employeeForm"
            element={
              <ProtectedRoute>
                <EmployeeForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboardNew/help"
            element={
              <ProtectedRoute>
                <HelpPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/ComingSoon"
            element={
              <ProtectedRoute>
                <ComingSoon />
              </ProtectedRoute>
            }
          />

          <Route
            path="/LeavesPage"
            element={
              <ProtectedRoute>
                <LeavesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/ApplyLeaveForm"
            element={
              <ProtectedRoute>
                <ApplyLeaveForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Announcement"
            element={
              <ProtectedRoute>
                <DashboardHome/>
              </ProtectedRoute>
            }
          />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;