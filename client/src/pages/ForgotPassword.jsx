import { useState } from 'react'
import { useSnackbar } from 'notistack'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import authService from '../services/authService'
const ForgotPassword = () => {
  const [loading, setLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const location = useLocation()

  const [formData, setFormData] = useState({
    email: location.state?.email || '',
  })

  const handleForgotPassword = async () => {
    // console.log(formData)
    try {
      setLoading(true)
      // check if username and password are not empty
      if (!formData.email) {
        enqueueSnackbar('Email cannot be empty', {
          variant: 'error',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
        })
        setLoading(false)
        return
      }

      const result = await authService.sendResetPasswordLink(formData)
      console.log(result)
      if (result.status) {
        enqueueSnackbar(result.message, {
          variant: 'success',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
        })
        setLoading(false)
        navigate('/login')
      }
    } catch (error) {
      setLoading(false)
      enqueueSnackbar(error.message, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      })
    }
  }
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          to="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            width="50"
            height="50"
            src="https://img.icons8.com/ios-filled/50/redux.png"
            alt="redux"
          />
        </Link>
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Forgot Password
          </h2>
          <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {loading ? 'Loading...' : 'Send Password Reset Link'}
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Back to
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                {' '}
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ForgotPassword
