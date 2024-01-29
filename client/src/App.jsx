import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import ForgotPassword from './pages/ForgotPassword'
import { useRecoilValue } from 'recoil'
import userAtom from './atoms/userAtom'
import VerifyUserPage from './pages/VerifyUserPage'

function App() {
  const user = useRecoilValue(userAtom)
  return (
    <>
      <Routes>
        <Route path="/" element={user ? <HomePage /> : <LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify" element={<VerifyUserPage />} />
      </Routes>
    </>
  )
}

export default App
