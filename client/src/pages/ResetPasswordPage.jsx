import { useState } from 'react'
import { useSnackbar } from 'notistack'
import { Link, useNavigate, useParams } from 'react-router-dom'
import authService from '../services/authService'
const ResetPasswordPage = () => {
  const [loading, setLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const { userId, token } = useParams()

  const [formData, setFormData] = useState({
    userId,
    token,
    password: '',
    confirmPassword: '',
  })

  const handleResetPassword = async () => {
    console.log(formData)
    try {
      setLoading(true)
      // check if username and password are not empty
      if (!formData.password || !formData.confirmPassword) {
        enqueueSnackbar('Password and confirm password cannot be empty', {
          variant: 'error',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
        })
        setLoading(false)
        return
      }

      if (formData.password !== formData.confirmPassword) {
        enqueueSnackbar('Passwords do not match', {
          variant: 'error',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
        })
        setLoading(false)
        return
      }

      if (formData.password.length < 6) {
        enqueueSnackbar('Password must be at least 6 characters', {
          variant: 'error',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
        })
        setLoading(false)
        return
      }

      // change format data
      const data = {
        newPassword: formData.password,
      }

      const result = await authService.resetPassword(
        formData.userId,
        formData.token,
        data
      )
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
      console.log(error)
      enqueueSnackbar(error.message, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      })
      setLoading(false)
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
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm password
              </label>
              <input
                type="confirm-password"
                name="confirm-password"
                id="confirm-password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />
            </div>

            <button
              type="button"
              onClick={handleResetPassword}
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {loading ? 'Loading...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ResetPasswordPage
