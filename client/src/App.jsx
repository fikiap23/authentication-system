import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import ForgotPassword from './pages/ForgotPassword'
import Cookies from 'js-cookie'
import VerifyUserPage from './pages/VerifyUserPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  const token = Cookies.get('token')
  // console.log(token)
  return (
    <>
      <Routes>
        <Route path="/" element={token ? <HomePage /> : <LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/reset-password/:userId/:token"
          element={<ResetPasswordPage />}
        />
        <Route path="/verify" element={<VerifyUserPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
