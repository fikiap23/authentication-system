// authService.js
import axios from 'axios'

const BASE_URL = 'http://localhost:4000/auth'

const authService = {
  registerUser: async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}/register`, userData, {
        withCredentials: true,
      })
      return response.data
    } catch (error) {
      return await Promise.reject(error.response.data)
    }
  },

  loginUser: async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, userData, {
        withCredentials: true,
      })
      return response.data
    } catch (error) {
      return await Promise.reject(error.response.data)
    }
  },

  verifyUser: async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/verify`, data, {
        withCredentials: true,
      })
      return response.data
    } catch (error) {
      return await Promise.reject(error.response.data)
    }
  },
}

export default authService
