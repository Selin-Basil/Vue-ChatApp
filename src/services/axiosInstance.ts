import axios from 'axios'
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  setAccessTokenExpiry,
} from '@/utils/token'
import router from '@/router'
import { useUserStore } from '@/stores/UserStore'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token if available before every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Global error handling and token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (!error.response) {
      console.error('Network error or no response from server:', error)
      return Promise.reject(error)
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      const refreshTokenValue = getRefreshToken()
      const userStore = useUserStore()
      if (refreshTokenValue) {
        try {
          const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}login`, {
            refresh_token: refreshTokenValue,
          })

          // Extract token data
          const { access_token, refresh_token } = response.data

          // Store tokens using utility functions
          setAccessToken(access_token.token)
          setRefreshToken(refresh_token.token)
          setAccessTokenExpiry(access_token.expiry)

          // Update Authorization header with new token
          originalRequest.headers['Authorization'] = `Bearer ${access_token.token}`
          return axiosInstance(originalRequest) // Retry original request
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError)
          clearAllTokens()
          userStore.clearUser()
          router.push({ name: 'Login' })
        }
      } else {
        clearAllTokens()
        userStore.clearUser()
        router.push({ name: 'Login' })
      }
    } else if (error.response?.status === 500) {
      console.error('Server error:', error.response.data)
    }

    return Promise.reject(error)
  },
)

export default axiosInstance