import axios from 'axios'

const API_URL = '/api/users/'

/**
 * @param  {} userData
 * @desc Register user service
 * @function use from {@link register} 
 */
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

/**
 * @param  {} userData
 * @desc Login user service
 * @function use from {@link login}
 */
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

/**
 * @desc Logout service
 * @function use from {@link logout}
 */
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  login,
  logout
}

export default authService;